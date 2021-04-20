import { AuthService } from '@services/auth/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(postData: any): Promise<any>;
}
