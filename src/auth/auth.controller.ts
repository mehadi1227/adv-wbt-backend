import { Body, Controller, Post, Res } from "@nestjs/common";
import { AuthService } from "./auth.service";
import express from "express";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('login')
    login(@Body("email") email: string, @Body("password") password: string, @Res({ passthrough: true }) res: express.Response): Promise<object> {
        return this.authService.Login(email, password, res);
    }
}