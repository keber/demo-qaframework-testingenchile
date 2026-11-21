# Plan de Pruebas - Testing en Chile - Sprint 1 - Eventos Testing Day

| Campo | Valor |
|---|---|
| Proyecto | Testing en Chile (`testingenchile`) |
| Sprint | 1 (etapas 3-4 del pipeline; automatización en la etapa 5) |
| Módulo | Eventos Testing Day |
| Código módulo | EVT |
| Submódulos | testing-day (TDY), ediciones (EDI) |
| Fecha planificación | 2026-11-21 |
| Ventana QA | 2026-11-23 y 2026-12-02 (propuesta, sujeta a aprobación) |
| ADO Test Plan | No aplica (`integrations.azureDevOps.enabled` = false) |
| Plan maestro | `qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md` |
| Especificaciones | `qa/01-specifications/module-eventos/` |

---

## 1. Objetivo

Verificar, en modo de solo lectura sobre el sitio público de producción, que el módulo Eventos Testing Day cumple sus reglas de negocio confirmadas (origen `OBSERVADO` o `ESTÁNDAR` normativo), documentar como defecto (`DEF-TCH-NNN`) cada incumplimiento de una regla confirmada y como recomendación (`REC-TCH-NNN`) cada hallazgo sin regla confirmada, y dejar cada caso listo para la etapa 5 en uno de los estados válidos de la regla 8 del framework.

## 2. Alcance

### En alcance

- Evento vigente: edición, fechas, sede, CTAs de entrada (ecopass), agenda presencial y vigencia
- Agenda Online: sesiones y enlaces de inscripción (StreamYard)
- Sponsors: niveles y enlaces externos
- Ediciones anteriores: resumen 2016-2019, páginas 2020-2025, enlaces internos y externos

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
| Evento vigente | 6 | HC-04 |
| Agenda Online | 3 | HC-06 |
| Sponsors | 2 | HC-07 |
| Ediciones anteriores | 7 | HC-03, HC-10, HC-22 |
| SEO y accesibilidad | 3 | HC-08, HC-09, HC-10, HC-11, HC-20 |

## 4. Priorización

| Prioridad | Criterio | Casos |
|---|---|---|
| P0 | Disponibilidad de la página o flujo principal (smoke) | 2 |
| P1 | Funcionalidad principal, validaciones obligatorias, destinos de CTAs, vigencia | 7 |
| P2 | Funcionalidad secundaria, enlaces externos, responsividad, accesibilidad | 7 |
| P3 | SEO, ortografía, consistencia y casos de borde | 5 |
| **Total** | | **21** |

| Tipo de ejecución | Casos |
|---|---|
| Automatizado | 16 |
| Manual | 5 |
| Bloqueado | 0 |

| Decisión de automatización | Casos |
|---|---|
| Automatizar | 16 |
| Manual | 0 |
| Pendiente | 5 |

## 5. TestSuites (agrupación)

| Suite / Área funcional | Descripción | N casos (tabla) |
|---|---|---|
| Evento vigente | Página del evento, CTAs de entrada, agenda presencial, vigencia y brochure | 1, 2, 3, 4, 10, 11 |
| Agenda Online | Agenda online y enlaces de inscripción | 5, 6, 7 |
| Sponsors | Niveles de sponsors y enlaces externos | 8, 9 |
| Ediciones anteriores | Resumen de ediciones, páginas por edición y enlaces | 13, 14, 15, 16, 17, 18, 19 |
| SEO y accesibilidad | Metadatos, encabezados y texto alternativo de las páginas del evento | 12, 20, 21 |

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
| Formas de datos por submódulo | `04-test-data.md` | `qa/01-specifications/module-eventos/submodule-*/` |
| Credenciales | No aplica | El sitio no tiene usuarios |

## 8. Supuestos & Faltantes críticos

| # | Supuesto o faltante | Efecto |
|---|---|---|
| 1 | Pregunta abierta 1: ¿qué debe mostrar la página del evento entre ediciones? (RN-EVT-010) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 2 | RN-EVT-016 y RN-EVT-018 pendientes de confirmación | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 3 | Contenido muy volátil (fechas, agenda, sponsors): aserciones estructurales y textos en `enums/` o `test-data/static/` | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 4 | Enlaces externos con bloqueos anti-bot (999, 400, 403): se clasifican como "no verificable" y se reverifican manualmente | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 5 | El sitio del hotel (DEF-TCH-003) debe reverificarse desde otra red antes de cerrar el defecto | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |

## 9. Tabla de Pruebas

Pasos expandidos en la etapa 4 (`qa-test-cases`). `Confirma` = `N/A` porque no hay tareas ADO. `{QA_BASE_URL}` y `EXEC_IDX` según la sección 7. Tipo: `Automatizado` = decisión Automatizar; `Manual` = ejecución manual (casos Manual y casos Pendiente por regla no confirmada, que se ejecutan a mano para mantener la evidencia de su recomendación); `Bloqueado` = PENDING-BROWSER o @destructive.

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Precondiciones | Steps | Resultado Esperado | Datos de prueba | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-EVT-TDY-001 | Evento vigente | [SMOKE][P0] La página del evento carga con edición, fechas, sede y CTAs | Valida la disponibilidad de la página del evento vigente. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/testing-day-chile/<br>2) Verificar HTTP 200<br>3) Verificar el H1 con "TESTING DAY CHILE"<br>4) Verificar que las fechas y la sede son visibles<br>5) Verificar que "Asegura tu entrada" y "Convertirse en Sponsor" son visibles | HTTP 200; H1 con "TESTING DAY CHILE"; fechas, sede y ambos CTAs visibles. | Fechas y sede volátiles: asertar presencia | N/A | Automatizado | P0 |
| 2 | TC-EVT-TDY-002 | Evento vigente | [REGRESION][P1] Los CTAs de entrada apuntan a ecopass en pestaña nueva | Valida la integración con la venta de entradas sin comprar. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/testing-day-chile/<br>2) Leer `href` y `target` de "Asegura tu entrada"<br>3) Leer `href` y `target` de "Comprar Entrada"<br>4) Verificar host `www.ecopass.cl` y `target=_blank` en ambos | Ambos CTAs con host `www.ecopass.cl` y `target=_blank`. | No hacer clic (S7) | N/A | Automatizado | P1 |
| 3 | TC-EVT-TDY-003 | Evento vigente | [REGRESION][P2] "Convertirse en Sponsor" desplaza a la sección de sponsors | Valida el ancla hacia la sección de sponsors. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/testing-day-chile/<br>2) Hacer clic en "Convertirse en Sponsor"<br>3) Verificar que la URL termina en `#sponsors-cta`<br>4) Verificar que la sección "Sé parte del evento" está en el viewport | URL con `#sponsors-cta` y sección "Sé parte del evento" en el viewport. | N/A | N/A | Automatizado | P2 |
| 4 | TC-EVT-TDY-004 | Evento vigente | [REGRESION][P1] La agenda presencial muestra bloques con horario y título | Valida la estructura de la agenda presencial. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/testing-day-chile/<br>2) Localizar la sección "Conoce nuestra Agenda"<br>3) Leer los bloques de la agenda<br>4) Verificar al menos un bloque con rango "HH:MM - HH:MM" y título no vacío | Al menos un bloque con rango horario "HH:MM - HH:MM" y título no vacío. | Contenido volátil: asertar formato | N/A | Automatizado | P1 |
| 5 | TC-EVT-TDY-005 | Agenda Online | [REGRESION][P1] "Ver Agenda Completa e Inscribirse" lleva a Agenda Online | Valida el flujo desde el evento hacia la agenda online. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/testing-day-chile/<br>2) Hacer clic en "Ver Agenda Completa e Inscribirse"<br>3) Verificar URL `/agenda-online/` con HTTP 200<br>4) Verificar el H2 que empieza con "Agenda Online - " | URL `/agenda-online/`, HTTP 200 y H2 "Agenda Online - ...". | N/A | N/A | Automatizado | P1 |
| 6 | TC-EVT-TDY-006 | Agenda Online | [REGRESION][P1] La Agenda Online lista sesiones con inscripción | Valida la estructura de las sesiones de la agenda online. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/agenda-online/<br>2) Localizar las sesiones listadas<br>3) Verificar al menos una sesión con horario, tipo (TALLER o CHARLA) y título<br>4) Verificar que esa sesión tiene un enlace "Inscribirse" | Al menos una sesión con horario, tipo TALLER o CHARLA, título y enlace "Inscribirse". | N/A | N/A | Automatizado | P1 |
| 7 | TC-EVT-TDY-007 | Agenda Online | [REGRESION][P2] Los enlaces "Inscribirse" de la Agenda Online responden | Valida que los enlaces de inscripción externos están operativos. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/agenda-online/<br>2) Recopilar los `href` únicos de "Inscribirse"<br>3) Solicitar cada URL con el fixture `request`<br>4) Verificar que cada respuesta es 2xx o 3xx | Todas las respuestas son 2xx o 3xx. | Observado: 3 de 4 únicos con 404 (StreamYard) | N/A | Automatizado | P2 |
| 8 | TC-EVT-TDY-008 | Sponsors | [REGRESION][P2] Los sponsors se muestran por nivel y enlazan a la página de sponsors | Valida la agrupación por nivel y el enlace a la página de sponsors. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/testing-day-chile/<br>2) Localizar "Sponsors Oficiales"<br>3) Verificar los niveles PLATINUM, ORO, PLATA y BRONCE<br>4) Hacer clic en "Conoce más de nuestros sponsors"<br>5) Verificar `/nuestros-sponsors-{año}/` con HTTP 200 y al menos una tarjeta con "Sitio web" | Cuatro niveles visibles; el enlace lleva a la página de sponsors (200) con al menos una tarjeta con "Sitio web". | Año de la ruta volátil | N/A | Automatizado | P2 |
| 9 | TC-EVT-TDY-009 | Sponsors | [REGRESION][P2] Los logos de sponsors, comunidades y hoteles enlazan a dominios operativos | Valida la integridad de los enlaces externos de la página del evento. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/testing-day-chile/<br>2) Recopilar los `href` externos de logos de sponsors, comunidades y hoteles<br>3) Solicitar cada URL con el fixture `request` (tiempo límite 20 s)<br>4) Clasificar 999, 400 y 403 como "no verificable" (anti-bot)<br>5) Verificar que el resto resuelve en DNS y responde 2xx o 3xx | Todos los dominios resuelven y responden 2xx o 3xx, salvo bloqueos anti-bot documentados. | Lista de exclusión anti-bot en `test-data/static/` | N/A | Automatizado | P2 |
| 10 | TC-EVT-TDY-010 | Evento vigente | [REGRESION][P1] Tras el evento no se ofrecen CTAs de compra | Valida la vigencia de la página una vez finalizado el evento. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/testing-day-chile/<br>2) Leer la última jornada publicada del evento<br>3) Comparar con la fecha actual (America/Santiago)<br>4) Si el evento finalizó, buscar "Asegura tu entrada", "Comprar Entrada" e "Inscribirse"<br>5) Verificar que la página comunica el estado del evento | Con el evento finalizado, no hay CTAs de compra ni inscripción y la página comunica el estado del evento. | Evento observado: 27 y 28 de agosto de 2026 | N/A | Manual | P1 |
| 11 | TC-EVT-TDY-011 | Evento vigente | [REGRESION][P2] El brochure de sponsors se solicita por correo con asunto | Valida el canal de solicitud del brochure sin activarlo. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/testing-day-chile/<br>2) Leer el `href` de "Solicitar Brochure Ver Planes de Sponsor"<br>3) Verificar esquema `mailto:` hacia eventos@ del dominio del sitio<br>4) Verificar parámetro `subject` no vacío | `mailto:` hacia eventos@ del dominio del sitio con `subject` no vacío. | No hacer clic | N/A | Automatizado | P2 |
| 12 | TC-EVT-TDY-012 | SEO y accesibilidad | [REGRESION][P3] Las páginas del evento tienen título, description y H1 coherentes | Valida metadatos y encabezados de las tres páginas del evento. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a `/testing-day-chile/`, `/agenda-online/` y `/nuestros-sponsors-{año}/`<br>2) Leer `<title>` y meta description de cada página<br>3) Verificar description no vacía<br>4) Verificar un H1 con texto<br>5) Verificar títulos sin errores de concordancia ni afirmaciones contradictorias | Description no vacía, H1 con texto y títulos coherentes en las tres páginas. | Tres rutas del evento | N/A | Manual | P3 |
| 13 | TC-EVT-EDI-001 | Ediciones anteriores | [SMOKE][P0] La página de ediciones anteriores carga con sus bloques | Valida la disponibilidad de la página de ediciones anteriores. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/testing-day-chile-ediciones-anteriores/<br>2) Verificar HTTP 200<br>3) Verificar los encabezados de 2019, 2018, 2017 y Córdoba 2016 | HTTP 200 y encabezados de 2019, 2018, 2017 y Córdoba 2016 visibles. | N/A | N/A | Automatizado | P0 |
| 14 | TC-EVT-EDI-002 | Ediciones anteriores | [REGRESION][P1] Todas las páginas del submenú "Ediciones anteriores" responden 200 | Valida la publicación de las páginas de edición enlazadas desde el menú. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/<br>2) Recopilar desde el DOM los `href` del tercer nivel "Ediciones anteriores"<br>3) Solicitar cada URL con el fixture `request`<br>4) Verificar HTTP 200 en todas | Todas las páginas de edición responden HTTP 200. | Lista dinámica del DOM | N/A | Automatizado | P1 |
| 15 | TC-EVT-EDI-003 | Ediciones anteriores | [REGRESION][P1] Los enlaces internos de la página de ediciones no devuelven 404 | Valida el camino de error de enlaces internos rotos. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/testing-day-chile-ediciones-anteriores/<br>2) Recopilar los enlaces internos (mismo dominio)<br>3) Solicitar cada uno con el fixture `request`<br>4) Verificar que ninguno responde 404 | Ningún enlace interno responde 404. | Observado: `/testing-day-en-latam-2018/` responde 404 | N/A | Automatizado | P1 |
| 16 | TC-EVT-EDI-004 | Ediciones anteriores | [REGRESION][P2] El título de cada página de edición contiene su año | Valida la correspondencia entre título y año de cada edición. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Para cada par ruta y año de `04-test-data.md`, navegar a la ruta<br>2) Leer `<title>`<br>3) Verificar que contiene el año esperado | Cada título contiene el año de su edición. | Pares ruta y año de `04-test-data.md` | N/A | Manual | P2 |
| 17 | TC-EVT-EDI-005 | Ediciones anteriores | [REGRESION][P2] La edición 2025 enlaza a sus sponsors y muestra el video | Valida la página de la edición 2025. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/testing-day-chile-2025/<br>2) Verificar un iframe con origen `youtube-nocookie.com`<br>3) Hacer clic en "¡Conócelos aquí!"<br>4) Verificar URL `/nuestros-sponsors-2025/` con HTTP 200 | Iframe `youtube-nocookie.com` presente; el enlace lleva a `/nuestros-sponsors-2025/` con HTTP 200. | N/A | N/A | Automatizado | P2 |
| 18 | TC-EVT-EDI-006 | Ediciones anteriores | [REGRESION][P3] Los enlaces externos de resumen de ediciones responden | Valida el enlace externo "Ver lo más destacado". | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/testing-day-chile-ediciones-anteriores/<br>2) Leer el `href` de "Ver lo más destacado"<br>3) Solicitar la URL con el fixture `request`<br>4) Verificar respuesta 2xx o 3xx | Responde 2xx o 3xx. | Observado 200 | N/A | Automatizado | P3 |
| 19 | TC-EVT-EDI-007 | Ediciones anteriores | [REGRESION][P3] "Ver detalles de la edición más reciente" apunta a la última edición | Valida la vigencia del enlace a la edición más reciente. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/testing-day-chile-ediciones-anteriores/<br>2) Leer el `href` de "Ver detalles de la edición más reciente"<br>3) Obtener la última edición publicada del menú<br>4) Verificar que ambos coinciden | El enlace apunta a la edición más reciente publicada. | Observado: apunta a 2022 con 2023-2025 publicadas | N/A | Manual | P3 |
| 20 | TC-EVT-EDI-008 | SEO y accesibilidad | [REGRESION][P3] Las páginas de edición tienen un único H1 con texto | Valida la jerarquía de encabezados de las páginas de edición. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a cada página de edición del menú<br>2) Contar los `h1` con texto<br>3) Verificar exactamente uno por página | Exactamente un H1 con texto por página. | Lista dinámica del DOM | N/A | Manual | P3 |
| 21 | TC-EVT-EDI-009 | SEO y accesibilidad | [REGRESION][P3] Las imágenes de las páginas de edición tienen texto alternativo | Valida WCAG 1.1.1 en las páginas de edición. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/testing-day-chile-2025/<br>2) Leer el `alt` de cada imagen informativa<br>3) Navegar a `/testing-day-chile-ediciones-anteriores/` y repetir<br>4) Verificar que ninguna imagen informativa tiene `alt` vacío o ausente | Toda imagen informativa tiene `alt` no vacío. | Observado: 13/13 y 4/4 sin `alt` | N/A | Automatizado | P3 |

### 9.1 Decisión de automatización y trazabilidad

| N | TC-ID | Etiqueta | Decisión | Motivo | Reglas (RN) | Flujos (FL) | Hallazgos | DEF / REC | Estado esperado en etapa 5 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-EVT-TDY-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-001 | FL-EVT-001 | - | - | `test()` (pasa) |
| 2 | TC-EVT-TDY-002 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-002 | FL-EVT-001 | - | - | `test()` (pasa) |
| 3 | TC-EVT-TDY-003 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-003 | FL-EVT-001 | - | - | `test()` (pasa) |
| 4 | TC-EVT-TDY-004 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-004 | FL-EVT-001 | - | - | `test()` (pasa) |
| 5 | TC-EVT-TDY-005 | `@e2e` | Automatizar | Determinista; flujo multipágina, solo lectura. | RN-EVT-005 | FL-EVT-001 | - | - | `test()` (pasa) |
| 6 | TC-EVT-TDY-006 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-008 | FL-EVT-001 | - | - | `test()` (pasa) |
| 7 | TC-EVT-TDY-007 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-002. | RN-EVT-008, RN-EVT-009 | FL-EVT-001 | HC-06 | DEF-TCH-002 | `test.fail()` + DEF-TCH-002 |
| 8 | TC-EVT-TDY-008 | `@e2e` | Automatizar | Determinista; flujo multipágina, solo lectura. | RN-EVT-006, RN-EVT-011 | FL-EVT-001 | - | - | `test()` (pasa) |
| 9 | TC-EVT-TDY-009 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-003. | RN-EVT-009 | FL-EVT-001 | HC-07 | DEF-TCH-003 | `test.fail()` + DEF-TCH-003 |
| 10 | TC-EVT-TDY-010 | `@sanity` | Pendiente | RN-EVT-010 pendiente de confirmación (pregunta abierta 1) y hoy falla (HC-04): no puede ser `test.fail()`. | RN-EVT-010 | FL-EVT-002 | HC-04 | REC-TCH-003 | `test.skip()` PENDING-SPEC (REC-TCH-003) |
| 11 | TC-EVT-TDY-011 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-007 | - | - | - | `test()` (pasa) |
| 12 | TC-EVT-TDY-012 | `@regression` | Pendiente | RN-EVT-012 es criterio editorial y SEO no confirmado como regla de negocio; hoy falla (HC-09, HC-10, HC-11, HC-20): recomendación. | RN-EVT-012 | - | HC-09, HC-10, HC-11, HC-20 | REC-TCH-005, REC-TCH-006, REC-TCH-007, REC-TCH-016 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-006, REC-TCH-007, REC-TCH-016) |
| 13 | TC-EVT-EDI-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-013 | FL-EVT-003 | - | - | `test()` (pasa) |
| 14 | TC-EVT-EDI-002 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-014 | FL-EVT-003 | - | - | `test()` (pasa) |
| 15 | TC-EVT-EDI-003 | `@sanity` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-001. | RN-EVT-015 | FL-EVT-004 | HC-03 | DEF-TCH-001 | `test.fail()` + DEF-TCH-001 |
| 16 | TC-EVT-EDI-004 | `@regression` | Pendiente | RN-EVT-016 pendiente de confirmación y hoy falla `/entrevistas-sponsors-2021/` (HC-10): recomendación. | RN-EVT-016 | FL-EVT-003 | HC-10 | REC-TCH-006 | `test.skip()` PENDING-SPEC (REC-TCH-006) |
| 17 | TC-EVT-EDI-005 | `@e2e` | Automatizar | Determinista; flujo multipágina, solo lectura. | RN-EVT-017 | FL-EVT-003 | - | - | `test()` (pasa) |
| 18 | TC-EVT-EDI-006 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-009 | FL-EVT-003 | - | - | `test()` (pasa) |
| 19 | TC-EVT-EDI-007 | `@regression` | Pendiente | RN-EVT-018 pendiente de confirmación y hoy falla (HC-22): recomendación. | RN-EVT-018 | FL-EVT-003 | HC-22 | REC-TCH-018 | `test.skip()` PENDING-SPEC (REC-TCH-018) |
| 20 | TC-EVT-EDI-008 | `@regression` | Pendiente | RN-HOME-020 es criterio SEO no confirmado como regla de negocio; hoy fallan varias (HC-09): recomendación. | RN-HOME-020 | - | HC-09 | REC-TCH-005 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| 21 | TC-EVT-EDI-009 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-005. | RN-HOME-012 | - | HC-08 | DEF-TCH-005 | `test.fail()` + DEF-TCH-005 |

## 10. Matriz de Trazabilidad

Sin tareas ADO: la matriz se construye sobre reglas de negocio y hallazgos candidatos.

| Regla de negocio | N casos (tabla) |
|---|---|
| RN-EVT-001 | 1 |
| RN-EVT-002 | 2 |
| RN-EVT-003 | 3 |
| RN-EVT-004 | 4 |
| RN-EVT-005 | 5 |
| RN-EVT-006 | 8 |
| RN-EVT-007 | 11 |
| RN-EVT-008 | 6, 7 |
| RN-EVT-009 | 7, 9, 18 |
| RN-EVT-010 | 10 |
| RN-EVT-011 | 8 |
| RN-EVT-012 | 12 |
| RN-EVT-013 | 13 |
| RN-EVT-014 | 14 |
| RN-EVT-015 | 15 |
| RN-EVT-016 | 16 |
| RN-EVT-017 | 17 |
| RN-EVT-018 | 19 |
| RN-HOME-012 | 21 |
| RN-HOME-020 | 20 |

| Hallazgo candidato | N casos (tabla) |
|---|---|
| HC-03 | 15 |
| HC-04 | 10 |
| HC-06 | 7 |
| HC-07 | 9 |
| HC-08 | 21 |
| HC-09 | 12, 20 |
| HC-10 | 12, 16 |
| HC-11 | 12 |
| HC-20 | 12 |
| HC-22 | 19 |

## 11. Notas de automatización

- Specs en `qa/07-automation/e2e/tests/eventos/`, siguiendo la Constitución de `AGENTS.md` (K1-K12, W1-W11).
- Título `[TC-...] {título} @P#` y exactamente una etiqueta de tipo en `{ tag }` (K10); la etiqueta de cada caso está en la sección 9.1.
- Casos con DEF: `expectOpenDefect('DEF-TCH-NNN', ...)` con la aserción de la especificación, nunca invertida (reglas 8 y 10).
- Casos `Pendiente` por regla no confirmada: `test.skip()` con `PENDING-SPEC` y el ID de la recomendación en el mensaje; se reactivan al confirmarse la regla (con `test.fail()` + DEF si sigue fallando).
- Casos `@destructive`: `test.skip()` por defecto con el motivo en el mensaje (S7, W9).
- Aserciones de estructura y rutas; textos volátiles en `enums/` o `test-data/static/` (regla 7 del proyecto).
- Fixture base con el bloqueo de etiquetas de Google y page object del banner de cookies con la acción "Aceptar solo lo necesario".

## 12. Defectos y recomendaciones vinculados

| ID | Tipo | Título | Severidad | Hallazgo | Casos del módulo |
|---|---|---|---|---|---|
| DEF-TCH-001 | Defecto | Enlace interno "Saber más de esta edición" (2018) responde 404 | Media | HC-03 | TC-EVT-EDI-003 |
| DEF-TCH-002 | Defecto | 3 de 4 enlaces únicos "Inscribirse" de la Agenda Online responden 404 | Media | HC-06 | TC-EVT-TDY-007 |
| DEF-TCH-003 | Defecto | Logo de sponsor enlaza a un dominio inexistente y sitio de hotel sin respuesta | Baja | HC-07 | TC-EVT-TDY-009 |
| DEF-TCH-005 | Defecto | Imágenes informativas sin texto alternativo en páginas de contenido | Media | HC-08 | TC-EVT-EDI-009 |
| REC-TCH-003 | Recomendación | Evento 2026 finalizado mantiene CTAs de compra e inscripción | Media | HC-04 | TC-EVT-TDY-010 |
| REC-TCH-005 | Recomendación | Jerarquía de H1 inválida: múltiples H1, H1 vacíos o ausentes | Baja | HC-09 | TC-EVT-EDI-008, TC-EVT-TDY-012 |
| REC-TCH-006 | Recomendación | Títulos de página con errores o poco descriptivos | Baja | HC-10 | TC-EVT-EDI-004, TC-EVT-TDY-012 |
| REC-TCH-007 | Recomendación | Meta description vacía o no representativa | Baja | HC-11 | TC-EVT-TDY-012 |
| REC-TCH-016 | Recomendación | El título anuncia "GRATUITO" aunque la entrada presencial es pagada | Baja | HC-20 | TC-EVT-TDY-012 |
| REC-TCH-018 | Recomendación | "Ver detalles de la edición más reciente" apunta a la edición 2022 | Baja | HC-22 | TC-EVT-EDI-007 |

Detalle y criterio de clasificación: sección 11 del plan maestro, `qa/06-defects/open/` y `qa/06-defects/recommendations/`.
