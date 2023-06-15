import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { NbMediaBreakpointsService, NbMenuService, NbThemeService } from '@nebular/theme';
import { FrameService } from '../../../@core/mock/frame.service';
import { PushNotificationService } from '../../../@core/utils/services/push-notification.service';
import { MenuService } from '../../../authentication/menu/menu.service';
import { uiDefaultConfiguration } from '../../../@constants/cp-default-constant-values';
import { AuthCustomerService } from '../../services/auth-customer.service';
import { CustomerPortalHttpRequestService } from 'app/customer-portal/services/customer-portal-http-request.service';
import { UserCustomerService } from '../../../@core/mock/users.service';
import { CpTopNonPublicMenuItems, CpTopPublicMenuItems, MenuItemNameEnum } from 'app/customer-portal/utils/constant-data';
import { DataCookieService } from '../../services/data-cookie.service';
import { DataLocalService } from '../../services/data-local.service';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
declare const jQuery: any;

@Component({
	selector: 'app-header-customer',
	templateUrl: './header-customer.component.html',
	styleUrls: ['./header-customer.component.scss'],
	providers: [MenuService]
})
export class HeaderCustomerComponent implements OnInit, OnDestroy {
	myGovernmentOnlineOrg = environment.myGovernmentOnlineOrg;
	headerBar!: boolean;
	nameState!: string;
	userToken: any;
	fullName!: string;
	email!: string;

	menu = CpTopNonPublicMenuItems;
	guestMenu = CpTopPublicMenuItems;
	menuItemNameEnum = MenuItemNameEnum;
	isEscambiaFl: boolean = false;
	jurisdictionName!: string;

	userMenu: any[] = [
		{
			title: 'Profile',
			data: {
				id: 'userDetails'
			}
		},
		{
			title: 'Log out',
			data: {
				id: 'logout'
			}
		}
	];

	userJuris: any[] = [
		{
			title: 'Change Jurisdiction',
			data: {
				id: 'changeJurisdiction'
			}
		}
	];

	userLogin: any[] = [
		{
			title: 'Login',
			data: {
				id: 'login'
			}
		}
	];

	notificationlist!: any[];
	notificationCount: any;
	activeItem = this.menuItemNameEnum.Home;
	subscription: Subscription[] = [];
	uiConfiguration: any = uiDefaultConfiguration;
	currentUrl = null;
	logoImageIDElementRef: any = null;
	setLogoStyleIntervalObj: any = null;
	breakpointMap: any = {};
	currentBreakpoint: any = {};
	private destroy$: Subject<void> = new Subject<void>();
	showToggleButton = false;
	$isAuthorizedUserActionCssSet = new BehaviorSubject<boolean>(false);
	defaultLogoWidth = '200px';
	userID!: number;

	constructor(
		private router: Router,
		private userCustomerService: UserCustomerService,
		public authService: AuthCustomerService,
		private dataLocalService: DataLocalService,
		private dataCookieService: DataCookieService,
		// private menuService: NbMenuService,
		private frameService: FrameService,
		private menuStateService: MenuService,
		// private breakpointService: NbMediaBreakpointsService,
		// private themeService: NbThemeService,
		public readonly pushNotificationService: PushNotificationService,
		private readonly customerPortalHttpRequestService: CustomerPortalHttpRequestService,
	) {
	}

	ngOnInit(): void {
		this.subscription.push(
			this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
				this.setActiveItem(event.url);
			})
		);

		this.setActiveItem(this.router.url)

		if (this.authService.isLogger() == true) {
			this.userToken = this.userCustomerService.getUserToken();
			if (this.userToken == undefined || this.userToken == null || this.userToken == '') this.userToken = '-';
		}

		// required
		// this.breakpointMap = this.breakpointService.getBreakpointsMap();
		// this.themeService.onMediaQueryChange().pipe(map(([, currentBreakpoint]) => currentBreakpoint), takeUntil(this.destroy$),).subscribe((currentBreakpoint: any) => {
		// 	this.setMediaQueryChange(currentBreakpoint);
		// });

		this.frameService.uiConfiguration$.subscribe((data) => {
			this.logoImageIDElementRef = null;
			if (data) {
				if (data.UI_HeaderHeight) {
					if (data.UI_HeaderHeight.indexOf('px') > -1) {
						data.Nav_Menu_Height = `${data.UI_HeaderHeight.split('px')[0] - 8}px`
					}
				}
				this.uiConfiguration = data;

				if (data.UI_LogoHeight) {
					this.logoImageIDElementRef = jQuery('#logoImageID');
					if (this.logoImageIDElementRef?.length) {
						this.logoImageIDElementRef.attr('style', `max-height: ${this.uiConfiguration.UI_LogoHeight} !important;max-width: ${this.uiConfiguration.UI_LogoWidth} !important;`);
						setTimeout(() => {
							this.logoImageIDElementRef.attr('style', `max-height: ${this.uiConfiguration.UI_LogoHeight} !important;max-width: ${this.uiConfiguration.UI_LogoWidth} !important;`);
						}, 1000);
					}
					else {
						this.setLogoStyleIntervalObj = setInterval(() => {
							this.logoImageIDElementRef = jQuery('#logoImageID');
							if (this.logoImageIDElementRef.length) {
								this.logoImageIDElementRef.attr('style', `max-height: ${this.uiConfiguration.UI_LogoHeight} !important;max-width: ${this.uiConfiguration.UI_LogoWidth} !important;`);
								if (this.setLogoStyleIntervalObj)
									clearInterval(this.setLogoStyleIntervalObj);
							}
						}, 500);
					}
				}

				if (this.authService.isLogger()) {
					this.$isAuthorizedUserActionCssSet.next(false);
				}

				this.setMediaQueryChange(this.currentBreakpoint);
			}
		});

		this.userCustomerService.changeUsername.subscribe((name: string) => {
			if (this.dataCookieService.getUserID()) {
				this.userID = Number(this.dataCookieService.getUserID());
				this.pushNotificationService.init(this.userID, true);
			}
			this.fullName = name;
			this.$isAuthorizedUserActionCssSet.next(false);
		});

		this.userCustomerService.changeEmail.subscribe((email: string) => {
			this.email = email;
		});

		this.dataLocalService.changeJurisdictionName.subscribe(value => {
			this.jurisdictionName = value;
			if (this.jurisdictionName == 'Escambia County') {
				this.isEscambiaFl = true;
			} else {
				this.isEscambiaFl = false;
			}
		});

		// required
		// this.menuService.onItemClick().subscribe((event) => {
		// 	if (event.item?.data?.id === 'logout') {
		// 		this.gotoLogout();

		// 	} else if (event.item?.data?.id === 'userDetails') {
		// 		this.router.navigate(['/cp/settings']);

		// 	} else if (event.item?.data?.id === 'changeJurisdiction') {
		// 		this.router.navigate(['/cp/home']);

		// 	} else if (event.item?.data?.id === 'login') {
		// 		this.router.navigate(['/cp/login']);
		// 	}
		// });
	}


	setActiveItem(urlPart: string) {
		if (urlPart.includes('/cp/portal')) {
			this.activeItem = this.menuItemNameEnum.Home;
		} else if (urlPart.includes('/cp/my-projects') || urlPart.includes('/cp/project-details') || urlPart.includes('/cp/application-details')
			|| urlPart.includes('/cp/project-type') || urlPart.includes('/cp/project-type-use-existing') || urlPart.includes('/cp/project-type-details')
			|| urlPart.includes('/cp/application-wizard')) {
			this.activeItem = this.menuItemNameEnum.ProjectsAndRequests;
		} else if (urlPart.includes('/cp/pending-inspections') || urlPart.includes('/cp/request-inspection')) {
			this.activeItem = this.menuItemNameEnum.Inspections;
		} else if (urlPart.includes('/cp/contractor-licenses')) {
			this.activeItem = this.menuItemNameEnum.ContractorLicenses;
		} else if (urlPart.includes('/cp/info-account')) {
			this.activeItem = this.menuItemNameEnum.NewAccount
		} else if (urlPart.includes('/cp/login')) {
			this.activeItem = this.menuItemNameEnum.Login
		} else {
			this.activeItem = this.menuItemNameEnum.Default;
		}
	}

	ngOnDestroy() {
		this.subscription.forEach(item => item.unsubscribe());
		this.subscription = [];
	}

	onMenuClick(item: any, $event: any = null): void {
		if ($event && $event.ctrlKey) {
			return;
		}
		this.handleMenuItemUI($event);

		switch (item.description) {
			case this.menuItemNameEnum.Home:
				this.activeItem = item.description;
				this.menuStateService.setFragment('portal');
				this.router.navigate([item.url]);
				break;

			case this.menuItemNameEnum.ProjectsAndRequests:
				this.activeItem = item.description;
				this.menuStateService.setFragment('my-projects');
				this.router.navigate([item.url]);
				break;

			case this.menuItemNameEnum.Inspections:
				this.activeItem = item.description;
				this.menuStateService.setFragment('pending-inspections');
				this.router.navigate([item.url]);
				break;

			case this.menuItemNameEnum.ContractorLicenses:
				this.activeItem = item.description;
				this.menuStateService.setFragment('contractor-licenses');
				this.router.navigate([item.url]);
				break;

			case this.menuItemNameEnum.NewAccount:
				this.activeItem = item.description;
				this.menuStateService.setFragment('info-account');
				this.router.navigate([item.url]);
				break;

			case this.menuItemNameEnum.Login:
				this.activeItem = item.description;
				this.menuStateService.setFragment('login');
				this.router.navigate([item.url]);
				break;

			case this.menuItemNameEnum.Contact:
				// window.open(item.url, '_blank')
				break;

			default:
				break;
		}
	}

	handleMenuItemUI($event: any) {
		switch ($event.type) {
			case 'mouseover':
			case 'click':
				if ($event.currentTarget) {
					$event.currentTarget.parentElement.childNodes.forEach((element: any) => {
						if (element.nodeName != '#comment') {
							if (!element.classList.contains('active-menu-item')) {
								element.style.color = this.uiConfiguration.UI_HeaderLinkTextColor;
								element.style.background = this.uiConfiguration.UI_HomeMainMenuBackgroundColor;
							}
						}
					});

					$event.currentTarget.style.color = this.uiConfiguration.UI_HomeMainMenuActiveTextColor;
					$event.currentTarget.style.background = this.uiConfiguration.UI_HomeMainMenuActiveBackgroundColor;
				}
				break;

			case 'mouseleave':
				$event.currentTarget.parentElement.childNodes.forEach((element: any) => {
					if (element.nodeName != '#comment') {
						if (element.classList && element.classList.contains('active-menu-item')) {
							element.style.color = this.uiConfiguration.UI_HomeMainMenuActiveTextColor;
							element.style.background = this.uiConfiguration.UI_HomeMainMenuActiveBackgroundColor;
						}
						else {
							element.style.color = this.uiConfiguration.UI_HeaderLinkTextColor;
							element.style.background = this.uiConfiguration.UI_HomeMainMenuBackgroundColor;
						}
					}
				});

				break;
		}
	}

	toggleWithNotification(popover: any) {
		if (popover.isOpen()) {
			popover.close();
		} else {
			popover.open();
		}
	}

	gotoJurisdiction($event: any = null) {
		if ($event && $event.ctrlKey) {
			return;
		}
		this.router.navigate(['/cp/home']);
		this.headerBar = false;
	}

	gotoSetting($event: any = null) {
		if ($event && $event.ctrlKey) {
			return;
		}
		this.router.navigate(['/cp/settings']);
		this.headerBar = false;
	}

	gotoPortal($event: any = null) {
		if ($event) {
			$event.preventDefault();
		}
		this.router.navigate(['/cp/portal']);
		this.headerBar = false;
	}

	gotoMyProject($event: any = null) {
		if ($event && $event.ctrlKey) {
			return;
		}
		this.router.navigate(['/cp/my-projects']);
		this.headerBar = false;
	}

	gotoPendingInspections($event: any = null) {
		if ($event && $event.ctrlKey) {
			return;
		}
		this.router.navigate(['/cp/pending-inspections']);
		this.headerBar = false;
	}

	gotoPendingApplication($event: any = null) {
		if ($event && $event.ctrlKey) {
			return;
		}
		this.router.navigate(['/cp/pending-applications']);
		this.headerBar = false;
	}

	gotoMyRequest($event: any = null) {
		if ($event && $event.ctrlKey) {
			return;
		}
		this.router.navigate(['/cp/pending-solution-center-applications']);
		this.headerBar = false;
	}

	gotoContractorLicenses($event: any = null) {
		if ($event && $event.ctrlKey) {
			return;
		}
		this.router.navigate(['/cp/contractor-licenses']);
		this.headerBar = false;
	}

	gotoContact($event: any = null) {
		if ($event && $event.ctrlKey) {
			return;
		}
		const url = `${this.myGovernmentOnlineOrg}/#contactus`;
		window.open(url, '_blank');
		this.headerBar = false;
	}

	gotoNewAccount($event: any = null) {
		if ($event && $event.ctrlKey) {
			return;
		}
		this.router.navigate(['/cp/info-account']);
		this.headerBar = false;
	}

	gotoLogin($event: any = null) {
		if ($event && $event.ctrlKey) {
			return;
		}
		this.router.navigate(['/cp/login']);
		this.headerBar = false;
	}

	gotoLogout() {
		this.authService.logout(this.userToken).subscribe((res: any) => {
			this.dataCookieService.removeAllCookie();
			this.router.navigate(['/cp/portal']);
			this.headerBar = false;
		});
	}

	toggleSidebar(event: any) {
		event.preventDefault();
		this.headerBar = !this.headerBar;
	}

	setAuthoizedStyles() {
		let userContainer = jQuery('nb-user .user-container');
		if (userContainer && userContainer.length) {
			jQuery(userContainer).children('div.user-picture').css({
				color: this.uiConfiguration.UI_HeaderLinkTextColor,
				border: `1px solid ${this.uiConfiguration.UI_HeaderLinkTextColor}`
			});
			jQuery(userContainer).find('div.info-container>div').css({
				color: this.uiConfiguration.UI_HeaderLinkTextColor
			});

			this.$isAuthorizedUserActionCssSet.next(true);
		}
	}

	setMediaQueryChange(currentBreakpoint: any) {
		this.currentBreakpoint = currentBreakpoint;
		if (this.uiConfiguration.Logo && currentBreakpoint.width > this.breakpointMap.xl) {
			this.showToggleButton = false;
		} else if (!this.uiConfiguration.Logo && currentBreakpoint.width >= this.breakpointMap.lg) {
			this.showToggleButton = false;
		}
		else {
			this.showToggleButton = true;
		}
	}



	onPushNotificationOpen() {
		// direct (scroll) does not work.  may be there is another way to attach scroll event
		const el = document.querySelector(".push-notification .popover-body")!
			.addEventListener("scroll", (event: any) => {

				const scrollTop = event.target.scrollTop;
				const height = event.target.offsetHeight;
				const scrollHeight = event.target.scrollHeight;

				if (scrollTop + height > scrollHeight - 2) {
					this.pushNotificationService.nextPage(this.userID);
				}

			});

		this.MarkAsRead();
	}


	MarkAsRead() {
		let notificationlist = this.pushNotificationService.pushNotificationsItems$.getValue();
		let notificationlistIds = notificationlist.filter((x: any) => !x.isRead).map((x: any) => x.pushNotificationMessageID);
		if (notificationlistIds.length) {
			this.customerPortalHttpRequestService.setMarkAsReadNotifications(notificationlistIds, this.userID, this.userCustomerService.getUserToken()).subscribe(
				(res: any) => {
					if (res > 0) {
						let notificationlist = this.pushNotificationService.pushNotificationsItems$.getValue();
						let notificationItem = null;

						notificationlistIds.forEach((notificationlistId: any) => {
							notificationItem = notificationlist.find((x: any) => x.pushNotificationMessageID == notificationlistId);
							if (notificationItem) {
								notificationItem.isRead = true;
							}
						})

						this.pushNotificationService.pushNotificationsItems$.next(notificationlist);

						this.pushNotificationService.reset();

					}
				},
				(error: any) => {
					this.frameService.hideLoader();
				}
			);
		}
	}


	viewNotification(notificationItem: any) {
		if (!notificationItem.isActionTriggered && notificationItem.pushNotificationMessageID > 0) {
			this.customerPortalHttpRequestService.setMarkAsActionTriggered(notificationItem.pushNotificationMessageID, this.userID, this.userCustomerService.getUserToken()).subscribe(
				(res: any) => {
					if (res) {
						let notificationlist = this.pushNotificationService.pushNotificationsItems$.getValue();
						let notificationItemIndex = notificationlist.findIndex((x: any) => x.pushNotificationMessageID == notificationItem.pushNotificationMessageID);
						if (notificationItemIndex > -1) {
							notificationItem.isActionTriggered = true;
							notificationlist[notificationItemIndex] = notificationItem;
							this.pushNotificationService.pushNotificationsItems$.next(notificationlist);
						}
						this.getApplicationUIDByApplicationID(notificationItem);
					}
				},
				(error: any) => {
					this.frameService.hideLoader();
				});
		}
		else {
			this.getApplicationUIDByApplicationID(notificationItem);
		}
	}

	getApplicationUIDByApplicationID(notificationItem: any) {
		const id = notificationItem.entityID || notificationItem.workOrderID;

		switch (notificationItem.entityType) {
			case 'ApplicationCP': {
				this.customerPortalHttpRequestService.getApplicationUIDByApplicationID(id, this.userCustomerService.getUserToken()).subscribe(
					(res: any) => {
						if (res && res.applicationUID) {
							this.router.navigate(['/cp/application-details', res.applicationUID])
						}
					},
					(error: any) => {
						this.frameService.hideLoader();
					}
				);
			}
				break;
			case 'ApplicationCommentCP': {
				this.customerPortalHttpRequestService.getApplicationUIDByCommentID(id, this.userID, this.userCustomerService.getUserToken()).subscribe(
					(res: any) => {
						if (res && res.data.uuID) {
							this.router.navigate(['/cp/application-details', res.data.uuID])
						}
					},
					(error: any) => {
						this.frameService.hideLoader();
					}
				);
				break;
			}
		}
	}
}