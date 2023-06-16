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
import { HeaderCustomerComponent } from "./layout/header-customer/header-customer.component";
import { PushNotificationService } from "../@core/utils/services/push-notification.service";
import { LocalStorageService } from "../@core/utils/services/local-storage.service";
import { ButtonModule } from 'primeng/button';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';

@NgModule({
	declarations: [
		PageCpComponent,
		HeaderCustomerComponent
	],
	imports: [
		CommonModule,
		CustomerPortalRoutingModule,
		ToastModule,
		ProgressBarModule,
		CookieModule,
		ButtonModule,
		SidebarModule,
		MenuModule
	],
	providers: [
		MessageService,
		UserCustomerService,
		CustomerPortalGuard,
		DataLocalService,
		DataCookieService,
		AuthCustomerService,
		PushNotificationService,
		LocalStorageService,
		{ provide: HTTP_INTERCEPTORS, useClass: CustomerInterceptor, multi: true },
	]
})

export class CustomerPortalModule { }