export class RegisterModel {
    fullname: string;
    password: string;
    email: string;

    setRegisterModel(register: any){
        this.fullname = register.fullname || '';
        this.password = register.password || '';
        this.email = register.email || '';
    }
}
