import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/users.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}
    
    @Post('')
    async createPost(@User() user: Users, @Body() body: CreatePostDto){
        console.log('1231232')
        console.log(user)
        console.log(body) 
        // return this.postService.createPost()
    }
    @Get('')
    async allPost(){
        return this.postService.getPost();
    }
}
