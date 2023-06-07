import { NgModule } from '@angular/core';
import { RouterModule, Routes, ExtraOptions } from '@angular/router';

import { APP_ROUTES } from "./@routes";

const routes: Routes = [
	{
		path: APP_ROUTES.auth,
		loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule),
	},
	{
		path: APP_ROUTES.cp,
		loadChildren: () => import('./customer-portal/customer-portal.module').then(cp => cp.CustomerPortalModule)
	},
	// {
	// 	path: APP_ROUTES.root,
	// 	component: ContentLayoutComponent,
	// 	data: { title: 'content Views' },
	// 	children: CONTENT_ROUTES
	// },
	{ path: APP_ROUTES.root, redirectTo: APP_ROUTES.auth, pathMatch: 'full' },
	{ path: '**', redirectTo: APP_ROUTES.auth },
];

const config: ExtraOptions = {
	useHash: false,
};

@NgModule({
	imports: [RouterModule.forRoot(routes, config)],
	exports: [RouterModule],
})
export class AppRoutingModule {
}