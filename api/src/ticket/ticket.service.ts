import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketDto } from './dto/ticket.dto';
import { TicketCreateDto } from './dto/ticketCreate.dto';
import { TicketUpdateDto } from './dto/ticketUpdate.dto';

@Injectable()
export class TicketService {
  constructor(private prisma: PrismaService) {}

  getList(): Promise<TicketDto[]> {
    return this.prisma.ticket.findMany({
      include: { station: true },
      orderBy: { id: 'desc' },
    });
  }

  create(dto: TicketCreateDto): Promise<TicketDto> {
    return this.prisma.ticket.create({
      include: { station: true },
      data: dto,
    });
  }

  update(id: number, dto: TicketUpdateDto): Promise<TicketDto> {
    return this.prisma.ticket.update({
      include: { station: true },
      data: dto,
      where: { id },
    });
  }
}
