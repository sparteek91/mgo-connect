import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FrameService } from '../../@core/mock/frame.service';
import { UserService } from '../../@core/mock/users.service';
import { Auth, Hub } from 'aws-amplify';
import { HttpHandlerService } from '../../@core/http/http-handler.service';
import { AuthHandlerService } from "../../@core/http/auth-handler.service";
import { DataLocalService } from '../../customer-portal/services/data-local.service';
import { API_Routes } from '../../@routes';

@Component({
	selector: 'ngx-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	providers: [DataLocalService]
})

export class LoginComponent implements OnInit, OnDestroy {
	passwordChanged = false;
	accountDisabled = false;
	form!: FormGroup;
	loginError = null;
	formModel = {
		UserName: '',
		Password: ''
	};
	shouldRenderLoginPage!: boolean;
	jurisdictionForm!: FormGroup;
	allDataJurisdiction: any;
	jurisdictions: any;
	states: any;
	countries: any[] = [];

	constructor(
		private router: Router,
		private fb: FormBuilder,
		userService: UserService,
		private httpService: HttpHandlerService,
		private authService: AuthHandlerService,
		private frameService: FrameService,
		private dataLocalService: DataLocalService
	) {
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
		this.getStateAndJurisdiction();
		this.initForm();
		this.countries.push({ label: 'US', value: 1 });
		this.jurisdictionForm.controls['selectedCountry'].setValue(1);
	}

	ngOnDestroy(): void {
		this.accountDisabled = false;
		this.passwordChanged = false;
	}

	private initForm(): void {
		this.jurisdictionForm = this.fb.group({
			State: ['', Validators.required],
			Jurisdiction: ['', Validators.required],
			selectedCountry: ''
		});
	}

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
			else this.router.navigate(['mgo/projectmanager']);
		}
		);
	}

	navigateForgotPass() {
		this.router.navigate(['/auth/forgotPassword']);
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

	gotoCpPortal(): void {
		this.router.navigate(['/cp/home']);
	}

	onChangeState(event: any): void {
		this.getDataJurisdictionByStateId(event.value.StateID);
	}

	private getStateAndJurisdiction(): void {
		const urls: any[] = [
			{ path: `${API_Routes.getStates}/-`, flag: '', isAuth: false },
			{ path: `${API_Routes.getJurisdictions}/-`, flag: '', isAuth: false },
		];
		this.httpService.forkJoin(urls).subscribe(res => {
			if (res.length) {
				this.states = res[0];
				this.allDataJurisdiction = res[1];
				console.log("states", this.states);
				console.log("allDataJurisdiction", this.allDataJurisdiction);
			}
		}, (err: any) => {
			console.log(err);
		});
	}

	private getDataJurisdictionByStateId(stateId: string): void {
		const fvData = this.allDataJurisdiction.filter((x: any) => x.StateID === stateId);
		this.jurisdictions = fvData;
	}

	goContinue(): void {
		localStorage.setItem('CPJurisdiction', this.jurisdictionForm.value.Jurisdiction.Jurisdiction);
		localStorage.setItem('CPJurisdictionID', this.jurisdictionForm.value.Jurisdiction.JurisdictionID);
		localStorage.setItem('CPState', this.jurisdictionForm.value.State.StateID);
		localStorage.setItem('CPStateName', this.jurisdictionForm.value.State.State);
		this.dataLocalService.changeJurisdictionName.next(this.jurisdictionForm.value.Jurisdiction.Jurisdiction);
		this.dataLocalService.selectedJurisdiction.next(this.jurisdictionForm.value.Jurisdiction);
		window.location.replace('cp/portal');
	}
}