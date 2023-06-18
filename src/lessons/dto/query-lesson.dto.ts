import { IsArray, IsDate, IsInt, IsOptional } from 'class-validator';
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

  @ApiProperty({ name: 'coaches', type: [Number] })
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((id) => parseInt(id)) : [Number(value)],
  )
  public coaches: number[];

  @ApiProperty({ name: 'types', type: [Number] })
  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  @Transform(({ value }) =>
    Array.isArray(value) ? value.map((id) => parseInt(id)) : [Number(value)],
  )
  public types: number[];
}
