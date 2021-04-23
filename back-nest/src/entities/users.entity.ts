import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comments } from "./comments.entity";
import { Posts } from "./posts.entity";

@Entity({schema: 'nestgram', name: 'users'})
export class Users {
    @PrimaryGeneratedColumn({type: 'int', name: 'id'})
    id: number;
    
    @Column({name: 'email', unique: true, length:30})
    email: string;

    @Column({name: 'nickname', length: 30})
    nickname: string;

    @Column({name: 'password',length: 100})
    password: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
    
    @OneToMany(() => Posts, post => post.userId)
    post: Posts[];

    @OneToMany(() => Comments, comment => comment.id)
    comment: Comments[];

    @ManyToMany(() => Posts, post => post.id)
    @JoinTable({
        name:'Like',
        joinColumn: {
            name: 'UserId',
            referencedColumnName:'id',
        },
        inverseJoinColumn: {
            name: 'PostId',
            referencedColumnName: 'id',
        }
    })
    Like: Posts[] 

    @ManyToMany(() => Users, user => user.id)
    @JoinTable({
        name: 'Follow',
        joinColumn: {
            name: 'FollowingId',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'FollowerId',
            referencedColumnName: 'id',
        }
    })
    Follow: Users[];
}