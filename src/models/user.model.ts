export class UserRegisterDTO {
    fullname: string;
    email: string;
    password: string;
    constructor(obj?: UserRegisterDTO)
    constructor(obj?: any) {
        this.fullname = obj?.fullname || '';
        this.email = obj?.email || '';
        this.password = obj?.password || '';
    }
}

export class UserLoginDTO {
    email: string;
    password: string;
    constructor(obj?: UserLoginDTO)
    constructor(obj?: any) {
        this.email = obj?.email || '';
        this.password = obj?.password || '';
    }
}

export class User {
    _id: string;
    fullname: string;
    email: string;
    password: string;
    constructor(obj?: User)
    constructor(obj?: any) {
        this.fullname = obj?.fullname || '';
        this._id = obj?._id || '';
        this.email = obj?.email || '';
        this.password = obj?.password || '';
    }
}

export class TokenAuthenticate{
    access_token: string;
    expires_in: number;
    constructor(obj?: TokenAuthenticate)
    constructor(obj?: any) {
        this.access_token = obj?.access_token || '';
        this.expires_in = obj?.expires_in || '';
    }
}