import { ResponseProductoDto } from "src/modules/products/interfaces/dtos/response-producto.dto";
import { UsuarioDto } from "src/modules/auth/interfaces/dtos/usuario.dto";
import { Producto } from "src/modules/products/domain/producto.schema";

export function mapProductoToDto(producto: Producto): ResponseProductoDto {
  const dueno = producto.dueno as any; 

  const duenoDto = new UsuarioDto({
    id: dueno._id.toString(),
    email: dueno.email,
    fullName: dueno.fullName,
  });

  return new ResponseProductoDto({
    id: producto._id.toString(),
    nombre: producto.nombre,
    precio: producto.precio,
    estado: producto.estado,
    validado: producto.validado,
    dueno: duenoDto,
  });
}
