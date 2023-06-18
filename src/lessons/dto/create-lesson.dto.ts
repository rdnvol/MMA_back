import { LessonDto } from 'src/lessons/entities/lesson.entity';
import { ParticipantEntity } from 'src/participants/entities/participant.entity';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonDto implements Partial<LessonDto> {
  @ApiPropertyOptional()
  participants?: ParticipantEntity;
  @ApiProperty()
  @IsDateString()
  endDate: Date;
  @ApiProperty()
  @IsNumber()
  lessonTypeId: number;
  @ApiProperty()
  @IsString()
  name: string;
  @ApiProperty()
  @IsDateString()
  startDate: Date;
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  coachOrder?: string[];
}
