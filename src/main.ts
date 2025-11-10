import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import * as fs from 'fs';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new ValidationPipe());

    const config = new DocumentBuilder()
        .setTitle('Users CRUD')
        .setDescription('API de usuários')
        .setVersion(process.env.API_VERSION!)
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    fs.writeFileSync('./src/artifacts/swagger.json', JSON.stringify(document));

    await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
