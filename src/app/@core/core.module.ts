import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NbAuthModule } from '@nebular/auth';

import { throwIfAlreadyLoaded } from './module-import-guard';
import { LayoutService, SeoService } from './utils/services';
import { FrameService } from "./mock/frame.service";
import { FormValidationService } from "./mock/form-validation.service";
import { LocationService } from "./mock/location.service";
import { ProjectService } from "./mock/project.service";

@NgModule({
	imports: [
		CommonModule,
	],
	exports: [
		// NbAuthModule,
	],
	declarations: [],
})

export class CoreModule {
	constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
		throwIfAlreadyLoaded(parentModule, 'CoreModule');
	}

	static forRoot(): ModuleWithProviders<CoreModule> {
		return {
			ngModule: CoreModule,
			providers: [
				FrameService,
				LayoutService,
				SeoService,
				FormValidationService,
				LocationService,
				ProjectService
			],
		};
	}
}
