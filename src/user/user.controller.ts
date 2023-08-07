import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
} from '@nestjs/common';
import { UserInput } from './dto/user.input';
import { User } from './user.entity';
import { UserService } from './user.service';
import { FindArguments } from '../find-options/dto/find-args.input';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post()
  create(@Body() userInput: UserInput[]): Promise<User[]> {
    return this.usersService.create(userInput);
  }

  @Get()
  findAll(@Body() args: FindArguments): Promise<User[]> {
    return this.usersService.findAll(args);
  }

  @Get(':id')
  findOne(@Body() args: FindArguments): Promise<User> {
    return this.usersService.findOne(args);
  }

  @Delete(':id')
  remove(@Body() users: UserInput[]): Promise<any> {
    return this.usersService.delete(users);
  }
}
