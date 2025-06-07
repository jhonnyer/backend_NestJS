import { isValidObjectId } from 'mongoose';
import { BadRequestException } from '@nestjs/common';

export function validateObjectIdOrThrow(id: string, resource = 'El ID proporcionado no es válido') {
  if (!isValidObjectId(id)) {
    throw new BadRequestException(resource);
  }
}
