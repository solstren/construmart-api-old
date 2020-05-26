import { AppConstants } from './../utils/app-constants';
import { SetMetadata } from '@nestjs/common';
// import { apply } from '@nestjs/common/decorators/core/';

// export function Auth(...roles: number[]) {
//     return applyDecorators
// }

export const Roles = (...roles: number[]) => SetMetadata(AppConstants.ROLES_DECORATOR_KEY, roles);