import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entity';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    @InjectRepository(Posts) private readonly postRepository: Repository<Posts>;
    @InjectRepository(Users) private userRepository: Repository<Users>;
    async createPost(content: string, userId: number) {
        const post = new Posts();
        post.content = content;
        post.userId
        return await this.postRepository.save({
            content,
            userId
        })
    }

    async getPost(myId: number) {
        return await this.postRepository.find({
            select:['id', 'content']
        })
    }
}
