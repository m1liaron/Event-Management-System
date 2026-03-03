import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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

    // Many events -> one organizer
    @ManyToOne(() => User, (user) => user.events)
    organizer!: User;

    // Many events -> many participants
    @ManyToMany(() => User, (user) => user.attendedEvents)
    participants!: User[];
}
