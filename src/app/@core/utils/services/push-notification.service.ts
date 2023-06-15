import { Injectable, OnDestroy } from "@angular/core";
import { HttpHandlerService } from "../../http/http-handler.service";
import { SignalrService } from "../../../@core/http/signalr.service";
import { BehaviorSubject, Subscription } from "rxjs";
import { finalize, tap } from "rxjs/operators";
import { LocalStorageService } from "./local-storage.service";
import { IPushNotificationDto, IPushNotificationDtoRaw, IPushNotificationStartResponseDto, MainHubService, mapArray, restMap, toPushNotification } from "./main-hub.service";
import { API_Routes } from "../../../@routes";
import { UserService } from "../../mock/users.service"


export class PushNotificationItem {

    public get timeAgo(): string {
        var currentDate = new Date();
        const inDays = this.inDays(this.eventDate, currentDate);
        if (inDays > 0)
            return `${inDays} days ago`;
        const inHours = this.inHours(this.eventDate, currentDate);
        if (inHours > 0)
            return `${inHours} hours ago`;
        const inMinutes = this.inMinutes(this.eventDate, currentDate);
        if (inMinutes > 0)
            return `${inMinutes} minutes ago`;
        const inSeconds = this.inSeconds(this.eventDate, currentDate);
        return `${inSeconds} seconds ago`;
    }

    constructor(
        public readonly workOrderID: number,
        public textMessage: string,
        public eventDate: Date,
        public entityID: number,
        public isRead: boolean,
        public isActionTriggered: boolean,
        public pushNotificationMessageID: number,
        public entityType: string,
    ) {
    }

    private inDays(d1: Date, d2: Date): number {
        const t2 = d2.getTime();
        const t1 = d1.getTime();
        return Math.floor((t2 - t1) / (24 * 3600 * 1000));
    }

    private inHours(d1: Date, d2: Date): number {
        const t2 = d2.getTime();
        const t1 = d1.getTime();
        return Math.floor((t2 - t1) / 3600000);
    }

    private inMinutes(d1: Date, d2: Date): number {
        const t2 = d2.getTime();
        const t1 = d1.getTime();
        return Math.floor((t2 - t1) / 60000);
    }

    private inSeconds(d1: Date, d2: Date): number {
        const t2 = d2.getTime();
        const t1 = d1.getTime();
        return Math.floor((t2 - t1) / 1000);
    }

}

@Injectable()
export class PushNotificationService implements OnDestroy {


    public readonly pushNotificationsItems$ = new BehaviorSubject<PushNotificationItem[]>([]);

    public readonly pushNotificationCount$ = new BehaviorSubject<number>(0);
    public readonly pushNotificationUnreadCount$ = new BehaviorSubject<number>(0);

    private pushNotificationsDict: { [key: string]: boolean } = {};
    private currentPage!: number;
    private userId!: number;
    private initDataLoadingCount: number = 0;
    private isNextPageLoading: boolean = false;
    private readonly pageSize: number = 10; // to change pageSize - change service side too
    private readonly onPushSubscription: Subscription;

    private get isInitDataLoading(): boolean {
        return this.initDataLoadingCount > 0;
    };

    private static requestId: number = 0;

    constructor(private readonly signalrService: SignalrService,
        private readonly httpService: HttpHandlerService,
        private readonly localStorageService: LocalStorageService,
        private readonly mainHubService: MainHubService,
        private readonly userService: UserService
    ) {

        this.onPushSubscription = this.mainHubService.pushNotification$.subscribe((data: any) => {
            if (this.isInitDataLoading)
                return;
            if (!data)
                return;

            this.addNotifications([data]);

            let countValue = this.pushNotificationCount$.getValue();
            ++countValue;
            this.pushNotificationCount$.next(countValue);
            let unReadCountValue = this.pushNotificationUnreadCount$.getValue();
            this.pushNotificationUnreadCount$.next(++unReadCountValue);
        });
    }

    ngOnDestroy(): void {
        this.onPushSubscription.unsubscribe();
    }

    public init(userId: number, isCP = false): void {
        this.userId = userId;
        ++PushNotificationService.requestId;
        this.currentPage = 0;
        this.pushNotificationsItems$.next([]);
        this.pushNotificationCount$.next(0);
        this.pushNotificationUnreadCount$.next(0);
        this.pushNotificationsDict = {};

        this.loadData(isCP);
    }

    public reset(): void {
        this.localStorageService.setLatestPushNotificationDate(new Date());
        this.pushNotificationCount$.next(0);
        this.pushNotificationUnreadCount$.next(0);
    }

    public nextPage(userId: any = null): void {
        // TODO maybe rxjs can help to remove isNextPageLoading
        if (this.isInitDataLoading)
            return;
        if (this.isNextPageLoading)
            return;

        const previousRequestId = PushNotificationService.requestId;
        ++this.currentPage;
        this.isNextPageLoading = true;

        let endpoint!: string;
        if (userId) {
            endpoint = `${API_Routes.apiBaseUrl + API_Routes.jpv2Notification + userId}/cppush/${this.currentPage}`
        } else {
            endpoint = `${API_Routes.apiBaseUrl + API_Routes.jpv2Notification + this.userService.getCurrentUser().UserID}/push/${this.currentPage}`;
        }
        this.httpService.get(endpoint).pipe(restMap((data: IPushNotificationDtoRaw[]) => mapArray(data, toPushNotification)), tap((data: IPushNotificationDto[]) => {
            if (previousRequestId !== PushNotificationService.requestId)
                return;
            if (this.isInitDataLoading)
                return;
            if (data.length === 0) {
                --this.currentPage;
                return;
            }
            this.addNotifications(data);
        }),
            finalize(() => {
                this.isNextPageLoading = false;
            })
        ).subscribe();
    }

    private loadData(isCP = false): void {
        const lastEventDate = this.localStorageService.getLatestPushNotificationDate();
        const fun = isCP ? this.mainHubService.start(lastEventDate, "StartCp") : this.mainHubService.start(lastEventDate, "Start");

        this.initDataLoadingCount = 0;
        ++this.initDataLoadingCount;
        const previousRequestId = PushNotificationService.requestId;

        this.mainHubService.init(this.userId).pipe(
            tap(() => {
                fun.pipe(tap((data: IPushNotificationStartResponseDto) => {
                    if (previousRequestId !== PushNotificationService.requestId)
                        return;
                    this.pushNotificationCount$.next(data.eventDateCountData.count);
                    this.pushNotificationUnreadCount$.next(data.eventDateCountData.unReadCount);
                    this.addNotifications(data.items);
                }), finalize(() => {
                    if (previousRequestId !== PushNotificationService.requestId)
                        return;
                    --this.initDataLoadingCount;
                })).subscribe();
            })
        ).subscribe();
    }

    private addNotifications(data: IPushNotificationDto[]): void {
        const items = this.pushNotificationsItems$.getValue();
        const newItems = data.map((t) => this.toPushNotificationItem(t));
        for (let i = 0; i < newItems.length; i++) {
            const newItem = newItems[i];
            const eventKey = `${newItem.workOrderID},${newItem.eventDate.getTime()},${newItem.textMessage}`;
            if (this.pushNotificationsDict[eventKey])
                continue;
            this.pushNotificationsDict[eventKey] = true;
            items.push(newItem);
        }
        items.sort((a, b) => this.sortWorkOrders(a, b));

        this.pushNotificationsItems$.next(items);

        this.currentPage = Math.floor(items.length / this.pageSize) - 1;
        if (this.currentPage < 0)
            this.currentPage = 0;
    }

    private toPushNotificationItem(value: IPushNotificationDto): PushNotificationItem {
        return new PushNotificationItem(value.workOrderID, value.textMessage, value.eventDate, value.entityID, value.isRead, value.isActionTriggered, value.pushNotificationMessageID, value.entityType);
    }

    private sortWorkOrders(a: PushNotificationItem, b: PushNotificationItem): number {
        if (a.eventDate === b.eventDate) {
            return a.workOrderID < b.workOrderID ? 1 : -1;
        }
        return a.eventDate < b.eventDate ? 1 : -1;
    }
}
