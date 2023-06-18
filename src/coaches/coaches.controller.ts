import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { CoachesService } from './coaches.service';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { CoachEntity } from 'src/coaches/entities/coach.entity';
import { prepareResponse } from 'utils/prepareResponse';

@Controller('coaches')
@ApiTags('Coaches')
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  // @Post()
  // create(@Body() createCoachDto: CreateCoachDto) {
  //   return this.coachesService.create(createCoachDto);
  // }

  @Get()
  @ApiOkResponse({ type: CoachEntity, isArray: true })
  async findAll() {
    const result = await this.coachesService.findAll();
    return prepareResponse(result);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true })
  @ApiOkResponse({ type: CoachEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.coachesService.findOne(id);
  }
  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.coachesService.findOne(+id);
  // }
  //
  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateCoachDto: UpdateCoachDto) {
  //   return this.coachesService.update(+id, updateCoachDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.coachesService.remove(+id);
  // }
}
