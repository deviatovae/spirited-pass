import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, MinLength } from 'class-validator';
import { Exist } from 'src/validation/exist.constraint';

export class TicketCreateDto {
  @ApiProperty()
  @IsNumber()
  @Exist('train')
  trainId: number;

  @ApiProperty()
  @IsNumber()
  @Exist('station')
  stationId: number;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  name: string;
}
