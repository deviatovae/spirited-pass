import { ApiProperty } from '@nestjs/swagger';
import * as R from 'remeda';

export class TrainDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  seats: number;

  @ApiProperty()
  departureAt: Date;

  @ApiProperty()
  availableTickets: number;

  constructor(values: TrainDto) {
    Object.assign(
      this,
      R.pick(values, ['id', 'seats', 'departureAt', 'availableTickets']),
    );
  }
}
