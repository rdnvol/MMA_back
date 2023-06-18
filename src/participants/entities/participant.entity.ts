import { Participant } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class ParticipantEntity implements Participant {
  @ApiProperty() id: number;
  @ApiProperty() email: string;
  @ApiProperty() name: string;
}
