import "reflect-metadata";
import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { GlobalExceptionFilter } from "./common/filters/http-exception.filter";
import { WinstonModule } from "nest-winston";
import * as winston from "winston";
import DailyRotateFile from "winston-daily-rotate-file";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		logger: WinstonModule.createLogger({
			transports: [
				// 1. Console logging (pretty for dev)
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.timestamp(),
						winston.format.colorize(),
						winston.format.printf(({ timestamp, level, message, context }) => {
							return `[${timestamp}] ${level}: [${context || 'App'}] ${message}`;
						}),
					),
				}),
				// 2. File logging (ideal for production debugging)
				new DailyRotateFile({
					dirname: 'logs',
					filename: 'error-%DATE%.log',
					datePattern: 'YYYY-MM-DD',
					level: 'error',
					maxFiles: '14d', // Keep logs for 14 days
					createSymlink: true,
					symlinkName: 'error.log',
				}),

				new DailyRotateFile({
					dirname: 'logs',
					filename: 'combined-%DATE%.log',
					datePattern: 'YYYY-MM-DD',
					maxFiles: '14d',
					createSymlink: true,
					symlinkName: 'combined.log',
				}),
			],
		}),
	});

	app.enableCors({
		origin: ['http://localhost:5173'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
		credentials: true,
	});
	app.useGlobalPipes(new ValidationPipe());

	const config = new DocumentBuilder()
		.setTitle("Event Management API")
		.setDescription("The PoC Event Management System API description")
		.setVersion("1.0")
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup	("api", app, document, {
		swaggerOptions: {
			persistAuthorization: true,
		},
	});

	app.useGlobalFilters(new GlobalExceptionFilter());

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
