import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.enableVersioning({
    defaultVersion: '1',
    type: VersioningType.URI
  });
  app.setGlobalPrefix('/api');

  const documentBuilder = new DocumentBuilder()
    .setTitle('The Douglas Data Capture Platform')
    .setContact('Joshua Unrau', '', 'joshua.unrau@mail.mcgill.ca')
    .setDescription('Documentation for the REST API for Douglas Data Capture Platform')
    .setLicense('AGPL-3.0', 'https://www.gnu.org/licenses/agpl-3.0.txt')
    .setVersion('1')
    .setExternalDoc(
      'Additional Technical Documentation',
      'https://douglasneuroinformatics.github.io/DouglasDataCapturePlatform/#/'
    )
    .addTag('Authentication')
    .addTag('Groups')
    .addTag(
      'Users',
      "The following methods for adding, modifying, and deleting users are exclusively available to 'system-admin' users. As a result, they are not implemented in our web app and can only be accessed through programmatic use."
    )
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('api', app, document);

  const configService = app.get(ConfigService);
  const port = configService.getOrThrow<number>('SERVER_PORT');

  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

void bootstrap();
