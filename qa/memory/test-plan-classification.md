# Criterio de clasificación y decisiones del plan de pruebas (etapas 3-4)

| Campo | Valor |
|---|---|
| Fecha | 2026-11-21 |
| Fuente | Etapas 3-4: `qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md` (secciones 3.2 y 3.3) |
| Aplica a | Etapa 5 (automatización), clasificación de nuevos hallazgos y mantenimiento |

## Criterio DEF / REC (regla 8 del framework)

1. **Defecto (`DEF-TCH-NNN` + `test.fail()`)** solo si la regla incumplida tiene origen `OBSERVADO` o `ESTÁNDAR` normativo: WCAG 2.1 nivel A con criterio verificable (1.1.1) o un enlace que debe resolver (RN-EVT-009, RN-EVT-015).
2. **`ESTÁNDAR` editorial o SEO** (un H1, títulos, description, ortografía, indicador de obligatorios: RN-HOME-020, RN-CAP-006, RN-CON-006, RN-CON-014, RN-CON-015, RN-EVT-012, RN-LEG-006, RN-LEG-012, RN-LEG-016): recomendación. Extiende la decisión del análisis sobre RN-HOME-020.
3. **`PENDIENTE-CONFIRMACIÓN` o sin regla**: recomendación o pregunta abierta, nunca defecto.
4. Un caso que aserta una regla no confirmada y hoy falla queda `Pendiente`: `test.skip()` con `PENDING-SPEC` y el ID de la REC. Si pasa hoy, se automatiza como guardia de regresión.

## Resultado

- 116 TCs: 84 Automatizar, 2 Manual (TC-CAP-BTC-008, TC-LEG-LGL-004), 30 Pendiente (24 PENDING-SPEC, 4 PENDING-BROWSER, 2 @destructive).
- 5 defectos: DEF-TCH-001 (HC-03), 002 (HC-06), 003 (HC-07), 004 y 005 (HC-08, separado en logo del header y contenido). 9 casos en `test.fail()`.
- 18 recomendaciones: REC-TCH-001 a 018, una por hallazgo restante, en orden de HC.
- Etiquetas: P0 = `@smoke`; P1 = `@sanity`; recorridos multipágina = `@e2e`; P2/P3 = `@regression`; envíos = `@destructive`.

## Aprendizajes

- La reverificación de solo lectura con curl (2026-11-21 12:41 -03:00) confirmó HC-03, HC-06 y HC-07; el sitio del hotel sigue sin responder: reverificar desde otra red antes de cerrar DEF-TCH-003.
- El plan se genera desde datos estructurados (una fila por TC); al regenerar, mantener los IDs DEF/REC estables (nunca renumerar).
- El nombre del plan consolidado `Plan-de-Pruebas-{proyecto}-Sprint-{N}.md` está reservado para `ado-qa consolidate-sprint`; por eso el plan de proyecto se llama `Plan-Maestro-de-Pruebas-testingenchile.md`.
