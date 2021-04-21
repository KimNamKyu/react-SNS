import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from './entities/comments.entity';
import { Hashtags } from './entities/hashtags.entity';
import { Images } from './entities/images.entity';
import { Posts } from './entities/posts.entity';
import { Users } from './entities/users.entity';
import { UserModule } from './user/user.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "root",
      password: "1234",
      database: "nestgram",
      entities: [Users, Posts, Comments, Hashtags, Images],
      synchronize: false,
      autoLoadEntities: true,
      charset: 'utf8mb4',
      logging: true,
      keepConnectionAlive: true,
    }),
    UserModule,
    PostModule,
  ],
})
export class AppModule {}