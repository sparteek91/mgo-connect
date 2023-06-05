import { Injectable } from '@angular/core';
// import { NbOptionComponent, NbSelectComponent, NbToastrService } from '@nebular/theme';
// import { NbComponentStatus } from '@nebular/theme/components/component-status';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()

export class FrameService {

	constructor() { }

	private offline: BehaviorSubject<boolean> = new BehaviorSubject(false);
	private loader: BehaviorSubject<boolean> = new BehaviorSubject(false);
	private loaderAuth: BehaviorSubject<boolean> = new BehaviorSubject(false);
	private toast: BehaviorSubject<any> = new BehaviorSubject(null);
	private offlineChecklist: BehaviorSubject<boolean> = new BehaviorSubject(false);
	private newProjectWizard: BehaviorSubject<boolean> = new BehaviorSubject(false);
	private forceStatus: BehaviorSubject<string> = new BehaviorSubject('');
	private uiConfiguration: BehaviorSubject<any> = new BehaviorSubject(
		{
			UI_HeaderBgColor: 'rgb(255,255,255)',
			UI_HeaderHeight: '90px',
			Logo: 'assets/images/mgo_Logo2.png',
			UI_GridHeaderBodyTextColor: '#0271b7',
			UI_GridHeaderFooterBGColor: '#d43f4e',
			UI_GridHeaderFooterTextColor: '#fff',
			UI_HeaderLinkTextColor: 'rgb(34, 43, 69)',
			UI_HeaderLinkTextSize: '22px',
			UI_LeftNavigationBarColor: 'rgba(255, 255, 255, 1)',
			UI_LeftNavigationBarBackgrounColor: 'rgba(20, 20, 20, 0.5)',
			UI_LeftNavigationOpacity: 1.0,
			UI_HomeMGOConnectBoxColor: 'rgba(255, 255, 255, 1)',
			UI_HomeMGOConnectBoxBackgroundColor: 'rgba(136, 136, 136, 0.4)',
			UI_HomeMGOConnectBoxOpacity: 1.0,
			UI_FooterSloganBackgroundColor: 'rgba(48, 117, 185, 1)',
			UI_FooterSloganFontColor: 'rgba(255, 255, 255, 1)',
			UI_FooterContactBackgroundColor: 'rgba(255, 255, 255, 1)',
			UI_FooterContactFontColor: 'rgba(0, 0, 0, 1)',
			UI_HomePageCarouselBorderRedius: '0px',
			UI_HomeMainMenuBorderRedius: '0px',
		}
	);

	private portalID: BehaviorSubject<number> = new BehaviorSubject<number>(1);// // 1 => JP, 2 =>  PG

	public readonly offline$: Observable<boolean> = this.offline.asObservable();
	public readonly loader$: Observable<boolean> = this.loader.asObservable();
	public readonly loaderAuth$: Observable<boolean> = this.loaderAuth.asObservable();
	public readonly toast$: Observable<any> = this.toast.asObservable();
	public readonly uiConfiguration$: Observable<any> = this.uiConfiguration.asObservable();
	public readonly portalID$: Observable<number> = this.portalID.asObservable();
	public globleTextColor = '#0271b7';

	setOffline() {
		this.offline.next(true);
	}

	setOnline() {
		this.offline.next(false);
	}

	isAppOffline() {
		return this.offline.value;
	}

	hideLoader() {
		this.loader.next(false);
	}

	showLoader() {
		this.loader.next(true);
	}

	hideLoaderAuth() {
		this.loaderAuth.next(false);
	}

	showLoaderAuth() {
		this.loaderAuth.next(true);
	}

	setNewProjectWizardDialog(isOpen: boolean) {
		this.newProjectWizard.next(isOpen);
	}

	getNewProjectWizardDialog(): Observable<boolean> {
		return this.newProjectWizard.asObservable();
	}

	// showToast(title: string, msg: string, status: NbComponentStatus, duration: number = 3000) {
	// 	this.toastrService.show(msg, title, { status, duration });
	// }

	showToastPrime(summary: string, message: string, severity: string, duration: number, closable: boolean = false, sticky: boolean = false) {
		let toastObj = { summary: summary, message: message, severity: severity, duration: duration, closable: closable, sticky: sticky };
		this.toast.next(toastObj);
	}

	destroyAllToasts() {
		let destroyObj = { destroyAll: true }
		this.toast.next(destroyObj);
	}

	getOfflineChecklist(): Observable<boolean> {
		return this.offlineChecklist.asObservable();
	}

	setOfflineChecklist(status: boolean) {
		this.offlineChecklist.next(status);
	}

	setForceStatus(status: string) {
		this.forceStatus.next(status);
	}

	getForceStatus(): Observable<string> {
		return this.forceStatus.asObservable();
	}

	formatDate(date: any) {
		let dateString = '';
		if (date != null) {
			let dd = date.getDate();
			let mm = date.getMonth() + 1;
			const yyyy = date.getFullYear();
			if (dd < 10) {
				dd = `0${dd}`;
			}
			if (mm < 10) {
				mm = `0${mm}`;
			}
			dateString = `${yyyy}-${mm}-${dd}`;
		}

		return dateString;
	}

	formatDateTime(date: any) {
		var dateString =
			date.getUTCFullYear() + "/" +
			("0" + (date.getUTCMonth() + 1)).slice(-2) + "/" +
			("0" + date.getUTCDate()).slice(-2) + " " +
			("0" + date.getUTCHours()).slice(-2) + ":" +
			("0" + date.getUTCMinutes()).slice(-2) + ":" +
			("0" + date.getUTCSeconds()).slice(-2);

		return dateString;
	}

	setUIConfiguration = (uiConfig: any) =>
		this.uiConfiguration.next(uiConfig);

	getUIConfiguration = () => this.uiConfiguration.value;
	setPortalID = (portalID: any) => this.portalID.next(portalID);

	// setOptionNbSelect(selectComponent: NbSelectComponent, optToCompare: any) {
	// 	setTimeout(() => {
	// 		if (selectComponent) {
	// 			const selectedOptions: NbOptionComponent[] = [];
	// 			for (const option of selectComponent.options['_results']) {
	// 				if (optToCompare.includes(option.value)) {
	// 					selectedOptions.push(option);
	// 				}
	// 			}
	// 			for (const option of selectedOptions) {
	// 				selectComponent['selectOption'](option);
	// 			}
	// 			selectComponent['cd'].detectChanges();
	// 		}
	// 	}, 0);
	// }

	parseQuery(query: any) {
		const object: any = {};
		if (query.indexOf('?') != -1) {
			query = query.split('?');
			query = query[1];
		}
		const parseQuery = query.split("&");
		for (var i = 0; i < parseQuery.length; i++) {
			const pair = parseQuery[i].split('=');
			const key = decodeURIComponent(pair[0]);
			if (key.length == 0) continue;
			const value = decodeURIComponent(pair[1].replace("+", " "));
			if (object[key] == undefined) object[key] = value;
			else if (object[key] instanceof Array) object[key].push(value);
			else object[key] = [object[key], value];
		}
		return object;
	}

	groupBy(arrayObjects: any[], key: string) {
		return arrayObjects.reduce(function (result, currentObject) {
			const val = currentObject[key]
			result[val] = result[val] || []
			result[val].push(currentObject)
			return result
		}, {})
	}

	convertHexToRGBA = (hexCode: string, opacity: number = 1) => {
		let hex = hexCode.replace('#', '');

		if (hex.length === 3) {
			hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
		}

		if (opacity > 1 && opacity <= 100) {
			opacity = opacity / 100;
		}

		return `rgba(${parseInt(hex.substring(0, 2), 16)},${parseInt(hex.substring(2, 4), 16)},${parseInt(hex.substring(4, 6), 16)},${opacity})`;
	};

	async blobToBase64(blob: Blob) {
		return new Promise((resolve, _) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.readAsDataURL(blob);
		});
	}
}
