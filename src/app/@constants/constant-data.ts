import { environment } from "../../environments/environment";

export enum MenuItemNameEnum {
    Home = 'Home',
    ProjectsAndRequests = 'Projects',
    Inspections = 'Inspections',
    ContractorLicenses = 'Contractors',
    Contact = 'Support',
    Login = 'Login',
    NewAccount = 'New Account',
    Default = ''
}

export const CpSectionConst = {
    PermitSectionID: 1,
    ReportAnIssueSectionID: 3,
    PlaningAndZoningSectionID: 2
}

export const FullSuffixList = [
    {
        name: '-Select Suffix-',
        code: ''
    },
    {
        name: 'I',
        code: 'I'
    },
    {
        name: 'II',
        code: 'II'
    },
    {
        name: 'III',
        code: 'III'
    },
    {
        name: 'IV',
        code: 'IV'
    },
    {
        name: 'V',
        code: 'V'
    },
    {
        name: 'Jr.',
        code: 'Jr.'
    },
    {
        name: 'Sr.',
        code: 'Sr.'
    },
    {
        name: 'P.E..',
        code: 'P.E.'
    },
    {
        name: 'Ph.D.',
        code: 'Ph.D.'
    }
];


export const ApplicationQuestionnaireFileUploadTypeList = [{ label: 'I am not sure.', value: -1 },
{ label: 'I have included my files.', value: 1 },
{ label: 'I will email my files.', value: 2 },
{ label: 'I will bring my files to the office.', value: 4 }];


export const allowedExtensionForApplicationUpload = '.jpeg,.jpg, .png,.pdf,.xls,.xlsx,.doc,.dot,.docx,.ppt,.pptx,.zip,.zipx,.dwg';
export const allowedExtensionForApplicationImageUpload = '.jpeg,.jpg, .png';
export const allowedExtensionForApplicationFileUpload = '.pdf,.xls,.xlsx,.doc,.dot,.docx,.ppt,.pptx,.zip,.zipx,.dwg';
export const AllowedExtensionForProjectUpload = '.jpeg,.jpg, .png,.pdf,.xls,.xlsx,.doc,.dot,.docx,.ppt,.pptx,.zip,.zipx,.dwg';

export const CpMenuItems: Array<any> = [
    {
        label: 'APPLY FOR PERMIT',
        routerLink: `${environment.siteUrl}/cp/project-type?SectionID=${CpSectionConst.PermitSectionID}`,
        Link: 'databind:UI.navigation.applyonline',
        // queryParams: { SectionID: 1 },
        Children: [],
        sort: -1,
        isLoginRequired: true
    },
    {
        label: 'SEARCH PERMITS',
        routerLink: `${environment.siteUrl}/cp/search-permits`,
        Link: 'databind:UI.navigation.search',
        Children: [],
        sort: -1,
        isLoginRequired: true
    },
    {
        label: 'REPORT AN ISSUE',
        routerLink: `${environment.siteUrl}/cp/project-type?SectionID=${CpSectionConst.ReportAnIssueSectionID}`,
        Link: 'databind:UI.navigation.solutioncenterapplyonline',
        // queryParams: { SectionID: 3 },
        Children: [],
        sort: -1,
        isLoginRequired: true
    },
    {
        label: 'APPLY FOR PLANNING AND ZONING',
        routerLink: `${environment.siteUrl}/cp/project-type?SectionID=${CpSectionConst.PlaningAndZoningSectionID}`,
        // queryParams: { SectionID: 2 },
        Link: 'databind:UI.navigation.planningapplyonline',
        Children: [],
        sort: -1,
        isLoginRequired: true
    },
    {
        label: 'SEARCH PLANNING AND ZONING',
        routerLink: `${environment.siteUrl}/cp/search-planning-and-zoning`,
        Link: 'databind:UI.navigation.searchplanning',
        Children: [],
        sort: -1,
        isLoginRequired: true
    }
];


export const CpGlobalMenuSystemConst = {
    SolutionCenterDashboardApplyOnline: 'databind:app.Dashboard.UI.navigation.solutioncenterapplyonline',
    ApplyOnline: 'databind:UI.navigation.applyonline',
    PlanningApplyOnline: 'databind:UI.navigation.planningapplyonline',
    Search: 'databind:UI.navigation.search',
    SearchPlanning: 'databind:UI.navigation.searchplanning',
    SolutionCenterApplyOnline: 'databind:UI.navigation.solutioncenterapplyonline'
}

export const CpTopNonPublicMenuItems = [
    {
        id: '1',
        url: '/cp/portal',
        description: MenuItemNameEnum.Home,
        isExternal: false,
    },
    {
        id: '2',
        url: '/cp/my-projects',
        description: MenuItemNameEnum.ProjectsAndRequests,
        isExternal: false,
    },
    {
        id: '3',
        url: '/cp/pending-inspections',
        description: MenuItemNameEnum.Inspections,
        isExternal: false,
    },
    {
        id: '4',
        url: '/cp/contractor-licenses',
        description: MenuItemNameEnum.ContractorLicenses,
        isExternal: false,
    },
    {
        id: '5',
        url: `${environment.myGovernmentOnlineOrg}/#contactus`,
        description: MenuItemNameEnum.Contact,
        isExternal: true,
    }
];

export const CpTopPublicMenuItems = [
    {
        id: '1',
        url: '/cp/portal',
        description: MenuItemNameEnum.Home,
        isExternal: false,
    },
    {
        id: '2',
        url: '/cp/login',
        description: MenuItemNameEnum.Login,
        isExternal: false,
    },
    {
        id: '3',
        url: '/cp/info-account',
        description: MenuItemNameEnum.NewAccount,
        isExternal: false,
    },
    {
        id: '4',
        url: `${environment.myGovernmentOnlineOrg}/#contactus`,
        description: MenuItemNameEnum.Contact,
        isExternal: true,
    }
];


export const AllowedFileSizeToUpload = 524288000; // 500 MB


export const ExternalJavaScriptRef = {
    PAYSAFE: 'https://hosted.paysafe.com/js/v1/latest/paysafe.min.js',
    NMIPaymentGateway: 'https://secure.nmi.com/token/Collect.js',
    GlobalPayments: 'https://js.paygateway.com/secure_payment/v1/globalpayments.js',
    BridgePayTest: 'https://www.bridgepaynetsecuretest.com/Bridgepay.WebSecurity/TokenPay/js/tokenPay.js',
    BridgePayProd: 'https://www.bridgepaynetsecuretx.com/Bridgepay.WebSecurity/TokenPay/js/tokenPay.js',
    ElavonConvergePayTest: 'https://api.demo.convergepay.com/hosted-payments/Checkout.js',
    ElavonConvergePayProd: 'https://api.convergepay.com/hosted-payments/Checkout.js',
    AuthorizeNetTest: 'https://jstest.authorize.net/v3/AcceptUI.js',
    AuthorizeNetProd: 'https://js.authorize.net/v1/Accept.js',
}

export const ThirdPartyUrlConstant = {
    VictoriaTaxesMap: 'https://maps.victoriatx.org'

};


export const ApplicationAdddressTypeOptions = {
    Address: "address",
    SurveyDescription: 'surveydescription',
    LegalDescription: 'legaldescription',
    TaxMapDescription: 'taxmapdescription',
    MapLocation: 'maplocation'
}

export const PaymentProcessorOperatingModeConstant = {
    production: "PRODUCTION",
    demo: "DEMO"
}

export const ProcessorModuleCodeConstant = {
    Mgoc: "MGOC",
    Mgo: 'MGO'
};
