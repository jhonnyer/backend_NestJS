import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Producto, ProductoSchema } from './domain/producto.schema';
import { ProductosService } from './applications/productos.service';
import { ProductoRepository } from './infraestructure/producto.repository';
import { ProductosController } from './interfaces/controllers/productos.controller';

@Module({
  imports: [MongooseModule.forFeature([{ name: Producto.name, schema: ProductoSchema }])],
  controllers: [ProductosController],
  providers: [
    {
      provide: 'IProductosService',
      useClass: ProductosService,
    },
    {
      provide: 'IProductoRepository',
      useClass: ProductoRepository
    },
  ],
})
export class ProductosModule {}
