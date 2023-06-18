import { Controller, Get, Query } from '@nestjs/common';
import { LessonTypesService } from './lesson-types.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { LessonTypeEntity } from 'src/lesson-types/entities/lesson-type.entity';
import { prepareResponse } from 'utils/prepareResponse';
import { QueryLessonTypeDto } from 'src/lesson-types/dto/query-lesson-type.dto';

@Controller('lesson-types')
@ApiTags('Lesson types')
export class LessonTypesController {
  constructor(private readonly lessonTypesService: LessonTypesService) {}

  @Get()
  @ApiOkResponse({ type: LessonTypeEntity, isArray: true })
  async findAll(@Query() params: QueryLessonTypeDto) {
    const lessonTypes = await this.lessonTypesService.findAll(params);
    return prepareResponse(lessonTypes);
  }

  // @Post()
  // create(@Body() createLessonTypeDto: CreateLessonTypeDto) {
  //   return this.lessonTypesService.create(createLessonTypeDto);
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.lessonTypesService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateLessonTypeDto: UpdateLessonTypeDto,
  // ) {
  //   return this.lessonTypesService.update(+id, updateLessonTypeDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.lessonTypesService.remove(+id);
  // }
}
