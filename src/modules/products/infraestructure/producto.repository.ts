import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Producto, ProductoDocument } from '../domain/producto.schema';
import { Model } from 'mongoose';
import { IProductoRepository } from '../domain/producto.repository.interface';

@Injectable()
export class ProductoRepository implements IProductoRepository {
  constructor(
    @InjectModel(Producto.name) private productoModel: Model<ProductoDocument>
  ) {}

  async findAll(skip: number, limit: number): Promise<Producto[]> {
    return this.productoModel
      .find()
      .populate('dueno', '-password')
      .skip(skip)
      .limit(limit);
  }

  async findById(id: string): Promise<Producto | null> {
    return this.productoModel.findById(id).populate('dueno', '-password').exec();
  }

  async save(producto: Producto): Promise<Producto> {
    return producto.save();
  }

  async create(data: any): Promise<Producto> {
    const nuevo = new this.productoModel(data);
    return nuevo.save();
  }

}
