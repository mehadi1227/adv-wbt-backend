
import { Body, Controller, Post, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import express from 'express';

@Controller('auth')
export class AuthController {
  
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: Record<string, any>,
  @Res({ passthrough: true }) res: express.Response) {
      const result = await this.authService.signIn(signInDto.username, signInDto.password);
      res.cookie("access_token", result.access_token, {  
        httpOnly: true, 
        sameSite: "none", 
        secure: false, 
        path: "/",maxAge: 300 * 60 * 1000, // 300 mins
        }); 
        return { message: "Login successful" };
    
  }
}
