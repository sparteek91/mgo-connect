import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class DataLocalService {

	cPJurisdiction!: string;
	cPJurisdictionID!: string;
	cPState!: string;
	cPStateName!: string;

	public changeJurisdictionName: BehaviorSubject<any> = new BehaviorSubject<any>(localStorage.getItem('CPJurisdiction'));
	public selectedJurisdiction: BehaviorSubject<any> = new BehaviorSubject<any>(null);
	public routeQueryParams: BehaviorSubject<any> = new BehaviorSubject<any>(null);

	constructor() { }

	get localCPJurisdiction() {
		return this.cPJurisdiction = localStorage.getItem('CPJurisdiction')!;
	}

	get localCPJurisdictionID(): any {
		return localStorage.getItem('CPJurisdictionID');
	}

	get localCPState() {
		return localStorage.getItem('CPState');
	}

	get localCPStateName() {
		return localStorage.getItem('CPStateName');
	}
}
