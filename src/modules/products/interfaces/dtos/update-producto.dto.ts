import { IsString, IsNumber, IsOptional, Min } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProductoDto {
  @ApiPropertyOptional({ description: 'Nombre del producto' })
  @IsOptional()
  @IsString()
  nombre?: string;

  @ApiPropertyOptional({ description: 'Precio del producto', minimum: 0 })
  @IsOptional()
  @IsNumber()
  @Min(0)
  precio?: number;
}
