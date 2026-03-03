import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";

@Entity("events")
export class Event {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true })
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

    @ManyToMany(() => User, user => user.attendedEvents)
    @JoinTable({ name: "event_participants" })
    participants!: User[];

    @ManyToOne(() => User, user => user.events, {
        onDelete: 'CASCADE'
    })
    organizer!: User;
}
