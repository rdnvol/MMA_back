import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryLessonDto } from 'src/lessons/dto/query-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  create(createLessonDto: CreateLessonDto) {
    return 'This action adds a new lesson';
  }

  findAll(params: QueryLessonDto) {
    return this.prisma.lesson.findMany({
      where: {
        startDate: {
          gte: params.startDate,
          lte: params.endDate,
        },
        lessonType: {
          id: { in: params.types },
          coaches: {
            some: { id: { in: params.coaches } },
          },
        },
      },
      select: {
        id: true,
        name: true,
        startDate: true,
        endDate: true,
        participants: {
          select: {
            name: true,
            email: true,
          },
        },
        lessonType: {
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
        },
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} lesson`;
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
