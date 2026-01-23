// shared/types/index.ts
// Tipos compartilhados utilizados em todo o serviço.
// Centraliza definições de tipos para evitar duplicação e facilitar manutenção.
// Ex.: Tipos para IDs, valores monetários, etc.

export type OrderId = string; // Identificador único do pedido (ex.: UUID)
export type ItemId = string; // ID de um item no pedido
export type UserId = string; // ID do usuário que fez o pedido

// Tipo para representar dinheiro (value object simples)
export interface Money {
  amount: number; // Valor em centavos (ex.: 1000 = R$10.00)
  currency: string; // Moeda (ex.: 'BRL')
}
