import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
// import { NB_DOCUMENT } from '@nebular/theme';
import { DOCUMENT } from '@angular/common';
import { FrameService } from '../../@core/mock/frame.service';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';
import { filter } from 'rxjs/operators';
import { API_Routes, APP_ROUTES } from '../../@routes';
import { uiDefaultConfiguration } from '../../@constants/cp-default-constant-values';
import { CustomerHttpHandlerService } from '../services/customer-http-handler.service';
// import { PlanningAndZoningService } from '../services/planning-and-zoning.service';
import { UserCustomerService } from '../services/user-customer.service';
import { HttpHandlerService } from '../../@core/http/http-handler.service';
import { DataLocalService } from '../services/data-local.service';
import { Subscription } from 'rxjs';
// declare const jQuery: any;

@Component({
	selector: 'app-page-cp',
	templateUrl: './page-cp.component.html',
	styleUrls: ['./page-cp.component.scss']
})

export class PageCpComponent implements OnInit {
	myGovernmentOnlineOrg = environment.myGovernmentOnlineOrg;
	loading: boolean = false;
	toastObj: any;
	private readonly document!: Document;
	selectedJurisdictionID = null;
	layoutContainerHtmlComponent = null;
	layoutContainerHtmlComponentTimeIntervalObj = null;
	uiConfiguration: any = uiDefaultConfiguration;
	currentUIHeaderHeight = null;
	selectedProjectTypeID = null;
	selectedApplicationID = null;
	queryParams = null;
	selectedProject = null;
	addToExisting = null;
	userToken!: string;
	sectionID = 1;
	isHomePageOnly: boolean = false;
	backgroundImageUrl: string = '';
	private subscription: Subscription = new Subscription();
	
	constructor(
		private frameService: FrameService,
		private readonly customerHttpHandlerService: CustomerHttpHandlerService,
		private readonly messageService: MessageService,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
		private readonly dataLocalService: DataLocalService,
		// private readonly planningAndZoningService: PlanningAndZoningService,
		private readonly usercpService: UserCustomerService,
		@Inject(DOCUMENT) document: Document,
		private httpService: HttpHandlerService) { }

	ngOnInit() {
		this.userToken = this.usercpService.getUserToken();
		let jurisdictionID = null;
		// this.isHomePageOnly = this.activatedRoute.snapshot?['_routerState'].url == '/cp/portal';
		this.isHomePageOnly = this.router.url == `${APP_ROUTES.cp}/${APP_ROUTES.portal}`;
		this.activatedRoute.queryParams.subscribe((params: any) => {
			this.queryParams = params;
			if (params.JID || params.jid) {
				jurisdictionID = params.JID || params.jid;
			}
			else {
				const cpJurisdictionID = localStorage.getItem('CPJurisdictionID');
				jurisdictionID = cpJurisdictionID ? parseInt(cpJurisdictionID) : null;
			}

			if (params.PID || params.pid) {
				this.selectedProjectTypeID = params.PID || params.pid;
			}
			if (params.AID || params.aid) {
				this.selectedApplicationID = params.AID || params.aid;
			}

			if (params.addToExisting || params.AddToExisting || params.addtoexisting) {
				this.addToExisting = params.addToExisting || params.AddToExisting || params.addtoexisting;
			}

			if (params.CPSectionID || params.CpSectionID || params.cpsectionid) {
				this.sectionID = params.CPSectionID || params.CpSectionID || params.cpsectionid;
			}

			if (Object.keys(params).length)
				this.dataLocalService.routeQueryParams.next(params);

			if (jurisdictionID && this.selectedJurisdictionID != jurisdictionID) {
				this.selectedJurisdictionID = jurisdictionID;
				this.getJurisdictionByID(this.selectedJurisdictionID);
				// this.getJurisdictionUIConfiguration();
			} else if (Object.keys(params).length && (params.AID || params.aid)) {
				//  this.navigateToUrl();
			}
		})

		this.frameService.setUIConfiguration(uiDefaultConfiguration);
		this.frameService.loader$.subscribe((data) => {
			this.loading = data;
		});

		const toastSubs = this.frameService.toast$.subscribe((toast) => {
			if (toast) {
				if (toast.destroyAll) {
					this.messageService.clear();
				}
				else {
					this.toastObj = toast;
					this.messageService.clear();
					if (toast.sticky) {
						this.messageService.add({ key: 'toast', closable: toast.closable, severity: toast.severity, summary: toast.summary, detail: toast.message, sticky: toast.sticky });
					}
					else {
						this.messageService.add({ key: 'toast', closable: false, life: toast.duration, severity: toast.severity, summary: toast.summary, detail: toast.message });
					}
				}
			}
		});
		this.subscription.add(toastSubs);

		this.frameService.uiConfiguration$.subscribe((data) => {
			this.uiConfiguration = data;

			if (!this.uiConfiguration.BackgroundImageUrl) {
				this.backgroundImageUrl = ''; //this.mgoDefaultBGImageUrl;
			}
			else {
				this.backgroundImageUrl = this.uiConfiguration.BackgroundImageUrl;
			}

			if (!this.isHomePageOnly) {
				this.backgroundImageUrl = '';
			}

			// jQuery('nb-layout-header.custom-style > nav').attr('style', `height: ${this.uiConfiguration.UI_HeaderHeight} !important;`);
			this.currentUIHeaderHeight = this.uiConfiguration.UI_HeaderHeight;
		});

		this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe(event => {
			// this.isHomePageOnly = this.activatedRoute.snapshot['_routerState'].url == '/cp/portal';
			this.isHomePageOnly = this.router.url == `${APP_ROUTES.cp}/${APP_ROUTES.portal}`;

			if (!this.uiConfiguration.BackgroundImageUrl) {
				// this.backgroundImageUrl = this.mgoDefaultBGImageUrl;
			}
			else {
				this.backgroundImageUrl = this.uiConfiguration.BackgroundImageUrl;
			}

			if (!this.isHomePageOnly) {
				this.backgroundImageUrl = '';
			}
		});
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	// ngAfterViewInit() {
	// 	if (!this.document) {
	// 		return;
	// 	}

	// 	if (!this.layoutContainerHtmlComponent) {
	// 		let layoutContainer = this.document.getElementsByClassName('layout-container');
	// 		if (layoutContainer.length) {
	// 			this.layoutContainerHtmlComponent = layoutContainer[0];
	// 			if (this.uiConfiguration && this.uiConfiguration.UI_HeaderHeight) {
	// 				jQuery('nb-layout-header.custom-style > nav').attr('style', `height: ${this.uiConfiguration.UI_HeaderHeight} !important;`);
	// 			}
	// 		}
	// 		else {
	// 			this.layoutContainerHtmlComponentTimeIntervalObj = setInterval(() => {
	// 				let layoutContainer = this.document.getElementsByClassName('layout-container');
	// 				if (layoutContainer.length) {
	// 					this.layoutContainerHtmlComponent = layoutContainer[0];
	// 					clearInterval(this.layoutContainerHtmlComponentTimeIntervalObj);
	// 					if (this.uiConfiguration && this.uiConfiguration.UI_HeaderHeight) {
	// 						jQuery('nb-layout-header.custom-style > nav').attr('style', `height: ${this.uiConfiguration.UI_HeaderHeight} !important;`);
	// 					}
	// 				}
	// 			}, 1000)
	// 		}
	// 	}
	// }

	// ngOnDestroy() {
	// 	this.layoutContainerHtmlComponent = null;
	// 	if (this.layoutContainerHtmlComponentTimeIntervalObj)
	// 		clearInterval(this.layoutContainerHtmlComponentTimeIntervalObj);
	// }

	getJurisdictionUIConfiguration() {
		console.log("getJurisdictionUIConfiguration")
		// this.frameService.showLoader();
		this.httpService.get(`${API_Routes.getJurisdictionUIConfiguration}` + this.selectedJurisdictionID).subscribe({
			next: (res: any) => {
				if (res[0] && res[0].ID) {
					try {
						if (res[0].Footer1Part1LinkJsonContent) {
							res[0].Footer1Part1LinkJsonContent = JSON.parse(res[0].Footer1Part1LinkJsonContent);
						}

						if (res[0].Footer1Part2LinkJsonContent) {
							res[0].Footer1Part2LinkJsonContent = JSON.parse(res[0].Footer1Part2LinkJsonContent);
						}
					}
					catch (err) {
						console.log(err);
					}
					this.frameService.setUIConfiguration(res[0] && res[0].ID ? res[0] : uiDefaultConfiguration);
				}
				// this.frameService.hideLoader();
			},
			error: (error: any) => {
				// this.frameService.hideLoader();
				this.frameService.showToastPrime('Error!', 'An error ocurred while fetching the Jurisdiction UI Configuration.', 'error', 4000);
			}
		});
		// this.customerPortalHttpRequestService.getCPJurisdictionUIConfiguration(this.selectedJurisdictionID).subscribe(
		// 	(res: any) => {
		// 		if (res[0] && res[0].ID) {
		// 			try {
		// 				if (res[0].Footer1Part1LinkJsonContent) {
		// 					res[0].Footer1Part1LinkJsonContent = JSON.parse(res[0].Footer1Part1LinkJsonContent);
		// 				}

		// 				if (res[0].Footer1Part2LinkJsonContent) {
		// 					res[0].Footer1Part2LinkJsonContent = JSON.parse(res[0].Footer1Part2LinkJsonContent);
		// 				}
		// 			}
		// 			catch (err) {

		// 			}

		// 			this.frameService.setUIConfiguration(res[0] && res[0].ID ? res[0] : uiDefaultConfiguration);
		// 		}
		// 		// this.frameService.hideLoader();
		// 	},
		// 	(error: any) => {
		// 		// this.frameService.hideLoader();
		// 		this.frameService.showToastPrime('Error!', 'An error ocurred while fetching the Jurisdiction UI Configuration.', 'error', 4000);
		// 	}
		// );
	}

	getJurisdictionByID(jurisdictionID: any) {
		this.customerHttpHandlerService.getWithoutAuthToken(`${API_Routes.getJurisdictionByID}` + jurisdictionID, this.userToken).subscribe({
			next: (apiResponse: any) => {
				localStorage.setItem('CPJurisdiction', apiResponse.Jurisdiction);
				localStorage.setItem('CPJurisdictionID', apiResponse.JurisdictionID);
				localStorage.setItem('CPState', apiResponse.StateID);
				localStorage.setItem('CPStateName', apiResponse.StateID);
				this.dataLocalService.changeJurisdictionName.next(apiResponse.Jurisdiction);
				this.dataLocalService.selectedJurisdiction.next(apiResponse);
				// this.navigateToUrl();
			},
			error: (error: any) => this.frameService.showToastPrime('Error!', 'An error ocurred while fetching the Jurisdiction.', 'error', 4000)
		})
		// this.customerPortalHttpRequestService.getJurisdictionByID(this.usercpService.getUserToken(), jurisdictionID).subscribe(
		// 	(apiResponse: any) => {
		// 		localStorage.setItem('CPJurisdiction', apiResponse.Jurisdiction);
		// 		localStorage.setItem('CPJurisdictionID', apiResponse.JurisdictionID);
		// 		localStorage.setItem('CPState', apiResponse.StateID);
		// 		localStorage.setItem('CPStateName', apiResponse.StateID);
		// 		this.dataLocalService.changeJurisdictionName.next(apiResponse.Jurisdiction);
		// 		this.dataLocalService.selectedJurisdiction.next(apiResponse);
		// 		// this.navigateToUrl();
		// 	}, (error: any) => {
		// 		this.frameService.showToastPrime('Error!', 'An error ocurred while fetching the Jurisdiction.', 'error', 4000);
		// 	}
		// );
	}

	// private navigateToUrl() {
	// 	if (this.selectedApplicationID && this.selectedApplicationID > 0 && this.selectedProjectTypeID && this.selectedJurisdictionID) {
	// 		this.customerPortalHttpRequestService.getApplicationTypeInfoByApplicationTypeID(this.usercpService.getUserToken(),
	// 			{
	// 				JurisdictionID: this.selectedJurisdictionID,
	// 				ApplicationTypeID: this.selectedApplicationID,
	// 				ProjectTypeID: this.selectedProjectTypeID,
	// 				// IsNewApplication: true,
	// 				// IsAddToExisting: false
	// 			})
	// 			.subscribe((applicationTypeData: any) => {
	// 				if (applicationTypeData) {
	// 					if (applicationTypeData.FileInstructions) {
	// 						applicationTypeData.FileInstructions.forEach(element => {
	// 							element.DescriptionFormated = element.Description.replace(/<\/?[^>]+(>|$)/g, " ").trim();
	// 						});
	// 					}
	// 					let applicationType = { ...applicationTypeData };
	// 					delete applicationType.SSRSApplicationDocument;
	// 					delete applicationType.SSRSDocument;
	// 					delete applicationType.RenewableDescription;
	// 					delete applicationType.CreateDate;
	// 					delete applicationType.CreateByID;
	// 					applicationType.PGData = this.queryParams;
	// 					applicationType.AddToExisting = false;
	// 					applicationType.IsApplicationRestricted = false;
	// 					applicationType.SectionID = this.sectionID;
	// 					this.router.navigate(['/cp/application-wizard'], {
	// 						queryParams: {
	// 							query: encodeURI(JSON.stringify(applicationType))
	// 						}
	// 					});
	// 				}
	// 				else {
	// 					this.router.navigate(['/cp/project-type-details/', this.selectedProjectTypeID], { queryParams: { SectionID: this.sectionID } });
	// 				}
	// 			}, err => {
	// 				if (err.status == 401) {
	// 					sessionStorage.setItem('raw-state-url-cp', this.activatedRoute.snapshot['_routerState'].url);
	// 					this.router.navigate(['/cp/login']);
	// 					return false;
	// 				}
	// 				else {
	// 					this.router.navigate(['/cp/project-type-details/', this.selectedProjectTypeID], { queryParams: { SectionID: this.sectionID } });
	// 				}
	// 			})
	// 	}
	// 	else if (this.selectedProjectTypeID > 0 && this.selectedJurisdictionID > 0) {
	// 		this.customerPortalHttpRequestService.getProjectTypesByApplicationTypes(this.userToken, this.selectedJurisdictionID, this.sectionID)
	// 			.subscribe((res: any) => {
	// 				this.selectedProject = res.find(x => x.ProjectTypeID == this.selectedProjectTypeID);
	// 				if (this.selectedProject && this.selectedProjectTypeID && this.selectedJurisdictionID && this.addToExisting == "true") {
	// 					this.router.navigate(['/cp/project-type-details/', this.selectedProjectTypeID],
	// 						{
	// 							queryParams: {
	// 								IsApplicationRestricted: this.selectedProject.IsApplicationRestricted, SectionID: this.sectionID,
	// 								AddToExisting: this.addToExisting
	// 							}, state: { forceLogin: true }
	// 						});
	// 				}
	// 				else if (this.selectedProjectTypeID && this.selectedJurisdictionID) {
	// 					this.router.navigate(['/cp/project-type-details/', this.selectedProjectTypeID], { queryParams: { IsApplicationRestricted: this.selectedProject?.IsApplicationRestricted, SectionID: this.sectionID } });
	// 				}
	// 				else if (this.selectedJurisdictionID && Object.keys(this.queryParams).length && (this.queryParams.JID || this.queryParams.jid)) {
	// 					this.router.navigate(['/cp/portal']);
	// 				}
	// 			}, err => {
	// 				this.frameService.showToastPrime('Error!', 'An error ocurred while fetching the project type details.', 'error', 4000);
	// 			});
	// 	}
	// 	else if (this.selectedJurisdictionID && Object.keys(this.queryParams).length && this.sectionID) {
	// 		this.router.navigate(['/cp/project-type'], { queryParams: { SectionID: this.sectionID } });
	// 	}
	// 	else if (this.selectedJurisdictionID && (Object.keys(this.queryParams).length == 0 || !(this.queryParams.JID || this.queryParams.jid))) {
	// 		this.router.navigate(['/cp/portal']);
	// 	}
	// 	else {
	// 		this.router.navigate(['/cp/portal']);
	// 	}
	// 	return;
	// }
}
