
# Clase 7
## Tabla comparativa de Comunicación Síncrona v/s Asíncrona 

| Aspecto | Sincrónia (REST/HTTP/gRPC) | Asincronía (Eventos/Mensajes) |
| ------- | -------------------------- | ----------------------------- |
| Flujo   | El emisor espera una respuesta inmediata | El emisor publica y continúa su ejecución (fire-and-forget) |
| Acomplamiento | Alto. Receptor debe estar disponible en este momento | Bajo. Receptor puede procesar más tarde |
| Resilencia | Si el servicio receptor falla, la llamada falla | Si el consumidor falla, el mensaje puede reintentarse o quedar en cola |
| Escalabilidad | Dificil escalar picos de trabajo pesados | Facil: podemos aumentar consumidores para procesar la cola. |
| Casos de Uso | Validaciones, consultas inmediatas (CRUD) | Emails, facturación, procesar videos, pagos, reportes, etc. |

## Event-Driven

- Event (evento): Algo que ocurrió en el dominio (ej: se registra un usuario -> `UserRegistered`)
- Emitter (emisor): Quien publica el evento.
- Listener (oyente/handler): Quien reacciona al evento, sin conocer al emisor.

**Ventaja Clave**: Bajo acoplamiento. Podemos añadir nuevos efectos sin tocar la lógica principal.

## Ejercicio 7/08
1. `UserService.register()` crear usuario.
2. Emitir un evento `user.registered` con los datos mínimos.
3. `EmialListener` reacciona enviando un email (mock).
4. `AuditListener` reacciona registrando en auditoría (mock).


## Directo vs Evento 
| Aspecto | Llamada Directa | Event-Driven |
| --- | --- | --- |
| Acomplamiento | Alto | Bajo |
| Extensibilidad | Modificar el servicio | Añadimos un listerner |
| Testeablidad | Mockear dependencias | Probar emisor y listener por separado |
| Alcance | Misma Aplicación (mismo proceso) | Misma aplicación (mismo proceso) | 
| Resilencia ante caídas | No persiste | No persiste (se pierden si el proceso cae) |

Limitación importante: `@nestjs/event-emitter` funciona dentro del mismo proceso. 
Si el proceso se reinicia o tenemos múltiples instancias (replicas), los eventos no sobreviven ni se distribuyen 
entre instancias. Ahí es donde entran colas/mensajería.` 

# Colas y Mensajería
Cuando necesitamos desacoplamiento enter servicios, resilencia, persistencia o escalado entre múltiples instancias, 
pasamos de eventos in-process a mensajes.

| Característica | Pub/Sub | P2P |
| --- | --- | --- |
| Modelo | Uno emite (pub) -> muchos reciben (sub) | Un productor envía -> exactamente un consumidor recibe el mensaje |
| Canal | Topic (o Event Bus) | Cola (Queue) |
| Entrega | Multiples listeners/consumidores pueden procesarlo | El mensaje se consuime una única vez. Se elimina o se pasa a otro. |
| Casoss de Uso | Notificaciones, auditoría, métricas, logging, etc.| Procesamiento de trabajos, pagos, ordenes (tareas que solo se deben hacer 1 vez). |
| Ejemplo | `user.registered`-> email + audit + analitica | `order.created` -> procesar el pago (un worker) |

# Evento vs Mensaje

| Concepto | Evento | Mensaje |
| --- | --- | --- |
| Significado | "Esto ocurrió" (en pasado) | "Haz esto" (comando) o "Esto ocurrió" (evento de dominio) |
| Destino | Desconocido (broadcast) | Suele tener un destino o contrato claro |
| Persistencia | No (in-process) | Si (en cola / broker)
| Alcance | Proceso único | Entre servicios / instancias |

