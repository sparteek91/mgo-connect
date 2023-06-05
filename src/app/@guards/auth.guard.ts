import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Auth } from "aws-amplify";
import { Observable } from 'rxjs';
import { UserService } from '../@core/mock/users.service';
// import { HttpHandlerService } from '..//@core/http/http-handler.service';
import { AuthHandlerService } from '../@core/http/auth-handler.service';
import { API_Routes, APP_ROUTES } from "../@routes";
// import { FrameService } from 'app/@core/mock/frame.service';

@Injectable()

export class AuthGuard {

	// private frameService: FrameService
	constructor(private _router: Router, private authService: AuthHandlerService, private userService: UserService) { }

	canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
		// Auth.currentAuthenticatedUser()
		return Auth.currentAuthenticatedUser().then(async (user: any) => {
			const endPoint: string = `${API_Routes.cognitoUser + user.username}`;
			const dbUser = await this.authService.getLoggedInUser(endPoint).toPromise();
			this.userService.saveLoggedInUser(dbUser);
			// this.prepWorkOrdersOffline(dbUser);
			return true;

		}).catch(() => {
			sessionStorage.setItem('raw-state-url', state.url);
			this._router.navigate(['/auth/login']);
			return false;
		});
	}

	// async prepWorkOrdersOffline(loggedInUser: any) {
	// 	let dateToday = this.frameService.formatDate(new Date());
	// 	let selectedInspector = loggedInUser.UserID.toString();
	// 	await this.httpService.prepWorkOrdersForOffline(dateToday, dateToday, selectedInspector).subscribe(
	// 		(res: any) => {
	// 			localStorage.setItem('offlineWorkOrders', JSON.stringify(res));
	// 		},
	// 		error => {
	// 			this.frameService.showToastPrime('Error!', 'An error ocurred while fetching work orders.', 'error', 4000);
	// 		});
	// }
}