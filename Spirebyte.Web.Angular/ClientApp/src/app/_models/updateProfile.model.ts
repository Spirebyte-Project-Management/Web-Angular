import { AuthModel } from './auth.model';

export class ProfileModel {
    fullname: string;
    email: string;
    file: string;

    setProfile(user: any){
        this.fullname = user.fullname || '';
        this.email = user.email || '';
        this.file = user.file || '';
    }
}
