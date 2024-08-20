import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { PrismaService } from 'src/prisma/prisma.service';

@ValidatorConstraint({ name: 'Exist', async: true })
@Injectable()
export class ExistConstraint implements ValidatorConstraintInterface {
  constructor(private readonly prisma: PrismaService) {}

  async validate(value: unknown, args: ValidationArguments): Promise<boolean> {
    const [model, property = 'id'] = args.constraints as [string, string];

    if (!(model in this.prisma)) {
      throw new Error(`Model ${model} does not exist in Prisma Client.`);
    }

    if (!value) return false;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const count = await (this.prisma as any)[model].count({
      where: { [property]: value },
    });

    return count > 0;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} #${args.value} does not exist`;
  }
}

export function Exist(
  model: keyof PrismaClient,
  property: string = 'id',
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [model, property],
      validator: ExistConstraint,
    });
  };
}
