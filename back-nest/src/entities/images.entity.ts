import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Posts } from "./posts.entity";

@Entity()
export class Images {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({length:200})
    src: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @OneToOne(() => Posts, post => post.id)
    @JoinColumn()
    post: Posts[];
}