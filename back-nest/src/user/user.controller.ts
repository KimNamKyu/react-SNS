import { Body, Controller, ForbiddenException, Get, NotFoundException, Post, Req } from '@nestjs/common';
import { Users } from 'src/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}    //생성자주입

    @Post('')
    async create(@Body() createUserDto: CreateUserDto) {
        const user = this.userService.findByEmail(createUserDto.email)
        if(!user){
            throw new NotFoundException();
        }
        const result = await this.userService.join(
            createUserDto.email,
            createUserDto.nickname,
            createUserDto.password,
        )
        if(result){
            return 'ok';
        }else{
            throw new ForbiddenException();
        }
        // this.userService.create(createUserDto);
    }

    @Get('/login')
    async login(@Req() createUserDto: CreateUserDto){
        const result = await this.userService.login(
            createUserDto.email,
            createUserDto.password,
        )
        if(result){
            return '로그인 성공';
        }else{
            throw new ForbiddenException();
        }
        
    }
}
