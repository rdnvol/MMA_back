import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryLessonDto } from 'src/lessons/dto/query-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  create(createLessonDto: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: {
        name: createLessonDto.name,
        lessonTypeId: createLessonDto.lessonTypeId,
        startDate: createLessonDto.startDate,
        endDate: createLessonDto.endDate,
      },
    });
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
        coachOrder: true,
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
    return this.prisma.lesson.update({
      where: {
        id,
      },
      data: {
        name: updateLessonDto.name,
        startDate: updateLessonDto.startDate,
        endDate: updateLessonDto.endDate,
      },
    });
  }

  remove(id: number) {
    this.prisma.lesson.delete({
      where: {
        id,
      },
    });
  }
}
