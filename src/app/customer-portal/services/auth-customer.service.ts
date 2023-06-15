import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { CreateAccountModel } from '../../@core/models/create-account.model';

@Injectable()

export class AuthCustomerService {

	private noAuthInterceptorHttpClient: HttpClient;

	constructor(backend: HttpBackend, private cookieService: CookieService) {
		this.noAuthInterceptorHttpClient = new HttpClient(backend);
	}

	httpOptionsLogin = {
		headers: new HttpHeaders({
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		})
	};

	signIn(email: string, password: string) {
		const data = `={"Email":"${email}","Password":"${password}"}`;
		return this.noAuthInterceptorHttpClient.post<any>(`${environment.mobileApiUrl}/user/login/-`, data, this.httpOptionsLogin);
	}

	createAccount(createAccount: CreateAccountModel) {
		const postData = `=${encodeURIComponent(JSON.stringify(createAccount))}`
		return this.noAuthInterceptorHttpClient.post<any>(`${environment.mobileApiUrl}/user/create/-`, postData, this.httpOptionsLogin);
	}

	sendforgotpassword(email: string) {
		const data = `={"Email":"${email}","SecretAnswer":""}`;
		return this.noAuthInterceptorHttpClient.post<any>(`${environment.mobileApiUrl}/user/sendforgotpassword/-`, data, this.httpOptionsLogin);
	}

	confirmsecretcode(email: string, pinCode: number) {
		const data = `={"Email":"${email}","SecretAnswer":"${pinCode}"}`;
		return this.noAuthInterceptorHttpClient.post<any>(`${environment.mobileApiUrl}/user/confirmsecretcode/-`, data, this.httpOptionsLogin);
	}

	isLogger(): boolean {
		if (this.cookieService.get('MGIsLogged') === 'true') {
			return true;
		} else {
			return false;
		}
	}

	getUserId() {
		if (this.cookieService.get('MGUserID') == undefined) {
			return '0';
		} else if (!(this.cookieService.get('MGUserID') === '')) {
			return this.cookieService.get('MGUserID');
		} else {
			return '0';
		}
	}

	settingChangePassword(userToken: string, newPassword: string, confirmPassword: string, userCode: boolean) {
		const dataBody = `={"NewPassword":"${newPassword}",
      "ConfirmPassword":"${confirmPassword}","UserCode":${userCode}}`;

		return this.noAuthInterceptorHttpClient.post<any>(`${environment.mobileApiUrl}/user/changepassword/${userToken}`, dataBody, this.httpOptionsLogin);
	}

	changePassword(userToken: string, currentPassword: string, newPassword: string, confirmPassword: string, userCode: boolean) {
		const dataBody = `={"Password":"${currentPassword}","NewPassword":"${newPassword}",
      "ConfirmPassword":"${confirmPassword}","UserCode":${userCode}}`;

		return this.noAuthInterceptorHttpClient.post<any>(`${environment.mobileApiUrl}/user/changepassword/${userToken || '-'}`, dataBody, this.httpOptionsLogin);
	}

	logout(userToken: any) {
		return this.noAuthInterceptorHttpClient.get(`${environment.mobileApiUrl}/user/logout/${userToken}`, this.httpOptionsLogin);
	}
}