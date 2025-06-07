import { CreateProductoDto } from '../interfaces/dtos/create-producto.dto';
import { UpdateProductoDto } from '../interfaces/dtos/update-producto.dto';

export interface IProductosService {
  listar(pagina: number, limite: number): Promise<any>;
  crear(dto: CreateProductoDto, userId: string): Promise<any>;
  actualizar(id: string, dto: UpdateProductoDto, userId: string): Promise<any>;
  inactivar(id: string, userId: string): Promise<any>;
  buscarPorId(id: string): Promise<any>;
}
