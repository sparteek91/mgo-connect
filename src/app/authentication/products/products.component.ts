import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SafeUrl } from '@angular/platform-browser';
import { HttpHandlerService } from '../../@core/http/http-handler.service';
import { MessageService, SelectItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { MenuService } from '../menu/menu.service';
import { PRODUCT_FEATURES } from './products.constants';
import { API_Routes } from 'src/app/@routes';

@Component({
	selector: 'app-products',
	templateUrl: './products.component.html',
	styleUrls: ['./products.component.scss']
})

export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
	features: any[] = PRODUCT_FEATURES;
	contactForm!: FormGroup;
	documentSrc!: SafeUrl;
	openModal: boolean = false;
	isVideo: boolean = false;
	languages: SelectItem[] = [];
	itemClicked: any;
	videoAssetsUrl = '/assets/videos/';
	brochureAssetsUrl = '/assets/brochures/';
	overviewItem = {
		availableVideos: ['English', 'Spanish'],
		videoSrc: 'https://s3.amazonaws.com/dl1.mygovernmentonline.org/MGOVideos/MGO_Overview_English.mp4',
	}
	subscription = new Subscription();
	language: any;
	disabledBtn: boolean = false;
	formSubmitAttempt: boolean = false;

	constructor(private fb: FormBuilder, private httpService: HttpHandlerService, private messageService: MessageService, private menuService: MenuService) { }
	
	ngOnInit() {
		console.log(this.features);
		this.contactForm = this.fb.group({
			Name: this.fb.control('', [Validators.required]),
			Phone: this.fb.control('', [Validators.required]),
			Email: this.fb.control('', [Validators.required, Validators.email]),
			Title: this.fb.control('', [Validators.required]),
			Message: this.fb.control('', [Validators.required]),
		});

		this.subscription.add(
			this.menuService.getFragment().subscribe(fragment => {
				this.scrollTo(fragment);
			})
		);
	}

	ngAfterViewInit() {
		const fragment = history.state.data;

		if (fragment) {
			setTimeout(() => {
				this.scrollTo(fragment);
			}, 1000)
		}
	}

	scrollTo(fragment: string) {
		if (fragment) {
			const element = document.getElementById(fragment);

			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		}
	}

	contactUs() {
		this.formSubmitAttempt = true;

		if (!this.disabledBtn && this.contactForm.valid) {
			this.httpService.post(API_Routes.contact, this.contactForm.value).subscribe({
				next: (message: any) => {
					this.showMessage('Success!', message, 'success', 4000);
				},
				error: (error: any) => this.showMessage('Error!', error, 'error', 4000),
				complete: () => { }
			})

			this.contactForm.reset();
			this.formSubmitAttempt = false;
			this.disabledBtn = true;

			//disabled button for 30 seconds due to abuse
			setTimeout(() => {
				this.disabledBtn = false;
			}, 30000);
		}
	}

	showMessage(summary: string, message: string, severity: string, duration: number, closable: boolean = false, sticky: boolean = false) {
		this.messageService.add({ key: 'toast', closable: false, life: duration, severity: severity, summary: summary, detail: message });
	}

	openBrochure(item: any) {
		this.isVideo = false;

		if (item.brochureSrc) {
			this.documentSrc = this.getUrl(item.brochureSrc);
			this.openModal = true;
		}
	}

	openVideo(item: any) {
		this.itemClicked = item;
		this.fillLanguages(item);
		this.isVideo = true;

		if (item.videoSrc) {
			this.documentSrc = this.getUrl(item.videoSrc);
			this.openModal = true;
		}
	}

	onChangeLanguage(value: any) {
		const index = this.itemClicked.videoSrc.lastIndexOf('_');
		const language = this.itemClicked.videoSrc.substring(index + 1, this.itemClicked.videoSrc.length - 4)
		const videoSrc = this.itemClicked.videoSrc.replace(language, value.value);

		this.documentSrc = this.getUrl(videoSrc);
	}

	fillLanguages(item: any) {
		if (item.availableVideos) {
			this.languages = [];

			item.availableVideos.forEach((availableVideo: any) => {
				this.languages.push({
					value: availableVideo,
					label: availableVideo
				})
			});

			this.language = this.languages[0];
		}
	}

	getUrl(url: string): string {
		if (url.includes("https://"))
			return url;
		return `${this.isVideo ? this.videoAssetsUrl : this.brochureAssetsUrl}${url}`
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}
}