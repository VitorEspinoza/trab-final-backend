import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class UserOwnsRouteGuard implements CanActivate{
    constructor() {}

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
      
        try {
            const routeId = Number(request.params.id);

            if(!routeId) 
                return true;

            if (request.user.userId !== routeId) 
                return false;
            
            return true;
        } 
        catch(e) {
            return false;
        }
    }
}