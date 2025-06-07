import { Producto } from './producto.schema';

export interface IProductoRepository {
    findAll(skip: number, limit: number): Promise<Producto[]>;
    create(dto: any): Promise<Producto>;
    findById(id: string): Promise<Producto | null>;
    save(producto: Producto): Promise<Producto>;
}
