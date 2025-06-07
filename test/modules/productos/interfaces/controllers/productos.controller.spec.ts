import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/modules/auth/domain/user.schema';
import { IProductosService } from 'src/modules/products/applications/productos.service.interface';
import { ProductosController } from 'src/modules/products/interfaces/controllers/productos.controller';
import { CreateProductoDto } from 'src/modules/products/interfaces/dtos/create-producto.dto';
import { UpdateProductoDto } from 'src/modules/products/interfaces/dtos/update-producto.dto';

describe('ProductosController', () => {
  let controller: ProductosController;
  let productosService: Partial<IProductosService>;

  beforeEach(async () => {
    productosService = {
      listar: jest.fn(),
      crear: jest.fn(),
      actualizar: jest.fn(),
      inactivar: jest.fn(),
      buscarPorId: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [
        {
          provide: 'IProductosService',
          useValue: productosService,
        },
      ],
    }).compile();

    controller = module.get<ProductosController>(ProductosController);
  });

  describe('listar', () => {
    it('invoca a productosService.listar con los parámetros correctos', async () => {
      const expected = [{ id: '1', nombre: 'Producto 1' }];
      (productosService.listar as jest.Mock).mockResolvedValue(expected);

      const result = await controller.listar('2', '5');
      expect(productosService.listar).toHaveBeenCalledWith(2, 5);
      expect(result).toEqual(expected);
    });
  });

  describe('crear', () => {
    it('invoca productosService.crear con dto y userId', async () => {
      const dto: CreateProductoDto = { /* campos necesarios */ } as CreateProductoDto;
      const user = { _id: 'user123' } as unknown as User;
      const expected = { id: 'nuevoId', ...dto };

      (productosService.crear as jest.Mock).mockResolvedValue(expected);

      const result = await controller.crear(dto, user);
      expect(productosService.crear).toHaveBeenCalledWith(dto, 'user123');
      expect(result).toEqual(expected);
    });
  });

  describe('actualizar', () => {
    it('invoca productosService.actualizar con id, dto y userId', async () => {
      const dto: UpdateProductoDto = { /* campos de actualización */ } as UpdateProductoDto;
      const user = { _id: 'user123' } as unknown as User;
      const id = 'prod123';
      const expected = { id, ...dto };

      (productosService.actualizar as jest.Mock).mockResolvedValue(expected);

      const result = await controller.actualizar(id, dto, user);
      expect(productosService.actualizar).toHaveBeenCalledWith(id, dto, 'user123');
      expect(result).toEqual(expected);
    });
  });

  describe('inactivar', () => {
    it('invoca productosService.inactivar y devuelve mensaje correcto', async () => {
      const id = 'prod123';
      const user = { _id: 'user123' } as unknown as User;
      const productoInactivado = { id, activo: false };

      (productosService.inactivar as jest.Mock).mockResolvedValue(productoInactivado);

      const result = await controller.inactivar(id, user);

      expect(productosService.inactivar).toHaveBeenCalledWith(id, 'user123');
      expect(result).toEqual({
        statusCode: 200,
        message: 'Producto inactivado correctamente',
        producto: productoInactivado,
      });
    });
  });

  describe('obtenerPorId', () => {
    it('invoca a productosService.buscarPorId y devuelve producto', async () => {
      const id = 'prod123';
      const producto = { id, nombre: 'Producto' };

      (productosService.buscarPorId as jest.Mock).mockResolvedValue(producto);

      const result = await controller.obtenerPorId(id);

      expect(productosService.buscarPorId).toHaveBeenCalledWith(id);
      expect(result).toEqual(producto);
    });
  });
});
