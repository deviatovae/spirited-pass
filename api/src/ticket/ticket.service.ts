import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { TicketDto } from './dto/ticket.dto';
import { TicketCreateDto } from './dto/ticketCreate.dto';
import { TicketUpdateDto } from './dto/ticketUpdate.dto';
import { ConfigService } from '@nestjs/config';
import { TrainService } from 'src/train/train.service';
import { NoTicketsException } from './exception/noTickets.exception';
import { NoTrainFoundException } from './exception/noTrainFound.exception';

@Injectable()
export class TicketService {
  constructor(
    private prisma: PrismaService,
    private train: TrainService,
    private config: ConfigService,
  ) {}

  async getList(): Promise<TicketDto[]> {
    return (
      await this.prisma.ticket.findMany({
        include: { station: true },
        orderBy: { id: 'desc' },
      })
    ).map((t) => new TicketDto(t));
  }

  async getAvailableCount(): Promise<number> {
    const ticketsPerTrain = parseInt(
      this.config.getOrThrow('TICKET_PER_TRAIN'),
      10,
    );
    const trainInterval = parseInt(
      this.config.getOrThrow('TRAIN_INTERVAL_MINUTES'),
      10,
    );

    const count = await this.prisma.ticket.count({
      where: {
        issuedAt: {
          gte: new Date(new Date().getTime() - trainInterval * 60 * 1000),
        },
      },
    });

    return Math.max(0, ticketsPerTrain - count);
  }

  async create(dto: TicketCreateDto): Promise<TicketDto> {
    const train = await this.train.getTrain();
    if (train.id !== dto.trainId) {
      throw new NoTrainFoundException('The train has probably departed');
    }

    if (!train.availableTickets) {
      throw new NoTicketsException('Sorry! No more tickets.');
    }

    return new TicketDto(
      await this.prisma.ticket.create({
        include: { station: true },
        data: dto,
      }),
    );
  }

  async update(id: number, dto: TicketUpdateDto): Promise<TicketDto> {
    return new TicketDto(
      await this.prisma.ticket.update({
        include: { station: true },
        data: dto,
        where: { id },
      }),
    );
  }
}
