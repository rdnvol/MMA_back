import { Controller, Get, Query } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LessonDto } from 'src/lessons/entities/lesson.entity';
import { prepareResponse } from 'utils/prepareResponse';
import { QueryLessonDto } from 'src/lessons/dto/query-lesson.dto';

@Controller('lessons')
@ApiTags('Lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) {}

  @Get()
  @ApiOkResponse({ type: LessonDto })
  async findAll(@Query() params: QueryLessonDto) {
    console.log('params', params);
    const resp = await this.lessonsService.findAll(params);
    console.log('resp');
    return prepareResponse(resp);
  }

  // @Post()
  // create(@Body() createLessonDto: CreateLessonDto) {
  //   return this.lessonsService.create(createLessonDto);
  // }
  //
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.lessonsService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
  //   return this.lessonsService.update(+id, updateLessonDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lessonsService.remove(+id);
  // }
}
