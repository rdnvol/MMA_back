import { PartialType } from '@nestjs/swagger';
import { CreateLessonTypeDto } from './create-lesson-type.dto';

export class UpdateLessonTypeDto extends PartialType(CreateLessonTypeDto) {}
