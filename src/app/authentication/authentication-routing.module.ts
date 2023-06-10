import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { APP_ROUTES } from '../@routes';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { CustomerPortalLoginOptionComponent } from './customer-portal-login-option/customer-portal-login-option.component';
import { HomeLoginComponent } from './home/home.component';
import { LoggedInAuthGuard } from '../@guards/logged-in-auth.guard';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';

const routes: Routes = [{
    path: APP_ROUTES.root,
    component: AuthWrapperComponent,
    children: [
        {
            path: APP_ROUTES.root, component: HomeLoginComponent, children: [
                { path: APP_ROUTES.root, redirectTo: APP_ROUTES.login, pathMatch: 'full' },
                { path: APP_ROUTES.login, component: LoginComponent, canActivate: [LoggedInAuthGuard] },
                { path: APP_ROUTES.cpLogin, component: CustomerPortalLoginOptionComponent, canActivate: [LoggedInAuthGuard] },
            ],
        },
        { path: APP_ROUTES.products, component: ProductsComponent },
        // {
        //     path: 'remoteinspection',
        //     // pathMatch: 'full',
        //     loadChildren: () => import('../pages/layout/virtual-inspection/virtual-inspection.module')
        //         .then(cp => cp.VirtualInspectionModule)
        // },
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})

export class AuthenticationRoutingModule { }