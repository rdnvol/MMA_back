import { Module } from '@nestjs/common';
import { LessonTypesService } from './lesson-types.service';
import { LessonTypesController } from './lesson-types.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [LessonTypesController],
  providers: [LessonTypesService],
  imports: [PrismaModule],
})
export class LessonTypesModule {}
