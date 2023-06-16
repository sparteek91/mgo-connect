import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { ProcessPaymentResponseDto } from '../../models/payment-response-dto';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, from, Observable, pipe, throwError, UnaryFunction } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface IPushNotificationDtoRaw {
	workOrderID: number;
	textMessage: string;
	eventDate: string;
	entityID: number;
	isRead: boolean;
	isActionTriggered: boolean;
	pushNotificationMessageID: number;
	entityType: string;
}

export interface IPushNotificationCountDto {
	count: number;
	unReadCount: number;
}

export interface IPushNotificationDto {
	workOrderID: number;
	textMessage: string;
	eventDate: Date;
	entityID: number;
	isRead: boolean;
	isActionTriggered: boolean;
	pushNotificationMessageID: number;
	entityType: string;
}

export interface IPushNotificationStartResponseDtoRaw {
	eventDateCount: number;
	eventDateCountData: IPushNotificationCountDto;
	items: IPushNotificationDtoRaw[];
}

export interface IPushNotificationStartResponseDto {
	eventDateCount: number;
	eventDateCountData: IPushNotificationCountDto;
	items: IPushNotificationDto[];
}

export function toPushNotification(raw: IPushNotificationDtoRaw): IPushNotificationDto {
	return {
		...raw,
		eventDate: new Date(raw.eventDate)
	};
}

export function toPushNotificationStartResponse(raw: IPushNotificationStartResponseDtoRaw | any): IPushNotificationStartResponseDto {
	return {
		...raw,
		items: mapArray(raw.items, toPushNotification)
	};
}

export function mapArray<T, R>(data: T[], factory: (item: T) => R = (stub: any) => stub): R[] {
	if (!Array.isArray(data)) {
		if (typeof data !== 'undefined') {
			console.warn('Incorrect data for mapper, should be array instead', data);
		}

		return [];
	}

	return data.map((item) => factory(item));
}

export function restMap<T, R>(fn: (data: T) => R): UnaryFunction<Observable<T>, Observable<R>> {
	return pipe(
		map((data: T) => fn(data)),
		catchError((err) => {
			console.warn(err);
			return throwError(err);
		})
	);
}

// TODO merge with SignarService
@Injectable()

export class MainHubService {

	public readonly pushNotification$: BehaviorSubject<IPushNotificationDto> = new BehaviorSubject<IPushNotificationDto | any>(null);
	public readonly paymentGatewayPushNotification$: BehaviorSubject<ProcessPaymentResponseDto> = new BehaviorSubject<ProcessPaymentResponseDto | any>(null);
	private connection!: signalR.HubConnection | any;

	constructor() {
	}

	public init(userId: number): Observable<void> {
		if (this.connection) {
			this.connection.stop();
			this.connection = null;
		}
		return new Observable((observer) => {
			// TODO url from config
			this.connection = new signalR.HubConnectionBuilder()
				.withUrl(`${environment.baseApiUrl}/signalr/main`, {
					// .withUrl(`${environment.localApiUrl}/signalr/main`, {
					// TODO use jwt token
					accessTokenFactory: () => {
						return userId.toString()
					}
				})
				//.configureLogging(signalR.LogLevel.Trace)
				.build();
			Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
			this.connection.start()
				.then(() => {
					this.setSignalrClientMethods();
					observer.next();
				})
				.catch((error: any) => {
					observer.error();
				});
		});
	}

	public start(eventDate: Date, flag: string): Observable<IPushNotificationStartResponseDto> {
		return from(this.connection.invoke(flag, eventDate.toISOString())).pipe(
			restMap((data) => toPushNotificationStartResponse(data))
		);
	}

	// public startCp(eventDate: Date): Observable<IPushNotificationStartResponseDto> {
	// 	return from(this.connection.invoke("StartCp", eventDate.toISOString())).pipe(
	// 		restMap((data) => toPushNotificationStartResponse(data))
	// 	);
	// }

	private setSignalrClientMethods(): void {
		this.connection.on("PushNotification", (message: IPushNotificationDtoRaw) => {
			this.pushNotification$.next(toPushNotification(message));
		});

		this.connection.on("PaymentGatewayNotification", (message: ProcessPaymentResponseDto) => {
			this.paymentGatewayPushNotification$.next(message);
		});
	}

	private toUTC(date: Date): Date {
		return new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(),
			date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
	}

	getConnectID() {
		if (this.connection) {
			return this.connection.connectionId;
		}
		return null;
	}

	isConnected() {
		if (this.connection) {
			return this.connection.state === 'Connected'
		}
		return false;
	}
}



