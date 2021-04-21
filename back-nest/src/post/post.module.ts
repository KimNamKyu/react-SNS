import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entity';
import { Users } from 'src/entities/users.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Posts, Users]),
      ],
    controllers: [PostController],
    providers: [PostService],
})
export class PostModule {}
