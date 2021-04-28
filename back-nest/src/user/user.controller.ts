import { Request, Body, Controller, ForbiddenException, Get, NotFoundException, Post, Req, UseGuards, Patch, Delete } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
    ) {}    //생성자주입

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

    @UseGuards(LocalAuthGuard)
    @Post('/auth/login')
    async login(@User() user: Users) {
        return user;
    }

    // @Post('/login')
    // async login(@Body() createUserDto: CreateUserDto){
        
    //     console.log('로그인 시작')
        // const result = await this.userService.login(
        //     createUserDto.email,
        //     createUserDto.password,
        // )
        
        // if(result){
        //     return '로그인 성공';
        // }else{
        //     console.log('로그인 실패');
        //     throw new ForbiddenException();
        // }
    // }

    @Get('/followers')
    async getFollow(@User() user: Users){

    }

    @Get('/followings')
    async getFollowings(@User() user: Users){

    }

    @Patch('/:userId/follow')
    async updateFollow(@User() user: Users) {

    }

    @Delete('/:userId/follow')
    async deleteFollow(@User() user: Users) {

    }
}
