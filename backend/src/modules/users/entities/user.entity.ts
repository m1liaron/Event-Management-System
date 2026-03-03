import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

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

	@OneToMany('Event', (event: any) => event.organizer) // Use string 'Event'
	events!: any[];

	@ManyToMany('Event', (event: any) => event.participants) // Use string 'Event'
	attendedEvents!: any[];
} 
