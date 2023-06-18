import { Lesson } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { LessonTypeDto } from 'src/lesson-types/entities/lesson-type.entity';

export class LessonDto implements Partial<Lesson> {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() startDate: Date;
  @ApiProperty() endDate: Date;
  // @ApiProperty() lessonTypeId: number;
  @ApiProperty() participants: any;
  @ApiProperty({ type: LessonTypeDto }) lessonType: LessonTypeDto;
}
