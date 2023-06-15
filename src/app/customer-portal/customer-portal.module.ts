import { NgModule } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { PageCpComponent } from './page-cp/page-cp.component';
import { MessageService } from 'primeng/api';
import { CustomerPortalRoutingModule } from './customer-portal-routing.module';
import { DataLocalService } from "./services/data-local.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserCustomerService } from "./services/user-customer.service";
import { CustomerInterceptor } from "./@interceptors/customer-interceptor.service";
import { CustomerPortalGuard } from "./@guards/customer-portal.guard";
import { ProgressBarModule } from 'primeng/progressbar';
import { DataCookieService } from "./services/data-cookie.service";
import { CookieModule } from 'ngx-cookie';
import { AuthCustomerService } from "./services/auth-customer.service";

@NgModule({
	declarations: [
		PageCpComponent
	],
	imports: [
		CommonModule,
		CustomerPortalRoutingModule,
		ToastModule,
		ProgressBarModule,
		CookieModule
	],
	providers: [
		MessageService,
		UserCustomerService,
		CustomerPortalGuard,
		DataLocalService,
		DataCookieService,
		AuthCustomerService,
		{ provide: HTTP_INTERCEPTORS, useClass: CustomerInterceptor, multi: true },
	]
})

export class CustomerPortalModule { }