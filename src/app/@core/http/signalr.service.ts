import { Injectable } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable()

export class SignalrService {

    connection!: signalR.HubConnection;
    joinRoomInfo: BehaviorSubject<string>;
    sendMessageInfo: BehaviorSubject<string>;
    projectChangeInfo: BehaviorSubject<string>;
    processing!: boolean;

    constructor() {
        this.projectChangeInfo = new BehaviorSubject<string>('');
        this.sendMessageInfo = new BehaviorSubject<string>('');
        this.joinRoomInfo = new BehaviorSubject<string>('');
    }

    public initiateSignalrConnection(): Promise<void> {
        return new Promise((resolve, reject) => {
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl(`${environment.baseApiUrl}/signalr/project`)
                // .withUrl(`${environment.localApiUrl}/signalr/project`)
                // .configureLogging(signalR.LogLevel.Trace)
                .build();

            Object.defineProperty(WebSocket, 'OPEN', { value: 1, });
            this.connection.start()
                .then(() => {
                    this.setSignalrClientMethods();
                    resolve();
                })
                .catch((error) => {
                    reject();
                });
        });
    }

    private setSignalrClientMethods(): void {

        this.connection.on("JoinRoom", (message: string) => {
            this.joinRoomInfo.next(message);
        });

        this.connection.on("SendMessage", (user: string, roomName: string, message: string) => {
            this.sendMessageInfo.next(message);
        });

        this.connection.on('ReceiveMessage', (user: string, message: string) => {
            this.projectChangeInfo.next(message);
        });
    }

    joinRoom(roomName: string): void {
        this.processing = true;
        if (this.connection) {
            this.connection.invoke('JoinRoom', roomName)
                .then(() => {
                    this.processing = false;
                })
                .catch(() => {
                }
                );
        }
    }

    sendMessage(user: string, roomName: string, message: string): void {
        this.processing = true;
        if (this.connection) {
            this.connection.invoke('SendMessage', user, roomName, message)
                .then(() => {
                    this.processing = false;
                })
                .catch(() => {
                }
                );
        }
    }

    leaveRoom(roomName: string): void {
        this.processing = true;
        if (this.connection) {
            this.connection.invoke('LeaveRoom', roomName)
                .then(() => {
                    this.processing = false;
                })
                .catch(() => {
                }
                );
        }
    }
}