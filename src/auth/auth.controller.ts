import { Controller, Get, HttpException, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService,) {}

    @Post('register')
    async register(@Request() req): Promise<string>{
        const credentials = req.body;
        console.table(credentials)
        if (!credentials) throw new HttpException('Body is missing', HttpStatus.BAD_REQUEST);
        return await this.authService.register(credentials);
    }
}
