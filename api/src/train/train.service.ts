import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { addMinutes } from 'date-fns';
import { PrismaService } from 'src/prisma/prisma.service';
import { TrainDto } from './dto/train.dto';

@Injectable()
export class TrainService {
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
  ) {}

  async getTrain(): Promise<TrainDto> {
    const train = await this.prisma.train.findFirst({
      where: { departureAt: { gte: new Date() } },
      include: { tickets: true },
    });
    if (train) {
      return new TrainDto({
        ...train,
        availableTickets: train.seats - train.tickets.length,
      });
    }

    const seats = parseInt(this.config.getOrThrow('TICKET_PER_TRAIN'), 10);
    const departureAt = addMinutes(
      new Date(),
      parseInt(this.config.getOrThrow('TRAIN_INTERVAL_MINUTES'), 10),
    );

    const newTrain = await this.prisma.train.create({
      data: {
        seats,
        departureAt,
      },
    });

    return new TrainDto({ ...newTrain, availableTickets: newTrain.seats });
  }
}
