import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CoachesModule } from './coaches/coaches.module';
import { LessonTypesModule } from './lesson-types/lesson-types.module';
import { LessonsModule } from './lessons/lessons.module';
import { ParticipantsModule } from './participants/participants.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    CoachesModule,
    LessonTypesModule,
    LessonsModule,
    ParticipantsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
