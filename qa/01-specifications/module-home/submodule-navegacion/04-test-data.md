# Datos de prueba - Navegación global

> Módulo `HOME` | Submódulo `NAV` | Última actualización: 2026-11-21

## Prerrequisitos

| Elemento | Descripción | Fuente |
|---|---|---|
| Contexto de navegador limpio | Sin cookies del sitio, para que aparezca el banner | Nuevo contexto de Playwright |
| Viewports | Escritorio 1366x900 y móvil Pixel 5 (393x851) | Dispositivos de Playwright |

## Dependencias upstream

No aplica: no se identificaron campos dinámicos cuyas opciones dependan de otro campo, registro o módulo. Las listas observadas (filtros, opciones de selección) son estáticas y se renderizan en el HTML de la página.

## Formas de datos por escenario

### Escenario: Navegación por menú

- Entrada: lista de ítems y rutas de RN-HOME-001 (dato curado en `test-data/static/`).
- Salida esperada: HTTP 200 y URL destino.

### Escenario: Ruta inexistente

- Entrada: `/qa-pagina-inexistente-{EXEC_IDX}/`.
- Salida esperada: HTTP 404 y título de RN-HOME-011.

## Datos volátiles

El contenido de marketing cambia con frecuencia (regla 7 del proyecto). Las aserciones validan estructura y rutas; los textos esperados se centralizan en `enums/messages.ts` o `test-data/static/`.

| Dato | Ejemplo observado (2026-11-21) | Estrategia |
|---|---|---|
| Ítem de menú del evento | "Testing Day Chile 2026" | Texto en `enums/messages.ts`; asertar por ruta `/testing-day-chile/` |
| Año del copyright | "© 2026 Capacitaciones" | Asertar patrón `© \d{4}` |
| Mensaje de WhatsApp prellenado | Texto sobre el Bootcamp | Asertar solo host `wa.me` y presencia de `text=` |

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
