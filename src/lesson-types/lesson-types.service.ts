import { Injectable } from '@nestjs/common';
import { UpdateLessonTypeDto } from './dto/update-lesson-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryLessonTypeDto } from 'src/lesson-types/dto/query-lesson-type.dto';

@Injectable()
export class LessonTypesService {
  constructor(private prisma: PrismaService) {}

  findAll({ coaches, type }: QueryLessonTypeDto) {
    return this.prisma.lessonType.findMany({
      where: {
        type: { equals: type },
        coaches: {
          some: { id: { in: coaches } },
        },
      },
      select: {
        id: true,
        coaches: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        coachBusyLevel: true,
        type: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.lessonType.findFirstOrThrow({
      where: {
        id,
      },
    });
  }

  update(id: number, updateLessonTypeDto: UpdateLessonTypeDto) {
    return `This action updates a #${id} lessonType`;
  }

  remove(id: number) {
    return `This action removes a #${id} lessonType`;
  }
}
