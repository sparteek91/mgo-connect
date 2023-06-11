import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AuthHandlerService } from "../@core/http/auth-handler.service";
import { HttpHandlerService } from "../@core/http/http-handler.service"
import { FrameService } from "../@core/mock/frame.service";
import { UserService } from "../@core/mock/users.service";
import { Auth } from "aws-amplify";
import { API_Routes, APP_ROUTES } from "../@routes";

@Injectable()

export class LoggedInAuthGuard {

	constructor(private router: Router, private authService: AuthHandlerService, private userService: UserService, private frameService: FrameService, private httpService: HttpHandlerService) { }

	async canActivate(): Promise<boolean | any> {
		const user = await Auth.currentUserInfo();
		if (user == null) {
			return true;
		}
		else {
			const endPoint: string = `${API_Routes.cognitoUser + user.username}`;
			this.authService.getLoggedInUser(endPoint).subscribe((data: any) => {
				this.userService.saveLoggedInUser(data);
				// this.prepWorkOrdersOffline(data);
				this.redirectToLandingPage(data);
				return false;
			});
		}
	}

	async prepWorkOrdersOffline(loggedInUser: any) {
		const dateToday = this.frameService.formatDate(new Date());
		const endPoint: string = this.httpService.formUrlParam(`${API_Routes.prepoffline + loggedInUser.UserID.toString()}`, {Start: dateToday, End: dateToday});
		this.httpService.get(endPoint, "WorkOrderOffline", true).subscribe((res: any) => {
			localStorage.setItem('offlineWorkOrders', JSON.stringify(res));
		}, (error: any) => {
			this.frameService.showToastPrime('Error!', 'An error ocurred while fetching work orders.', 'error', 4000);
		});
	}

	redirectToLandingPage(data: any) {
		let rawStateUrl = sessionStorage.getItem('raw-state-url');
		if (rawStateUrl) {
			sessionStorage.removeItem('raw-state-url');
			let urlQueryParams = rawStateUrl.split('?');
			if (urlQueryParams.length == 1)
				this.router.navigate([urlQueryParams[0]]);
			else this.router.navigate([urlQueryParams[0]], { queryParams: this.frameService.parseQuery(urlQueryParams[1]) });
			return;
		}
		if (data.MGOConnectDefaultPage != null && data.MGOConnectDefaultPage != "") {
			this.router.navigate([data.MGOConnectDefaultPage]);
		} else {
			this.router.navigate([`${APP_ROUTES.mgo}/${APP_ROUTES.projectmanager}`]);
		}
	}
}