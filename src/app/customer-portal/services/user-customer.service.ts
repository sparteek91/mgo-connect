import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject } from 'rxjs';
// import { UpdateAccountModel } from '../modal/update-account.model';

@Injectable()

export class UserCustomerService {

	public changeUsername: BehaviorSubject<string> = new BehaviorSubject<string>(this.cookieService.get('MGUserUsername')!);
	public changeEmail: BehaviorSubject<string> = new BehaviorSubject<string>(this.cookieService.get('MGUserName')!);

	constructor(private cookieService: CookieService) {
	}

	getUserToken() {
		const userToken = this.cookieService.get('MGUserToken');
		if (!!userToken) {
			return userToken;
		} else {
			return '';
		}
	}
}