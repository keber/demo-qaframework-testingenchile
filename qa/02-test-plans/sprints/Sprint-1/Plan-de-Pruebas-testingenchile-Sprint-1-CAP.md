# Plan de Pruebas - Testing en Chile - Sprint 1 - Capacitaciones

| Campo | Valor |
|---|---|
| Proyecto | Testing en Chile (`testingenchile`) |
| Sprint | 1 (etapas 3-4 del pipeline; automatización en la etapa 5) |
| Módulo | Capacitaciones |
| Código módulo | CAP |
| Submódulos | catalogo (CAT), detalle-curso (CUR), bootcamp (BTC) |
| Fecha planificación | 2026-11-21 |
| Ventana QA | 2026-11-23 y 2026-12-02 (propuesta, sujeta a aprobación) |
| ADO Test Plan | No aplica (`integrations.azureDevOps.enabled` = false) |
| Plan maestro | `qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md` |
| Especificaciones | `qa/01-specifications/module-capacitaciones/` |

---

## 1. Objetivo

Verificar, en modo de solo lectura sobre el sitio público de producción, que el módulo Capacitaciones cumple sus reglas de negocio confirmadas (origen `OBSERVADO` o `ESTÁNDAR` normativo), documentar como defecto (`DEF-TCH-NNN`) cada incumplimiento de una regla confirmada y como recomendación (`REC-TCH-NNN`) cada hallazgo sin regla confirmada, y dejar cada caso listo para la etapa 5 en uno de los estados válidos de la regla 8 del framework.

## 2. Alcance

### En alcance

- Catálogo: tarjetas, filtros por categoría, enlaces "Saber más" y contacto Sence
- Detalle de curso: páginas publicadas, asunto AiU, pago externo (Flow) y consentimiento
- Formulario de consulta: validación en el cliente sin envío (reCAPTCHA)
- Bootcamp: landing, anclas, autodiagnóstico en el cliente, FAQ y canales de postulación

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
| Catálogo y filtros | 7 | HC-18 |
| Detalle de curso | 4 | HC-16 |
| Formulario de consulta | 6 | - |
| Bootcamp | 8 | HC-05, HC-21 |
| SEO y accesibilidad | 2 | HC-08, HC-09, HC-10 |

## 4. Priorización

| Prioridad | Criterio | Casos |
|---|---|---|
| P0 | Disponibilidad de la página o flujo principal (smoke) | 3 |
| P1 | Funcionalidad principal, validaciones obligatorias, destinos de CTAs, vigencia | 12 |
| P2 | Funcionalidad secundaria, enlaces externos, responsividad, accesibilidad | 8 |
| P3 | SEO, ortografía, consistencia y casos de borde | 4 |
| **Total** | | **27** |

| Tipo de ejecución | Casos |
|---|---|
| Automatizado | 21 |
| Manual | 4 |
| Bloqueado | 2 |

| Decisión de automatización | Casos |
|---|---|
| Automatizar | 21 |
| Manual | 1 |
| Pendiente | 5 |

## 5. TestSuites (agrupación)

| Suite / Área funcional | Descripción | N casos (tabla) |
|---|---|---|
| Catálogo y filtros | Tarjetas, filtros, enlaces "Saber más" y contacto Sence | 1, 2, 3, 4, 5, 6, 9 |
| Detalle de curso | Páginas de curso, asunto AiU, pago externo y consentimiento | 10, 16, 17, 18 |
| Formulario de consulta | Validación en el cliente del formulario de curso, sin envío | 11, 12, 13, 14, 15, 19 |
| Bootcamp | Landing, anclas, autodiagnóstico, FAQ y canales de contacto | 20, 21, 22, 23, 24, 25, 26, 27 |
| SEO y accesibilidad | Encabezados, títulos y texto alternativo del catálogo | 7, 8 |

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
| Formas de datos por submódulo | `04-test-data.md` | `qa/01-specifications/module-capacitaciones/submodule-*/` |
| Credenciales | No aplica | El sitio no tiene usuarios |

## 8. Supuestos & Faltantes críticos

| # | Supuesto o faltante | Efecto |
|---|---|---|
| 1 | Pregunta abierta 2: vigencia de la fecha de próximo inicio del Bootcamp (RN-CAP-016) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 2 | Pregunta abierta 7: número de WhatsApp del botón "Hablemos" (HC-18) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 3 | Pregunta abierta 8: ¿la conversión "purchase" del autodiagnóstico es intencional? (HC-21) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 4 | Pregunta abierta 9: criterio del filtro "Cursos" (no se aserta la composición del filtro, solo que reduce la lista) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 5 | RN-CAP-015 (consentimiento con enlace a la política) pendiente de confirmación | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 6 | Sin entorno de pruebas: el envío real del formulario (TC-CAP-CUR-010) no es ejecutable | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |

## 9. Tabla de Pruebas

Pasos expandidos en la etapa 4 (`qa-test-cases`). `Confirma` = `N/A` porque no hay tareas ADO. `{QA_BASE_URL}` y `EXEC_IDX` según la sección 7. Tipo: `Automatizado` = decisión Automatizar; `Manual` = ejecución manual (casos Manual y casos Pendiente por regla no confirmada, que se ejecutan a mano para mantener la evidencia de su recomendación); `Bloqueado` = PENDING-BROWSER o @destructive.

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Precondiciones | Steps | Resultado Esperado | Datos de prueba | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-CAP-CAT-001 | Catálogo y filtros | [SMOKE][P0] El catálogo carga con tarjetas y enlaces "Saber más" | Valida la disponibilidad del catálogo de capacitaciones. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/capacitaciones2/<br>2) Verificar HTTP 200<br>3) Verificar que hay al menos una tarjeta de capacitación visible<br>4) Verificar que cada tarjeta contiene un enlace "Saber más" | HTTP 200; al menos una tarjeta visible y cada tarjeta con enlace "Saber más". | 15 tarjetas observadas el 2026-11-21 (volátil) | N/A | Automatizado | P0 |
| 2 | TC-CAP-CAT-002 | Catálogo y filtros | [REGRESION][P1] Todos los "Saber más" responden HTTP 200 | Valida que ninguna tarjeta del catálogo enlaza a una página inexistente. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/capacitaciones2/<br>2) Recopilar los `href` de todos los enlaces "Saber más"<br>3) Solicitar cada URL con el fixture `request` (secuencial, workers <= 2)<br>4) Verificar que cada respuesta es HTTP 200 | Todas las respuestas son HTTP 200. | Lista dinámica de `href` | N/A | Automatizado | P1 |
| 3 | TC-CAP-CAT-003 | Catálogo y filtros | [REGRESION][P1] El filtro "Certificaciones" muestra solo tarjetas con insignia "Certificación" | Valida la exactitud del filtro de certificaciones. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/capacitaciones2/<br>2) Registrar las tarjetas que tienen la insignia "Certificación"<br>3) Hacer clic en el filtro "Certificaciones"<br>4) Registrar las tarjetas visibles<br>5) Verificar que ambos conjuntos coinciden y no queda visible ninguna tarjeta sin insignia | Las tarjetas visibles coinciden exactamente con las que tienen insignia "Certificación". | N/A | N/A | Automatizado | P1 |
| 4 | TC-CAP-CAT-004 | Catálogo y filtros | [REGRESION][P1] Cada filtro reduce la lista y "Todos" la restaura | Valida la transición de estado de los filtros sin recarga de página. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/capacitaciones2/ y contar las tarjetas visibles (total)<br>2) Hacer clic en "Bootcamp" y verificar que el conteo es mayor que 0 y menor que el total<br>3) Repetir para "IA", "SAP", "Automation", "Performance" y "Cursos"<br>4) Hacer clic en "Todos"<br>5) Verificar que el conteo vuelve al total y que la URL no cambió | Cada filtro muestra al menos una tarjeta y menos que el total; "Todos" restaura el total; la URL no cambia. | Nombres de filtros en `test-data/static/`; conteos de RN-CAP-002 volátiles | N/A | Automatizado | P1 |
| 5 | TC-CAP-CAT-005 | Catálogo y filtros | [REGRESION][P2] Los enlaces "Saber más" abren en pestaña nueva | Valida el atributo `target` de los enlaces a cursos. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/capacitaciones2/<br>2) Leer el atributo `target` de cada enlace "Saber más"<br>3) Verificar que todos declaran `target=_blank` | Todos los enlaces "Saber más" declaran `target=_blank`. | N/A | N/A | Automatizado | P2 |
| 6 | TC-CAP-CAT-006 | Catálogo y filtros | [REGRESION][P2] El botón "Hablemos" apunta a WhatsApp | Valida el canal de contacto para convenio Sence sin activarlo. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/capacitaciones2/<br>2) Leer `href` y `target` del botón "Hablemos"<br>3) Verificar que el `href` empieza con `https://wa.me/`<br>4) Verificar `target=_blank` | El `href` usa `https://wa.me/` y abre en pestaña nueva. | No hacer clic. El número difiere del general (HC-18): no se aserta el número | N/A | Automatizado | P2 |
| 7 | TC-CAP-CAT-007 | SEO y accesibilidad | [REGRESION][P3] El catálogo tiene un H1 y un título descriptivo | Valida encabezado principal y título de la página del catálogo. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/capacitaciones2/<br>2) Contar los elementos `h1` y verificar que existe uno<br>3) Leer `<title>` y verificar que identifica el catálogo y el sitio | Existe un H1 y el título identifica el catálogo y "Testing en Chile". | N/A | N/A | Manual | P3 |
| 8 | TC-CAP-CAT-008 | SEO y accesibilidad | [REGRESION][P3] Las imágenes del catálogo tienen texto alternativo | Valida WCAG 1.1.1 en las imágenes informativas del catálogo. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/capacitaciones2/<br>2) Listar las imágenes informativas (logo, SENCE, tarjetas)<br>3) Leer el atributo `alt` de cada una<br>4) Verificar que ninguna tiene `alt` vacío o ausente | Toda imagen informativa tiene `alt` no vacío. | N/A | N/A | Automatizado | P3 |
| 9 | TC-CAP-CAT-009 | Catálogo y filtros | [REGRESION][P2] Filtros y tarjetas son usables en móvil | Valida la responsividad del catálogo y el funcionamiento del filtro en móvil. | Contexto limpio con dispositivo Pixel 5 (393 px); banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/capacitaciones2/ con el dispositivo Pixel 5<br>2) Verificar que los filtros y las tarjetas son visibles<br>3) Verificar que `scrollWidth` es igual a `clientWidth`<br>4) Hacer clic en el filtro "Certificaciones"<br>5) Verificar que el resultado coincide con el de escritorio (TC-CAP-CAT-003) | Filtros y tarjetas visibles sin desplazamiento horizontal; el filtro funciona igual que en escritorio. | Dispositivo Pixel 5 | N/A | Bloqueado | P2 |
| 10 | TC-CAP-CUR-001 | Detalle de curso | [SMOKE][P0] Las páginas de curso del catálogo cargan con título y H1 | Valida la disponibilidad de cada página de curso enlazada desde el catálogo. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/capacitaciones2/ y recopilar los destinos de "Saber más"<br>2) Navegar a cada destino (prueba parametrizada)<br>3) Verificar HTTP 200<br>4) Verificar que `<title>` no está vacío<br>5) Verificar que hay al menos un H1 visible | Cada página de curso responde 200, con `<title>` no vacío y al menos un H1 visible. | Destinos dinámicos del catálogo | N/A | Automatizado | P0 |
| 11 | TC-CAP-CUR-002 | Formulario de consulta | [REGRESION][P1] El formulario de consulta muestra sus campos y obligatoriedad | Valida la estructura del formulario de consulta de un curso. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/curso-automatizacion-pruebas-software-web-selenium-java/<br>2) Localizar los campos por etiqueta: "Nombre y Apellido", "E-mail", "Celular", "Mensaje" y la casilla de consentimiento<br>3) Verificar que "Nombre y Apellido", "E-mail", "Mensaje" y el consentimiento tienen `required`<br>4) Verificar que "Celular" no es obligatorio | Existen los cinco controles; todos son obligatorios salvo "Celular". | Página de curso Selenium Java | N/A | Automatizado | P1 |
| 12 | TC-CAP-CUR-003 | Formulario de consulta | [REGRESION][P1] El formulario vacío es inválido sin enviarlo | Valida la validación de campos obligatorios en el cliente. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/curso-automatizacion-pruebas-software-web-selenium-java/<br>2) Evaluar `form.checkValidity()` con todos los campos vacíos<br>3) Verificar que el resultado es `false`<br>4) Leer `validationMessage` de cada campo obligatorio y verificar que no está vacío | `checkValidity()` = false y cada obligatorio tiene `validationMessage` no vacío. | No hacer clic en "¡Enviar mensaje!" (S7). No asertar el texto del mensaje nativo | N/A | Automatizado | P1 |
| 13 | TC-CAP-CUR-004 | Formulario de consulta | [REGRESION][P1] El formulario completo con datos sintéticos es válido en el cliente | Valida el camino feliz en el cliente sin envío. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/curso-automatizacion-pruebas-software-web-selenium-java/<br>2) Ingresar "QA Nombre {EXEC_IDX}" en "Nombre y Apellido"<br>3) Ingresar `qa.{EXEC_IDX}@example.com` en "E-mail" y `+56 9 0000 0000` en "Celular"<br>4) Ingresar "QA mensaje de prueba" en "Mensaje" y marcar el consentimiento<br>5) Evaluar `validity.valid` de cada campo visible (excluido el reCAPTCHA)<br>6) Verificar que no se realizó ninguna solicitud POST al sitio | Todos los campos visibles válidos; ningún envío al sitio. | Forma "Formulario válido" de `04-test-data.md` (Faker con prefijo QA, dominio `example.com`) | N/A | Automatizado | P1 |
| 14 | TC-CAP-CUR-005 | Formulario de consulta | [REGRESION][P1] Un e-mail sin "@" es rechazado por la validación | Valida el formato del correo en el cliente. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/curso-automatizacion-pruebas-software-web-selenium-java/<br>2) Ingresar `qa-invalido` en "E-mail"<br>3) Verificar que `validity.valid` es `false`<br>4) Reemplazar por `qa.{EXEC_IDX}@example.com`<br>5) Verificar que `validity.valid` es `true` | Con `qa-invalido` el campo es inválido; con el correo sintético válido pasa a válido. | `qa-invalido`; `qa.{EXEC_IDX}@example.com` | N/A | Automatizado | P1 |
| 15 | TC-CAP-CUR-006 | Formulario de consulta | [REGRESION][P2] El celular rechaza letras | Valida el patrón del campo "Celular". | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/curso-automatizacion-pruebas-software-web-selenium-java/<br>2) Ingresar `abc` en "Celular"<br>3) Verificar que `validity.valid` es `false` (`patternMismatch`) | El campo "Celular" es inválido por patrón. | `abc` | N/A | Automatizado | P2 |
| 16 | TC-CAP-CUR-007 | Detalle de curso | [REGRESION][P1] En AiU el asunto es obligatorio y ofrece tres opciones | Valida el select "Asunto" del curso AiU. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/aiugenaia/<br>2) Localizar el select "Asunto"<br>3) Verificar que tiene `required`<br>4) Leer sus opciones y verificar las tres de RN-CAP-012 | El select es obligatorio y contiene las tres opciones de RN-CAP-012. | Opciones en `test-data/static/` | N/A | Automatizado | P1 |
| 17 | TC-CAP-CUR-008 | Detalle de curso | [REGRESION][P1] El botón de pago apunta a la pasarela externa en pestaña nueva | Valida la integración con la pasarela de pago sin ejecutar transacciones. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/new-curso-istqb/<br>2) Leer `href` y `target` del botón de pago<br>3) Verificar host `www.flow.cl` y `target=_blank`<br>4) Navegar a `/aiugenaia/` y repetir la verificación | El `href` usa el host `www.flow.cl` y `target=_blank` en ambas páginas. | NUNCA hacer clic: transacción real | N/A | Automatizado | P1 |
| 18 | TC-CAP-CUR-009 | Detalle de curso | [REGRESION][P2] El consentimiento enlaza a la política de privacidad | Valida que la casilla de consentimiento informa la política de privacidad. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/aiugenaia/<br>2) Localizar el contenedor de la casilla de consentimiento<br>3) Buscar un enlace hacia `/politica-de-privacidad/` | Existe un enlace a `/politica-de-privacidad/` junto al consentimiento. | N/A | N/A | Manual | P2 |
| 19 | TC-CAP-CUR-010 | Formulario de consulta | [REGRESION][P3] El envío real del formulario de consulta muestra confirmación | Camino feliz de envío; no ejecutable en producción. | Entorno de pruebas del sitio (no existe). | 1) Completar el formulario con datos sintéticos<br>2) Resolver el reCAPTCHA<br>3) Hacer clic en "¡Enviar mensaje!"<br>4) Verificar el mensaje de confirmación del sitio | Mensaje de confirmación del sitio (texto no observado). | Datos sintéticos de `04-test-data.md` | N/A | Bloqueado | P3 |
| 20 | TC-CAP-BTC-001 | Bootcamp | [SMOKE][P0] La landing del Bootcamp carga con hero y CTAs | Valida la disponibilidad de la landing del Bootcamp. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/bootcamp-de-testing/<br>2) Verificar HTTP 200<br>3) Verificar que el H1 del hero es visible<br>4) Verificar que "Quiero evaluar mi postulación" y "Ver la ruta de aprendizaje" son visibles | HTTP 200; H1 del hero, "Quiero evaluar mi postulación" y "Ver la ruta de aprendizaje" visibles. | N/A | N/A | Automatizado | P0 |
| 21 | TC-CAP-BTC-002 | Bootcamp | [REGRESION][P2] Las anclas del hero llevan a su sección | Valida la navegación por anclas de la landing. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/bootcamp-de-testing/<br>2) Hacer clic en "Ver la ruta de aprendizaje"<br>3) Verificar que la URL termina en `#btc-ruta` y la sección está en el viewport<br>4) Volver al hero y hacer clic en "Quiero evaluar mi postulación"<br>5) Verificar que la URL termina en `#btc-postula` y la sección está en el viewport | URL con `#btc-ruta` y luego `#btc-postula`; la sección destino en el viewport en cada caso. | N/A | N/A | Automatizado | P2 |
| 22 | TC-CAP-BTC-003 | Bootcamp | [REGRESION][P1] El autodiagnóstico sin respuestas no muestra resultado | Valida el camino negativo del autodiagnóstico. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. Bloqueo de Google obligatorio (HC-21). | 1) Navegar a {QA_BASE_URL}/bootcamp-de-testing/<br>2) Desplazarse al autodiagnóstico sin marcar opciones<br>3) Hacer clic en "Ver mi orientación"<br>4) Verificar que `#btc-result` sigue oculto<br>5) Verificar que la URL no cambió | `#btc-result` oculto y URL sin cambios. | N/A | N/A | Automatizado | P1 |
| 23 | TC-CAP-BTC-004 | Bootcamp | [REGRESION][P1] El autodiagnóstico clasifica según el puntaje | Valida el cálculo de la orientación en el cliente, incluidos los bordes. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. Bloqueo de Google obligatorio (HC-21). | 1) Navegar a {QA_BASE_URL}/bootcamp-de-testing/<br>2) Para cada combinación de "Autodiagnóstico" de `04-test-data.md`, marcar las cuatro respuestas<br>3) Hacer clic en "Ver mi orientación"<br>4) Verificar el texto "Tu orientación: {resultado}" según RN-CAP-019<br>5) Verificar el enlace "Conocer cómo postular"<br>6) Verificar que no hubo solicitudes al dominio del sitio | Puntaje >= 6 "Muy alineada"; >= 3 "Con potencial de desarrollo"; resto "Vale la pena conversar"; enlace "Conocer cómo postular" visible; sin solicitudes al sitio. | Puntajes 8, 6, 5, 3, 2 y 0 (bordes incluidos) | N/A | Automatizado | P1 |
| 24 | TC-CAP-BTC-005 | Bootcamp | [REGRESION][P1] La fecha de próximo inicio no está vencida | Valida la vigencia de la fecha publicada del próximo inicio. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/bootcamp-de-testing/<br>2) Leer la fecha junto a "próximo inicio"<br>3) Obtener la fecha actual en America/Santiago<br>4) Verificar que la fecha publicada es igual o posterior a hoy | La fecha publicada es igual o posterior a la fecha actual. | Observado: 2 de noviembre de 2026 frente a 2026-11-21 | N/A | Manual | P1 |
| 25 | TC-CAP-BTC-006 | Bootcamp | [REGRESION][P2] Las preguntas frecuentes se expanden al hacer clic | Valida la transición cerrada/abierta de las FAQ. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/bootcamp-de-testing/<br>2) Contar las preguntas frecuentes y verificar que hay 5<br>3) Hacer clic en "¿Debo saber Testing antes de comenzar?"<br>4) Verificar que el `details` queda abierto y la respuesta es visible | Cinco preguntas; la seleccionada queda abierta con su respuesta visible. | N/A | N/A | Automatizado | P2 |
| 26 | TC-CAP-BTC-007 | Bootcamp | [REGRESION][P2] Los CTAs de WhatsApp y correo apuntan a destinos válidos | Valida los canales de postulación sin activarlos. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/bootcamp-de-testing/<br>2) Leer el `href` de "Hablar por WhatsApp" y de "Iniciar chat en WhatsApp"<br>3) Verificar `https://wa.me/` con parámetro `text`<br>4) Leer el `href` de "Consultar por correo"<br>5) Verificar `mailto:` con `subject` "Postulación Bootcamp de Testing" | WhatsApp con `https://wa.me/` y `text`; correo `mailto:` con `subject` "Postulación Bootcamp de Testing". | No hacer clic | N/A | Automatizado | P2 |
| 27 | TC-CAP-BTC-008 | Bootcamp | [REGRESION][P3] El autodiagnóstico no dispara conversiones de compra | Verifica la calidad de los datos analíticos del autodiagnóstico. | Contexto aislado SIN bloqueo de etiquetas de Google; captura de red activa. | 1) Navegar a {QA_BASE_URL}/bootcamp-de-testing/<br>2) Iniciar la captura de red (herramientas de desarrollo o HAR)<br>3) Completar el autodiagnóstico y hacer clic en "Ver mi orientación"<br>4) Buscar solicitudes a `pagead2.googlesyndication.com/pagead/conversion/`<br>5) Verificar que ninguna contiene `bttype=purchase` | No se envía ninguna conversión con `bttype=purchase`. | Ejecutar a lo sumo una vez, solo para evidencia | N/A | Manual | P3 |

### 9.1 Decisión de automatización y trazabilidad

| N | TC-ID | Etiqueta | Decisión | Motivo | Reglas (RN) | Flujos (FL) | Hallazgos | DEF / REC | Estado esperado en etapa 5 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-CAP-CAT-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-001 | FL-CAP-001 | - | - | `test()` (pasa) |
| 2 | TC-CAP-CAT-002 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-004 | FL-CAP-001, FL-CAP-003 | - | - | `test()` (pasa) |
| 3 | TC-CAP-CAT-003 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-003 | FL-CAP-001 | - | - | `test()` (pasa) |
| 4 | TC-CAP-CAT-004 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-002 | FL-CAP-001 | - | - | `test()` (pasa) |
| 5 | TC-CAP-CAT-005 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-004, RN-HOME-007 | FL-CAP-001 | - | - | `test()` (pasa) |
| 6 | TC-CAP-CAT-006 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-005 | FL-CAP-002 | HC-18 | REC-TCH-014 (informativa) | `test()` (pasa) |
| 7 | TC-CAP-CAT-007 | `@regression` | Pendiente | RN-CAP-006 es criterio SEO no confirmado como regla de negocio (hoy sin H1, título "Capacitaciones"): recomendación. | RN-CAP-006 | - | HC-09, HC-10 | REC-TCH-005, REC-TCH-006 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-006) |
| 8 | TC-CAP-CAT-008 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-005. | RN-HOME-012 | - | HC-08 | DEF-TCH-005 | `test.fail()` + DEF-TCH-005 |
| 9 | TC-CAP-CAT-009 | `@regression` | Pendiente | Vista móvil del catálogo no observada (PENDING-BROWSER): observar antes de automatizar (K12). | RN-CAP-002, RN-HOME-015 | FL-CAP-001 | - | - | `test.skip()` PENDING-BROWSER |
| 10 | TC-CAP-CUR-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-007 | FL-CAP-001 | - | - | `test()` (pasa) |
| 11 | TC-CAP-CUR-002 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-008 | FL-CAP-004 | - | - | `test()` (pasa) |
| 12 | TC-CAP-CUR-003 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-008 | FL-CAP-004 | - | - | `test()` (pasa) |
| 13 | TC-CAP-CUR-004 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-008, RN-CAP-009, RN-CAP-010, RN-CAP-011 | FL-CAP-004 | - | - | `test()` (pasa) |
| 14 | TC-CAP-CUR-005 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-009 | FL-CAP-004 | - | - | `test()` (pasa) |
| 15 | TC-CAP-CUR-006 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-010 | FL-CAP-004 | - | - | `test()` (pasa) |
| 16 | TC-CAP-CUR-007 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-012 | FL-CAP-004 | - | - | `test()` (pasa) |
| 17 | TC-CAP-CUR-008 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-014 | FL-CAP-005 | - | - | `test()` (pasa) |
| 18 | TC-CAP-CUR-009 | `@regression` | Pendiente | RN-CAP-015 pendiente de confirmación y hoy no hay enlace (HC-16): recomendación hasta confirmar. | RN-CAP-015 | FL-CAP-004 | HC-16 | REC-TCH-012 | `test.skip()` PENDING-SPEC (REC-TCH-012) |
| 19 | TC-CAP-CUR-010 | `@destructive` | Pendiente | Envío real prohibido en producción (S7, W9) y protegido por reCAPTCHA; requiere un entorno de pruebas que no existe. | RN-CAP-008, RN-CAP-013 | FL-CAP-004 | - | - | `test.skip()` @destructive PENDING-BROWSER |
| 20 | TC-CAP-BTC-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-017 | FL-CAP-006 | - | - | `test()` (pasa) |
| 21 | TC-CAP-BTC-002 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-017 | FL-CAP-006 | - | - | `test()` (pasa) |
| 22 | TC-CAP-BTC-003 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-018 | FL-CAP-006 | - | - | `test()` (pasa) |
| 23 | TC-CAP-BTC-004 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-019 | FL-CAP-006 | - | - | `test()` (pasa) |
| 24 | TC-CAP-BTC-005 | `@sanity` | Pendiente | RN-CAP-016 pendiente de confirmación (pregunta abierta 2) y hoy falla (HC-05): no puede ser `test.fail()`. | RN-CAP-016 | - | HC-05 | REC-TCH-004 | `test.skip()` PENDING-SPEC (REC-TCH-004) |
| 25 | TC-CAP-BTC-006 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-020 | - | - | - | `test()` (pasa) |
| 26 | TC-CAP-BTC-007 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-021 | FL-CAP-007 | - | - | `test()` (pasa) |
| 27 | TC-CAP-BTC-008 | `@regression` | Manual | Ejecutarlo dispara una conversión real de Google Ads (HC-21): no se automatiza; ejecución manual única para evidencia, con aprobación del responsable. | Sin regla de negocio (calidad de datos) | FL-CAP-006 | HC-21 | REC-TCH-017 | Fuera de la suite automatizada (ejecución manual) |

## 10. Matriz de Trazabilidad

Sin tareas ADO: la matriz se construye sobre reglas de negocio y hallazgos candidatos.

| Regla de negocio | N casos (tabla) |
|---|---|
| RN-CAP-001 | 1 |
| RN-CAP-002 | 4, 9 |
| RN-CAP-003 | 3 |
| RN-CAP-004 | 2, 5 |
| RN-CAP-005 | 6 |
| RN-CAP-006 | 7 |
| RN-CAP-007 | 10 |
| RN-CAP-008 | 11, 12, 13, 19 |
| RN-CAP-009 | 13, 14 |
| RN-CAP-010 | 13, 15 |
| RN-CAP-011 | 13 |
| RN-CAP-012 | 16 |
| RN-CAP-013 | 19 |
| RN-CAP-014 | 17 |
| RN-CAP-015 | 18 |
| RN-CAP-016 | 24 |
| RN-CAP-017 | 20, 21 |
| RN-CAP-018 | 22 |
| RN-CAP-019 | 23 |
| RN-CAP-020 | 25 |
| RN-CAP-021 | 26 |
| RN-HOME-007 | 5 |
| RN-HOME-012 | 8 |
| RN-HOME-015 | 9 |

| Hallazgo candidato | N casos (tabla) |
|---|---|
| HC-05 | 24 |
| HC-08 | 8 |
| HC-09 | 7 |
| HC-10 | 7 |
| HC-16 | 18 |
| HC-18 | 6 |
| HC-21 | 27 |

## 11. Notas de automatización

- Specs en `qa/07-automation/e2e/tests/capacitaciones/`, siguiendo la Constitución de `AGENTS.md` (K1-K12, W1-W11).
- Título `[TC-...] {título} @P#` y exactamente una etiqueta de tipo en `{ tag }` (K10); la etiqueta de cada caso está en la sección 9.1.
- Casos con DEF: `expectOpenDefect('DEF-TCH-NNN', ...)` con la aserción de la especificación, nunca invertida (reglas 8 y 10).
- Casos `Pendiente` por regla no confirmada: `test.skip()` con `PENDING-SPEC` y el ID de la recomendación en el mensaje; se reactivan al confirmarse la regla (con `test.fail()` + DEF si sigue fallando).
- Casos `@destructive`: `test.skip()` por defecto con el motivo en el mensaje (S7, W9).
- Aserciones de estructura y rutas; textos volátiles en `enums/` o `test-data/static/` (regla 7 del proyecto).
- Fixture base con el bloqueo de etiquetas de Google y page object del banner de cookies con la acción "Aceptar solo lo necesario".

## 12. Defectos y recomendaciones vinculados

| ID | Tipo | Título | Severidad | Hallazgo | Casos del módulo |
|---|---|---|---|---|---|
| DEF-TCH-005 | Defecto | Imágenes informativas sin texto alternativo en páginas de contenido | Media | HC-08 | TC-CAP-CAT-008 |
| REC-TCH-004 | Recomendación | Fecha de próximo inicio del Bootcamp vencida con CTAs activos | Media | HC-05 | TC-CAP-BTC-005 |
| REC-TCH-005 | Recomendación | Jerarquía de H1 inválida: múltiples H1, H1 vacíos o ausentes | Baja | HC-09 | TC-CAP-CAT-007 |
| REC-TCH-006 | Recomendación | Títulos de página con errores o poco descriptivos | Baja | HC-10 | TC-CAP-CAT-007 |
| REC-TCH-012 | Recomendación | Formularios sin enlace a la política de privacidad ni consentimiento | Media | HC-16 | TC-CAP-CUR-009 |
| REC-TCH-014 | Recomendación | Número de WhatsApp distinto en el botón "Hablemos" del catálogo | Baja | HC-18 | TC-CAP-CAT-006 |
| REC-TCH-017 | Recomendación | El autodiagnóstico del Bootcamp registra una conversión "purchase" sin compra | Media | HC-21 | TC-CAP-BTC-008 |

Detalle y criterio de clasificación: sección 11 del plan maestro, `qa/06-defects/open/` y `qa/06-defects/recommendations/`.
