import { ApiProperty } from '@nestjs/swagger';
import { UsuarioDto } from "../../../auth/interfaces/dtos/usuario.dto";

export class ResponseProductoDto {
  @ApiProperty({ description: 'ID del producto', example: '6423f3e1a...' })
  id: string;

  @ApiProperty({ description: 'Nombre del producto' })
  nombre: string;

  @ApiProperty({ description: 'Precio del producto' })
  precio: number;

  @ApiProperty({ description: 'Estado del producto', example: true })
  estado: boolean;

  @ApiProperty({ description: 'Indica si el producto está validado', example: false })
  validado: boolean;

  @ApiProperty({ description: 'Datos del dueño (usuario)' })
  dueno: UsuarioDto;

  constructor(partial: Partial<ResponseProductoDto>) {
    Object.assign(this, partial);
  }
}
