# E2E Stabilization Patterns

> A running log of flakiness patterns found in this project and the techniques used to fix them.
> Load this file when investigating intermittent test failures or refactoring fragile specs.

## Crash-Recovery Pattern

When the application server crashes intermittently (e.g. unhandled error page with a Reload link),
a bare `waitFor` will timeout. Use `Promise.race` to detect the error state and recover:

```typescript
const outcome = await Promise.race([
  targetElement.waitFor({ state: 'visible', timeout: 60_000 }).then(() => 'ready' as const),
  page.getByText('An unhandled error has occurred.').waitFor({ state: 'visible', timeout: 60_000 }).then(() => 'crash' as const),
]).catch(() => 'timeout' as const);

if (outcome === 'crash') {
  await page.getByRole('link', { name: 'Reload' }).click();
  await targetElement.waitFor({ state: 'visible', timeout: 60_000 });
}
```

> Document which spec files use this pattern and under what conditions it fires.

## Strict-Mode Selector Conflicts

`getByText()` and similar matchers can match multiple elements, triggering strict-mode violations.
Scope selectors to the most specific container available.

> Document conflicts found in this project here.
> Example: a pagination counter regex that also matches a card element.
> Fix: use a scoped `locator('.specific-class')` instead of a broad text match.

## Known Flaky Failure Types

Document categories of instability specific to this project. A row per pattern is enough.

| ID | Root cause | Fix | Affected tests |
|---|---|---|---|
| FLK-01 (preventivo, 2026-11-21) | Pruebas de enlaces que solicitan cada destino en secuencia con `linkChecker.statuses()`: su duración crece con el contenido y con la latencia de producción (máx. 27,7 s y 23,1 s de 30 s en el estrés) | `test.slow()` sin tocar aserciones; criterio: endurecer si el máximo del estrés supera el 75 % del presupuesto | TC-EVT-EDI-002, TC-CAP-CAT-002 (ya lo tenían TC-EVT-TDY-009 y TC-HOME-NAV-002) |

> Examples: framework hydration delays, input binding issues requiring `pressSequentially`,
> elements that are in the DOM but not yet rendered, session expiry during long runs.

## Reference Timeouts

Fill in the timeout values used in this project once they are stabilized.

| Setting | Value | Location |
|---|---|---|
| Default test timeout | 30 s (90 s con `test.slow()`) | `playwright.config.ts` |
| `actionTimeout` | 10 s (expect: 10 s) | `playwright.config.ts` |
| `navigationTimeout` | 30 s | `playwright.config.ts` |
| Long-running spec timeout | 240 s (TC-CAP-CUR-001, 15 páginas; máx. observado 59,9 s) | `test.setTimeout` en `tests/capacitaciones/detalle-curso.spec.ts` |

## Etapa 5b - resultados del estrés (2026-11-21)

- `--repeat-each=3 --workers=2` (357 ejecuciones) y `--retries=0` (119): 0 fallos, 0 inestables, ninguna prueba necesitó reintento. Una sola red: repetir desde otra antes de declarar la suite libre de inestabilidad.
- Medir duraciones desde el JSON del reporter (mín./máx./promedio por TC sobre las repeticiones) es la forma más barata de encontrar riesgos de tiempo cuando nada falla.
- `PLAYWRIGHT_JSON_OUTPUT_FILE=<ruta> npx playwright test --reporter=dot,json` guarda el JSON de cada ejecución de estrés sin pisar `test-results/results.json`.
- `DEFECTS_DIAG=1 npx playwright test --retries=0 --grep "<TCs con DEF>"` confirma que cada `test.fail()` falla en la aserción de la especificación. El síntoma de un defecto puede cambiar sin cerrarlo (DEF-TCH-003: el hotel pasó de timeout a certificado TLS vencido): registrarlo en el archivo DEF.
- Resúmenes compactos versionados en `qa/05-test-execution/automated/evidence/{fecha}/`; nunca el reporte HTML ni `test-results/`.
