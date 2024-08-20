import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StationService {
  constructor(private prisma: PrismaService) {}

  getList() {
    return this.prisma.station.findMany({ orderBy: { id: 'asc' } });
  }
}
