import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
// import { User } from './interfaces/user.interface';


@Injectable()
export class UserService {
    @InjectRepository(Users) private readonly userRepository: Repository<Users>;

    // create(user: User) {
    //     this.users.push(user)
    //     console.log(this.users)
    // }

    // findAll(): User[] {
    //     return this.users;
    // }
    async join(email:string, nickname:string, password: string) {
        console.log(this.userRepository)
        const user = await this.userRepository.findOne({where: {email}});
        if(user) return false;
        return await this.userRepository.save({
            email,
            nickname,
            password,
        })

    }
    async findByEmail(email:string) {
        return await this.userRepository.findOne({
            where:{email},
            select: ['id', 'email', 'password'],
        })
    }
}
