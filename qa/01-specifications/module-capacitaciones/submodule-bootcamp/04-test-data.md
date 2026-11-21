# Datos de prueba - Bootcamp de Testing

> Módulo `CAP` | Submódulo `BTC` | Última actualización: 2026-11-21

## Prerrequisitos

| Elemento | Descripción | Fuente |
|---|---|---|
| Contexto limpio | Banner de cookies resuelto con "Aceptar solo lo necesario". | Page object |
| Bloqueo de etiquetas de Google | Abortar `googlesyndication.com` y `googleadservices.com` con `page.route` para no registrar conversiones falsas (HC-21) | Fixture |

## Dependencias upstream

No aplica: no se identificaron campos dinámicos cuyas opciones dependan de otro campo, registro o módulo. Las listas observadas (filtros, opciones de selección) son estáticas y se renderizan en el HTML de la página.

## Formas de datos por escenario

### Escenario: Autodiagnóstico

- Respuestas (valores) [2,2,2,2] -> "Muy alineada"
- [1,1,1,0] -> "Con potencial de desarrollo"
- [0,0,0,0] -> "Vale la pena conversar"
- Bordes: [2,2,1,1] (6) -> "Muy alineada"; [2,1,1,1] (5) y [1,1,1,0] (3) -> "Con potencial"; [1,1,0,0] (2) -> "Vale la pena conversar"

## Datos volátiles

El contenido de marketing cambia con frecuencia (regla 7 del proyecto). Las aserciones validan estructura y rutas; los textos esperados se centralizan en `enums/messages.ts` o `test-data/static/`.

| Dato | Ejemplo observado (2026-11-21) | Estrategia |
|---|---|---|
| Fecha de próximo inicio | "2 de noviembre de 2026" | Asertar fecha >= hoy (RN-CAP-016), nunca el literal |
| Docentes | 8 docentes | No asertar nombres |
| Textos del resultado | Ver RN-CAP-019 | `enums/messages.ts` |

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
