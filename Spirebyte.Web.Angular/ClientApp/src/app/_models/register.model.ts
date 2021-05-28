export class RegisterModel {
    username: string;
    password: string;
    email: string;

    setRegisterModel(register: any){
        this.username = register.username || '';
        this.password = register.password || '';
        this.email = register.email || '';
    }
}
