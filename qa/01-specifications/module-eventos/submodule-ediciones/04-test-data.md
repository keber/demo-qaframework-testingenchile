# Datos de prueba - Ediciones anteriores

> Módulo `EVT` | Submódulo `EDI` | Última actualización: 2026-11-21

## Prerrequisitos

| Elemento | Descripción | Fuente |
|---|---|---|
| Contexto limpio | Banner de cookies resuelto con "Aceptar solo lo necesario". | Page object |
| Lista de páginas de edición | Derivada del DOM del submenú "Ediciones anteriores" | Tiempo de ejecución |

## Dependencias upstream

No aplica: no se identificaron campos dinámicos cuyas opciones dependan de otro campo, registro o módulo. Las listas observadas (filtros, opciones de selección) son estáticas y se renderizan en el HTML de la página.

## Formas de datos por escenario

### Escenario: Páginas de edición

- Entrada: pares ruta -> año esperado (curados en `test-data/static/`).
- Salida: HTTP 200 y año presente en `<title>`.

## Datos volátiles

El contenido de marketing cambia con frecuencia (regla 7 del proyecto). Las aserciones validan estructura y rutas; los textos esperados se centralizan en `enums/messages.ts` o `test-data/static/`.

| Dato | Ejemplo observado (2026-11-21) | Estrategia |
|---|---|---|
| Lista de ediciones | 2021-2025 + 2020 | Derivar del DOM del menú |
| Speakers y sponsors históricos | Nombres de personas y empresas | No asertar nombres de personas |

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
