import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: { createdAt: 'fecha_creacion' } })
export class Producto extends Document {
  declare _id: Types.ObjectId;

  @Prop({ required: true })
  nombre: string;

  @Prop({ required: true, min: 0 })
  precio: number;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  dueno: Types.ObjectId;

  @Prop({ default: true })
  estado: boolean; // true = activo, false = inactivo

  @Prop({ default: false })
  validado: boolean;

  declare fecha_creacion: Date;
}

export type ProductoDocument = Producto & Document;
export const ProductoSchema = SchemaFactory.createForClass(Producto);
