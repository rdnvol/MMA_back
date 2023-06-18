import { IsArray, IsDate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QueryLessonDto {
  @ApiProperty({ name: 'startDate', type: String, example: '2023-03-25' })
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  public startDate: Date;

  @ApiProperty({ name: 'endDate', type: String, example: '2023-03-25' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  public endDate: Date;

  @ApiProperty({ name: 'coaches', type: String, example: '[1,2,3]' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      return 'test';
    }
  })
  public coaches: number[];

  @ApiProperty({ name: 'types', type: String, example: '[1,2,3]' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @Transform(({ value }) => JSON.parse(value))
  public types: number[];
}
