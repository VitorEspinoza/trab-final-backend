import { SetMetadata } from '@nestjs/common';

export interface UserOwnsRouteGuardOptions {
    allowAdmin: boolean;
}

export const OPTIONS = 'options';
export const UserOwnsRouteOptions = (options: UserOwnsRouteGuardOptions) => SetMetadata(OPTIONS, options);