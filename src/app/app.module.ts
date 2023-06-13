import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthInterceptor, ErrorInterceptor } from "./@interceptors";
import { CoreModule } from './@core/core.module';
import { UserService } from './@core/mock/users.service';
import { AuthGuard } from './@guards/auth.guard';
import { LoggedInAuthGuard } from './@guards/logged-in-auth.guard';
// import { SignalrService } from "./@core/http/signalr.service";

@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		CookieModule.withOptions(),
		CoreModule.forRoot(),
		AppRoutingModule
	],
	providers: [
		UserService,
		AuthGuard,
		LoggedInAuthGuard,
		{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		//  { provide: HTTP_INTERCEPTORS, useClass: NotificationInterceptor, multi: true },
		// SignalrService,
		// {
		// 	provide: APP_INITIALIZER,
		// 	useFactory: (signalrService: SignalrService) => () => signalrService.initiateSignalrConnection(),
		// 	deps: [SignalrService],
		// 	multi: true,
		// }
	],
	bootstrap: [AppComponent]
})

export class AppModule { }