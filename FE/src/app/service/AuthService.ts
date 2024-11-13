import axios from "axios";
import { ApiUrlUtil } from "../utils/apiUrlUtil";
import { LoginRequest } from "../model/LoginModel";

export class AuthService {
    private static _rankService: AuthService;

    public static getInstance(): AuthService {
        if (!AuthService._rankService) {
            AuthService._rankService = new AuthService();
        }
        return AuthService._rankService;
    }

    public login(request: LoginRequest) {
        const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_MAIN_URL + '/log-in');
        return axios.post(url, request);
    }

    // public getList(request: any) {
    //     const params: RequestParam[] = ParamUtil.toRequestParams(request);
    //     const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/notification/getList', params);
    //     return axios.get(url, {
    //         headers: HeadersUtil.getHeadersAuth(),
    //     });
    // }

    // public update(request: any) {
    //     const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/notification/update');
    //     return axios.post(url, request, {
    //         headers: HeadersUtil.getHeadersAuth(),
    //     });
    // }

    // public add(request: any) {
    //     const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/notification/add');
    //     return axios.post(url, request, {
    //         headers: HeadersUtil.getHeadersAuth(),
    //     });
    // }

    // public delete(id: any) {
    //     return axios.post(process.env.REACT_APP_API_URL + '/notification/delete', id, {
    //         headers: HeadersUtil.getHeadersAuth(),
    //     });
    // }

    // public getLstNotice(request: any) {
    //     const params: RequestParam[] = ParamUtil.toRequestParams(request);
    //     const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/notice/getLst', params);
    //     return axios.get(url, {
    //         headers: HeadersUtil.getHeadersAuth(),
    //     });
    // }

    // public insMarkRead(request: any) {
    //     const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/notice/mark-read');
    //     return axios.post(url, request, {
    //         headers: HeadersUtil.getHeadersAuth(),
    //     });
    // }

    // public markAllRead() {
    //     const url = ApiUrlUtil.buildQueryString(process.env.REACT_APP_API_URL + '/notice/mark-all-read');
    //     return axios.get(url, {
    //         headers: HeadersUtil.getHeadersAuth(),
    //     });
    // }

    // public _receiveMess = new Subject();
    // public receiverNoticeDto(messDto: any) {
    //     AuthService._rankService._receiveMess.next(messDto);
    // }
}