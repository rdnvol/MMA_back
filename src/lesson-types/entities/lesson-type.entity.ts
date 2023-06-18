import { LessonType } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { CoachEntity } from 'src/coaches/entities/coach.entity';
import { CoachBusyLevel } from 'types';

export class LessonTypeEntity implements LessonType {
  @ApiProperty() id: number;
  @ApiProperty() type: string;
  @ApiProperty({ type: CoachEntity, isArray: true }) coaches: CoachEntity[];
  @ApiProperty({ enum: CoachBusyLevel, enumName: 'CoachBusyLevel' })
  coachBusyLevel: CoachBusyLevel;
}
