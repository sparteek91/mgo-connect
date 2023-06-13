import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { TabViewModule } from 'primeng/tabview';
// import { ConfirmDialogModule } from 'primeng/confirmdialog';
// import { ConfirmationService } from 'primeng/api';
// import { TooltipModule } from 'primeng/tooltip';
// import { AccordionModule } from 'primeng/accordion';
// import { TableModule } from 'primeng/table';
import { LoginComponent } from './login/login.component';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginCirclesComponent } from './login-circles/login-circles.component';
import { ProductsComponent } from './products/products.component';
import { HomeLoginComponent } from './home/home.component';
import { MenuComponent } from './menu/menu.component';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { SafePipe } from "../@pipes/sanitizer.pipe";
import { MenuService } from './menu/menu.service';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
// import { ElementsModule } from 'app/@theme/elements/elements.module';
// import { SharedModule } from 'app/shared/shared.module';
import { CustomerPortalLoginOptionComponent } from './customer-portal-login-option/customer-portal-login-option.component';
import { MessageService } from 'primeng/api';
// import { MenubarModule } from 'primeng/menubar';

@NgModule({
	imports: [
		FormsModule,
		ReactiveFormsModule,
		AuthenticationRoutingModule,
		CommonModule,
		// ElementsModule,
		// TabViewModule,
		// ConfirmDialogModule,
		// TooltipModule,
		// AccordionModule,
		// TableModule,
		DialogModule,
		ToastModule,
		DropdownModule,
		// MenubarModule
		// SharedModule
	],
	declarations: [
		LoginComponent,
		AuthWrapperComponent,
		LoginCirclesComponent,
		ProductsComponent,
		HomeLoginComponent,
		MenuComponent,
		CustomerPortalLoginOptionComponent,
		SafePipe, //TODO, fix issue with pipes
	],
	providers: [
		MessageService,
		MenuService,
	],
})
export class AuthenticationModule { }