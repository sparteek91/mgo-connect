import { environment } from "../../environments/environment";

export class API_Routes {
    public static apiBaseUrl: string = `${environment.baseApiUrl}/`;
    public static mobileApiUrl: string = `${environment.mobileApiUrl}/`;

    public static get cognitoUser(): string {
        return this.apiBaseUrl + "cognitouser/";
    }

    public static get prepoffline(): string {
        return this.apiBaseUrl + "jpv2/workorders/prepoffline/"; 
    }

    public static get createInspection(): string {
        return this.apiBaseUrl + "api/v3/jp/inspections/create-inspection/"; 
    }

    public static get getStates(): string {
        return this.mobileApiUrl + "helper/getstates/"; 
    }

    public static get getJurisdictions(): string {
        return this.mobileApiUrl + "helper/getjurisdictions/"; 
    }

    public static get contact(): string {
        return this.apiBaseUrl + "contactform"; 
    }
}