import { Lesson } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { LessonTypeEntity } from 'src/lesson-types/entities/lesson-type.entity';
import { ParticipantEntity } from 'src/participants/entities/participant.entity';

export class LessonDto implements Partial<Lesson> {
  @ApiProperty() id: number;
  @ApiProperty() name: string;
  @ApiProperty() startDate: Date;
  @ApiProperty() endDate: Date;
  @ApiProperty({ type: ParticipantEntity, isArray: true })
  participants: ParticipantEntity;
  @ApiProperty({ type: LessonTypeEntity }) lessonType: LessonTypeEntity;
  @ApiProperty() coachOrder: string[];
}
