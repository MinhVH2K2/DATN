export class LoginRequest {
    userName?: string;
    passWord?: string;
    remember?: boolean;
    constructor(userName?: string, passWord?: string, remember?: boolean) {
        this.userName = userName;
        this.passWord = passWord;
        this.remember = remember;
    };
}