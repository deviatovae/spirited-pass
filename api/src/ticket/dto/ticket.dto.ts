import { ApiProperty } from '@nestjs/swagger';
import { StationDto } from 'src/station/dto/station.dto';

export class TicketDto {
  @ApiProperty()
  station: StationDto;

  @ApiProperty()
  name: string;

  @ApiProperty()
  issuedAt: Date;
}
