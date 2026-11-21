# Plan de Pruebas - Testing en Chile - Sprint 1 - Contacto y formularios

| Campo | Valor |
|---|---|
| Proyecto | Testing en Chile (`testingenchile`) |
| Sprint | 1 (etapas 3-4 del pipeline; automatización en la etapa 5) |
| Módulo | Contacto y formularios |
| Código módulo | CON |
| Submódulos | formulario-contacto (FCO), contacto-empresa (EMP) |
| Fecha planificación | 2026-11-21 |
| Ventana QA | 2026-11-23 y 2026-12-02 (propuesta, sujeta a aprobación) |
| ADO Test Plan | No aplica (`integrations.azureDevOps.enabled` = false) |
| Plan maestro | `qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md` |
| Especificaciones | `qa/01-specifications/module-contacto/` |

---

## 1. Objetivo

Verificar, en modo de solo lectura sobre el sitio público de producción, que el módulo Contacto y formularios cumple sus reglas de negocio confirmadas (origen `OBSERVADO` o `ESTÁNDAR` normativo), documentar como defecto (`DEF-TCH-NNN`) cada incumplimiento de una regla confirmada y como recomendación (`REC-TCH-NNN`) cada hallazgo sin regla confirmada, y dejar cada caso listo para la etapa 5 en uno de los estados válidos de la regla 8 del framework.

## 2. Alcance

### En alcance

- Página de contacto: WhatsApp, correos por tipo de consulta, redes y ausencia de formulario
- Formulario empresa (B2B): estructura, obligatoriedad y validación en el cliente sin envío
- Cumplimiento: información de privacidad del formulario empresa

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
| Página de contacto | 8 | HC-09, HC-12, HC-17 |
| Formulario empresa - estructura | 5 | HC-14, HC-15 |
| Formulario empresa - validaciones | 5 | HC-13 |
| Cumplimiento y envío | 2 | HC-16 |

## 4. Priorización

| Prioridad | Criterio | Casos |
|---|---|---|
| P0 | Disponibilidad de la página o flujo principal (smoke) | 2 |
| P1 | Funcionalidad principal, validaciones obligatorias, destinos de CTAs, vigencia | 8 |
| P2 | Funcionalidad secundaria, enlaces externos, responsividad, accesibilidad | 5 |
| P3 | SEO, ortografía, consistencia y casos de borde | 5 |
| **Total** | | **20** |

| Tipo de ejecución | Casos |
|---|---|
| Automatizado | 11 |
| Manual | 7 |
| Bloqueado | 2 |

| Decisión de automatización | Casos |
|---|---|
| Automatizar | 11 |
| Manual | 0 |
| Pendiente | 9 |

## 5. TestSuites (agrupación)

| Suite / Área funcional | Descripción | N casos (tabla) |
|---|---|---|
| Página de contacto | Página "Contacto" del menú: WhatsApp, correos, redes y formulario | 1, 2, 3, 4, 5, 6, 7, 8 |
| Formulario empresa - estructura | Carga, campos, opciones, ortografía e indicadores del formulario B2B | 9, 10, 15, 18, 19 |
| Formulario empresa - validaciones | Validación en el cliente sin envío | 11, 12, 13, 14, 16 |
| Cumplimiento y envío | Información de privacidad y envío real (fuera de ejecución) | 17, 20 |

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
| Formas de datos por submódulo | `04-test-data.md` | `qa/01-specifications/module-contacto/submodule-*/` |
| Credenciales | No aplica | El sitio no tiene usuarios |

## 8. Supuestos & Faltantes críticos

| # | Supuesto o faltante | Efecto |
|---|---|---|
| 1 | Pregunta abierta 3: ¿la página "Contacto" debe tener formulario? (RN-CON-005) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 2 | Pregunta abierta 4: rango válido de "Número de personas" (RN-CON-011) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 3 | Pregunta abierta 6: ¿el formulario B2B debe pedir consentimiento? (RN-CON-013) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 4 | Los mensajes de validación nativos dependen del idioma del navegador: se asertan `validity` y `validationMessage` no vacío | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 5 | Vista móvil de la página de contacto no observada (TC-CON-FCO-008) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 6 | Sin entorno de pruebas: el envío real (TC-CON-EMP-012) no es ejecutable | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |

## 9. Tabla de Pruebas

Pasos expandidos en la etapa 4 (`qa-test-cases`). `Confirma` = `N/A` porque no hay tareas ADO. `{QA_BASE_URL}` y `EXEC_IDX` según la sección 7. Tipo: `Automatizado` = decisión Automatizar; `Manual` = ejecución manual (casos Manual y casos Pendiente por regla no confirmada, que se ejecutan a mano para mantener la evidencia de su recomendación); `Bloqueado` = PENDING-BROWSER o @destructive.

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Precondiciones | Steps | Resultado Esperado | Datos de prueba | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-CON-FCO-001 | Página de contacto | [SMOKE][P0] El ítem "Contacto" lleva a la página de contacto | Valida el acceso a la página de contacto desde el menú. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/<br>2) Hacer clic en "Contacto" del menú principal<br>3) Verificar URL `/formulario-contacto/` con HTTP 200<br>4) Verificar que el encabezado "¡Hablemos!" es visible | URL `/formulario-contacto/`, HTTP 200 y encabezado "¡Hablemos!" visible. | N/A | N/A | Automatizado | P0 |
| 2 | TC-CON-FCO-002 | Página de contacto | [REGRESION][P1] El CTA de WhatsApp apunta a una conversación prellenada | Valida el destino del CTA de WhatsApp sin activarlo. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/formulario-contacto/<br>2) Leer `href` y `target` de "¡Hablemos por WhatsApp!"<br>3) Verificar `https://wa.me/` con parámetro `text`<br>4) Verificar `target=_blank` | `https://wa.me/` con parámetro `text` y `target=_blank`. | No hacer clic | N/A | Automatizado | P1 |
| 3 | TC-CON-FCO-003 | Página de contacto | [REGRESION][P1] Los correos por tipo de consulta están visibles | Valida los canales de correo por tipo de consulta. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/formulario-contacto/<br>2) Desplazarse al footer<br>3) Verificar los textos de consultas generales, evento y sponsors, y cursos<br>4) Verificar que cada uno muestra un correo del dominio del sitio | Visibles los tres tipos de consulta con sus correos del dominio del sitio. | Correos por prefijo y dominio | N/A | Automatizado | P1 |
| 4 | TC-CON-FCO-004 | Página de contacto | [REGRESION][P2] Las redes sociales de la página abren en pestaña nueva | Valida los enlaces a redes sociales de la página de contacto. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/formulario-contacto/<br>2) Leer `href` y `target` de LinkedIn, Facebook, Instagram y Twitter<br>3) Verificar que cada `href` apunta al dominio de su red<br>4) Verificar `target=_blank` en los cuatro | Cuatro enlaces con `target=_blank` hacia el dominio de cada red. | No se aserta el perfil concreto (HC-17) | N/A | Automatizado | P2 |
| 5 | TC-CON-FCO-005 | Página de contacto | [REGRESION][P1] La página de contacto ofrece un formulario | Valida que la página "Contacto" permite escribir al sitio. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/formulario-contacto/<br>2) Contar los elementos `form` con campos de contacto<br>3) Buscar un enlace `mailto:` equivalente<br>4) Verificar que existe al menos uno de los dos | Existe un formulario de contacto o un enlace `mailto:` equivalente. | Observado: 0 elementos `form` | N/A | Manual | P1 |
| 6 | TC-CON-FCO-006 | Página de contacto | [REGRESION][P3] La página de contacto declara metadatos y un único H1 | Valida metadatos y encabezados de la página de contacto. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/formulario-contacto/<br>2) Leer `<title>` y meta description y verificar que no están vacíos<br>3) Contar los `h1` y verificar exactamente uno | Título y description no vacíos; un único H1. | Observado: 2 H1 | N/A | Manual | P3 |
| 7 | TC-CON-FCO-007 | Página de contacto | [REGRESION][P3] Los correos del footer son enlaces `mailto:` | Valida la usabilidad de los correos publicados. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/formulario-contacto/<br>2) Desplazarse al footer<br>3) Buscar enlaces `mailto:` para cada correo publicado<br>4) Verificar que cada correo es un enlace `mailto:` | Cada correo del footer es un enlace `mailto:`. | Observado: texto plano | N/A | Manual | P3 |
| 8 | TC-CON-FCO-008 | Página de contacto | [REGRESION][P2] La página de contacto es usable en móvil | Valida la responsividad de la página de contacto. | Contexto limpio con dispositivo Pixel 5 (393 px); banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/formulario-contacto/ con el dispositivo Pixel 5<br>2) Verificar que el CTA de WhatsApp y las redes son visibles<br>3) Verificar que `scrollWidth` es igual a `clientWidth` | CTA de WhatsApp y redes visibles sin desplazamiento horizontal. | Dispositivo Pixel 5 | N/A | Bloqueado | P2 |
| 9 | TC-CON-EMP-001 | Formulario empresa - estructura | [SMOKE][P0] El formulario empresa carga con su H1 | Valida la disponibilidad del formulario B2B. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/<br>2) Verificar HTTP 200<br>3) Esperar (web-first) a que el campo "Nombre" sea visible<br>4) Verificar el H1 "Potencia a tu Equipo de QA"<br>5) Verificar que el botón "Enviar" es visible | HTTP 200; H1 "Potencia a tu Equipo de QA"; formulario visible con botón "Enviar". | El formulario se renderiza después de `load` | N/A | Automatizado | P0 |
| 10 | TC-CON-EMP-002 | Formulario empresa - estructura | [REGRESION][P1] El formulario muestra sus seis campos obligatorios | Valida la estructura y obligatoriedad del formulario B2B. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/ y esperar el campo "Nombre"<br>2) Localizar por etiqueta: Nombre, Email, Empresa, Código Sence, Número de personas y capacitación de interés<br>3) Verificar que "Código Sence" tiene tres opciones<br>4) Verificar que los seis campos tienen `required` | Seis campos presentes y obligatorios; "Código Sence" con tres opciones. | N/A | N/A | Automatizado | P1 |
| 11 | TC-CON-EMP-003 | Formulario empresa - validaciones | [REGRESION][P1] El formulario vacío es inválido sin enviarlo | Valida la validación de obligatorios en el cliente. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/ y esperar el campo "Nombre"<br>2) Evaluar `form.checkValidity()` con los campos vacíos<br>3) Verificar que el resultado es `false`<br>4) Leer `validationMessage` de cada obligatorio y verificar que no está vacío | `checkValidity()` = false y cada obligatorio con `validationMessage` no vacío. | No hacer clic en "Enviar" (S7) | N/A | Automatizado | P1 |
| 12 | TC-CON-EMP-004 | Formulario empresa - validaciones | [REGRESION][P1] Un email sin "@" es inválido | Valida el formato del correo en el cliente. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/ y esperar el campo "Nombre"<br>2) Ingresar `qa-invalido` en "Email"<br>3) Verificar que `validity.valid` es `false` | `validity.valid` = false para `qa-invalido`. | `qa-invalido` | N/A | Automatizado | P1 |
| 13 | TC-CON-EMP-005 | Formulario empresa - validaciones | [REGRESION][P2] "Número de personas" no admite letras | Valida el tipo numérico del campo. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/ y esperar el campo "Nombre"<br>2) Escribir `abc` en "Número de personas"<br>3) Verificar que el valor del campo queda vacío o sin letras | El campo queda vacío o sin las letras. | `abc` | N/A | Automatizado | P2 |
| 14 | TC-CON-EMP-006 | Formulario empresa - validaciones | [REGRESION][P2] "Número de personas" rechaza cero y negativos | Valida el rango mínimo del número de personas. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/ y esperar el campo "Nombre"<br>2) Ingresar `0` en "Número de personas" y leer `validity.valid`<br>3) Ingresar `-5` y leer `validity.valid`<br>4) Verificar que ambos valores son inválidos | `0` y `-5` son inválidos. | `0`, `-5` | N/A | Manual | P2 |
| 15 | TC-CON-EMP-007 | Formulario empresa - estructura | [REGRESION][P1] Código Sence es obligatorio con tres opciones | Valida el grupo de radios "Código Sence". | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/ y esperar el campo "Nombre"<br>2) Localizar el grupo "Código Sence"<br>3) Verificar los radios "Si", "No" y "Aún no sabemos"<br>4) Verificar que el grupo es obligatorio | Tres radios ("Si", "No", "Aún no sabemos") obligatorios. | Texto observado "Si" (ver HC-14) | N/A | Automatizado | P1 |
| 16 | TC-CON-EMP-008 | Formulario empresa - validaciones | [REGRESION][P1] El formulario completo con datos sintéticos es válido en el cliente | Valida el camino feliz en el cliente sin envío. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/ y esperar el campo "Nombre"<br>2) Ingresar "QA Nombre {EXEC_IDX}", `qa.{EXEC_IDX}@example.com` y "QA Empresa {EXEC_IDX}"<br>3) Seleccionar "Aún no sabemos" en "Código Sence" e ingresar `5` en "Número de personas"<br>4) Ingresar la capacitación de interés "QA capacitación de prueba"<br>5) Evaluar `validity.valid` de cada campo (excluido el reCAPTCHA)<br>6) Verificar que no se realizó ninguna solicitud POST al sitio | Todos los campos válidos; ninguna solicitud POST al sitio. | Forma "Formulario válido" de `04-test-data.md` (Faker, prefijo QA, `example.com`) | N/A | Automatizado | P1 |
| 17 | TC-CON-EMP-009 | Cumplimiento y envío | [REGRESION][P2] El formulario informa la política de privacidad | Valida la información de privacidad en un formulario que recolecta datos personales. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/ y esperar el campo "Nombre"<br>2) Buscar en el formulario una casilla de consentimiento<br>3) Buscar un enlace a `/politica-de-privacidad/`<br>4) Verificar que existe al menos uno de los dos | Existe una casilla de consentimiento o un enlace a la política de privacidad. | Observado: ninguno | N/A | Manual | P2 |
| 18 | TC-CON-EMP-010 | Formulario empresa - estructura | [REGRESION][P3] Las etiquetas del formulario tienen ortografía correcta | Valida la ortografía de etiquetas y opciones del formulario B2B. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/ y esperar el campo "Nombre"<br>2) Leer las etiquetas y opciones del formulario<br>3) Verificar "Sí" (con tilde) en "Código Sence"<br>4) Verificar "¿En qué capacitación estás interesado?" o un equivalente correcto | Opción "Sí" y etiqueta "¿En qué capacitación estás interesado?" (o equivalente correcto). | Observado: "Si" e "Indícanos que capacitación estas interesado" | N/A | Manual | P3 |
| 19 | TC-CON-EMP-011 | Formulario empresa - estructura | [REGRESION][P3] Los campos obligatorios tienen indicador visual | Valida la identificación visual de los campos obligatorios. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/contacto-empresa/ y esperar el campo "Nombre"<br>2) Leer el texto visible de cada etiqueta de campo obligatorio<br>3) Verificar un indicador visible (asterisco o texto "obligatorio") | Cada etiqueta obligatoria muestra un indicador visible. | N/A | N/A | Manual | P3 |
| 20 | TC-CON-EMP-012 | Cumplimiento y envío | [REGRESION][P3] El envío real muestra una confirmación | Camino feliz de envío; no ejecutable en producción. | Entorno de pruebas del sitio (no existe). | 1) Completar el formulario con datos sintéticos<br>2) Resolver el reCAPTCHA<br>3) Hacer clic en "Enviar"<br>4) Verificar el mensaje de confirmación del sitio | Mensaje de confirmación del sitio (no observado). | Datos sintéticos de `04-test-data.md` | N/A | Bloqueado | P3 |

### 9.1 Decisión de automatización y trazabilidad

| N | TC-ID | Etiqueta | Decisión | Motivo | Reglas (RN) | Flujos (FL) | Hallazgos | DEF / REC | Estado esperado en etapa 5 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-CON-FCO-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-001 | FL-CON-001 | - | - | `test()` (pasa) |
| 2 | TC-CON-FCO-002 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-002 | FL-CON-001 | - | - | `test()` (pasa) |
| 3 | TC-CON-FCO-003 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-004 | FL-CON-001 | - | - | `test()` (pasa) |
| 4 | TC-CON-FCO-004 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-003, RN-HOME-007 | FL-CON-001 | HC-17 | REC-TCH-013 (informativa) | `test()` (pasa) |
| 5 | TC-CON-FCO-005 | `@sanity` | Pendiente | RN-CON-005 pendiente de confirmación (pregunta abierta 3) y hoy falla (HC-12): recomendación. | RN-CON-005 | FL-CON-002 | HC-12 | REC-TCH-008 | `test.skip()` PENDING-SPEC (REC-TCH-008) |
| 6 | TC-CON-FCO-006 | `@regression` | Pendiente | RN-CON-006 es criterio SEO no confirmado como regla de negocio (HC-09): recomendación. | RN-CON-006 | - | HC-09 | REC-TCH-005 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| 7 | TC-CON-FCO-007 | `@regression` | Pendiente | Ninguna regla exige el enlace (HC-12): recomendación de usabilidad; se automatiza solo si el responsable lo eleva a regla. | Sin regla (relacionado RN-CON-004) | FL-CON-001 | HC-12 | REC-TCH-008 | `test.skip()` PENDING-SPEC (REC-TCH-008) |
| 8 | TC-CON-FCO-008 | `@regression` | Pendiente | Vista móvil no observada (PENDING-BROWSER): observar antes de automatizar (K12). | RN-HOME-015 | FL-CON-001 | - | - | `test.skip()` PENDING-BROWSER |
| 9 | TC-CON-EMP-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-007 | FL-CON-003 | - | - | `test()` (pasa) |
| 10 | TC-CON-EMP-002 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-008, RN-CON-012 | FL-CON-003 | - | - | `test()` (pasa) |
| 11 | TC-CON-EMP-003 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-008 | FL-CON-003 | - | - | `test()` (pasa) |
| 12 | TC-CON-EMP-004 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-009 | FL-CON-003 | - | - | `test()` (pasa) |
| 13 | TC-CON-EMP-005 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-010 | FL-CON-003 | - | - | `test()` (pasa) |
| 14 | TC-CON-EMP-006 | `@regression` | Pendiente | RN-CON-011 pendiente de confirmación (pregunta abierta 4) y hoy ambos son válidos (HC-13): recomendación. | RN-CON-011 | FL-CON-003 | HC-13 | REC-TCH-009 | `test.skip()` PENDING-SPEC (REC-TCH-009) |
| 15 | TC-CON-EMP-007 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-012 | FL-CON-003 | - | - | `test()` (pasa) |
| 16 | TC-CON-EMP-008 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-008 a RN-CON-012, RN-CON-016 | FL-CON-003 | - | - | `test()` (pasa) |
| 17 | TC-CON-EMP-009 | `@regression` | Pendiente | RN-CON-013 pendiente de confirmación (pregunta abierta 6) y hoy falla (HC-16): recomendación. | RN-CON-013 | FL-CON-003 | HC-16 | REC-TCH-012 | `test.skip()` PENDING-SPEC (REC-TCH-012) |
| 18 | TC-CON-EMP-010 | `@regression` | Pendiente | RN-CON-014 es criterio editorial no confirmado como regla de negocio (HC-14): recomendación. | RN-CON-014 | - | HC-14 | REC-TCH-010 | `test.skip()` PENDING-SPEC (REC-TCH-010) |
| 19 | TC-CON-EMP-011 | `@regression` | Pendiente | RN-CON-015 es buena práctica (WCAG 3.3.2 se cumple con el atributo `required` y la etiqueta): recomendación (HC-15). | RN-CON-015 | - | HC-15 | REC-TCH-011 | `test.skip()` PENDING-SPEC (REC-TCH-011) |
| 20 | TC-CON-EMP-012 | `@destructive` | Pendiente | Envío real prohibido en producción (S7, W9) y protegido por reCAPTCHA; requiere un entorno de pruebas que no existe. | RN-CON-016 | FL-CON-004 | - | - | `test.skip()` @destructive PENDING-BROWSER |

## 10. Matriz de Trazabilidad

Sin tareas ADO: la matriz se construye sobre reglas de negocio y hallazgos candidatos.

| Regla de negocio | N casos (tabla) |
|---|---|
| RN-CON-001 | 1 |
| RN-CON-002 | 2 |
| RN-CON-003 | 4 |
| RN-CON-004 | 3, 7 |
| RN-CON-005 | 5 |
| RN-CON-006 | 6 |
| RN-CON-007 | 9 |
| RN-CON-008 | 10, 11, 16 |
| RN-CON-009 | 12 |
| RN-CON-010 | 13 |
| RN-CON-011 | 14 |
| RN-CON-012 | 10, 15, 16 |
| RN-CON-013 | 17 |
| RN-CON-014 | 18 |
| RN-CON-015 | 19 |
| RN-CON-016 | 16, 20 |
| RN-HOME-007 | 4 |
| RN-HOME-015 | 8 |

| Hallazgo candidato | N casos (tabla) |
|---|---|
| HC-09 | 6 |
| HC-12 | 5, 7 |
| HC-13 | 14 |
| HC-14 | 18 |
| HC-15 | 19 |
| HC-16 | 17 |
| HC-17 | 4 |

## 11. Notas de automatización

- Specs en `qa/07-automation/e2e/tests/contacto/`, siguiendo la Constitución de `AGENTS.md` (K1-K12, W1-W11).
- Título `[TC-...] {título} @P#` y exactamente una etiqueta de tipo en `{ tag }` (K10); la etiqueta de cada caso está en la sección 9.1.
- Casos con DEF: `expectOpenDefect('DEF-TCH-NNN', ...)` con la aserción de la especificación, nunca invertida (reglas 8 y 10).
- Casos `Pendiente` por regla no confirmada: `test.skip()` con `PENDING-SPEC` y el ID de la recomendación en el mensaje; se reactivan al confirmarse la regla (con `test.fail()` + DEF si sigue fallando).
- Casos `@destructive`: `test.skip()` por defecto con el motivo en el mensaje (S7, W9).
- Aserciones de estructura y rutas; textos volátiles en `enums/` o `test-data/static/` (regla 7 del proyecto).
- Fixture base con el bloqueo de etiquetas de Google y page object del banner de cookies con la acción "Aceptar solo lo necesario".

## 12. Defectos y recomendaciones vinculados

| ID | Tipo | Título | Severidad | Hallazgo | Casos del módulo |
|---|---|---|---|---|---|
| REC-TCH-005 | Recomendación | Jerarquía de H1 inválida: múltiples H1, H1 vacíos o ausentes | Baja | HC-09 | TC-CON-FCO-006 |
| REC-TCH-008 | Recomendación | La página "Contacto" no tiene formulario y los correos no son enlaces | Media | HC-12 | TC-CON-FCO-005, TC-CON-FCO-007 |
| REC-TCH-009 | Recomendación | "Número de personas" acepta 0 y valores negativos | Baja | HC-13 | TC-CON-EMP-006 |
| REC-TCH-010 | Recomendación | Errores de ortografía en etiquetas del formulario empresa | Baja | HC-14 | TC-CON-EMP-010 |
| REC-TCH-011 | Recomendación | Campos obligatorios sin indicador visual | Baja | HC-15 | TC-CON-EMP-011 |
| REC-TCH-012 | Recomendación | Formularios sin enlace a la política de privacidad ni consentimiento | Media | HC-16 | TC-CON-EMP-009 |
| REC-TCH-013 | Recomendación | Perfiles sociales inconsistentes entre páginas | Baja | HC-17 | TC-CON-FCO-004 |

Detalle y criterio de clasificación: sección 11 del plan maestro, `qa/06-defects/open/` y `qa/06-defects/recommendations/`.
