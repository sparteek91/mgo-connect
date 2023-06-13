import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
// import { UpdateAccountModel } from '../modal/update-account.model';

@Injectable()

export class UserCustomerService {

	// private noAuthInterceptorHttpClient: HttpClient;
	public changeUsername: BehaviorSubject<string> = new BehaviorSubject<string>(this.cookieService.get('MGUserUsername')!);
	public changeEmail: BehaviorSubject<string> = new BehaviorSubject<string>(this.cookieService.get('MGUserName')!);

	httpOptions = {
		headers: new HttpHeaders({
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		})
	};

	constructor(private backend: HttpBackend, private cookieService: CookieService) {
		// this.noAuthInterceptorHttpClient = new HttpClient(backend);
	}

	// getuserbytoken(token: string) {
	// 	return this.noAuthInterceptorHttpClient.get(`${environment.mobileApiUrl}/user/getuserbytoken/${token}`, this.httpOptions);
	// }

	getUserToken() {
		const userToken = this.cookieService.get('MGUserToken');
		if (!!userToken) {
			return userToken;
		} else {
			return '';
		}
	}

	// getUserphonenumbers(token: string) {
	// 	return this.noAuthInterceptorHttpClient.get(`${environment.mobileApiUrl}/helper/getuserphonenumbers/${token}`, this.httpOptions);
	// }

	// startphonenumberverification(userToken: any, numberId: number) {
	// 	const dataBody = `={"NumberID":${numberId}}`;
	// 	return this.noAuthInterceptorHttpClient.post(`${environment.mobileApiUrl}/helper/startphonenumberverification/${userToken || '-'}`, dataBody, this.httpOptions);
	// }

	// createuserphonenumber(userToken: any, phone: number, phoneType: string) {
	// 	const dataBody = `={"Phone1":"${phone}","PhoneType":"${phoneType}"}`;
	// 	return this.noAuthInterceptorHttpClient.post(`${environment.mobileApiUrl}/helper/createuserphonenumber/${userToken || '-'}`, dataBody, this.httpOptions);
	// }

	// updateAccount(userToken: any, updateAccount: UpdateAccountModel) {
	// 	const postData = `=${encodeURIComponent(JSON.stringify(updateAccount))}`
	// 	return this.noAuthInterceptorHttpClient.post(`${environment.mobileApiUrl}/user/update/${userToken || '-'}`, postData, this.httpOptions);
	// }
}