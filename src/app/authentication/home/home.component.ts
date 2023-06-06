import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';


@Component({
	selector: 'app-home-login',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeLoginComponent {
	myGovernmentOnlineOrg: string = `${environment.myGovernmentOnlineOrg}/`;
}

