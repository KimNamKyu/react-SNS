import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comments } from "./comments.entity";
import { Posts } from "./posts.entity";

@Entity({schema: 'nestgram', name: 'users'})
export class Users {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({length:30})
    email: string;

    @Column({length: 30})
    nickname: string;

    @Column({length: 100})
    password: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => Posts, post => post.id)
    post: Posts[];

    @OneToMany(() => Comments, comment => comment.id)
    comment: Comments[];

    @ManyToMany(() => Posts)
    @JoinTable({name:'Like'})
    Like: Posts[] 

    @JoinTable({
        name: 'Follow',
        joinColumn: {
            name: 'followers',
            referencedColumnName: 'followings',
        },
    })
    Follow: Users[];
}