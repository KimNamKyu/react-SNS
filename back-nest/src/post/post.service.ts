import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    @InjectRepository(Posts) private readonly postRepository: Repository<Posts>;

    async createPost() {

        return await this.postRepository.save({

        })
    }

    async getPost() {
        return await this.postRepository.find({
            select:['id', 'content']
        })
    }
}
