import { PartialType } from '@nestjs/mapped-types';
import { CreateTaleDto } from './create-tale.dto';

export class UpdateTaleDto extends PartialType(CreateTaleDto) {}
