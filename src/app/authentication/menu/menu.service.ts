import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable()
export class MenuService {
    private fragment = new BehaviorSubject<string>('');

    getFragment(): Observable<string> {
        return this.fragment.asObservable();
    }

    setFragment(fragment: any) {
        this.fragment.next(fragment);
    }
}