import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/modules/auth/domain/user.schema';
import { CurrentUser } from 'src/modules/auth/interfaces/decorators/current-user.decorator';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { IProductosService } from '../../applications/productos.service.interface';
import { ResponseProductoDto } from '../dtos/response-producto.dto';
import { CreateProductoDto } from '../dtos/create-producto.dto';
import { UpdateProductoDto } from '../dtos/update-producto.dto';

@Controller('productos')
@ApiTags('productos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class ProductosController {
  constructor(
    @Inject('IProductosService')
    private readonly productosService: IProductosService) {}

  @Get()
  @ApiOperation({ summary: 'Listar productos con paginación' })
  @ApiQuery({ name: 'pagina', required: false, type: Number, description: 'Número de página, por defecto 1' })
  @ApiQuery({ name: 'limite', required: false, type: Number, description: 'Cantidad de productos por página, por defecto 10' })
  @ApiResponse({ status: 200, description: 'Lista de productos', type: [ResponseProductoDto] })
  async listar(
    @Query('pagina') pagina = '1',
    @Query('limite') limite = '10',
  ) {
    const pageNum = parseInt(pagina);
    const limitNum = parseInt(limite);
    return this.productosService.listar(pageNum, limitNum);
  }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  @ApiResponse({ status: 201, description: 'Producto creado exitosamente', type: ResponseProductoDto })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
  async crear(@Body() dto: CreateProductoDto, @CurrentUser() user: User) {
    return this.productosService.crear(dto, user._id.toString());
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto a actualizar', type: String })
  @ApiResponse({ status: 200, description: 'Producto actualizado exitosamente', type: ResponseProductoDto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async actualizar(
    @Param('id') id: string,
    @Body() dto: UpdateProductoDto,
    @CurrentUser() user: User,
  ) {
    return this.productosService.actualizar(id, dto, user._id.toString());
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Inactivar un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto a inactivar', type: String })
  @ApiResponse({ status: 200, description: 'Producto inactivado correctamente' })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  @HttpCode(HttpStatus.OK)
  async inactivar(@Param('id') id: string, @CurrentUser() user: User) {
    try {
      const producto = await this.productosService.inactivar(id, user._id.toString());
      return {
        statusCode: HttpStatus.OK,
        message: 'Producto inactivado correctamente',
        producto,
      };
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un producto por ID' })
  @ApiParam({ name: 'id', description: 'ID del producto', type: String })
  @ApiResponse({ status: 200, description: 'Producto encontrado', type: ResponseProductoDto })
  @ApiResponse({ status: 404, description: 'Producto no encontrado' })
  async obtenerPorId(@Param('id') id: string): Promise<ResponseProductoDto> {
    return this.productosService.buscarPorId(id);
  }

}
