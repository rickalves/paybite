# API Gateway - IbiEats

O **API Gateway** é o ponto de entrada unificado do sistema IbiEats, implementado com **Arquitetura Orientada a Eventos (EDA)** e **Domain-Driven Design (DDD)**. Ele recebe requests HTTP, valida autenticação/autorização, transforma dados em comandos, aplica regras de negócio e publica eventos para comunicação assíncrona com outros microserviços via RabbitMQ.

## Arquitetura e Padrões Aplicados

### Domain-Driven Design (DDD)
- **Bounded Context**: "API de Entrada" - foco em validação inicial e publicação de eventos.
- **Camadas**:
  - **Domain**: Regras de negócio puras (entidades, value objects, serviços de domínio).
  - **Application**: Casos de uso via CQRS (commands/queries e handlers).
  - **Infrastructure**: Adapters externos (RabbitMQ, JWT).
  - **Presentation**: Interfaces HTTP (controllers, DTOs, guards).

### Event-Driven Architecture (EDA)
- Publica eventos (ex.: `OrderRequestedEvent`) para iniciar fluxos em outros serviços.
- Usa RabbitMQ para mensageria assíncrona, reduzindo acoplamento.

### CQRS (Command Query Responsibility Segregation)
- **Commands**: Ações que mudam estado (ex.: `CreateOrderCommand`).
- **Handlers**: Implementam lógica de commands.

## Estrutura de Pastas e Arquivos

```
src/
├── main.ts                          # Bootstrap da aplicação NestJS
├── app.module.ts                    # Módulo raiz com imports (CQRS, RabbitMQ, JWT)
├── domain/                          # Camada de Domínio
│   ├── entities/
│   │   ├── order-request.entity.ts  # Entidade: OrderRequest (validações, regras)
│   │   └── user.entity.ts           # Entidade: User (usuário autenticado)
│   ├── value-objects/
│   │   ├── order-item.vo.ts         # VO: OrderItem (imutável, validações)
│   │   └── correlation-id.vo.ts     # VO: CorrelationId (rastreabilidade)
│   ├── services/
│   │   └── order-validation.service.ts # Serviço: valida regras globais
│   └── events/
│       └── order-requested.event.ts # Evento: OrderRequestedEvent (tipado com OrderItemEvent)
├── application/                     # Camada de Aplicação
│   ├── commands/
│   │   └── create-order.command.ts  # Comando: CreateOrderCommand
│   ├── handlers/
│   │   └── create-order.handler.ts  # Handler: executa comando, publica evento
│   └── dtos/
│       └── create-order.dto.ts      # DTO interno: CreateOrderDto
├── infrastructure/                  # Camada de Infraestrutura
│   ├── messaging/rabbitmq/
│   │   └── event-publisher.service.ts # Adapter: publica eventos no RabbitMQ
│   └── auth/
│       └── jwt.strategy.ts          # Adapter: valida JWT
├── presentation/                    # Camada de Apresentação
│   ├── controllers/
│   │   ├── orders.controller.ts     # Controller: endpoint /orders (POST)
│   │   └── auth.controller.ts       # Controller: endpoint /auth/login (POST)
│   ├── dtos/
│   │   └── create-order.request.dto.ts # DTO API: valida entrada HTTP
│   └── guards/
│       └── jwt-auth.guard.ts        # Guard: protege endpoints com JWT
└── shared/                          # Código Compartilhado
    └── constants/
        └── rabbitmq.constants.ts    # Constantes: nomes de exchanges
```

### Função de Cada Arquivo
- **main.ts**: Inicializa o app, configura portas e middlewares.
- **app.module.ts**: Configura módulos (CQRS, RabbitMQ, JWT) e providers.
- **domain/entities/order-request.entity.ts**: Modelo de negócio com validações (ex.: pedido deve ter itens).
- **domain/value-objects/order-item.vo.ts**: Objeto imutável para itens (ex.: quantidade > 0).
- **domain/services/order-validation.service.ts**: Lógica de negócio não ligada a entidades (ex.: limite de itens).
- **domain/events/order-requested.event.ts**: Contrato de evento para publicação.
- **application/commands/create-order.command.ts**: Estrutura imutável para intenção de criar pedido.
- **application/handlers/create-order.handler.ts**: Executa o comando: valida, cria entidade, publica evento.
- **application/dtos/create-order.dto.ts**: Transfere dados entre camadas.
- **infrastructure/messaging/rabbitmq/event-publisher.service.ts**: Publica eventos no RabbitMQ.
- **infrastructure/auth/jwt.strategy.ts**: Valida tokens JWT para autenticação.
- **presentation/controllers/orders.controller.ts**: Endpoint HTTP que recebe request e executa comando.
- **presentation/dtos/create-order.request.dto.ts**: Valida entrada da API com decorators.
- **presentation/guards/jwt-auth.guard.ts**: Protege rotas exigindo JWT válido.
- **shared/constants/rabbitmq.constants.ts**: Constantes para configuração de mensageria.

## Dependências Principais
- `@nestjs/cqrs`: Para CQRS (commands e handlers).
- `@golevelup/nestjs-rabbitmq`: Para integração com RabbitMQ (EDA).
- `@nestjs/jwt` e `passport-jwt`: Para autenticação JWT.
- `class-validator` e `class-transformer`: Para validação de DTOs.

## Configuração de Paths (Aliases)
O `tsconfig.json` define aliases para imports absolutos, facilitando a navegação:
- `@domain/*` → `src/domain/*`
- `@application/*` → `src/application/*`
- `@infrastructure/*` → `src/infrastructure/*`
- `@presentation/*` → `src/presentation/*`
- `@shared/*` → `src/shared/*`

Exemplo: `import { OrderRequest } from '@domain/entities/order-request.entity';`

## Exemplo de Uso
```bash
curl -X POST http://localhost:3000/orders \
  -H "Authorization: Bearer <jwt-token>" \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "uuid-user",
    "items": [{"productId": "uuid-prod", "quantity": 2, "price": 10.0}],
    "correlationId": "corr-123"
  }'
```
Isso publica um evento `OrderRequestedEvent` no RabbitMQ, iniciado o fluxo no Orders Service.

## Melhorias de Tipagem
- Eventos de domínio usam tipos específicos (ex.: `OrderItemEvent`) em vez de `any` para maior segurança e manutenibilidade.
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ pnpm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Configuração de Ambiente
Copie `.env.example` para `.env` e configure:
- `JWT_SECRET`: Chave secreta para JWT.
- `RABBITMQ_URI`: URI do RabbitMQ.
- `PORT`: Porta do serviço (padrão 3000).

## Endpoints
- `POST /auth/login`: Login simulado (retorna JWT). Body: `{ "username": "admin", "password": "password" }`
- `POST /orders`: Cria pedido (requer JWT no header `Authorization: Bearer <token>`).

## Como Executar
1. Instale dependências: `pnpm install`
2. Configure `.env` com variáveis necessárias.
3. Execute: `pnpm run start:dev`
4. Teste login e criação de pedidos.

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
