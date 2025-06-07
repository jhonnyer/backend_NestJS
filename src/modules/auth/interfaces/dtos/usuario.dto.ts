export class UsuarioDto {
  id: string;
  email: string;
  fullName: string;

  constructor(partial: Partial<UsuarioDto>) {
    Object.assign(this, partial);
  }
}
