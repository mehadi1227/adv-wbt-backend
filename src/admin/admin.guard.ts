
import {
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const token = this.extractToken(request);
        if (!token) {
            throw new UnauthorizedException();
        }
        try {
            // 💡 Here the JWT secret key that's used for verifying the payload 
            // is the key that was passsed in the JwtModule
            const payload = await this.jwtService.verifyAsync(token);
            // 💡 We're assigning the payload to the request object here
            // so that we can access it in our route handlers
            request['user'] = payload;
            //   console.log("payload: ", payload);
            if (payload.role !== 'admin') {
                throw new ForbiddenException();
            }
        } catch(exception) {
            // console.error("AdminGuard error: ", exception);
            if(exception instanceof ForbiddenException) {
                throw new ForbiddenException({message:"only admins can access", status: 403});
            }
            throw new UnauthorizedException();
        }
        return true;
    }

    private extractToken(request: Request): string | undefined {

        const tokenFromCookie = request.cookies?.['access_token'];
        if (tokenFromCookie) {
            return tokenFromCookie;
        }
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }
}
