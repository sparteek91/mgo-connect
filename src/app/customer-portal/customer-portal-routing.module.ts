import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { NotFoundComponent } from 'app/pages/miscellaneous/not-found/not-found.component';
// import { CpPortalComponent } from './cp-portal/cp-portal.component';
// import { ProjectTypeDetailsComponent } from './cp-portal/project-type/project-type-details/project-type-details.component';
// import { ProjectTypeComponent } from './cp-portal/project-type/project-type.component';
// import { SearchPzResultComponent } from './cp-portal/search-pz/search-pz-result/search-pz-result.component';
// import { SearchPzComponent } from './cp-portal/search-pz/search-pz.component';
// import { HomeComponent } from './home/home.component';
// import { LoginCpComponent } from './auth/login-cp/login-cp.component';
import { PageCpComponent } from './page-cp/page-cp.component';
import { APP_ROUTES } from '../@routes';
// import { CustomerPortalGuard } from './services/customer-portal.guard';
// import { CancelInspectionComponent } from './cancel-inspection/cancel-inspection.component';
// import { MyProjectsComponent } from './my-projects/my-projects.component';
// import { PendingApplicationsComponent } from './cp-portal/applications/pending-applications/pending-applications.component';
// import { DetailApplicationComponent } from './cp-portal/applications/detail-application/detail-application.component';
// import { ApplicationAddressComponent } from './cp-portal/applications/application-address/application-address.component';
// import { ContactsApplicationComponent } from './cp-portal/applications/contacts-application/contacts-application.component';
// import { ListContactsComponent } from './cp-portal/applications/contacts-application/list-contacts/list-contacts.component';
// import { DetailContractorComponent } from './cp-portal/applications/detail-contractor/detail-contractor.component';
// import { DetailQuestionnaireComponent } from './cp-portal/applications/detail-questionnaire/detail-questionnaire.component';
// import { ApplicationFileuploadComponent } from './cp-portal/applications/application-fileupload/application-fileupload.component';
// import { MyRequestsComponent } from './cp-portal/my-requests/my-requests.component';
// import { ContractorLicensesComponent } from './cp-portal/contractor-licenses/contractor-licenses.component';
// import { FindRegistrationsComponent } from './cp-portal/contractor-licenses/find-registrations/find-registrations.component';
// import { SettingsProfileComponent } from './cp-portal/settings-profile/settings-profile.component';
// import { ListNumberComponent } from './cp-portal/settings-profile/list-number/list-number.component';
// import { CreateCustomerAccountComponent } from './auth/create-customer-account/create-customer-account.component';
// import { InfoCustomerAccountComponent } from './auth/info-customer-account/info-customer-account.component';
// import { ForgotPasswordCustomerComponent } from './auth/forgot-password-customer/forgot-password-customer.component';
// import { ChangePasswordCustomerComponent } from './auth/change-password-customer/change-password-customer.component';
// import { ProjectTypeContactComponent } from './cp-portal/project-type/project-type-contact/project-type-contact.component';
// import { ProjectTypeQuestionnaireComponent } from './cp-portal/project-type/project-type-questionnaire/project-type-questionnaire.component';
// import { ProjectTypeApplicantComponent } from './cp-portal/project-type/project-type-applicant/project-type-applicant.component';
// import { ProjectTypeFilesUploadComponent } from './cp-portal/project-type/project-type-files-upload/project-type-files-upload.component';
// import { ProjectTypeReviewComponent } from './cp-portal/project-type/project-type-review/project-type-review.component';
// import { SearchSuggestAddressesComponent } from './cp-portal/project-type/search-suggest-addresses/search-suggest-addresses.component';
// import { RequestComponent } from './cp-portal/request/request.component';
// import { SelectIssueComponent } from './cp-portal/request/select-issue/select-issue.component';
// import { RequestContactComponent } from './cp-portal/request/request-contact/request-contact.component';
// import { InternalMapComponent } from './cp-portal/internal-map/internal-map.component';
// import { InputAddressesComponent } from './cp-portal/project-type/input-addresses/input-addresses.component';
// import { MapLocationComponent } from './cp-portal/request/map-location/map-location.component';
// import { ContractorDetailComponent } from './cp-portal/contractor-licenses/contractor-detail/contractor-detail.component';
// import { ApplicationFeeComponent } from './cp-portal/applications/application-fee/application-fee.component';
// import { ApplicationCommentPageComponent } from './cp-portal/applications/application-comments/application-comment-page.component';
// import { ApplicationWizardComponent } from './cp-portal/application-wizard/application-wizard.component';
// import { ProjectDetailComponent } from './project-detail/project-detail.component';
// import { SearchApplicationPermitComponent } from './search-application-permit/search-application-permit.component';
// import { ShowSearchApplicationResultsComponent } from './search-application-permit/show-search-application-results/show-search-application-results.component';
// import { ShowSearchPermitResultsComponent } from './search-application-permit/show-search-permit-results/show-search-permit-results.component';
// import { UseAnExistingProjectComponent } from './cp-portal/project-type/use-an-existing-project/use-an-existing-project.component';
// import { CPLoadingComponent } from './cploading/cploading.component';
// import { ProcessPaymentComponent } from './payment-gateway/process-payment/process-payment.component';
// import { ApplicationDetailsComponent } from './application-details/application-details.component';
// import { InspectionComponent } from './inspection/inspection.component';
// import { RequestInspectionComponent } from './inspection/request-inspection/request-inspection.component';
// import { ProjectPublicCommentComponent } from './project-detail/project-public-comment/project-public-comment.component';
// import { HostedPaymentProcessCompletedComponent } from './payment-gateway/hosted-payment-process-completed/hosted-payment-process-completed.component';
// import { AdvancedReportingComponent } from './advanced-reporting/advanced-reporting.component';
// import { CustomerReportListComponent } from './customer-report-list/customer-report-list.component';
// import { ForceLoginWithFlagGaurd } from './services/force-login-with-flag-gaurd.service';

const routes: Routes = [
	{
		path: APP_ROUTES.portal,
		component: PageCpComponent,
		children: [
			// {
			// 	path: '',
			// 	component: CPLoadingComponent
			// },
			// {
			// 	path: 'login',
			// 	component: LoginCpComponent
			// },
			// {
			// 	path: 'info-account',
			// 	component: InfoCustomerAccountComponent,
			// 	// canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'create-account',
			// 	component: CreateCustomerAccountComponent
			// },
			// {
			// 	path: 'forgot-password',
			// 	component: ForgotPasswordCustomerComponent
			// },
			// {
			// 	path: 'change-password',
			// 	component: ChangePasswordCustomerComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'home',
			// 	component: HomeComponent,
			// 	// canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'portal',
			// 	component: CpPortalComponent,
			// 	// canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'project-type',
			// 	component: ProjectTypeComponent,
			// 	// canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'project-type-use-existing/:projectTypeID',
			// 	component: UseAnExistingProjectComponent,
			// 	// canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'project-type-details/:projectTypeID',
			// 	component: ProjectTypeDetailsComponent,
			// 	canActivate: [ForceLoginWithFlagGaurd],
			// },
			// {
			// 	path: 'search-suggest-addresses',
			// 	component: SearchSuggestAddressesComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'addresses',
			// 	component: InputAddressesComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'project-type-contacts',
			// 	component: ProjectTypeContactComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'application-fees',
			// 	component: ApplicationFeeComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'application-comments',
			// 	component: ApplicationCommentPageComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'project-type-questionnaire',
			// 	component: ProjectTypeQuestionnaireComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'project-type-filesupload',
			// 	component: ProjectTypeFilesUploadComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },

			// {
			// 	path: 'project-type-applicant',
			// 	component: ProjectTypeApplicantComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'project-type-review',
			// 	component: ProjectTypeReviewComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },

			// {
			// 	path: 'search-permits',
			// 	component: SearchApplicationPermitComponent,
			// 	canActivate: [CustomerPortalGuard]
			// },
			// {
			// 	path: 'search-applications-result',
			// 	component: ShowSearchApplicationResultsComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'search-permits-result',
			// 	component: ShowSearchPermitResultsComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'request-inspection/:projectID',
			// 	component: RequestInspectionComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'search-planning-and-zoning',
			// 	component: SearchPzComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'search-planning-and-zoning-result',
			// 	component: SearchPzResultComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'project-details/:projectUID',
			// 	component: ProjectDetailComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'my-projects',
			// 	component: MyProjectsComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'pending-inspections',
			// 	component: InspectionComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'cancel-inspections/:projectID/:workOrderID',
			// 	component: CancelInspectionComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'pending-applications',
			// 	component: PendingApplicationsComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'details-applications/:applicationUid',
			// 	component: DetailApplicationComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'application-details/:applicationUid',
			// 	component: ApplicationDetailsComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'applicationdetail-address/:applicationUid',
			// 	component: ApplicationAddressComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'applicationdetail-contacts',
			// 	component: ContactsApplicationComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'application-list-contacts',
			// 	component: ListContactsComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'applicationdetail-contractor',
			// 	component: DetailContractorComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'applicationdetail-questionnaire',
			// 	component: DetailQuestionnaireComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'applicationdetail-fileupload',
			// 	component: ApplicationFileuploadComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'pending-solution-center-applications',
			// 	component: MyRequestsComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'contractor-licenses',
			// 	component: ContractorLicensesComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'contractor-licenses/contractor-details/:contractorID/:JurisdictionID',
			// 	component: ContractorDetailComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'find-contractor-registrations',
			// 	component: FindRegistrationsComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'settings',
			// 	component: SettingsProfileComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'list-number',
			// 	component: ListNumberComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'request',
			// 	component: RequestComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'request-select-issue',
			// 	component: SelectIssueComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'request-contact',
			// 	component: RequestContactComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'map-location',
			// 	component: MapLocationComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'internal-map',
			// 	component: InternalMapComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'project-public-comments',
			// 	component: ProjectPublicCommentComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'application-wizard',
			// 	component: ApplicationWizardComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'process-payment',
			// 	component: ProcessPaymentComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'process-payment-return',
			// 	component: HostedPaymentProcessCompletedComponent,
			// 	canActivate: [CustomerPortalGuard],
			// },
			// {
			// 	path: 'custom-reports',
			// 	component: CustomerReportListComponent,
			// 	canActivate: [CustomerPortalGuard]
			// },
			// {
			// 	path: 'advanced-reporting/:jurisdictionID/:reportID',
			// 	component: AdvancedReportingComponent,
			// 	canActivate: [CustomerPortalGuard]
			// },
			// {
			// 	path: '**',
			// 	component: NotFoundComponent,
			// }
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})

export class CustomerPortalRoutingModule { }