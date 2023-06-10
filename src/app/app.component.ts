import { HttpHandler, HttpRequest } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { HttpHandlerService } from './@core/http/http-handler.service';
import { FrameService } from './@core/mock/frame.service';
import { UserService } from './@core/mock/users.service';
// import { AnalyticsService } from './@core/utils/analytics.service';
// import { SeoService } from './@core/utils/seo.service';
import { AuthHandlerService } from './@core/http/auth-handler.service';
// import { LocalStorageService } from './@core/http/local-storage.service';
import { API_Routes } from './@routes';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	isAutoDetect!: boolean;

	constructor(
		// private analytics: AnalyticsService,
		// private seoService: SeoService,
		private authService: AuthHandlerService,
		private frameService: FrameService,
		private httpHandler: HttpHandler,
		private userService: UserService,
		private httpService: HttpHandlerService) {
		this.frameService.getForceStatus().subscribe((forceStatus) => {
			if (forceStatus === 'ForceOnline') {
				this.isAutoDetect = false;
				this.frameService.showToastPrime('Online!', "You are working in *Online* mode now!", 'info', 5000);
				this.frameService.setOnline();
				this.executeOfflineRequestsIfNeeded();
				this.frameService.setOfflineChecklist(false);
			}
			else if (forceStatus === 'ForceOffline') {
				this.isAutoDetect = false;
				this.frameService.showToastPrime('Offline!', "You are working in *Offline* mode now!", 'info', 5000);
				this.frameService.setOffline();
				this.frameService.setOfflineChecklist(true);
			}
			else if (forceStatus === 'AutoDetect') {
				this.isAutoDetect = true;
			}
		});
	}

	ngOnInit(): void {
		console.log(environment);
		if (this.userService.getCurrentUser()) {
			this.prepWorkOrdersOffline();
		}
		this.executeOfflineRequestsIfNeeded();
		// this.analytics.trackPageViews();
		// this.seoService.trackCanonicalChanges();
		// const values = this.httpService.getDataByKey("CognitoIdentityServiceProvider");
		// const userId = this.httpService.getValueByDataProperty(values, "UserAttributes", "custom:MPN_ID");
		// this.authService.userId = !!userId ? Number(userId) : 0;
		// this.authService.authenticated = this.authService.userId !== 0;
	}

	@HostListener('window:offline')
	setNetworkOffline(): void {
		if (this.isAutoDetect) {
			this.frameService.showToastPrime('Offline!', "You are working in *Offline* mode now!", 'info', 5000);
			this.frameService.setOffline();
			this.frameService.setOfflineChecklist(true);
		}
	}

	@HostListener('window:online')
	setNetworkOnline(): void {
		if (this.isAutoDetect) {
			this.frameService.showToastPrime('Online!', "You are working in *Online* mode now!", 'info', 5000);
			this.frameService.setOnline();
			this.executeOfflineRequestsIfNeeded();
			this.frameService.setOfflineChecklist(false);
		}
	}

	async prepWorkOrdersOffline() {
		let dateToday = this.frameService.formatDate(new Date());
		let selectedInspector = this.userService.getCurrentUser().UserID.toString();
		const endPoint: string = this.httpService.formUrlParam(`${API_Routes.prepoffline + selectedInspector}`, { Start: dateToday, End: dateToday });
		await this.httpService.get(endPoint, "WorkOrderOffline", true).subscribe((res: any) => {
			localStorage.setItem('offlineWorkOrders', JSON.stringify(res));
		}, (error: any) => {
			this.frameService.showToastPrime('Error!', 'An error ocurred while fetching work orders.', 'error', 4000);
		});
	}

	async executeOfflineRequestsIfNeeded() {
		let offlineRequests = localStorage.getItem('offlineRequests');
		if (offlineRequests) {
			let requests = JSON.parse(offlineRequests);
			Promise.all(requests.map(async (request: any) => {
				let httpReq = this.populateHttpRequest(request);
				this.httpHandler.handle(httpReq).subscribe((res: any) => {
					
				},
					error => {
						console.log(error);
					});
			})).then(data => {
				localStorage.removeItem('offlineRequests');
				this.frameService.showToastPrime('Success!', "Your Offline Requests have been executed now.", 'info', 5000);
			});
			// requests.forEach(req => {
			//   let httpReq = this.populateHttpRequest(req);
			//   this.httpHandler.handle(httpReq).subscribe(
			//     (res: any) => {
			//     },
			//     error => {
			//        console.log(error);
			//     });
			// });
		}
		if (JSON.parse(localStorage.getItem('offlineChecklistdata')!)) {
			var offlineChecklist = JSON.parse(localStorage.getItem('offlineChecklistdata')!);
			const endPoint: string = API_Routes.createInspection;
			this.httpService.post(endPoint, offlineChecklist).subscribe((res: any) => {
				this.frameService.showToastPrime('Success!', 'Successfully Created Inspection.', 'success', 4000);
				localStorage.removeItem('offlineChecklistdata');
			}, (err: any) => {
				this.frameService.showToastPrime('Error!', 'Saving Inspection Failed.', 'error', 4000);
			});
			this.frameService.hideLoader();
		}
	}

	populateHttpRequest(request: any) {
		let newRequest = new HttpRequest(request.method, request.url, request.body);
		return newRequest;
	}
}
