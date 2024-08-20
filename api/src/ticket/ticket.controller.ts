import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TicketCreateDto } from './dto/ticketCreate.dto';
import { TicketUpdateDto } from './dto/ticketUpdate.dto';
import { TicketService } from './ticket.service';
import {
  ApiUnauthorizedResponse,
  ApiExtraModels,
  ApiResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { TicketDto } from './dto/ticket.dto';

@Controller('ticket')
export class TicketController {
  constructor(private ticket: TicketService) {}

  @Post()
  @ApiUnauthorizedResponse()
  @ApiExtraModels(TicketDto)
  @ApiResponse({ status: 200, schema: { $ref: getSchemaPath(TicketDto) } })
  create(@Body() dto: TicketCreateDto) {
    return this.ticket.create(dto);
  }

  @Patch()
  @ApiUnauthorizedResponse()
  @ApiExtraModels(TicketDto)
  @ApiResponse({ status: 200, schema: { $ref: getSchemaPath(TicketDto) } })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: TicketUpdateDto) {
    return this.ticket.update(id, dto);
  }

  @Get()
  @ApiExtraModels(TicketDto)
  @ApiResponse({
    status: 200,
    schema: { type: 'array', items: { $ref: getSchemaPath(TicketDto) } },
  })
  getList() {
    return this.ticket.getList();
  }
}
