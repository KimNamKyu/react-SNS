import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Comments } from "./comments.entity";
import { Hashtags } from "./hashtags.entity";
import { Images } from "./images.entity";
import { Users } from "./users.entity";

@Entity({schema: 'nestgram', name: 'posts'})
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('varchar')
    content: string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;

    @Column('int', {name: 'userId', nullable: true})
    userId: number | null;

    @JoinColumn([{name: 'userId', referencedColumnName: 'id'}])
    user: Users;

    @ManyToMany(() => Hashtags, hashtag => hashtag.name, {  nullable: false, onDelete: 'CASCADE' })
    @JoinTable({name:'PostHashtag'})
    Hashtag: Hashtags[]; 

    @OneToMany(() => Comments, comment => comment.id)
    comment: Comments[];

    @OneToMany(() => Images, image => image.id)
    image: Images[];

    @ManyToMany(() => Users, user => user.id)
    Like: Users[] 
}