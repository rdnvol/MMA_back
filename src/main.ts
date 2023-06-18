import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as process from 'process';
import { HttpExceptionFilter } from 'utils/HttpExeptionFilter';
import { ValidationPipe } from '@nestjs/common';

const express = require('express');

const createNestServer = async (expressInstance) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );
  const { httpAdapter } = app.get(HttpAdapterHost);

  app.useGlobalFilters(new HttpExceptionFilter(httpAdapter));

  app.useGlobalPipes(
    new ValidationPipe({
      // exceptionFactory: (validationErrors: ValidationError[] = []) => {
      //   console.log('validationErrors', validationErrors);
      //   console.error(JSON.stringify(validationErrors));
      //   const message = validationErrors.toString();
      //   console.log('massage', message);
      //   return new BadRequestException(validationErrors, {
      //     cause: new Error(),
      //     description: message,
      //   });
      // },
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('MMA')
    .setDescription('The MMA API description')
    .setVersion('0.1')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  app.enableCors();
  SwaggerModule.setup('api', app, document);

  return app.init();
};

const app = express();
let nest;
const port = process.env.PORT || 3005;

app.use(async (req, res) => {
  if (!nest) {
    nest = express();
    await createNestServer(nest);
  }
  return nest(req, res);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
