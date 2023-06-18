import { Injectable } from '@nestjs/common';
import { CreateCoachDto } from './dto/create-coach.dto';
import { UpdateCoachDto } from './dto/update-coach.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CoachesService {
  constructor(private prisma: PrismaService) {}

  create(createCoachDto: CreateCoachDto) {
    return 'This action adds a new coach';
  }

  findAll() {
    return this.prisma.coach.findMany();
  }

  async findOne(id: number) {
    const res = await this.prisma.coach.findUniqueOrThrow({ where: { id } });
    console.log('res', res);
    return res;
  }

  update(id: number, updateCoachDto: UpdateCoachDto) {
    return `This action updates a #${id} coach`;
  }

  remove(id: number) {
    return `This action removes a #${id} coach`;
  }
}
