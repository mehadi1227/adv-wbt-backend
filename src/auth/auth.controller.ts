import { Body, Controller, HttpCode, HttpStatus, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import express from "express";
import { LoginUserDTO, UserDTO } from "src/user.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    @Post()
    login(@Body() credentials: LoginUserDTO, @Res({ passthrough: true }) res: express.Response): Promise<{message: string}> {
        return this.authService.Login(credentials.email, credentials.password, res);
    }
}