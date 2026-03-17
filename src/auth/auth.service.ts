import { Injectable, Res, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../user.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import express from "express";
import { UserDTO } from "src/user.dto";

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService) { }

    async Login(email: UserEntity["email"], password: UserEntity["password"], @Res({ passthrough: true }) res: express.Response): Promise<{message: string}> {

        const user = await this.userRepository.findOne({ where: { email } });

        if (user) {
            const validatePassword = await bcrypt.compare(password, user.password);
            if (validatePassword) {

                const payload = { email: user.email, sub: user.id, role: user.role };
                const token = this.jwtService.sign(payload);
                res.cookie("access_token", token, {    httpOnly: true,    sameSite: "none",   secure: false,   path: "/",   maxAge: 300 * 60 * 1000,  });

                return { message: "Login successful" };
            }

            throw new UnauthorizedException("Invalid  password");
        }

        throw new UnauthorizedException("Invalid email or password");
    }
}