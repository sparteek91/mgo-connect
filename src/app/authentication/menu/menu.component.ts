import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { fromEvent, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { MenuService } from './menu.service';
import { APP_ROUTES } from "../../@routes";

// enum menuItems {
// 	home = 'Home',
// 	products = 'Products',
// 	partnership = 'Partnership',
// 	contact = 'Contact'
// }

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})

export class MenuComponent {
	routes: any = APP_ROUTES;
	subscription: Subscription[] = [];
	lastScroll = 0;
	// activeItem: menuItems = menuItems.home;
	loginMenu = [
		{ title: "Home", path: APP_ROUTES.login, isExternal: false },
		{ title: "Products", path: APP_ROUTES.products, isExternal: false },
		{ title: "Partnership", path: `${environment.myGovernmentOnlineOrg}/partnership/`, isExternal: true },
		{ title: "Contact", path: `${environment.myGovernmentOnlineOrg}/#contactus`, isExternal: true },
	];
	route!: string;
	toggleMenu: boolean = false;
	logoWidth: number = 700;
	logoheight: number = 67;
	hamburgerIconWidth: number = 40;
	hamburgerIconHeight: number = 40;

	constructor(private router: Router, private cdr: ChangeDetectorRef) {
		this.onWindowResize();
		this.subscription.push(
			this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
				this.route = event.url;
				console.log(this.route);
				// if (event.url.includes('/auth/products')) {
				// 	this.activeItem = menuItems.products;
				// } else if (event.url.includes('/auth/login')) {
				// 	this.activeItem = menuItems.home;
				// }
				// this.removeClass();
			})
		);
	}

	@HostListener('window:resize', ['$event'])
	onWindowResize() {
		if (window.innerWidth < 998 && window.innerWidth >= 665) {
			this.logoWidth = 500;
			this.logoheight = 48;
		} else if (window.innerWidth < 665 && window.innerWidth >= 540) {
			this.logoWidth = 400;
			this.logoheight = 38;
		} else if (window.innerWidth < 540 && window.innerWidth >= 435) {
			this.logoWidth = 300;
			this.logoheight = 29;
			this.hamburgerIconWidth = 30;
			this.hamburgerIconHeight = 30;
		} else if (window.innerWidth < 435 && window.innerWidth >= 390) {
			this.logoWidth = 250;
			this.logoheight = 24;
			this.hamburgerIconWidth = 30;
			this.hamburgerIconHeight = 30;
		} else if (window.innerWidth < 390 && window.innerWidth >= 375) {
			this.logoWidth = 250;
			this.logoheight = 24;
			this.hamburgerIconWidth = 30;
			this.hamburgerIconHeight = 30;
		} else if (window.innerWidth < 375 && window.innerWidth >= 320) {
			this.logoWidth = 225;
			this.logoheight = 22;
			this.hamburgerIconWidth = 28;
			this.hamburgerIconHeight = 28;
		}
	}

	// onMenuClick(item: string): void {
	// 	switch (item) {
	// 		case menuItems.contact:
	// 			this.menuService.setFragment('contactUs');
	// 			this.router.navigate(['/auth/products'], { state: { data: 'contactUs' } });
	// 			break;
	// 		case menuItems.partnership:
	// 			window.open(`${environment.myGovernmentOnlineOrg}/partnership/`, '_blank')
	// 			break;
	// 		case menuItems.products:
	// 			this.activeItem = item;

	// 			this.menuService.setFragment('');
	// 			this.router.navigate(['/auth/products']);
	// 			break;
	// 		case menuItems.home:
	// 			this.activeItem = item;

	// 			this.router.navigate(['/auth/login']);
	// 			break;
	// 	}
	// }

	toggleMenuAction(): void {
		this.toggleMenu = !this.toggleMenu;
		this.cdr.markForCheck();
	}

	ngAfterViewInit() {
		const element: any = document.querySelector('.scrollable-container');
		this.subscription.push(
			fromEvent(element, 'scroll').subscribe(e => {
				if (window.innerWidth > 991) {
					this.handleScroll(element);
				}
			})
		);
	}

	handleScroll(scrollableElement: any) {
		const menu = document.querySelector('.menu');
		const scrollUp = 'scroll-up';
		const scrollDown = 'scroll-down';

		const currentScroll = scrollableElement.scrollTop;
		if (currentScroll <= 0) {
			menu?.classList.remove(scrollUp);
			return;
		}

		if (currentScroll > this.lastScroll && !menu?.classList.contains(scrollDown)) {
			// down
			menu?.classList.remove(scrollUp);
			menu?.classList.add(scrollDown);
		} else if (
			currentScroll < this.lastScroll &&
			menu?.classList.contains(scrollDown)
		) {
			// up
			menu?.classList.remove(scrollDown);
			menu?.classList.add(scrollUp);
		}
		this.lastScroll = currentScroll;
	}

	removeClass() {
		const menu = document.querySelector('.menu');
		const scrollDown = 'scroll-down';
		const scrollUp = 'scroll-up';

		if (menu?.classList) {
			menu?.classList.remove(scrollDown);
			menu?.classList.remove(scrollUp);
		}
	}

	ngOnDestroy() {
		this.subscription.forEach(item => item.unsubscribe());
		this.subscription = [];
	}
}