import { environment } from "../../environments/environment";

export class API_Routes {
    public static apiBaseUrl: string = `${environment.baseApiUrl}/`;

    public static get cognitoUser(): string {
        return this.apiBaseUrl + "cognitouser/";
    }

    public static get prepoffline(): string {
        return this.apiBaseUrl + "jpv2/workorders/prepoffline/"; 
    }

    public static get createInspection(): string {
        return this.apiBaseUrl + "api/v3/jp/inspections/create-inspection/"; 
    }
}