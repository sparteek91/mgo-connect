import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FrameService } from '../../@core/mock/frame.service';
import { environment } from '../../../environments/environment';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'ngx-auth-wrapper',
	templateUrl: './auth-wrapper.component.html',
	styleUrls: ['./auth-wrapper.component.scss']
})

export class AuthWrapperComponent implements OnInit {
	loading: boolean = false;
	toastObj: any;
	myGovernmentOnlineOrg = environment.myGovernmentOnlineOrg;
	
	// 
	constructor(private frameService: FrameService, private cdr: ChangeDetectorRef, private readonly messageService: MessageService) { }

	ngOnInit(): void {
		this.frameService.loaderAuth$.subscribe((data) => {
			this.loading = data;
			this.cdr.detectChanges();
		});

		this.frameService.toast$.subscribe((toast) => {
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