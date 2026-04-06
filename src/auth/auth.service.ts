
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { EmployeeService } from '../employee/employee.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private EmployeeService: EmployeeService,private jwtService: JwtService) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.EmployeeService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const { password, ...result } = user;
    // TODO: Generate a JWT and return it here
    // instead of the user object
     const payload = { sub: user.id, username: user.email };
    return {
      // 💡 Here the JWT secret key that's used for signing the payload 
      // is the key that was passed in the JwtModule
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
