
export class ProcessPaymentResponseDto {
    resultCode: string;
    status: string;
    authCode: string;
    processorResponseCode: string;
    transactionID: string;
    message: string;
    processor: string;
    returnUrl: string;
    referenceNumber: string;
    internalPaymentID: number;
    paymentID: number;
    paymentType: string;
    applicationID: number;
    applicationUID: string;
    projectID: number;
    projectUID: string;
    contractorID: number;
    amount: number;
    isAutoPermit: boolean;
    receivedDate: string;
    jurisdictionName: string;
    jurisdictionID: number;
    applicationNumber: string;
    applicationAddress: string;
    projectNumber: string;
    projectAddress: string;
}