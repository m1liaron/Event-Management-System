import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("events")
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    title!: string;
    
    @Column()
    description!: string;

    @Column()
    date!: Date;
    
    @Column()
    location!: string;

    @Column()
    capacity!: number;

    @Column()
    visibility!: "public" | "private";

    @ManyToMany('User', 'attendedEvents') // Use string 'User'
    @JoinTable({ name: "event_participants" })
    participants!: User[];

    @ManyToOne('User', 'events') // Use string 'User'
    organizer!: User;
}
