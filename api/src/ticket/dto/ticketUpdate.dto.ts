import { PartialType } from '@nestjs/swagger';
import { TicketCreateDto } from './ticketCreate.dto';

export class TicketUpdateDto extends PartialType(TicketCreateDto) {}
