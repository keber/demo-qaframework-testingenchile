# Patrones del arnés de automatización (etapa 5)

| Campo | Valor |
|---|---|
| Fecha | 2026-11-21 |
| Fuente | Etapa 5 (`/qa-automation`): inspección previa con Playwright (Chromium headless, solo lectura) y ejecución de los 5 módulos |
| Aplica a | Cualquier spec nueva o modificada en `qa/07-automation/e2e/`, la etapa 5b (estabilización) y el mantenimiento |

## Infraestructura compartida

1. **Bloqueo de rastreadores en todas las pruebas.** `fixtures/pom/network-fixture.ts` es un fixture `auto` que aborta con `context.route` los hosts de `test-data/static/network/third-party.ts` (GTM, Google Analytics, Google Ads, DoubleClick, Facebook, LinkedIn, Clarity, Hotjar, TikTok) y las rutas `/pagead/`, `/ads/` y `/ccm/` de `google.*`. Motivo: el autodiagnóstico del Bootcamp dispara una conversión real de Google Ads (HC-21). Cada prueba anota cuántas solicitudes abortó (`blocked-trackers`).
2. **`requestLog`** registra el tráfico del contexto; los formularios aseguran `requestLog.toHost(host, 'POST')` vacío (regla S7).
3. **`linkChecker`** (`fixtures/pom/http-fixture.ts`): HEAD y, si falla, GET; secuencial; límite de 20 s para destinos externos; `unreachable(results, ANTI_BOT_STATUSES)` clasifica 999, 400 y 403 como "no verificable". `documentTitle()` lee `<title>` sin abrir el navegador.
4. **Estados PENDING**: `skipPending(kind, reason)` (`fixtures/pending.ts`) es el cuerpo de los 32 casos no ejecutables. ESLint lo cuenta como aserción (`expect-expect` con `assertFunctionNames`).

## Comportamientos del sitio que condicionan las pruebas

1. **El banner de cookies recarga la página.** Tras "Aceptar solo lo necesario", Webnode recarga el documento unos 0,6 s después. `CookieBannerComponent.acceptNecessaryOnly()` espera ese `framenavigated` y el evento `load`; sin esa espera, las lecturas posteriores devuelven un documento vacío (falsos `selector-drift`).
2. **Contenido inyectado tras `DOMContentLoaded`.** Logo, botón flotante de WhatsApp y formularios aparecen después; `BasePage.open()` espera `load` y `hrefsOf()` espera al menos una coincidencia.
3. **Visor de la galería (PhotoSwipe).** Ignora el teclado durante la animación de apertura (cerca de 1 s, sin señal en el DOM). `GalleryPage.nextPhoto()` y `closeViewer()` reintentan la tecla solo mientras el estado no cambió, nunca avanzan dos fotos.
4. **Miniaturas sin nombre accesible.** Son enlaces con `img alt=""`; `markFirstThumbnail()` pone un `data-testid` de prueba antes del clic (la regla `no-nth-methods` impide `.first()`).
5. **Varios `main` y `h1`.** Catálogo y Bootcamp tienen `main` anidados y más de un `h1`: acotar por nombre (`BootcampText.HeroFragment`) o por rol del contenedor.
6. **Etiquetas con espacios iniciales.** La casilla de consentimiento no coincide con `getByLabel(/^Acepto/)`; usar la expresión sin ancla. El enlace "Artículos antiguos" no coincide con `exact: true`; usar coincidencia parcial.
7. **Campo numérico**: `fill('abc')` lanza error en `input[type=number]`; usar `pressSequentially` para simular al usuario.

## Reglas de lint que dan forma al código

- `no-conditional-in-test`: nada de `if`, ternarios, `??` ni `&&` dentro de un `test()`; mover la lógica al page object o a helpers (`imagesWithoutAlt`, `unreachable`).
- `no-raw-locators` y `no-nth-methods` (con `--max-warnings 0`): las lecturas masivas de atributos van por `evaluate`/`evaluateAll` dentro del page object.
- `prefer-locator`: un método de page object llamado `press` se confunde con `page.press`; usar nombres explícitos.

## Verificación de defectos

Cada prueba con `expectOpenDefect` se ejecutó con `DEFECTS_DIAG=1` y falló en la aserción de la especificación (no en `InfraError` ni en un selector).
