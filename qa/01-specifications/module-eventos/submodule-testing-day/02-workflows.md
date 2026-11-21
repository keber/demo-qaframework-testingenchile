# Flujos - Eventos Testing Day: Testing Day Chile (edición vigente)

> Módulo `EVT` | Submódulo `TDY` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-EVT-001: Informarse del evento y llegar a la inscripción

**Actor**: Visitante anónimo
**Disparador**: El visitante quiere asistir
**Precondición**: Página del evento cargada

**Flujo**:

```text
[/testing-day-chile/] -> [Hero: edición, fechas, sede]
    |
    +-- "Asegura tu entrada" -> [ecopass (no ejercido)]
    +-- "Convertirse en Sponsor" -> [#sponsors-cta] -> "Solicitar Brochure" -> [mailto (no ejercido)]
    v
[Agenda presencial] -> "Ver Agenda Completa e Inscribirse" -> [/agenda-online/] -> "Inscribirse" -> [StreamYard]
    |                                                                                     |
    |                                                                                     +-- 404 (HC-06)
    v
[Sponsors por nivel] -> "Conoce más de nuestros sponsors" -> [/nuestros-sponsors-2026/]
```

**Postcondición**: El visitante llega a la inscripción online, a la compra presencial o al contacto de sponsors.

### FL-EVT-002: Visita después del evento (camino de error / vigencia)

**Actor**: Visitante anónimo
**Disparador**: El visitante llega tras el 28 de agosto
**Precondición**: Fecha actual posterior al evento

**Flujo**:

```text
[/testing-day-chile/] -> [CTAs de compra visibles] -> (esperado por RN-EVT-010: aviso de evento finalizado o próxima edición)
```

**Postcondición**: Hoy el visitante ve CTAs de pre-venta de un evento pasado (HC-04).

