// domain/value-objects/correlation-id.vo.ts
// Value Object para Correlation ID: imutável, usado para rastreabilidade em EDA.

export class CorrelationId {
  constructor(public readonly value: string) {
    if (!value) throw new Error('CorrelationId cannot be empty');
  }
}
