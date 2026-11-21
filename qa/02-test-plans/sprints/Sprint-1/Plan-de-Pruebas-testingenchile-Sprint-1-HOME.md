# Plan de Pruebas - Testing en Chile - Sprint 1 - Inicio y navegación global

| Campo | Valor |
|---|---|
| Proyecto | Testing en Chile (`testingenchile`) |
| Sprint | 1 (etapas 3-4 del pipeline; automatización en la etapa 5) |
| Módulo | Inicio y navegación global |
| Código módulo | HOME |
| Submódulos | navegacion (NAV), portada (POR) |
| Fecha planificación | 2026-11-21 |
| Ventana QA | 2026-11-23 y 2026-12-02 (propuesta, sujeta a aprobación) |
| ADO Test Plan | No aplica (`integrations.azureDevOps.enabled` = false) |
| Plan maestro | `qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md` |
| Especificaciones | `qa/01-specifications/module-home/` |

---

## 1. Objetivo

Verificar, en modo de solo lectura sobre el sitio público de producción, que el módulo Inicio y navegación global cumple sus reglas de negocio confirmadas (origen `OBSERVADO` o `ESTÁNDAR` normativo), documentar como defecto (`DEF-TCH-NNN`) cada incumplimiento de una regla confirmada y como recomendación (`REC-TCH-NNN`) cada hallazgo sin regla confirmada, y dejar cada caso listo para la etapa 5 en uno de los estados válidos de la regla 8 del framework.

## 2. Alcance

### En alcance

- Navegación global: menú de escritorio y móvil, submenús, 404 y redirecciones canónicas
- Consentimiento de cookies: banner y reapertura desde el footer
- Header y footer: contacto rápido (WhatsApp, correo, teléfono), redes y enlaces legales
- Portada: hero, contadores, servicios, destacados, testimonios y partners
- Calidad transversal: SEO de la portada, H1 y texto alternativo

### Fuera de alcance

- Envío real de formularios, pagos (Flow), compra de entradas (ecopass), conversaciones de WhatsApp o correo (regla S7)
- Credenciales, panel de Webnode y cualquier área privada (el sitio no tiene usuarios)
- Integración con Azure DevOps (deshabilitada)
- Pruebas de carga, estrés o rendimiento y pruebas de seguridad ofensivas
- Navegadores distintos de Chromium y dispositivos reales

## 3. Items del Sprint (normalizados)

No existen tareas ADO. Los items se normalizan por área funcional y hallazgo candidato:

| Área funcional | Casos | Hallazgos vinculados |
|---|---|---|
| Navegación y menú | 8 | - |
| Consentimiento de cookies | 2 | - |
| Header y footer | 3 | HC-17 |
| Portada | 6 | - |
| SEO y accesibilidad | 4 | HC-08, HC-09 |

## 4. Priorización

| Prioridad | Criterio | Casos |
|---|---|---|
| P0 | Disponibilidad de la página o flujo principal (smoke) | 3 |
| P1 | Funcionalidad principal, validaciones obligatorias, destinos de CTAs, vigencia | 10 |
| P2 | Funcionalidad secundaria, enlaces externos, responsividad, accesibilidad | 8 |
| P3 | SEO, ortografía, consistencia y casos de borde | 2 |
| **Total** | | **23** |

| Tipo de ejecución | Casos |
|---|---|
| Automatizado | 20 |
| Manual | 2 |
| Bloqueado | 1 |

| Decisión de automatización | Casos |
|---|---|
| Automatizar | 20 |
| Manual | 0 |
| Pendiente | 3 |

## 5. TestSuites (agrupación)

| Suite / Área funcional | Descripción | N casos (tabla) |
|---|---|---|
| Navegación y menú | Menú de escritorio y móvil, submenús, 404, redirecciones y responsividad | 1, 2, 3, 4, 5, 10, 11, 14 |
| Consentimiento de cookies | Banner de cookies y reapertura desde el footer | 6, 7 |
| Header y footer | Barra superior, footer, contacto rápido y perfiles sociales | 8, 9, 13 |
| Portada | Hero, contadores, servicios, destacados, testimonios y partners | 15, 16, 17, 18, 19, 23 |
| SEO y accesibilidad | Texto alternativo, metadatos y jerarquía de encabezados | 12, 20, 21, 22 |

## 6. Precondiciones generales

| Precondición | Detalle |
|---|---|
| Ambiente | Producción pública `{QA_BASE_URL}` = https://www.testingenchile.cl (único ambiente) |
| Rol | Visitante anónimo (sin login, sin usuarios) |
| Navegador | Chromium (Playwright 1.65.1), escritorio 1366x900; móvil con dispositivo Pixel 5 |
| Etiquetas de terceros | Abortar `googlesyndication.com`, `googleadservices.com` y `googletagmanager.com` con `page.route` en toda ejecución automatizada (HC-21) |
| Banner de cookies | Resolver siempre con "Aceptar solo lo necesario" (regla 6 del proyecto); nunca "Aceptar todo" |
| Solo lectura | Ningún clic en enviar, pagar, comprar ni enlaces a WhatsApp; workers <= 2 (S7) |

## 7. Datos mínimos sugeridos

| Dato | Valor o referencia | Fuente |
|---|---|---|
| URL base | `{QA_BASE_URL}` | Variable de entorno; respaldo `project.qaBaseUrl` en `qa/qa-framework.config.json` |
| Sufijo de ejecución | `EXEC_IDX` | Generado por ejecución |
| Datos de formulario | Prefijo `QA`, correos `qa.{EXEC_IDX}@example.com`, teléfono `+56 9 0000 0000` | Factories Faker en `test-data/factories/` (S5) |
| Textos esperados volátiles | Años, nombres de cursos, encabezados | `enums/messages.ts` y `test-data/static/` |
| Formas de datos por submódulo | `04-test-data.md` | `qa/01-specifications/module-home/submodule-*/` |
| Credenciales | No aplica | El sitio no tiene usuarios |

## 8. Supuestos & Faltantes críticos

| # | Supuesto o faltante | Efecto |
|---|---|---|
| 1 | Pregunta abierta 10: ¿el tercer nivel del menú se despliega por hover o por clic en navegadores reales? (TC-HOME-NAV-004) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 2 | RN-HOME-013 (perfiles sociales) pendiente de confirmación (TC-HOME-NAV-013) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 3 | Los contadores y cursos destacados son volátiles: se asertan formato y cantidad, no valores | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |

## 9. Tabla de Pruebas

Pasos expandidos en la etapa 4 (`qa-test-cases`). `Confirma` = `N/A` porque no hay tareas ADO. `{QA_BASE_URL}` y `EXEC_IDX` según la sección 7. Tipo: `Automatizado` = decisión Automatizar; `Manual` = ejecución manual (casos Manual y casos Pendiente por regla no confirmada, que se ejecutan a mano para mantener la evidencia de su recomendación); `Bloqueado` = PENDING-BROWSER o @destructive.

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Precondiciones | Steps | Resultado Esperado | Datos de prueba | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-HOME-NAV-001 | Navegación y menú | [SMOKE][P0] La página de inicio carga con header, menú y footer | Valida la disponibilidad del sitio y de su estructura global para un visitante anónimo. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Hacer clic en "Aceptar solo lo necesario" en el banner de cookies<br>3) Verificar que la respuesta de la navegación es HTTP 200<br>4) Verificar que el título de la pestaña contiene "Testing en Chile"<br>5) Verificar que el menú principal (navegación) es visible<br>6) Desplazarse al final de la página y verificar que el footer es visible | HTTP 200; `<title>` contiene "Testing en Chile"; menú principal y footer visibles. | Ruta `/` | N/A | Automatizado | P0 |
| 2 | TC-HOME-NAV-002 | Navegación y menú | [SMOKE][P0] El menú principal muestra los seis ítems y cada uno navega a su ruta | Valida el orden y el destino de los seis ítems del menú de escritorio (1366x900). | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/ en viewport 1366x900<br>2) Verificar que el menú muestra en orden: Inicio, Capacitaciones, Testing Day Chile {año}, Blog, Fotogalería, Contacto<br>3) Hacer clic en "Capacitaciones" y verificar URL `/capacitaciones2/` con HTTP 200<br>4) Volver al inicio y repetir el clic para Testing Day, Blog, Fotogalería y Contacto<br>5) Verificar para cada ítem la ruta destino de la columna Datos | Seis ítems visibles en el orden indicado; cada clic lleva a su ruta con HTTP 200. | Rutas: `/`, `/capacitaciones2/`, `/testing-day-chile/`, `/blog/`, `/galeria/`, `/formulario-contacto/`. El año del ítem del evento es volátil: asertar la ruta, no el texto | N/A | Automatizado | P0 |
| 3 | TC-HOME-NAV-003 | Navegación y menú | [REGRESION][P1] El submenú de Testing Day se despliega al pasar el puntero | Valida el despliegue por hover del segundo nivel del ítem del evento en escritorio. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/ en viewport 1366x900<br>2) Pasar el puntero sobre el ítem "Testing Day Chile {año}"<br>3) Verificar que se muestran "Agenda Online", "Nuestros Sponsors {año}", "Ediciones anteriores" y "Otras Actividades" | Los cuatro ítems del submenú quedan visibles mientras el puntero está sobre el ítem. | Textos del submenú en `enums/messages.ts` (año volátil) | N/A | Automatizado | P1 |
| 4 | TC-HOME-NAV-004 | Navegación y menú | [REGRESION][P2] El tercer nivel de "Ediciones anteriores" muestra las ediciones pasadas | Valida el despliegue del tercer nivel del menú y la disponibilidad de cada edición. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/ en un navegador real de escritorio<br>2) Pasar el puntero sobre "Testing Day Chile {año}"<br>3) Pasar el puntero (o hacer clic) sobre "Ediciones anteriores"<br>4) Verificar que se listan las ediciones por año<br>5) Solicitar cada enlace del tercer nivel y verificar HTTP 200 | Se listan las ediciones 2025, 2024, 2023, 2022, 2021 y Mega Testing Week 2020; cada enlace responde HTTP 200. | Ediciones observadas en el DOM el 2026-11-21 | N/A | Bloqueado | P2 |
| 5 | TC-HOME-NAV-005 | Navegación y menú | [REGRESION][P1] El menú móvil se abre, expande el submenú y se cierra | Valida el panel de navegación móvil y la expansión del submenú del evento. | Contexto limpio con dispositivo Pixel 5 (393 px); banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/ con el dispositivo Pixel 5<br>2) Hacer clic en el botón "Menú"<br>3) Verificar que el panel muestra los seis ítems del menú<br>4) Hacer clic en "Abrir submenú" del ítem del evento<br>5) Verificar que aparecen los cuatro ítems de Testing Day<br>6) Hacer clic en el botón cerrar del panel<br>7) Verificar que los ítems del panel dejan de estar visibles | Panel con seis ítems; tras expandir, cuatro ítems de Testing Day visibles; tras cerrar, panel oculto. | Dispositivo Pixel 5 de Playwright | N/A | Automatizado | P1 |
| 6 | TC-HOME-NAV-006 | Consentimiento de cookies | [REGRESION][P1] El banner de cookies acepta solo lo necesario y la elección persiste | Valida la transición de estado del consentimiento y su persistencia tras recargar. | Contexto de navegador sin cookies; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/ en un contexto sin cookies<br>2) Verificar que el banner muestra los botones "Aceptar solo lo necesario" y "Aceptar todo"<br>3) Hacer clic en "Aceptar solo lo necesario" en el banner de cookies<br>4) Verificar que el banner deja de ser visible<br>5) Verificar que existe la cookie `cookieAccepted` en el contexto<br>6) Recargar la página<br>7) Verificar que el banner no reaparece | Banner oculto tras la elección; cookie `cookieAccepted` presente; el banner no reaparece al recargar. | Nunca hacer clic en "Aceptar todo" (regla 6 del proyecto) | N/A | Automatizado | P1 |
| 7 | TC-HOME-NAV-007 | Consentimiento de cookies | [REGRESION][P2] El enlace "Cookies" del footer reabre el banner | Valida que el visitante puede revisar su elección de cookies desde el footer. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Hacer clic en "Aceptar solo lo necesario" en el banner de cookies<br>3) Desplazarse al footer<br>4) Hacer clic en el enlace "Cookies"<br>5) Verificar que el banner de cookies vuelve a ser visible | El banner de cookies es visible de nuevo tras el clic en "Cookies". | N/A | N/A | Automatizado | P2 |
| 8 | TC-HOME-NAV-008 | Header y footer | [REGRESION][P1] El footer muestra contacto, redes y enlaces legales operativos | Valida el contenido obligatorio del footer y la disponibilidad de los enlaces legales. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/<br>2) Desplazarse al footer<br>3) Verificar los correos contacto@, eventos@ y cursos@ del dominio del sitio<br>4) Verificar los enlaces a LinkedIn, Instagram, Facebook y X<br>5) Verificar los enlaces "Términos y condiciones." y "Políticas de privacidad." con `target=_blank`<br>6) Solicitar ambos destinos legales con el fixture `request` y verificar HTTP 200 | Todos los elementos de RN-HOME-006 presentes; enlaces legales con `target=_blank` y HTTP 200. | Correos por prefijo y dominio (sin versionar direcciones personales) | N/A | Automatizado | P1 |
| 9 | TC-HOME-NAV-009 | Header y footer | [REGRESION][P1] Los enlaces de contacto rápido apuntan a destinos válidos | Valida el destino de WhatsApp flotante, correo y teléfono de la barra superior sin activarlos. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Leer `href` y `target` del botón flotante de WhatsApp<br>3) Verificar que el `href` empieza con `https://wa.me/`, incluye el parámetro `text` y `target=_blank`<br>4) Leer el `href` del correo de la barra superior y verificar el esquema `mailto:` con dominio del sitio<br>5) Leer el `href` del teléfono y verificar el esquema `tel:+56` | WhatsApp `https://wa.me/...?...text=` con `target=_blank`; correo `mailto:` del dominio del sitio; teléfono `tel:+56`. | No hacer clic en ningún enlace (S7). Números enmascarados en evidencias | N/A | Automatizado | P1 |
| 10 | TC-HOME-NAV-010 | Navegación y menú | [REGRESION][P1] Una ruta inexistente responde 404 con navegación | Valida el camino de error de una URL inexistente. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/qa-pagina-inexistente-{EXEC_IDX}/<br>2) Verificar que la respuesta es HTTP 404<br>3) Verificar el H1 "404 - Página no encontrada"<br>4) Verificar que el menú principal es visible | HTTP 404, H1 "404 - Página no encontrada" y menú principal visible. | `EXEC_IDX` = sufijo único por ejecución | N/A | Automatizado | P1 |
| 11 | TC-HOME-NAV-011 | Navegación y menú | [REGRESION][P2] Las variantes de dominio redirigen con 301 a la URL canónica | Valida la consolidación del dominio canónico mediante redirecciones permanentes. | Sin navegador: fixture `request` de Playwright con `maxRedirects: 0`. | 1) Solicitar `http://www.testingenchile.cl/` sin seguir redirecciones<br>2) Verificar HTTP 301 y `Location` `https://www.testingenchile.cl/`<br>3) Solicitar `https://testingenchile.cl/` sin seguir redirecciones y verificar 301 hacia `https://www.testingenchile.cl/`<br>4) Solicitar {QA_BASE_URL}/capacitaciones2 (sin barra final) y verificar 301 hacia la URL con barra final | Cada solicitud responde 301 con `Location` hacia `https://www.testingenchile.cl/...` con barra final. | Tres variantes de URL de la columna Pasos | N/A | Automatizado | P2 |
| 12 | TC-HOME-NAV-012 | SEO y accesibilidad | [REGRESION][P2] El logo del header tiene texto alternativo | Valida WCAG 1.1.1 en el logo del header, presente en todas las páginas. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Leer el atributo `alt` de la imagen del logo del header<br>3) Verificar que el `alt` no está vacío y nombra el sitio<br>4) Navegar a {QA_BASE_URL}/capacitaciones2/ y repetir la lectura<br>5) Verificar que el enlace del logo al inicio tiene nombre accesible | El logo declara un `alt` descriptivo (por ejemplo "Testing en Chile") y su enlace tiene nombre accesible. | Rutas `/` y `/capacitaciones2/` | N/A | Automatizado | P2 |
| 13 | TC-HOME-NAV-013 | Header y footer | [REGRESION][P3] Los perfiles sociales son consistentes entre páginas | Valida que cada red social apunta al mismo perfil oficial en todo el sitio. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/ y recopilar los `href` de LinkedIn y X/Twitter<br>2) Navegar a `/formulario-contacto/` y recopilar los mismos enlaces<br>3) Navegar a `/testing-day-chile-ediciones-anteriores/` y recopilar los mismos enlaces<br>4) Comparar las URLs por red social | Todas las páginas apuntan a la misma URL por red social. | Tres rutas de la columna Pasos | N/A | Manual | P3 |
| 14 | TC-HOME-NAV-014 | Navegación y menú | [REGRESION][P2] La página de inicio no desborda horizontalmente en móvil | Valida la ausencia de desplazamiento horizontal en el diseño móvil de la portada. | Contexto limpio con dispositivo Pixel 5 (393 px); banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/ con el dispositivo Pixel 5<br>2) Leer `document.documentElement.scrollWidth` y `clientWidth`<br>3) Verificar que ambos valores son iguales | `scrollWidth` igual a `clientWidth` (sin desplazamiento horizontal). | Dispositivo Pixel 5 | N/A | Automatizado | P2 |
| 15 | TC-HOME-POR-001 | Portada | [SMOKE][P0] Los CTAs del hero llevan al catálogo y al Bootcamp | Valida el camino feliz de descubrimiento de la oferta desde el hero. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/<br>2) Verificar que "Ver Capacitaciones" y "Bootcamp de Testing" son visibles en el hero<br>3) Leer el `href` y `target` de "Bootcamp de Testing" y verificar `/bootcamp-de-testing/` con `target=_blank`<br>4) Hacer clic en "Ver Capacitaciones"<br>5) Verificar URL `/capacitaciones2/` con HTTP 200 | Dos CTAs visibles; "Ver Capacitaciones" lleva a `/capacitaciones2/` (200); "Bootcamp de Testing" apunta a `/bootcamp-de-testing/` en pestaña nueva. | N/A | N/A | Automatizado | P0 |
| 16 | TC-HOME-POR-002 | Portada | [REGRESION][P1] Los contadores muestran cifras mayores que cero tras hacer scroll | Valida la animación de los contadores de 0 al valor final. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/<br>2) Desplazarse hasta la sección "Profesionales Capacitados"<br>3) Esperar con aserción web-first a que el primer contador deje de ser 0<br>4) Verificar que los cuatro contadores muestran un número mayor que 0 | Los cuatro contadores muestran un valor numérico mayor que 0. | Valores volátiles: no asertar cifras exactas | N/A | Automatizado | P1 |
| 17 | TC-HOME-POR-003 | Portada | [REGRESION][P1] Los CTAs de "Nuestros Servicios" apuntan al destino correcto | Valida los destinos de las tres tarjetas de servicios. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Localizar la sección "Nuestros Servicios" con sus tres tarjetas<br>3) Leer el `href` de "Ver cursos" y de "Ver certificaciones" y verificar `/capacitaciones2/`<br>4) Leer el `href` de "Solicitar cotización" y verificar `/contacto-empresa/`<br>5) Solicitar los destinos con el fixture `request` y verificar HTTP 200 | "Ver cursos" y "Ver certificaciones" apuntan a `/capacitaciones2/`; "Solicitar cotización" a `/contacto-empresa/`; destinos con HTTP 200. | N/A | N/A | Automatizado | P1 |
| 18 | TC-HOME-POR-004 | Portada | [REGRESION][P1] Las capacitaciones destacadas enlazan a páginas de curso existentes | Valida que los destacados de la portada llevan a temarios publicados. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Localizar las tarjetas de "Capacitaciones Destacados"<br>3) Verificar que hay tres tarjetas con enlace "Ver Temario"<br>4) Solicitar el destino de cada "Ver Temario" y verificar HTTP 200<br>5) Verificar que "Ir a todas las Capacitaciones" apunta a `/capacitaciones2/` | Tres tarjetas con "Ver Temario" cuyos destinos responden 200; "Ir a todas las Capacitaciones" apunta a `/capacitaciones2/`. | Cursos destacados volátiles: asertar cantidad y estado HTTP | N/A | Automatizado | P1 |
| 19 | TC-HOME-POR-005 | Portada | [REGRESION][P2] Las secciones de testimonios y partners están presentes | Valida la presencia de las secciones de prueba social de la portada. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Desplazarse hasta "Lo que dice nuestra comunidad" y verificar que el encabezado es visible<br>3) Desplazarse hasta "Han confiado en nosotros" y verificar que el encabezado es visible<br>4) Contar los logos de la sección de partners y verificar que hay al menos uno | Ambos encabezados visibles; la sección de partners contiene al menos un logo. | Encabezados en `enums/messages.ts` | N/A | Automatizado | P2 |
| 20 | TC-HOME-POR-006 | SEO y accesibilidad | [REGRESION][P2] Los logos de partners tienen texto alternativo | Valida WCAG 1.1.1 en los logos de "Nuestros Partners" y "Han confiado en nosotros". | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Localizar las imágenes de "Nuestros Partners" y "Han confiado en nosotros"<br>3) Leer el atributo `alt` de cada imagen<br>4) Verificar que cada `alt` no está vacío | Cada logo declara un `alt` no vacío con el nombre de la organización. | N/A | N/A | Automatizado | P2 |
| 21 | TC-HOME-POR-007 | SEO y accesibilidad | [REGRESION][P1] La portada declara metadatos SEO completos | Valida título, description, idioma, canonical, robots y Open Graph de la portada. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Leer `<title>` y meta description y verificar que no están vacíos<br>3) Leer `html[lang]` y verificar `es`<br>4) Leer `link[rel=canonical]` y verificar `https://www.testingenchile.cl/`<br>5) Leer meta robots y verificar `index,follow`<br>6) Leer las etiquetas `og:*` y verificar que no están vacías | Todos los metadatos presentes y no vacíos; `lang="es"`; canonical `https://www.testingenchile.cl/`; robots `index,follow`. | N/A | N/A | Automatizado | P1 |
| 22 | TC-HOME-POR-008 | SEO y accesibilidad | [REGRESION][P3] La portada tiene un único H1 | Valida la jerarquía de encabezados de la portada. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Contar los elementos `h1` del documento<br>3) Verificar que existe exactamente uno | Existe exactamente un H1. | N/A | N/A | Manual | P3 |
| 23 | TC-HOME-POR-009 | Portada | [REGRESION][P2] Los CTAs del hero son visibles y operables en móvil | Valida la responsividad del hero en un dispositivo móvil. | Contexto limpio con dispositivo Pixel 5 (393 px); banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/ con el dispositivo Pixel 5<br>2) Verificar que "Ver Capacitaciones" es visible en el viewport inicial o tras un scroll mínimo<br>3) Verificar que "Bootcamp de Testing" es visible y habilitado<br>4) Verificar que ambos CTAs tienen `href` no vacío (clicables) | Ambos CTAs visibles en el viewport inicial o tras un scroll mínimo y clicables. | Dispositivo Pixel 5 | N/A | Automatizado | P2 |

### 9.1 Decisión de automatización y trazabilidad

| N | TC-ID | Etiqueta | Decisión | Motivo | Reglas (RN) | Flujos (FL) | Hallazgos | DEF / REC | Estado esperado en etapa 5 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-HOME-NAV-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-001, RN-HOME-006 | FL-HOME-001 | - | - | `test()` (pasa) |
| 2 | TC-HOME-NAV-002 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-001 | FL-HOME-001 | - | - | `test()` (pasa) |
| 3 | TC-HOME-NAV-003 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-002 | FL-HOME-001 | - | - | `test()` (pasa) |
| 4 | TC-HOME-NAV-004 | `@regression` | Pendiente | El despliegue por hover no se observó en headless (pregunta abierta 10); RN-HOME-003 pendiente de confirmación. Observar en navegador real (K12) antes de automatizar. | RN-HOME-003 | FL-HOME-001 | - | - | `test.skip()` PENDING-BROWSER |
| 5 | TC-HOME-NAV-005 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-004 | FL-HOME-002 | - | - | `test()` (pasa) |
| 6 | TC-HOME-NAV-006 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-008 | FL-HOME-003 | - | - | `test()` (pasa) |
| 7 | TC-HOME-NAV-007 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-009 | FL-HOME-003 | - | - | `test()` (pasa) |
| 8 | TC-HOME-NAV-008 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-006, RN-HOME-007 | FL-HOME-001 | - | - | `test()` (pasa) |
| 9 | TC-HOME-NAV-009 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-005, RN-HOME-010 | - | - | - | `test()` (pasa) |
| 10 | TC-HOME-NAV-010 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-011 | FL-HOME-004 | - | - | `test()` (pasa) |
| 11 | TC-HOME-NAV-011 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-014 | - | - | - | `test()` (pasa) |
| 12 | TC-HOME-NAV-012 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-004. | RN-HOME-012 | - | HC-08 | DEF-TCH-004 | `test.fail()` + DEF-TCH-004 |
| 13 | TC-HOME-NAV-013 | `@regression` | Pendiente | RN-HOME-013 pendiente de confirmación y hoy difiere (HC-17): no puede ser `test.fail()`. Ejecución manual hasta confirmar. | RN-HOME-013 | - | HC-17 | REC-TCH-013 | `test.skip()` PENDING-SPEC (REC-TCH-013) |
| 14 | TC-HOME-NAV-014 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-015 | FL-HOME-002 | - | - | `test()` (pasa) |
| 15 | TC-HOME-POR-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-016 | FL-HOME-005 | - | - | `test()` (pasa) |
| 16 | TC-HOME-POR-002 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-017 | FL-HOME-005 | - | - | `test()` (pasa) |
| 17 | TC-HOME-POR-003 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-018 | FL-HOME-005 | - | - | `test()` (pasa) |
| 18 | TC-HOME-POR-004 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-019 | FL-HOME-005, FL-HOME-006 | - | - | `test()` (pasa) |
| 19 | TC-HOME-POR-005 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-019 (estructura de portada, inventario) | FL-HOME-005 | - | - | `test()` (pasa) |
| 20 | TC-HOME-POR-006 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-005. | RN-HOME-012 | - | HC-08 | DEF-TCH-005 | `test.fail()` + DEF-TCH-005 |
| 21 | TC-HOME-POR-007 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-021 | - | - | - | `test()` (pasa) |
| 22 | TC-HOME-POR-008 | `@regression` | Pendiente | RN-HOME-020 es criterio SEO no confirmado como regla de negocio (hoy 5 H1, HC-09): recomendación, no `test.fail()`. | RN-HOME-020 | - | HC-09 | REC-TCH-005 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| 23 | TC-HOME-POR-009 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-016, RN-HOME-015 | FL-HOME-005 | - | - | `test()` (pasa) |

## 10. Matriz de Trazabilidad

Sin tareas ADO: la matriz se construye sobre reglas de negocio y hallazgos candidatos.

| Regla de negocio | N casos (tabla) |
|---|---|
| RN-HOME-001 | 1, 2 |
| RN-HOME-002 | 3 |
| RN-HOME-003 | 4 |
| RN-HOME-004 | 5 |
| RN-HOME-005 | 9 |
| RN-HOME-006 | 1, 8 |
| RN-HOME-007 | 8 |
| RN-HOME-008 | 6 |
| RN-HOME-009 | 7 |
| RN-HOME-010 | 9 |
| RN-HOME-011 | 10 |
| RN-HOME-012 | 12, 20 |
| RN-HOME-013 | 13 |
| RN-HOME-014 | 11 |
| RN-HOME-015 | 14, 23 |
| RN-HOME-016 | 15, 23 |
| RN-HOME-017 | 16 |
| RN-HOME-018 | 17 |
| RN-HOME-019 | 18, 19 |
| RN-HOME-020 | 22 |
| RN-HOME-021 | 21 |

| Hallazgo candidato | N casos (tabla) |
|---|---|
| HC-08 | 12, 20 |
| HC-09 | 22 |
| HC-17 | 13 |

## 11. Notas de automatización

- Specs en `qa/07-automation/e2e/tests/home/`, siguiendo la Constitución de `AGENTS.md` (K1-K12, W1-W11).
- Título `[TC-...] {título} @P#` y exactamente una etiqueta de tipo en `{ tag }` (K10); la etiqueta de cada caso está en la sección 9.1.
- Casos con DEF: `expectOpenDefect('DEF-TCH-NNN', ...)` con la aserción de la especificación, nunca invertida (reglas 8 y 10).
- Casos `Pendiente` por regla no confirmada: `test.skip()` con `PENDING-SPEC` y el ID de la recomendación en el mensaje; se reactivan al confirmarse la regla (con `test.fail()` + DEF si sigue fallando).
- Casos `@destructive`: `test.skip()` por defecto con el motivo en el mensaje (S7, W9).
- Aserciones de estructura y rutas; textos volátiles en `enums/` o `test-data/static/` (regla 7 del proyecto).
- Fixture base con el bloqueo de etiquetas de Google y page object del banner de cookies con la acción "Aceptar solo lo necesario".

## 12. Defectos y recomendaciones vinculados

| ID | Tipo | Título | Severidad | Hallazgo | Casos del módulo |
|---|---|---|---|---|---|
| DEF-TCH-004 | Defecto | El logo del header no tiene texto alternativo en todo el sitio | Media | HC-08 | TC-HOME-NAV-012 |
| DEF-TCH-005 | Defecto | Imágenes informativas sin texto alternativo en páginas de contenido | Media | HC-08 | TC-HOME-POR-006 |
| REC-TCH-005 | Recomendación | Jerarquía de H1 inválida: múltiples H1, H1 vacíos o ausentes | Baja | HC-09 | TC-HOME-POR-008 |
| REC-TCH-013 | Recomendación | Perfiles sociales inconsistentes entre páginas | Baja | HC-17 | TC-HOME-NAV-013 |

Detalle y criterio de clasificación: sección 11 del plan maestro, `qa/06-defects/open/` y `qa/06-defects/recommendations/`.
