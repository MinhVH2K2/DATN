import { t } from "i18next";

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

export class UserModel {
    id?: string;
    fullName?: string;
    phoneNumber?: string;
    constructor(id?: string, fullName?: string, phoneNumber?: string){
        this.id = id;
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
    }
}