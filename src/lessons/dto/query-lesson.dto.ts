import { IsArray, IsDate, IsInt, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class QueryLessonDto {
  @ApiProperty({ name: 'startDate', type: String, example: '2023-03-25' })
  @ApiPropertyOptional()
  @IsOptional()
  @Transform(({ value }) => {
    const date = new Date(value);
    date.setHours(0, 0, 0, 0);
    return date;
  })
  @IsDate()
  public startDate: Date;

  @ApiProperty({ name: 'endDate', type: String, example: '2023-03-25' })
  @ApiPropertyOptional()
  @IsOptional()
  @IsDate()
  @Transform(({ value }) => {
    const date = new Date(value);
    date.setHours(23, 59, 59, 999);
    return date;
  })
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
