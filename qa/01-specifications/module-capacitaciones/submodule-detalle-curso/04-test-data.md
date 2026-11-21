# Datos de prueba - Detalle de curso

> Módulo `CAP` | Submódulo `CUR` | Última actualización: 2026-11-21

## Prerrequisitos

| Elemento | Descripción | Fuente |
|---|---|---|
| Contexto limpio | Banner de cookies resuelto con "Aceptar solo lo necesario". | Page object |
| Lista de URLs de curso | Derivada de los "Saber más" del catálogo | Tiempo de ejecución |

## Dependencias upstream

No aplica: no se identificaron campos dinámicos cuyas opciones dependan de otro campo, registro o módulo. Las listas observadas (filtros, opciones de selección) son estáticas y se renderizan en el HTML de la página.

## Formas de datos por escenario

### Escenario: Formulario válido (sin enviar)

- Nombre y Apellido: `QA Visitante {EXEC_IDX}`
- E-mail: `qa.visitante.{EXEC_IDX}@example.com`
- Celular: `+56 2 0000 0000` (ficticio)
- Mensaje: `QA consulta sintética {EXEC_IDX} - no enviar`
- Consentimiento: marcado
- Esperado: `checkValidity()` = true; no se hace clic en enviar.

### Escenario: Negativo: obligatorios vacíos

- Todos los campos vacíos.
- Esperado: `checkValidity()` = false; cada obligatorio con `validationMessage` no vacío.

### Escenario: Negativo: formato

- E-mail: `qa-invalido`; Celular: `abc`.
- Esperado: ambos campos con `validity.valid` = false.

## Datos volátiles

El contenido de marketing cambia con frecuencia (regla 7 del proyecto). Las aserciones validan estructura y rutas; los textos esperados se centralizan en `enums/messages.ts` o `test-data/static/`.

| Dato | Ejemplo observado (2026-11-21) | Estrategia |
|---|---|---|
| Token del botón de pago | `flow.cl/btn.php?token=...` | Asertar host `www.flow.cl`, nunca el token |
| Instructores | Nombres y LinkedIn | No asertar nombres (datos personales) |

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
