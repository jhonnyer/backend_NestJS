import { BadRequestException } from '@nestjs/common';
import { validateObjectIdOrThrow } from 'src/shared/utils/validate-object-id';

describe('validateObjectIdOrThrow', () => {
  it('no debería lanzar error si el ID es válido', () => {
    const validId = '507f1f77bcf86cd799439011'; // ID válido de Mongo
    expect(() => validateObjectIdOrThrow(validId)).not.toThrow();
  });

  it('debería lanzar BadRequestException si el ID es inválido', () => {
    const invalidId = '12345';
    expect(() => validateObjectIdOrThrow(invalidId)).toThrow(BadRequestException);
  });

  it('debería lanzar BadRequestException con el mensaje personalizado', () => {
    const invalidId = 'abc';
    const customMessage = 'ID de producto inválido';
    try {
      validateObjectIdOrThrow(invalidId, customMessage);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe(customMessage);
    }
  });
});
