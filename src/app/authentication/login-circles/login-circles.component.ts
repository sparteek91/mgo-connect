import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { APP_ROUTES } from '../../@routes';

const PAGES = {
	LANDMANAGEMENT: 'landManagement',
	ASSETS: 'assetsAndCmms',
	COMMUNITYENGAGEMENT: 'communityEngagement',
	PERMITSLICENSING: 'permitsLicensing',
	MORE: 'morePage'
}

@Component({
	selector: 'app-login-circles',
	templateUrl: './login-circles.component.html',
	styleUrls: ['./login-circles.component.scss']
})

export class LoginCirclesComponent implements AfterViewInit {
	constructor(private router: Router) { }

	ngAfterViewInit(): void {
		Object.values(PAGES).forEach((id) => {
			// document.getElementById(id)?.addEventListener('click', () => {
			// 	this.clickEvent(id);
			// });

			document.querySelector(`.${id}`)?.addEventListener('click', () => {
				this.clickEvent(id);
			});
		});
	}

	clickEvent(id: string) {
		switch (id) {
			case PAGES.LANDMANAGEMENT:
				this.router.navigate([`/${APP_ROUTES.auth}/${APP_ROUTES.products}`], { state: { data: 'landManagement' } });
				break;
			case PAGES.ASSETS:
				this.router.navigate([`/${APP_ROUTES.auth}/${APP_ROUTES.products}`], { state: { data: 'assets' } });
				break;
			case PAGES.COMMUNITYENGAGEMENT:
				this.router.navigate([`/${APP_ROUTES.auth}/${APP_ROUTES.products}`], { state: { data: 'engagement' } });
				break;
			case PAGES.MORE:
				this.router.navigate([`/${APP_ROUTES.auth}/${APP_ROUTES.products}`], { state: { data: 'more' } });
				break;
			case PAGES.PERMITSLICENSING:
				this.router.navigate([`/${APP_ROUTES.auth}/${APP_ROUTES.products}`], { state: { data: 'permits' } });
				break;
		}
	}
}