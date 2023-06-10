import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { HelperCpService } from 'app/customer-portal/services/helper-cp.service';
import { HttpHandlerService } from '../../@core/http/http-handler.service';
import { DataLocalService } from '../../customer-portal/services/data-local.service';
import { API_Routes } from 'src/app/@routes';

@Component({
	selector: 'app-customer-portal-login-option',
	templateUrl: './customer-portal-login-option.component.html',
	styleUrls: ['./customer-portal-login-option.component.scss'],
	providers: [DataLocalService]
})

export class CustomerPortalLoginOptionComponent implements OnInit {
	jurisdictionForm!: FormGroup;
	allDataJurisdiction: any;
	jurisdictions: any;
	states: any;
	countries: any[] = [];
	
	constructor(private readonly httpService: HttpHandlerService,
		private readonly dataLocalService: DataLocalService,
		private readonly router: Router) {

	}

	ngOnInit(): void {
		this.getStateAndJurisdiction();
		this.initForm();
	}

	private initForm(): void {
		this.jurisdictionForm = new FormGroup({
			State: new FormControl('', [Validators.required]),
			Jurisdiction: new FormControl('', [Validators.required]),
			selectedCountry: new FormControl(1)
		});
		this.countries.push({ label: 'US', value: 1 });
		this.jurisdictionForm.controls['selectedCountry'].setValue(1);
	}

	onChangeState(event: any) {
		this.getDataJurisdictionByStateId(event.value.StateID);
	}

	private getStateAndJurisdiction(): void {
		const urls: any[] = [
			{ path: `${API_Routes.getStates}/-`, flag: '', isAuth: false },
			{ path: `${API_Routes.getJurisdictions}/-`, flag: '', isAuth: false },
		];

		this.httpService.forkJoin(urls).subscribe({
			next: (res) => {
				if (res.length) {
					this.states = res[0];
					this.allDataJurisdiction = res[1];
					console.log("states", this.states);
					console.log("allDataJurisdiction", this.allDataJurisdiction);
				}
			},
			error: (err: any) => console.log(err),
			complete: () => {} 
		})
	}

	getDataJurisdictionByStateId(stateId: string) {
		const fvData = this.allDataJurisdiction.filter((x: any) => x.StateID === stateId);
		this.jurisdictions = fvData;
	}

	goContinue() {
		localStorage.setItem('CPJurisdiction', this.jurisdictionForm.value.Jurisdiction.Jurisdiction);
		localStorage.setItem('CPJurisdictionID', this.jurisdictionForm.value.Jurisdiction.JurisdictionID);
		localStorage.setItem('CPState', this.jurisdictionForm.value.State.StateID);
		localStorage.setItem('CPStateName', this.jurisdictionForm.value.State.State);
		this.dataLocalService.changeJurisdictionName.next(this.jurisdictionForm.value.Jurisdiction.Jurisdiction);
		this.dataLocalService.selectedJurisdiction.next(this.jurisdictionForm.value.Jurisdiction);
		this.router.navigate(['/cp/portal']);
	}
}