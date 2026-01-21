import {
  IsArray,
  IsString,
  IsUUID,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class OrderItemRequestDto {
  @ApiProperty({
    description: 'The product ID',
    example: 'prod-123',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Quantity of the product',
    example: 2,
  })
  @IsNumber()
  quantity: number;

  @ApiProperty({
    description: 'Price per unit',
    example: 10.99,
  })
  @IsNumber()
  price: number;
}

export class CreateOrderRequestDto {
  @ApiProperty({
    description: 'The user ID who is creating the order',
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @IsUUID()
  userId: string;

  @ApiProperty({
    description: 'List of items in the order',
    type: [OrderItemRequestDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemRequestDto)
  items: OrderItemRequestDto[];

  @ApiProperty({
    description: 'Correlation ID for tracking the request',
    example: 'corr-12345',
  })
  @IsString()
  correlationId: string;
}
