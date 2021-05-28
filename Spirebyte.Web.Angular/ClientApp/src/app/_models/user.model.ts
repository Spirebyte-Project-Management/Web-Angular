import { AuthModel } from './auth.model';

export class UserModel extends AuthModel {
    id: string;
    fullname: string;
    password: string;
    email: string;
    pic: string;
    role: string;

    setUser(user: any){
        this.id = user.id;
        this.fullname = user.fullname || '';
        this.password = user.password || '';
        this.email = user.email || '';
        this.pic = user.pic || '';
    }
}
