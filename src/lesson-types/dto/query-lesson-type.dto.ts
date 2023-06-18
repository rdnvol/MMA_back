import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LessonType } from 'types';

export class QueryLessonTypeDto {
  @ApiProperty({ name: 'type', enum: LessonType, example: LessonType.Personal })
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  public type: string;

  @ApiProperty({ name: 'coaches', type: [Number] })
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((id) => parseInt(id)) : [Number(value)],
  )
  public coaches: number[];
}
