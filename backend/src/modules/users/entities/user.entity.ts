import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
	// TODO: Add OneToMany and ManyToMany with events
}
