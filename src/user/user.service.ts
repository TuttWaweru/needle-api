import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { User } from './user.entity';
import { UserInput } from './dto/user.input';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';

const SALT_ROUNDS = Number(process.env.BETBOSS_API_SALT_ROUNDS);
const SALT = bcrypt.genSaltSync(SALT_ROUNDS);
@Injectable()
export class UserService extends BaseService<UserInput, User>{
    constructor(
        @InjectRepository(User)
        readonly repo: Repository<User>,
    ){ super(repo) }

    private readonly users = [
        {
          userId: 1,
          username: 'john',
          password: 'changeme',
        },
        {
          userId: 2,
          username: 'maria',
          password: 'guess',
        },
    ];

    async find(username: string): Promise<User | undefined> {
        return this.users.find(user => user.username === username);
    }

    async post(transactions: UserInput[]): Promise<User[]> {
        return await this.create(transactions.reduce((result, val) => [...result, { ...val, password: this.encryptPassword(val.password) }],([] as UserInput[])))
    }

    async getUserMatchingCredentials (payload: { credential: string, value: string, password: string }): Promise<User> {
        const matchingUser = await this.findOne({ where: { and:[{ key: payload.credential, value: payload.value }] } })
        if(!matchingUser){ return null; }
        if (!this.checkPasswordMatch(matchingUser.password, payload.password)){ return null }
        const { password, ...result } = matchingUser;
        return result;
    }

    private encryptPassword (password: string) {
        return bcrypt.hashSync(password, SALT);
    }
      
    private checkPasswordMatch (encryptedPassword: string, password: string): boolean {
        // return (!bcrypt.compareSync( encryptedPassword , password )) ? false : true
        return (!bcrypt.compareSync( password , encryptedPassword )) ? false : true
    }
}
