
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from 'aws-amplify';

import { from, Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

/**
 * This will append jwt token for the http requests.
 *
 * @export
 * @class JwtInterceptor
 * @implements {HttpInterceptor}
 */

@Injectable()

export class AuthInterceptor implements HttpInterceptor {

	constructor() { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log("auth interceptor invoked!!!")
		return from(Auth.currentSession()).pipe(
			switchMap((auth: any) => { // switchMap() is used instead of map().
				console.log("auth", auth);
				const jwt = auth.accessToken.jwtToken;
				request = request.clone({
					setHeaders: {
						Authorization: `Bearer ${jwt}`
					}
				});
				localStorage.setItem('JPToken', JSON.stringify(auth.accessToken.jwtToken));
				return next.handle(request);
			}),
			catchError((err: any) => {
				console.log("Error ", err);
				return next.handle(request);
			})
		);
	}
}