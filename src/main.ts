import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './shared/logger/winston.logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger(winstonConfig),
  });

  const config = new DocumentBuilder()
    .setTitle('API Productos')
    .setDescription('API para gestión de productos')
    .setVersion('1.0')
    .addBearerAuth() // Uso de JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
