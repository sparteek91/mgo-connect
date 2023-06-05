import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../mock/users.service';

@Injectable({
    providedIn: 'root'
})

export class AuthHandlerService {
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        })
    };
    readonly #authenticated = new BehaviorSubject<boolean>(false);
    authenticated$ = this.#authenticated.asObservable();

    readonly #userId = new BehaviorSubject<number>(0);
    userId$ = this.#userId.asObservable();

    constructor(private http: HttpClient, private userService: UserService) { }

    public get authenticated(): boolean {
        return this.#authenticated.getValue();
    }

    public set authenticated(authenticated: boolean) {
        this.#authenticated.next(authenticated);
    }

    public get userId(): number {
        return this.#userId.getValue();
    }

    public set userId(userId: number) {
        this.#userId.next(userId);
    }

    getLoggedInUser(endPoint: string): Observable<any> {
        return this.http.get(endPoint, this.httpOptions).pipe(map((data: any) => {
            userInfo.data = data;
            return data;
        }));
    }
}

export const userInfo: any = {
    data: ''
}