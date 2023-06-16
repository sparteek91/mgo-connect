import { Injectable } from "@angular/core";
import { CookieService } from "ngx-cookie";

@Injectable()

export class DataCookieService {

    constructor(private readonly cookieService: CookieService) { }

    get getUserCode() {
        if (!this.cookieService.get('MGUserCode')) {
            return '-';
        } else if (!(this.cookieService.get('MGUserCode') == '')) {
            return this.cookieService.get('MGUserCode');
        } else {
            return '-';
        }
    }

    getUserID() {
        return this.cookieService.get('MGUserID') || null;
    }

    removeSomeDataCookie() {
        this.cookieService.remove('MGUserID', { path: '/' });
        this.cookieService.remove('MGUserName', { path: '/' });
        this.cookieService.remove('MGIsLogged', { path: '/' });
        this.cookieService.remove('MGUserToken', { path: '/' });
        this.cookieService.remove('MGUserCode', { path: '/' });
        this.cookieService.remove('MGUserUsername', { path: '/' });
        this.cookieService.remove('MGIsGreaseProgram', { path: '/' });
    }

    removeAllCookie() {
        this.cookieService.removeAll();
    }
}