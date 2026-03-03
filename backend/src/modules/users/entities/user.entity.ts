import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../../events/entities/event.entity";

@Entity("users")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ unique: true })
	email!: string;

	@Column()
	name!: string;

	@Column({ select: false })
	password!: string;

	@OneToMany(() => Event, event => event.organizer)
	events!: Event[];

	@ManyToMany(() => Event, event => event.participants)
	attendedEvents!: Event[];
} 
