import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Posts } from "./posts.entity";
import { Users } from "./users.entity";

@Entity()
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar')
    content: string;

    @ManyToOne(() => Users, user => user.id)
    user: Users[];

    @ManyToOne(() => Posts, post => post.id)
    post: Posts[];

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}