// application/sagas/orders.saga.ts
// Saga Orquestrada para coordenar o fluxo de pedidos.
// Ouve eventos de domínio e outros serviços, decide próximos passos ou compensações.
// Centraliza a lógica da SAGA, evitando coreografia distribuída.

import { Injectable } from '@nestjs/common';
import { Saga, ICommand, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { OrderCreatedEvent } from '@domain/events/order-created.event';
import { InventoryReservedEvent } from '@domain/events/inventory-reserved.event'; // Assumindo que existe
import { RequestInventoryReservationCommand } from '@application/commands/request-inventory-reservation.command'; // Placeholder

@Injectable()
export class OrdersSaga {
  @Saga()
  orderSaga = (events$: Observable<any>): Observable<ICommand> => {
    return events$.pipe(
      ofType(OrderCreatedEvent),
      map(
        (event) =>
          new RequestInventoryReservationCommand(event.orderId, event.items),
      ),
      // Adicionar mais: ouvir InventoryReservedEvent -> RequestPaymentCommand, etc.
      // Em caso de falha: emitir CancelOrderCommand
    );
  };
}

// Nota: Commands adicionais (ex.: RequestInventoryReservationCommand) precisam ser criados.
// Eventos externos (ex.: de inventory service) serão ouvidos via subscribers na infrastructure.
