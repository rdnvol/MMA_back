import { IsArray, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LessonType } from 'types';

export class QueryLessonTypeDto {
  @ApiProperty({ name: 'type', enum: LessonType, example: LessonType.Personal })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public type: string;

  @ApiProperty({ name: 'coaches', type: String, example: '[1,2]' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => JSON.parse(value))
  public coaches: number[];
}
