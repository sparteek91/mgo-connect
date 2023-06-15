import { Injectable } from '@angular/core';
import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageData } from "../models/storageValue.model";
// import { UserService } from '../mock/users.service';
// import { SearchOutDto } from 'app/pages/layout/project-manager/models/searh.model';
// import { RequirementReoccurence } from 'app/pages/layout/project-manager/models/permit.model';

@Injectable({
	providedIn: 'root'
})

export class HttpHandlerService {
	readonly #data = new BehaviorSubject<StorageData[]>([]);
	data$ = this.#data.asObservable();

	private httpWithOutAuthToken: HttpClient;

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

	constructor(private readonly http: HttpClient, private readonly httpBackend: HttpBackend) {
		this.httpWithOutAuthToken = new HttpClient(this.httpBackend);
	}

	// ------------------------------------------ Auth token Api ------------------------------------------------------------
	public get(endPoint: string, flag: string = ''): Observable<any> {
		return this.http.get(endPoint).pipe(map((data: any) => {
			if (flag) {
				this.populateConst(data, flag)
			}
			return data;
		}));
	}

	public post(endPoint: string, payload: any): Observable<any> {
		return this.http.post<any>(endPoint, payload).pipe(
			map((data) => {
				return data;
			})
		);
	}

	public forkJoin(urls: any[]): Observable<any> {
		let response: any = [];
		for (let i = 0; i < urls.length; i++) {
			response.push(this.http.get(urls[i].path));
		}
		return forkJoin(response);
	}
	// ----------------------------------------------------------------------------------------------------------------------

	// --------------------------------------- No Auth token Api ------------------------------------------------------------
	public getWithoutAuthToken(endPoint: string, userToken: string): Observable<any> {
		return this.httpWithOutAuthToken.get(endPoint, this.getHttpOptionForCPUser(userToken)).pipe(map((data: any) => {
			return data;
		}));
	}
	// -----------------------------------------------------------------------------------------------------------------------

	private populateConst(data: any, flag: string): void {
		if (flag == 'WorkOrderOffline') {
			getWorkOrderOffline.data = data;
		}
	}

	public formUrlParam(url: string, data: any): string {
		let queryString: string = '';
		for (const key in data) {
			if (data.hasOwnProperty(key) && data[key]) {
				if (!queryString) {
					queryString = `?${key}=${data[key]}`;
				} else {
					queryString += `&${key}=${data[key]}`;
				}
			}
		}
		return url + queryString;
	}
}

export const getWorkOrderOffline: any = {
	data: ''
}