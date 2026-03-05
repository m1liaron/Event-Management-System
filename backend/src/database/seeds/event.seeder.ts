import { DataSource } from "typeorm";
import { Seeder } from "typeorm-extension";
import { User } from "../../modules/users/entities/user.entity";
import { Event } from "../../modules/events/entities/event.entity";

class EventSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const eventRepo = dataSource.getRepository(Event);
        const userRepo = dataSource.getRepository(User);

        const users = await userRepo.find();
        if(users.length < 2 ) return;

        const eventCount = await eventRepo.count();
        if(eventCount > 0) return;

        const eventsToSeed: Event[] = [];

        for (const user of users) {
            const event1 = eventRepo.create({
                title: `First Workshop by ${user.name}`,
                description: 'A great learning experience.',
                date: new Date(),
                location: 'Conference Room A',
                capacity: 20,
                organizer: user,
            });

            const event2 = eventRepo.create({
                title: `Networking Gala by ${user.name}`,
                description: 'Connect with professionals.',
                date: new Date(Date.now() + 86400000),
                location: 'Grand Ballroom',
                capacity: 100,
                organizer: user,
            });

            eventsToSeed.push(event1, event2);
        }

        await eventRepo.save(eventsToSeed);
    }
}

export { EventSeeder }