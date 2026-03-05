import { Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { User } from '../../modules/users/entities/user.entity';
import * as bcrypt from 'bcrypt';

class UserSeeder implements Seeder {
    public async run(dataSource: DataSource): Promise<void> {
        const repository = dataSource.getRepository(User);
        
        const count = await repository.count();
        if(count > 0) return;

        const password = await bcrypt.hash('password123', 10);

        await repository.insert([
            { email: 'user1@example.com', password, name: 'John' },
            { email: 'user2@example.com', password, name: 'Jane' },
        ]);
    }
}

export { UserSeeder }