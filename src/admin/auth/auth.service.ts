import { BadRequestException, Injectable, Res } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import express from "express";

@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private jwtService: JwtService) { }

    async Login(email: string, password: string, @Res({ passthrough: true }) res: express.Response): Promise<{message: string}> {

        const user = await this.userRepository.findOne({ where: { email }, relations: {profile:true} });

        if (user) {
            const validatePassword = await bcrypt.compare(password, user.password);
            if (validatePassword) {

                const payload = { email: user.email, sub: {userId: user.id, profileId: user.profile.id}, role: user.role };
                const token = this.jwtService.sign(payload);
                res.cookie("access_token", token, {    httpOnly: true,    sameSite: "none",   secure: false,   path: "/",   maxAge: 300 * 60 * 1000,  });

                return { message: "Login successful" };
            }

            throw new BadRequestException("Invalid  password");
        }

        throw new BadRequestException("Invalid email or password");
    }
}