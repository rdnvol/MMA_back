import { Coach } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class CoachEntity implements Coach {
  @ApiProperty() id: number;
  @ApiProperty() email: string;
  @ApiProperty() name: string;
}
