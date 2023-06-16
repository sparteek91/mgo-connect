export interface CreateAccountModel {
    UserID: number;
    Email: string;
    ConfirmEmail: string;
    Password: string;
    ConfirmPassword: string;
    FirstName: string;
    LastName: string;
    BusinessName: string;
    Phone1: number;
    Phone2: number;
    Phone3: number
    ChallengeQuestion: string;
    ChallengeAnswer: string;
    VerificationCode1: number;
    VerificationCode2: number
    VerificationCode: string;
}