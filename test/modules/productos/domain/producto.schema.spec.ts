import { model, Types, Document, Model } from 'mongoose';
import { Producto, ProductoSchema } from 'src/modules/products/domain/producto.schema';

describe('Producto Schema', () => {
  let ProductoModel: Model<Producto>;

  beforeAll(() => {
    ProductoModel = model<Producto>('Producto', ProductoSchema);
  });

  it('debería fallar si faltan campos requeridos', async () => {
    const producto = new ProductoModel();

    try {
      await producto.validate();
    } catch (error: any) {
      expect(error.errors.nombre).toBeDefined();
      expect(error.errors.precio).toBeDefined();
      expect(error.errors.dueno).toBeDefined();
    }
  });

  it('debería aceptar un producto válido', async () => {
    const producto = new ProductoModel({
      nombre: 'Café de Nariño',
      precio: 12000,
      dueno: new Types.ObjectId(),
    });

    const error = await producto.validate().catch((err) => err);
    expect(error).toBeUndefined();
  });
});