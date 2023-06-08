import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { StorageData } from "../models/storageValue.model";
// import { UserService } from '../mock/users.service';
// import { SearchOutDto } from 'app/pages/layout/project-manager/models/searh.model';
// import { RequirementReoccurence } from 'app/pages/layout/project-manager/models/permit.model';

@Injectable({
	providedIn: 'root'
})

export class HttpHandlerService {
	httpOptions = {
		headers: new HttpHeaders({
			'Content-Type': 'application/json',
		})
	};
	readonly #data = new BehaviorSubject<StorageData[]>([]);
	data$ = this.#data.asObservable();

	constructor(private http: HttpClient) { }

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

	get(endPoint: string, flag: string = ''): Observable<any> {
		return this.http.get(endPoint, this.httpOptions).pipe(map((data: any) => {
			console.log("data", data);
			if (flag == 'WorkOrderOffline') {
				getWorkOrderOffline.data = data;
			}
			return data;
		}));
	}

	// sendContact(contactForm: any) {

	// 	return this.http.post<any>(`${environment.baseApiUrl}/contactform`, contactForm, this.httpOptions);
	//   }

	post(endPoint: string, payload: any) {
		return this.http.post<any>(endPoint, payload, this.httpOptions);
	}
}

export const getWorkOrderOffline: any = {
	data: ''
}