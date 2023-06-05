import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable()

export class FormValidationService {
	formSubmitAttempt: boolean = false;

	constructor() { }

	validateAllFormFields(form: FormGroup) {
		Object.keys(form.controls).forEach(field => {
			const control = form.get(field);
			if (control instanceof FormControl) {
				control.markAsTouched({ onlySelf: true });
				control.markAsDirty({ onlySelf: true });
			} else if (control instanceof FormGroup) {
				this.validateAllFormFields(control);
			}
		});
	}

	isFieldValid(form: FormGroup, field: string) {
		return (!form.get(field)?.valid && form.get(field)?.touched) ||
			(form.get(field)?.untouched && this.formSubmitAttempt);
	}

	//checks if number is integer
	integerNumberOnly(event: any): boolean {
		const charCode = (event.which) ? event.which : event.keyCode;
		if (charCode > 31 && (charCode < 48 || charCode > 57)) {
			return false;
		}
		return true;
	}

	//on paste securing integer
	onPasteInteger(event: any) {
		let clipboardData = event.clipboardData; //|| window.clipboardData;
		let pastedText = clipboardData.getData('text');
		var isValidNumber = this.isValidIntegerNumber(pastedText);
		if (!isValidNumber) {
			event.preventDefault();
		}
	}

	isValidIntegerNumber(text: string) {
		var isValidNumber = /^[0-9]+([,.][0-9]+)?$/g.test(text);
		return isValidNumber;
	}
}