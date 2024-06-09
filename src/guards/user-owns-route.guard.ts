import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Role } from "@prisma/client";
import { OPTIONS, UserOwnsRouteGuardOptions } from "../decorators/user-owns-route-options.decorator";
import { Reflector } from "@nestjs/core";

@Injectable()
export class UserOwnsRouteGuard implements CanActivate{
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext) {
        const options = this.reflector.get<UserOwnsRouteGuardOptions>(OPTIONS, context.getHandler());
        const request = context.switchToHttp().getRequest();
      
        try {
            if(options.allowAdmin && request.user.role === Role.ADMIN)
                return true;

            const routeId = request.params.id;
            
            if(!routeId) 
                return true;

            if (request.user.userId !== routeId && request.user.associate.associateId !== routeId) 
                return false;
            
            return true;
        } 
        catch(e) {
            return false;
        }
    }
}