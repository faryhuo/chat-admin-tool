import axios from 'axios';
import JSEncrypt from 'jsencrypt';
import apiSetting  from './APISetting';
const USER_TOKEN_KEY = "admin-user-token"

export { USER_TOKEN_KEY }

export interface IUserProflie {
    userId: string;
    userName: string;
    password: string;
    isLogin: boolean;
    pageOpen: boolean;
    login: (userId: string, password: string) => void;
    resetPwd: (userId: string, password: string, code: string) => Promise<any>;
    currentUser: string;
    token: string;
    logout: () => void;
    sentSMSCode: (phone: string) => Promise<any>;
    signup: (userId: string, password: string, code: string) => Promise<any>;
    checkUserIfExisting: (userId: string) => Promise<any>;
    openPage: () => void;
    closePage: () => void;
}
export interface IModules {
    id: string;
    component?: string;
    enable: boolean;
    path?: string;
    mobileOnly?: boolean;
    pcOnly?: boolean;

}
class UserProflie implements IUserProflie {

    userId = ""
    userName = ""
    password = ""
    group=""
    isLogin = false
    publicKey = "";
    token = "";


    modules: IModules[] = [];
    pageOpen = false;
    openPage() {
        this.pageOpen = true;
    }
    closePage() {
        this.pageOpen = false;
    }

    constructor(){
        this.token=localStorage[USER_TOKEN_KEY];
    }

    getUserInfo(){
        return {
            userid:this.userId,
            name:this.userName,
            group:this.group,
            isLogin:this.isLogin,
            access:this.group
        }
    }


    async login(userId: string, password: string) {
        this.userId = userId;
        this.password = password;
        const promise = new Promise((resolve, reject) => {
            this.getPulicKey().then(() => {
                const queryUrl = apiSetting.loginUrl;
                const params = {
                    "phone": this.userId,
                    "password": this.encrypt(this.password)
                };
                axios({
                    method: "post",
                    url: queryUrl,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: JSON.stringify(params)
                }
                ).then((response) => {
                    if (response.data.statusCode === 0) {
                        this.token = response.data.data;
                        this.isLogin = true;
                        localStorage[USER_TOKEN_KEY] = this.token;
                        this.loginByToken();
                        resolve(true)
                    } else if (response.data.errors.message) {
                        const errorMsg = ("api." + response.data.errors.message);
                        reject(errorMsg)
                    } else {
                        reject(("Fail to login"));
                    }
                });
            })
        });
        return promise;
    }

    resetPwd(userId: string, password: string, code: string) {
        const promise = new Promise((resolve, reject) => {
            this.getPulicKey().then(() => {
                const queryUrl = apiSetting.signUpUrl;
                const params = {
                    "phone": userId,
                    "password": this.encrypt(password),
                    "smsCode": code
                };
                axios({
                    method: "put",
                    url: queryUrl,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: JSON.stringify(params)
                }
                ).then((response) => {
                    if (response.data.statusCode === 0 && response.data.data) {
                        this.login(userId, password);
                        resolve(response.data.data)
                    } else if (response.data.errors.message) {
                        const errorMsg = ("api." + response.data.errors.message);
                        reject(errorMsg)
                    } else {
                        reject(("Fail to Reset password"));
                    }
                });
            })
        })
        return promise;
    }

    signup(userId: string, password: string, code: string) {
        const promise = new Promise((resolve, reject) => {
            this.getPulicKey().then(() => {
                const queryUrl = apiSetting.signUpUrl;
                const params = {
                    "phone": userId,
                    "password": this.encrypt(password),
                    "smsCode": code
                };
                axios({
                    method: "post",
                    url: queryUrl,
                    headers: {
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: JSON.stringify(params)
                }
                ).then((response) => {
                    if (response.data.statusCode === 0 && response.data.data) {
                        this.login(userId, password);
                        resolve(response.data.data)
                    } else if (response.data.errors.message) {
                        const errorMsg = ("api." + response.data.errors.message);
                        reject(errorMsg)
                    } else {
                        reject("Fail to signup");
                    }
                });
            })
        })
        return promise;
    }

    logout() {
        this.token = "";
        this.isLogin = false;
        this.userId = "";
        this.userName = "";
        localStorage[USER_TOKEN_KEY] = "";
    }

    get currentUser() {
        if (this.userName) {
            return this.userName;
        } else {
            return ("Login");
        }
    }

    premission = ["chat", "config", "tips"];


    hasToken(){
        return !!localStorage[USER_TOKEN_KEY];
    }

    loginByToken() {
        const queryUrl = apiSetting.userInfoUrl
        return axios({
            method: "get",
            url: queryUrl,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'token': this.token
            }
        }
        ).then((response) => {
            const data = response.data;
            console.log(response.data);
            if (data.statusCode === 0) {
                if(data.data.group!=="admin"){
                    localStorage[USER_TOKEN_KEY] = "";
                    return;
                }
                this.isLogin = true;
                this.userName = data.data.name;
                this.userId = data.data.userId;
                this.group=data.data.group;
            } else {
                //alert('The login token is expired. Please login it again if need.')
                localStorage[USER_TOKEN_KEY] = "";
            }
        });
    }

    getPulicKey() {
        const queryUrl = apiSetting.publicKeyUrl;
        const promise = new Promise((resolve, reject) => {
            if (this.publicKey) {
                resolve(this.publicKey);
            }
            axios({
                method: "get",
                url: queryUrl,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            ).then((response) => {
                if (response.data.statusCode === 0) {
                    this.publicKey = response.data.data;
                    resolve(this.publicKey);
                }
            });
        });
        return promise;
    }

    checkUserIfExisting(userId: string) {
        const queryUrl = apiSetting.checkUserIfExistingUrl;
        const promise = new Promise((resolve, reject) => {
            if (this.publicKey) {
                resolve(this.publicKey);
            }
            axios({
                method: "get",
                url: queryUrl + "/" + userId,
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                }
            }
            ).then((response) => {
                if (response.data.statusCode === 0) {
                    resolve(response.data.data);
                } else {
                    reject(false)
                }
            });
        });
        return promise;
    }

    sentSMSCode(phone: string) {
        return axios({
            method: "get",
            url: apiSetting.sentSmsCodeUrl + phone,
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'token': this.token
            }
        }
        );
    }


    encrypt(text: string) {
        const encrypt = new JSEncrypt({ default_key_size: '2048' });
        encrypt.setPublicKey(this.publicKey);
        const encrypted = encrypt.encrypt(text);
        return encrypted;
    }


    fetchModulesData() {
        const self = this;
        return axios({
            method: "get",
            url: apiSetting.moduleUrl + "?uuid=" + new Date().getTime(),
            headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }
        ).then((response) => {
            if (response.data) {
                const data = response.data;
                if (data.data) {
                    self.modules = data.data;
                }
            }
        });
    }
}

const userProflie = new UserProflie();
export default userProflie;