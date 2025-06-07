import { ExecutionContext } from '@nestjs/common';
import { currentUserFactory } from 'src/modules/auth/interfaces/decorators/current-user.decorator';

describe('CurrentUser decorator', () => {
  it('debería devolver el usuario de la request', () => {
    const mockUser = { id: 'user123', email: 'user@example.com' };

    const mockContext = {
      switchToHttp: () => ({
        getRequest: () => ({ user: mockUser }),
      }),
    } as unknown as ExecutionContext;

    const result = currentUserFactory(null, mockContext);

    expect(result).toEqual(mockUser);
  });
});
