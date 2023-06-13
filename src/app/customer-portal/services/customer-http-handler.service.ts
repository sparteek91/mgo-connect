import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { environment } from 'environments/environment';
import { Observable, map } from 'rxjs';
// import { ThirdPartyUrlConstant } from '../utils/constant-data';

@Injectable()

export class CustomerHttpHandlerService {
	httpWithOutAuthToken: HttpClient;

	getHttpOptionForCPUser = (userToken: any) => {
		if (userToken)
			return {
				headers: new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization-Token': userToken
				})
			};

		return this.httpOptions;
	}

	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	httpOptionsForUrlEncouded = {
		headers: new HttpHeaders({
			'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
		})
	};

	constructor(private readonly httpBackend: HttpBackend, private readonly http: HttpClient) {
		this.httpWithOutAuthToken = new HttpClient(httpBackend);
	}

	public get(endPoint: string): Observable<any> {
		return this.http.get(endPoint).pipe(map((data: any) => {
			return data;
		}));
	}

	public getWithoutAuthToken(endPoint: string, uesrToken: string): Observable<any> {
		return this.httpWithOutAuthToken.get(endPoint, this.getHttpOptionForCPUser(uesrToken)).pipe(map((data: any) => {
			return data;
		}));
	}
}