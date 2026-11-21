# Datos de prueba - Páginas legales

> Módulo `LEG` | Submódulo `LGL` | Última actualización: 2026-11-21

## Prerrequisitos

| Elemento | Descripción | Fuente |
|---|---|---|
| Contexto limpio | Banner de cookies resuelto con "Aceptar solo lo necesario". | Page object |
| Marcadores de plantilla | Lista curada de cadenas que no deben aparecer: "Aviso legal: como propietario de una tienda online", "La Tienda [", corchetes con puntos | `test-data/static/` |

## Dependencias upstream

No aplica: no se identificaron campos dinámicos cuyas opciones dependan de otro campo, registro o módulo. Las listas observadas (filtros, opciones de selección) son estáticas y se renderizan en el HTML de la página.

## Formas de datos por escenario

### Escenario: Detección de plantilla

- Entrada: texto visible del cuerpo de la página.
- Salida esperada: ninguna cadena de plantilla presente (RN-LEG-002, RN-LEG-003).

## Datos volátiles

El contenido de marketing cambia con frecuencia (regla 7 del proyecto). Las aserciones validan estructura y rutas; los textos esperados se centralizan en `enums/messages.ts` o `test-data/static/`.

| Dato | Ejemplo observado (2026-11-21) | Estrategia |
|---|---|---|
| Texto legal | Plantilla Webnode | Asertar ausencia de marcadores y presencia de secciones, no el texto completo |

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
