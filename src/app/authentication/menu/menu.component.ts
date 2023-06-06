import { Component } from '@angular/core';
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
		{ title: "Home", path: APP_ROUTES.root, isExternal: false },
		{ title: "Products", path: APP_ROUTES.products, isExternal: false },
		{ title: "Partnership", path: `${environment.myGovernmentOnlineOrg}/partnership/`, isExternal: true },
		{ title: "Contact", path: APP_ROUTES.products, isExternal: false},
	];
	route!: string;
	toggleMenu: boolean = false;

	constructor(private router: Router, private menuService: MenuService) {
		this.subscription.push(
			this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
				this.route = event.url;
				// if (event.url.includes('/auth/products')) {
				// 	this.activeItem = menuItems.products;
				// } else if (event.url.includes('/auth/login')) {
				// 	this.activeItem = menuItems.home;
				// }
				this.removeClass();
			})
		);
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