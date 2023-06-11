import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FrameService } from '../../@core/mock/frame.service';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

interface ISocialHandles {
	title: string;
	img: string;
	class: string;
	path: string;
}

@Component({
	selector: 'ngx-auth-wrapper',
	templateUrl: './auth-wrapper.component.html',
	styleUrls: ['./auth-wrapper.component.scss']
})

export class AuthWrapperComponent implements OnInit {
	loading: boolean = false;
	toastObj: any;
	myGovernmentOnlineOrg = environment.myGovernmentOnlineOrg;
	socialHandles: ISocialHandles[] = [
		{ title: "Facebook", img: "assets/icons/facebook.svg", class: "width-1vw", path: "https://www.facebook.com/mygovernmentonline/" },
		{ title: "Twitter", img: "assets/icons/twitter.svg", class: "width-2vw", path: "https://twitter.com/MGO_Software" },
		{ title: "Instagram", img: "assets/icons/instagram.svg", class: "width-2vw", path: "https://www.instagram.com/mygovernmentonline/" },
	]
	
	constructor(private frameService: FrameService, private cdr: ChangeDetectorRef, private readonly messageService: MessageService) { }

	ngOnInit(): void {
		this.frameService.loaderAuth$.subscribe((data) => {
			this.loading = data;
			this.cdr.detectChanges();
		});

		this.frameService.toast$.subscribe((toast) => {
			console.log("toast", toast)
			if (toast) {
				if (toast.destroyAll) {
					this.messageService.clear();
				}
				else {
					this.toastObj = toast;
					this.messageService.clear();
					if (toast.sticky) {
						this.messageService.add({ key: 'toast', closable: toast.closable, severity: toast.severity, summary: toast.summary, detail: toast.message, sticky: toast.sticky });
					}
					else {
						this.messageService.add({ key: 'toast', closable: false, life: toast.duration, severity: toast.severity, summary: toast.summary, detail: toast.message });
					}
				}
			}
		});
	}
}