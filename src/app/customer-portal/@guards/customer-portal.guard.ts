import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';
import { UserCustomerService } from '../services/user-customer.service';

@Injectable()

export class CustomerPortalGuard {
	userToken!: string;

	constructor(
		private userCustomerService: UserCustomerService,
		private cookieService: CookieService,
		private router: Router
	) {
		this.userToken = this.userCustomerService.getUserToken();
	}

	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		const routerExtraState = this.router.getCurrentNavigation()!.extras.state;
		if (routerExtraState && routerExtraState['allowAnonymous']) {
			return true;
		}

		const isLogged = this.cookieService.get('MGIsLogged');

		if (isLogged == 'true') {
			return true;
		} else {
			sessionStorage.setItem('raw-state-url-cp', state.url);
			this.router.navigate(['/cp/login']);
			return false;
		}
	}
}