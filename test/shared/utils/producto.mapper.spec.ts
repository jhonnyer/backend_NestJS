import { mapProductoToDto } from 'src/shared/utils/producto.mapper';
import { ResponseProductoDto } from 'src/modules/products/interfaces/dtos/response-producto.dto';
import { UsuarioDto } from 'src/modules/auth/interfaces/dtos/usuario.dto';
import { Producto } from 'src/modules/products/domain/producto.schema';
import { Types } from 'mongoose';

describe('mapProductoToDto', () => {
  it('debería mapear un producto a ResponseProductoDto correctamente', () => {
    const userId = new Types.ObjectId();
    const productoId = new Types.ObjectId();

    const productoMock = {
      _id: productoId,
      nombre: 'Producto de prueba',
      precio: 999,
      estado: false,
      validado: true,
      dueno: {
        _id: userId,
        email: 'test@correo.com',
        fullName: 'Usuario Prueba',
      },
    } as unknown as Producto;

    const result = mapProductoToDto(productoMock);

    expect(result).toBeInstanceOf(ResponseProductoDto);
    expect(result).toEqual(
      new ResponseProductoDto({
        id: productoId.toString(),
        nombre: 'Producto de prueba',
        precio: 999,
        estado: false,
        validado: true,
        dueno: new UsuarioDto({
          id: userId.toString(),
          email: 'test@correo.com',
          fullName: 'Usuario Prueba',
        }),
      })
    );
  });
});
