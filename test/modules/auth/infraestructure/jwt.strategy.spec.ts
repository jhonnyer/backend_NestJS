import { JwtStrategy } from "src/modules/auth/infraestructure/jwt.strategy";

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(() => {
    process.env.JWT_SECRET = 'test_secret'; // Asegura que la variable de entorno esté definida
    strategy = new JwtStrategy();
  });

  it('debería estar definido', () => {
    expect(strategy).toBeDefined();
  });

  it('validate debería retornar un objeto con _id y email', async () => {
    const payload = { sub: 'userId123', email: 'user@example.com' };
    const result = await strategy.validate(payload);

    expect(result).toEqual({ _id: 'userId123', email: 'user@example.com' });
  });
});
