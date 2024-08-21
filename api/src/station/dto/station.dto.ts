import { ApiProperty } from '@nestjs/swagger';

export class StationDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  image: string;
}
