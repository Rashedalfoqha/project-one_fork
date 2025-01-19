import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveDto } from './create-leaf.dto';

export class UpdateLeaveDto extends PartialType(CreateLeaveDto) {}
