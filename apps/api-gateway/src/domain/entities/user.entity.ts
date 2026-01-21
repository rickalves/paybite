// domain/entities/user.entity.ts
// Entidade para usuário: representa o usuário autenticado.

export class User {
  constructor(
    public readonly id: string,
    public readonly email: string,
  ) {}
}
