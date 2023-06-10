import { Component, HostBinding, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { fromEvent, Subscription } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, share, throttleTime } from 'rxjs/operators';
// import { MenuService } from './menu.service';
import { APP_ROUTES } from "../../@routes";
import { VisibilityState, Direction, Animations } from "../../@animation/animations";


@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
	animations: [Animations.menu]
})

export class MenuComponent {
	routes: any = APP_ROUTES;
	subscription: Subscription[] = [];
	lastScroll = 0;
	loginMenu = [
		{ title: "Home", path: APP_ROUTES.login, isExternal: false },
		{ title: "Products", path: APP_ROUTES.products, isExternal: false },
		{ title: "Partnership", path: `${environment.myGovernmentOnlineOrg}/partnership/`, isExternal: true },
		{ title: "Contact", path: `${environment.myGovernmentOnlineOrg}/#contactus`, isExternal: true },
	];
	route!: string;
	logoWidth: number = 700;
	logoheight: number = 67;
	hamburgerIconWidth: number = 40;
	hamburgerIconHeight: number = 40;
	private isVisible = true;

	constructor(private router: Router) {
		this.onWindowResize();
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

	@HostBinding('@toggle')
	get toggle(): VisibilityState {
		return this.isVisible ? VisibilityState.Visible : VisibilityState.Hidden;
	}

	ngAfterViewInit() {
		const scroll$ = fromEvent(window, 'scroll').pipe(
			throttleTime(10),
			map(() => window.pageYOffset),
			pairwise(),
			map(([y1, y2]): Direction => (y2 < y1 ? Direction.Up : Direction.Down)),
			distinctUntilChanged(),
			share()
		);

		const goingUp$ = scroll$.pipe(
			filter(direction => direction === Direction.Up)
		);

		const goingDown$ = scroll$.pipe(
			filter(direction => direction === Direction.Down)
		);

		goingUp$.subscribe(() => (this.isVisible = true));
		goingDown$.subscribe(() => (this.isVisible = false));
	}

	ngOnDestroy() {
		this.subscription.forEach(item => item.unsubscribe());
		this.subscription = [];
	}
}