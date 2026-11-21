# Exploración del sitio testingenchile.cl (etapas 1-2)

| Campo | Valor |
|---|---|
| Fecha | 2026-11-21 |
| Fuente | Exploración en vivo con Playwright (Chromium headless) y curl, solo lectura |
| Aplica a | Análisis, especificación y automatización de los módulos HOME, CAP, EVT, CON, LEG |

## Aprendizajes técnicos

1. **Etiquetas de Google generan efectos reales.** Pulsar "Ver mi orientación" (autodiagnóstico del Bootcamp) envía una conversión de Google Ads `bttype=purchase`. Las pruebas deben abortar `googlesyndication.com`, `googleadservices.com` y `googletagmanager.com` con `page.route` en un fixture base.
2. **Formulario de contacto empresa se renderiza después de `load`.** `document.querySelector('form')` devolvió `null` justo tras la carga; usar esperas web-first sobre el campo (`getByLabel('Nombre', { exact: true })`).
3. **Validación de formularios sin enviar.** Usar `checkValidity()`, `validity.valid` y `validationMessage`; los mensajes nativos dependen del idioma del navegador: no asertar su texto. Todos los formularios Webnode tienen reCAPTCHA v2: el envío no es automatizable (y está prohibido por S7).
4. **El autodiagnóstico del Bootcamp es 100 % cliente** (`preventDefault`, puntaje 0-2 por pregunta: >= 6 "Muy alineada", >= 3 "Con potencial de desarrollo", resto "Vale la pena conversar").
5. **Menú.** Escritorio: submenú de Testing Day por hover; el tercer nivel ("Ediciones anteriores") no se desplegó por hover en headless. Móvil (Pixel 5): botón "Menú", `button.mm-arrow` con `aria-label="Abrir submenú"`, cierre `a.menu-close`.
6. **Banner de cookies.** "Aceptar solo lo necesario" guarda `cookieAccepted`/`cookieWarning`; el enlace "Cookies" del footer lo reabre.
7. **Enlaces externos.** LinkedIn responde 999, Facebook 400 y algunos sitios 403 ante clientes automatizados: clasificar como "no verificable", no como roto. `robots.txt` declara `Crawl-delay: 10`: mantener tasa baja.
8. **Logo.** En páginas internas es `a.logo-link` con `href="/"`; la imagen tiene `alt=""`.
9. **Contadores de la portada** inician en 0 y se animan al hacer scroll (esperar con aserción web-first).
10. **Visor de la galería**: PhotoSwipe (`.pswp--open`, contador `.pswp__counter`), flecha derecha avanza, Escape cierra.

## Datos volátiles detectados

Fecha del evento (27-28 de agosto de 2026, ya pasado), fecha de inicio del Bootcamp (2 de noviembre de 2026, vencida), agenda, sponsors, contadores y lista de cursos (15). Ver `data-volatility-strategies.md` y los hallazgos HC-04 y HC-05.

## Privacidad

Docentes y speakers aparecen con nombre y LinkedIn; teléfonos de WhatsApp son móviles. No versionarlos: las especificaciones usan descripciones genéricas y números enmascarados (`569XXXX0587`).
