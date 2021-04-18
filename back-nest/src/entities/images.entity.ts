import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @ManyToOne(() => Posts, post => post.id)
    @JoinColumn()
    post: Posts[];
}