import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { StationDto } from './dto/station.dto';

@Injectable()
export class StationService {
  constructor(private prisma: PrismaService) {}

  getList(): Promise<StationDto[]> {
    return this.prisma.station.findMany({ orderBy: { id: 'asc' } });
  }
}
