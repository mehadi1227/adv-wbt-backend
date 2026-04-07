import { Body, Controller, HttpCode, HttpStatus, Post, Res, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminAuthService } from "./auth.service";
import express from "express";
import { LoginUserDTO, UserDTO } from "src/admin/user.dto";

@Controller('admin_auth')
export class AdminAuthController {
    constructor(private readonly authService: AdminAuthService){}

    @HttpCode(HttpStatus.OK)
    @UsePipes(new ValidationPipe())
    @Post()
    login(@Body() credentials: LoginUserDTO, @Res({ passthrough: true }) res: express.Response): Promise<{message: string}> {
        return this.authService.Login(credentials.email, credentials.password, res);
    }
}