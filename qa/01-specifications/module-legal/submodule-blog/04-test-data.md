# Datos de prueba - Blog

> Módulo `LEG` | Submódulo `BLG` | Última actualización: 2026-11-21

## Prerrequisitos

| Elemento | Descripción | Fuente |
|---|---|---|
| Contexto limpio | Banner de cookies resuelto con "Aceptar solo lo necesario". | Page object |

## Dependencias upstream

No aplica: no se identificaron campos dinámicos cuyas opciones dependan de otro campo, registro o módulo. Las listas observadas (filtros, opciones de selección) son estáticas y se renderizan en el HTML de la página.

## Formas de datos por escenario

### Escenario: Orden y paginación

- Entrada: fechas `dd.mm.aaaa` de la página 1 y 2.
- Salida: secuencia no creciente; la primera fecha de la página 2 <= la última de la página 1.

## Datos volátiles

El contenido de marketing cambia con frecuencia (regla 7 del proyecto). Las aserciones validan estructura y rutas; los textos esperados se centralizan en `enums/messages.ts` o `test-data/static/`.

| Dato | Ejemplo observado (2026-11-21) | Estrategia |
|---|---|---|
| Artículos y fechas | Primer artículo del 04.09.2026 | Asertar formato y orden, no títulos |
| Token de paginación | `p-e0nza2ma` | Seguir el enlace "Artículos antiguos" en lugar de fijar la URL |

## Generación de datos dinámicos (patrón EXEC_IDX)

Este submódulo no completa formularios; el patrón se documenta por consistencia con el framework y no se requiere:

```typescript
const EXEC_IDX = process.env.EXEC_IDX ?? String(Math.floor(Date.now() / 60_000) % 100_000);
const nombreSintetico = `QA Visitante ${EXEC_IDX}`;
const emailSintetico = `qa.visitante.${EXEC_IDX}@example.com`;
```

## Reglas de aislamiento de datos

1. Los casos son de solo lectura: no crean, modifican ni envían datos al sitio (regla S7).
2. Ningún dato real de personas (nombres, RUT, emails, teléfonos) se versiona (reglas S4 y S5); los datos sintéticos usan el prefijo `QA` y el dominio `example.com`.
3. No se requiere limpieza: no se persiste nada en el sitio.
4. Las interacciones con el banner de cookies eligen siempre "Aceptar solo lo necesario" (regla 6 del proyecto).
