import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserCustomerService } from '../services/user-customer.service';

@Injectable()

export class CustomerInterceptor implements HttpInterceptor {

	constructor(private userCustomerService: UserCustomerService) {
		console.log("this.httpHandlerService.getUserToken()", this.userCustomerService.getUserToken())
	}

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		request = request.clone({
			setHeaders: {
				Authorization: `Bearer ${this.userCustomerService.getUserToken()}`
			}
		});
		return next.handle(request);
	}
}