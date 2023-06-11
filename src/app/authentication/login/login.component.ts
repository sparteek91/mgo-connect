import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FrameService } from '../../@core/mock/frame.service';
import { UserService } from '../../@core/mock/users.service';
import { Auth, Hub } from 'aws-amplify';
import { HttpHandlerService } from '../../@core/http/http-handler.service';
import { AuthHandlerService } from "../../@core/http/auth-handler.service";
import { API_Routes, APP_ROUTES } from '../../@routes';

@Component({
	selector: 'ngx-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
	shouldRenderLoginPage!: boolean;
	routes: any = APP_ROUTES;

	constructor(public route: ActivatedRoute, private router: Router, userService: UserService, private httpService: HttpHandlerService, private authService: AuthHandlerService, private frameService: FrameService) {
		Hub.listen("auth", ({ payload: { event, data } }) => {
			switch (event) {
				case "signIn":
					// signin actions
					Auth.currentSession().then(user => {
						this.authService.getLoggedInUser(`${API_Routes.cognitoUser + data.username}`).subscribe((data: any) => {
							userService.saveLoggedInUser(data);
							this.prepWorkOrdersOffline(data);
							this.redirectToLandingPage(user);
						})
					}); // redirect to default page
				// case "signOut":
				// signout actions, redirect to '/' etc
				// case "customOAuthState":
				// other changes
			}
		});
	}

	ngOnInit(): void {
		Auth.currentSession().then((user: any) => {
			console.log("user", user);
			this.redirectToLandingPage(user)
		}).catch((err) => this.shouldRenderLoginPage = true);
	}

	ngOnDestroy(): void { }

	async onSubmit(): Promise<any> {
		await Auth.federatedSignIn()
	}

	private redirectToLandingPage(user: any): void {
		let queryParams = sessionStorage.getItem('raw-state-url');
		if (queryParams) {
			sessionStorage.removeItem('raw-state-url');
			this.router.navigate([queryParams]);
			return;
		}
		const uid = user.getIdToken().decodePayload().sub;
		this.authService.getLoggedInUser(`${API_Routes.cognitoUser + uid}`).subscribe((data: any) => {
			if (data.MGOConnectDefaultPage != null && data.MGOConnectDefaultPage != "") {
				this.router.navigate([data.MGOConnectDefaultPage]);
			}
			else this.router.navigate([`${APP_ROUTES.mgo}/${APP_ROUTES.projectmanager}`]);
		}
		);
	}

	private async prepWorkOrdersOffline(loggedInUser: any): Promise<any> {
		let dateToday = this.frameService.formatDate(new Date());
		let selectedInspector = loggedInUser.UserID.toString();
		const endPoint: string = this.httpService.formUrlParam(`${API_Routes.prepoffline + selectedInspector}`, { Start: dateToday, End: dateToday });
		this.httpService.get(endPoint, "WorkOrderOffline", true).subscribe((res: any) => {
			localStorage.setItem('offlineWorkOrders', JSON.stringify(res));
		}, (error: any) => {
			this.frameService.showToastPrime('Error!', 'An error ocurred while fetching work orders.', 'error', 4000);
		});
	}
}