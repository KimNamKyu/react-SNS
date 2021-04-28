import { Body, Controller, Delete, ForbiddenException, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { LoggedInGuard } from 'src/auth/logged-in.guard';
import { User } from 'src/common/decorators/user.decorator';
import { Users } from 'src/entities/users.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './post.service';

@UseGuards(LoggedInGuard)
@Controller('post')
export class PostController {
    constructor(private postService: PostService) {}
    
    @Post('')
    async createPost(@User() user: Users, @Body() createPostDto: CreatePostDto){
        console.log("Post +==============")
        console.log(user.id)
        const result = this.postService.createPost(
            createPostDto.content,
            user.id
        )   
        if(result){
            return '컨텐츠 저장';
        }else{
            throw new ForbiddenException();
        }
    }
    
    @Post('/:postId/comment')
    async createComment(@User() user: Users) {

    }

    @Patch('/:postId/like')
    async postLikeit(@User() user: Users) {

    }

    @Delete('/:postId/like')
    async postUnLikeit(@User() user: Users) {

    }

    @Delete('/:postId')
    async postDelete(@User() user: Users) {

    }

    @Post('/images')
    async postImage(){

    }

    @Get('/:postId')
    async getPost(){

    }

    @Patch('/:postId')
    async updatePost() {

    }
    
}
