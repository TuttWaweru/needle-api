import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { LoginCredential, LoginInput, RegisterInput } from './dto/auth.input';
import { UserInput } from 'src/user/dto/user.input';

@Injectable()
export class AuthService {
    constructor (
        readonly userService: UserService,
    ) {}

    async signIn(username: string, pass: string): Promise<any> {
        const user = await this.userService.find(username);
        if (user?.password !== pass) {
          throw new UnauthorizedException();
        }
        const { password, ...result } = user;
        // TODO: Generate a JWT and return it here
        // instead of the user object
        return result;
    }
    
    async register (credential: any): Promise<any> {
        return credential
    }

    // /**
    //  * Validates the passed user credentials
    //  * 
    //  * @param guest LoginInput
    //  * @returns {User} User
    //  */
    // async validateUser (guest: LoginInput): Promise<User> {
    //     return await this.userService.getUserMatchingCredentials(guest)
    // }
    
    // /**
    //  * Validates the passed user credentials
    //  * 
    //  * @param guest LoginInput
    //  * @returns {User} User
    //  */
    // async validateDecryptedUserCredentials (id: number | string): Promise<User> {
    //     return await this.userService.findOne({ where: { and: [{ key: "id", value: id }] } })
    // }

    // async validateJwtStrategy(id: number | string ): Promise<User> {
    //     return await this.validateDecryptedUserCredentials(id);
    // }

    // async validateLocalStrategy(username: string, password: string): Promise<User> {
    //     return await this.validateUser({ credential: LoginCredential.EMAIL, value: username, password });
    // }

    // async register(credentials: RegisterInput): Promise<string> {
    //     if (!(await this.validateUser({ value: (credentials?.phone) ? credentials?.phone : credentials?.email, credential: (credentials?.phone) ? LoginCredential.PHONE : LoginCredential.EMAIL, password: credentials.password }))) {
    //         let [newUser]:User[] =  await this.userService.post([credentials]);
    //         return this.sign(newUser)
    //     } else {
    //         throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    //     }
    // }
    
    // /**
    //  * Signs the user to the application by generating JWT tokens
    //  *
    //  * @param credentials - The user login credentials
    //  * @returns {AuthResponse} - The access and the refresh token to authenticate the user and the user
    //  */
    // sign(credentials: User): string {
    //     return Buffer.from(JSON.stringify({
    //         accessToken: { token: this.jwtService.sign({ sub: credentials.id }), issuedAt: AuthService.getCurrentTimestamp(), expiry: (AuthService.getCurrentTimestamp() + 30 * 60 * 1000) },
    //         // refreshToken: { token: this.jwtService.sign({ sub: credentials.id },{ expiresIn: process.env.BETBOSS_API_JWT_REFRESH_TOKEN_EXPIRY }), issuedAt: AuthService.getCurrentTimestamp(), expiry: (AuthService.getCurrentTimestamp() + 5 * 60 * 60 * 1000) }
    //         refreshToken: { token: this.jwtService.sign({ sub: credentials.id },{ expiresIn: "5h" }), issuedAt: AuthService.getCurrentTimestamp(), expiry: (AuthService.getCurrentTimestamp() + 5 * 60 * 60 * 1000) }
    //     })).toString("base64");
    // }

    // async refreshToken(token: string) {
    //     try {
    //         let { sub, exp } = this.jwtService.verify(token)
    //         if (AuthService.getCurrentTimestamp() > exp) {
    //             throw new Error("Refresh token has expired")
    //         } else {
    //             let user =  await this.validateDecryptedUserCredentials(sub)
    //             if (user !== null && user !== undefined) {
    //                 return this.sign(user)
    //             } else {
    //                 throw new Error("No matching user credential")
    //             }
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // }

    // static getCurrentTimestamp () { return Math.floor(Date.now() / 1000) }
}
