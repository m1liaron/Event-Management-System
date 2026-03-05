import { NestFactory } from '@nestjs/core';
import { DataSource } from 'typeorm';
import { runSeeders } from 'typeorm-extension';
import { AppModule } from '../app.module';
import 	{ UserSeeder  }from './seeds/user.seeder';
import { EventSeeder } from './seeds/event.seeder';

async function run() {
    const app = await NestFactory.create(AppModule);
    const dataSource = app.get(DataSource);

    await runSeeders(dataSource, {
        seeds: [UserSeeder, EventSeeder]
    });

    console.log('🚀 Seeding completed successfully!');
    await app.close();
}

run();