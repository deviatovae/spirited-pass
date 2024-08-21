import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExtraModels,
  ApiResponse,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { TicketDto } from './dto/ticket.dto';
import { TicketCreateDto } from './dto/ticketCreate.dto';
import { TicketUpdateDto } from './dto/ticketUpdate.dto';
import { TicketService } from './ticket.service';
import { BaseTicketException } from './exception/baseTicket.exception';
import { ErrorDto } from 'src/openapi/error.dto';

@Controller('ticket')
export class TicketController {
  constructor(private ticket: TicketService) {}

  @Post()
  @ApiUnauthorizedResponse()
  @ApiExtraModels(ErrorDto)
  @ApiBadRequestResponse({ schema: { $ref: getSchemaPath(ErrorDto) } })
  @ApiExtraModels(TicketDto)
  @ApiResponse({ status: 200, schema: { $ref: getSchemaPath(TicketDto) } })
  async create(@Body() dto: TicketCreateDto) {
    try {
      return await this.ticket.create(dto);
    } catch (error) {
      if (error instanceof BaseTicketException) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  @Patch(':id')
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

  @Get(':id')
  @ApiExtraModels(TicketDto)
  @ApiResponse({
    status: 200,
    schema: { $ref: getSchemaPath(TicketDto) },
  })
  async get(@Param('id', ParseIntPipe) id: number) {
    const ticket = await this.ticket.get(id);
    if (!ticket) {
      throw new NotFoundException();
    }
    return ticket;
  }
}
