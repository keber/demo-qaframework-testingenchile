# Módulo EVT - Eventos Testing Day

> Última actualización: 2026-11-21 | Etapas 1 (análisis) y 2 (especificación) completadas | Fuente: Exploración en producción (solo lectura), 2026-11-21

Evento anual Testing Day Chile: página de la edición vigente (2026), agenda online, sponsors, y el archivo de ediciones anteriores. Contenido altamente volátil (fechas, agenda, sponsors).

## Submódulos

| Submódulo | Código | Ruta principal | TCs | P0 | P1 | P2 | P3 | Carpeta |
|---|---|---|---|---|---|---|---|---|
| Testing Day Chile (edición vigente) | TDY | `/testing-day-chile/` | 12 | 1 | 5 | 5 | 1 | `submodule-testing-day/` |
| Ediciones anteriores | EDI | `/testing-day-chile-ediciones-anteriores/` | 9 | 1 | 2 | 2 | 4 | `submodule-ediciones/` |

**Total del módulo**: 21 casos de prueba.

## Flujo E2E del módulo

```text
[Menú "Testing Day Chile 2026"] -> [/testing-day-chile/] -> [Agenda Online] -> [StreamYard (externo)]
        |                                   +-> [Sponsors 2026]
        |                                   +-> [ecopass (no ejecutado)]
        +-> "Ediciones anteriores" -> [/testing-day-chile-ediciones-anteriores/] -> [páginas por edición 2020-2025]
```

## Reglas de negocio

Los identificadores `RN-EVT-NNN` son únicos dentro del módulo; cada submódulo usa un rango propio.
