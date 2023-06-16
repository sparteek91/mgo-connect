import { Injectable } from "@angular/core";


const LATEST_PUSH_NOTIFICATION_DATE_KEY: string = "MGO.LatestPushNotificationDate";

@Injectable()

export class LocalStorageService {

    constructor() {
        const value = localStorage.getItem(LATEST_PUSH_NOTIFICATION_DATE_KEY);
        if (!value) {
            this.setLatestPushNotificationDate(new Date());
        }
    }

    public getLatestPushNotificationDate(): Date {
        const value = localStorage.getItem(LATEST_PUSH_NOTIFICATION_DATE_KEY);
        return new Date(parseInt(value!));
    }

    public setLatestPushNotificationDate(value: Date): void {
        localStorage.setItem(LATEST_PUSH_NOTIFICATION_DATE_KEY, value.getTime().toString());
    }
}