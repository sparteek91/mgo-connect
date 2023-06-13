import { NgModule } from '@angular/core';
// import { CommonModule, CurrencyPipe } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { CustomerPortalRoutingModule } from './customer-portal-routing.module';
import { DataLocalService } from "./services/data-local.service";
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserCustomerService } from "./services/user-customer.service";
import { CustomerInterceptor } from "./@interceptors/customer-interceptor.service";
import { CustomerPortalGuard } from "./@guards/customer-portal.guard";

@NgModule({
	declarations: [

	],
	imports: [
		CustomerPortalRoutingModule,
		ToastModule,
	],
	providers: [
		MessageService,
		UserCustomerService,
		CustomerPortalGuard,
		DataLocalService,
		{ provide: HTTP_INTERCEPTORS, useClass: CustomerInterceptor, multi: true },
	]
})

export class CustomerPortalModule { }