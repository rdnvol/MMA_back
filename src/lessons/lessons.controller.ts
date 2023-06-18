import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LessonDto } from 'src/lessons/entities/lesson.entity';
import { prepareResponse } from 'utils/prepareResponse';
import { QueryLessonDto } from 'src/lessons/dto/query-lesson.dto';
import { CreateLessonDto } from 'src/lessons/dto/create-lesson.dto';
import { LessonTypesService } from 'src/lesson-types/lesson-types.service';
import { UpdateLessonDto } from 'src/lessons/dto/update-lesson.dto';

@Controller('lessons')
@ApiTags('Lessons')
export class LessonsController {
  constructor(
    private readonly lessonsService: LessonsService,
    private readonly lessonTypesService: LessonTypesService,
  ) {}

  @Get()
  @ApiOkResponse({ type: LessonDto })
  async findAll(@Query() params: QueryLessonDto) {
    const resp = await this.lessonsService.findAll(params);
    return prepareResponse(resp);
  }

  @Post()
  async create(@Body() createLessonDto: CreateLessonDto) {
    const lessonType = await this.lessonTypesService.findOne(
      createLessonDto.lessonTypeId,
    );

    if (!lessonType) {
      throw new NotFoundException('Lesson type is not found');
    }

    return this.lessonsService.create(createLessonDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.lessonsService.findOne(+id);
  // }
  //
  @Put(':id')
  update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(+id, updateLessonDto);
  }

  //
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessonsService.remove(+id);
  }
}
