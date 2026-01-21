// application/commands/authenticate-user.command.ts
// Comando para autenticação (simplificado para demo).

export class AuthenticateUserCommand {
  constructor(
    public readonly username: string,
    public readonly password: string,
  ) {}
}
