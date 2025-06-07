import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { Types } from 'mongoose';
import { ProductosService } from 'src/modules/products/applications/productos.service';
import { IProductoRepository } from 'src/modules/products/domain/producto.repository.interface';
import { Producto } from 'src/modules/products/domain/producto.schema';

describe('ProductosService', () => {
  let service: ProductosService;
  let repo: jest.Mocked<IProductoRepository>;

  const USER_ID = new Types.ObjectId('64f8d97b7c6c9e001c123abc');

  const productoMock = {
    _id: new Types.ObjectId(),
    nombre: 'Café',
    precio: 10,
    validado: true,
    estado: true,
    dueno: { _id: USER_ID },
    save: jest.fn().mockResolvedValue(this),
    } as unknown as Producto;


  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
    } as unknown as jest.Mocked<IProductoRepository>;

    service = new ProductosService(repo);
  });

  describe('actualizar', () => {
    let productoBase;

    beforeEach(() => {
      productoBase = {
        _id: new Types.ObjectId(),
        nombre: 'Original',
        precio: 100,
        estado: true,
        validado: true,
        dueno: { _id: USER_ID },
        save: jest.fn(),
      };
    });

    it('debe actualizar producto si es dueño', async () => {
      const productoMock = { ...productoBase };
      productoMock.save.mockResolvedValue({
        ...productoMock,
        nombre: 'Nuevo',
      });

      repo.findById.mockResolvedValue(productoMock);

      const dto = { nombre: 'Nuevo' };
      const result = await service.actualizar(productoMock._id.toHexString(), dto, USER_ID.toHexString());

      expect(productoMock.save).toHaveBeenCalled();
      expect(result.nombre).toBe('Nuevo');
    });

    it('lanza ForbiddenException si no es dueño', async () => {
      const productoMock = { ...productoBase };
      productoMock.dueno = { _id: new Types.ObjectId() }; // otro dueño
      repo.findById.mockResolvedValue(productoMock);

      await expect(
        service.actualizar(productoMock._id.toHexString(), { nombre: 'Nuevo' }, USER_ID.toHexString())
      ).rejects.toThrow(ForbiddenException);
    });

    it('lanza NotFoundException si no existe', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(
        service.actualizar(new Types.ObjectId().toHexString(), { nombre: 'Nuevo' }, USER_ID.toHexString())
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('inactivar', () => {
    let productoBase;

    beforeEach(() => {
      productoBase = {
        _id: new Types.ObjectId(),
        nombre: 'Original',
        precio: 100,
        estado: true,
        validado: true,
        dueno: { _id: USER_ID },
        save: jest.fn(),
      };
    });

    it('debe inactivar el producto si es dueño', async () => {
      const productoMock = { ...productoBase };
      productoMock.save.mockResolvedValue({
        ...productoMock,
        estado: false,
      });

      repo.findById.mockResolvedValue(productoMock);

      const result = await service.inactivar(productoMock._id.toHexString(), USER_ID.toHexString());

      expect(productoMock.estado).toBe(false);
      expect(productoMock.save).toHaveBeenCalled();
      expect(result.estado).toBe(false);
    });

    it('lanza ForbiddenException si no es dueño', async () => {
      const productoMock = { ...productoBase };
      productoMock.dueno = { _id: new Types.ObjectId() }; // otro dueño
      repo.findById.mockResolvedValue(productoMock);

      await expect(
        service.inactivar(productoMock._id.toHexString(), USER_ID.toHexString())
      ).rejects.toThrow(ForbiddenException);
    });

    it('lanza NotFoundException si no existe', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(
        service.inactivar(new Types.ObjectId().toHexString(), USER_ID.toHexString())
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('buscarPorId', () => {
    it('debe devolver el producto mapeado', async () => {
        repo.findById.mockResolvedValue(productoMock);
        const result = await service.buscarPorId(productoMock._id.toHexString());
        expect(result.nombre).toBe('Café');
    });

    it('lanza NotFoundException si no existe', async () => {
      repo.findById.mockResolvedValue(null);
      await expect(service.buscarPorId(new Types.ObjectId().toHexString())).rejects.toThrow(NotFoundException);
    });
  });
});
