import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { LessonTypesService } from 'src/lesson-types/lesson-types.service';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService, LessonTypesService],
  imports: [PrismaModule],
})
export class LessonsModule {}
