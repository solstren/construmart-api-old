import { AppConstants } from './../utils/app-constants';
import { Observable } from 'rxjs';
import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {

    constructor(private readonly _reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this._reflector.get<number[]>(AppConstants.ROLES_DECORATOR_KEY, context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        let foundRole: number = roles.find((val, i) => val == user.role);
        if (foundRole) {
            return true;
        }
        // for (const role of roles) {
        //     if (role == user.role) {
        //         return true;
        //     }
        // }
        return false;
    }
}