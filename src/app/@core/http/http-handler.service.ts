import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

	private httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};

	constructor(private readonly http: HttpClient) {}

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

	private populateConst(data: any, flag: string): void {
		if (flag == 'WorkOrderOffline') {
			getWorkOrderOffline.data = data;
		}
	}
}

export const getWorkOrderOffline: any = {
	data: ''
}