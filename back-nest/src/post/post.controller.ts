import { Body, Controller, ForbiddenException, Get, Post, Req } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/users.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}
    
    @Post('')
    async createPost(@User() user, @Body() createPostDto: CreatePostDto){
        console.log(user)
        const result = this.postService.createPost(
            createPostDto.content,
            1
        )   
        if(result){
            return '컨텐츠 저장';
        }else{
            throw new ForbiddenException();
        }
    }
    @Get('asd')
    async allPost(@User() user: Users){
        console.log(user)
        return '123213213';
        // return this.postService.getPost(user.id);
    }
}
