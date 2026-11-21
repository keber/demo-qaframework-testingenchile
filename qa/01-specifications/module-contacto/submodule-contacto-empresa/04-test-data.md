# Datos de prueba - Contacto empresa (B2B)

> Módulo `CON` | Submódulo `EMP` | Última actualización: 2026-11-21

## Prerrequisitos

| Elemento | Descripción | Fuente |
|---|---|---|
| Contexto limpio | Banner de cookies resuelto con "Aceptar solo lo necesario". | Page object |
| Bloqueo de etiquetas de Google | Opcional, evita ruido analítico | Fixture `page.route` |

## Dependencias upstream

No aplica: no se identificaron campos dinámicos cuyas opciones dependan de otro campo, registro o módulo. Las listas observadas (filtros, opciones de selección) son estáticas y se renderizan en el HTML de la página.

## Formas de datos por escenario

### Escenario: Formulario válido (sin enviar)

- Nombre: `QA Visitante {EXEC_IDX}`
- Email: `qa.visitante.{EXEC_IDX}@example.com`
- Empresa: `QA Empresa Ficticia {EXEC_IDX}`
- Código Sence: "Aún no sabemos"
- Número de personas: `5`
- Capacitación de interés: `QA consulta sintética {EXEC_IDX} - no enviar`
- Esperado: todos los campos válidos (observado 2026-11-21); no se hace clic en "Enviar".

### Escenario: Negativo: obligatorios vacíos

- Todos vacíos.
- Esperado: `checkValidity()` = false.

### Escenario: Negativo: formato y rango

- Email: `qa-invalido` -> inválido.
- Número de personas: `abc` -> no se admite; `0` y `-5` -> esperado inválido (hoy válidos, HC-13).

## Datos volátiles

El contenido de marketing cambia con frecuencia (regla 7 del proyecto). Las aserciones validan estructura y rutas; los textos esperados se centralizan en `enums/messages.ts` o `test-data/static/`.

| Dato | Ejemplo observado (2026-11-21) | Estrategia |
|---|---|---|
| Textos de etiquetas | Ver inventario | `enums/messages.ts`; si se corrige la ortografía (HC-14), es actualización de datos |

## Generación de datos dinámicos (patrón EXEC_IDX)

Solo se usa para datos sintéticos de formularios que se completan **sin enviar**:

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
