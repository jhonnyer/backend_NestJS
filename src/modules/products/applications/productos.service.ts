import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  Logger,
  HttpException,
  Inject,
} from '@nestjs/common';
import { CreateProductoDto } from '../interfaces/dtos/create-producto.dto';
import { UpdateProductoDto } from '../interfaces/dtos/update-producto.dto';
import axios from 'axios';
import { validateObjectIdOrThrow } from 'src/shared/utils/validate-object-id';
import { IProductosService } from './productos.service.interface';
import { IProductoRepository } from '../domain/producto.repository.interface';
import { ResponseProductoDto } from '../interfaces/dtos/response-producto.dto';
import { mapProductoToDto } from 'src/shared/utils/producto.mapper';

@Injectable()
export class ProductosService implements IProductosService{
  private readonly logger = new Logger(ProductosService.name);

  constructor(
    @Inject('IProductoRepository')
    private readonly productoRepository: IProductoRepository
  ) {}

  async crear(dto: CreateProductoDto, userId: string) {
    try {

      // Simulación de integración con sistema core
      // NOTA: COMENTAR ESTAS LINEAS PARA QUE PERMITA CREAR UN PRODUCTO Y NO PRESENTE ERRORES CON EL SERVICIO VALIDATE
      /*
      const response = await axios.post('http://mock-core.com/validate', {
        nombre: dto.nombre,
        precio: dto.precio,
      });

      const validado = response.data?.validado ?? false; 

      if (!validado && dto.precio < 10) {
        throw new BadRequestException('Producto no validado por core financiero (precio < 10)');
      }  */

      // Respuesta simulada:
      const response = { data: { validado: false } };

      const validado = response.data?.validado ?? false;

      if (!validado && dto.precio < 10) {
        this.logger.warn('Producto no validado por core financiero (precio < 10)');
      }

      const producto = {
        ...dto,
        dueno: userId,
        estado: true,
        validado,
      };

      return await this.productoRepository.create(producto);
    } catch (error) {

      const statusCode = error.response?.status || 500;
      const statusText = error.response?.statusText || 'Unknown error';

      this.logger.error(
        'Error validando con el core financiero',
        `${statusCode} ${statusText} - ${error.message}`
      );
      throw new HttpException(
        {
          statusCode,
          message: `Error en validación del producto. El servicio 'mock-core.com/validate' no respondió correctamente`,
          detalle: error.message,
        },
        statusCode,
      );
    }
  }

  async listar(pagina = 1, limite = 10) {
    const skip = (pagina - 1) * limite;
    return this.productoRepository.findAll(skip, limite);
  }

  async actualizar(id: string, dto: UpdateProductoDto, userId: string): Promise<ResponseProductoDto> {
    validateObjectIdOrThrow(id, 'El ID del producto no es válido');
    const producto = await this.productoRepository.findById(id);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    if (producto.dueno._id.toString() !== userId) {
      throw new ForbiddenException('No tienes permiso para hacer esta operación');
    }
    Object.assign(producto, dto);
    const actualizado = await producto.save();
    return mapProductoToDto(actualizado);
  }

  async inactivar(id: string, userId: string) {
    
    validateObjectIdOrThrow(id, 'El ID del producto no es válido');
    const producto = await this.productoRepository.findById(id);
    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }
    if (producto.dueno._id.toString() !== userId) {
      throw new ForbiddenException('No puedes eliminar este producto');
    }
    producto.estado = false;
    return await producto.save();
  }

  async buscarPorId(id: string): Promise<ResponseProductoDto> {
    validateObjectIdOrThrow(id, 'El ID del producto no es válido');
    const producto = await this.productoRepository.findById(id);
    if (!producto) throw new NotFoundException('Producto no encontrado');

    return mapProductoToDto(producto);
  }
}
