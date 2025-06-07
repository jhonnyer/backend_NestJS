import { IsString, IsNumber, Min, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProductoDto {
  @ApiProperty({ description: 'Nombre del producto', example: 'Camiseta' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Precio del producto', minimum: 0, example: 15000 })
  @IsNumber()
  @Min(0)
  precio: number;
}
