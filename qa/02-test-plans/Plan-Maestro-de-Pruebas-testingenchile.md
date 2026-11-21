# Plan Maestro de Pruebas - Testing en Chile

| Campo | Valor |
|---|---|
| Proyecto | Testing en Chile (`testingenchile`) |
| Sitio bajo prueba | https://www.testingenchile.cl (Webnode CMS, producción, sin usuarios ni login) |
| Framework | `@keber/qa-framework` 1.14.0-rc.9 y harness agentic-playwright (Constitución de `AGENTS.md`) |
| Etapas cubiertas | 3 - Plan de Pruebas y 4 - Expansión de pasos |
| Fecha de planificación | 2026-11-21 |
| Ventana QA propuesta | 2026-11-23 y 2026-12-02 (Sprint 1) |
| Versión | 1.0 |
| Estado | Pendiente de aprobación |
| Insumos | `qa/01-specifications/ANALISIS-DE-PRUEBAS.md` y 12 sets de especificación (6 archivos por submódulo) |

---

## 1. Introducción y objetivos

Este plan define cómo se verifica la calidad del sitio público de Testing en Chile en su único ambiente (producción), con pruebas de solo lectura. Consolida la estrategia, los criterios y la planificación; el detalle de pasos de cada caso está en los cinco planes por módulo (sección 15).

| # | Objetivo | Medida de logro |
|---|---|---|
| O1 | Verificar las reglas de negocio confirmadas de los 5 módulos | 116 casos planificados con resultado esperado medible y trazabilidad a RN/FL |
| O2 | Construir una regresión automatizada de solo lectura | Casos `Automatizar` implementados en Playwright en la etapa 5 y ejecutados en verde (o `test.fail()` con defecto) |
| O3 | Documentar con evidencia cada incumplimiento | Defectos `DEF-TCH-NNN` para reglas confirmadas; recomendaciones `REC-TCH-NNN` para el resto (regla 8) |
| O4 | Proteger el negocio durante las pruebas | Cero envíos reales, cero compras, cero conversiones analíticas generadas por la automatización |
| O5 | Cerrar las reglas `PENDIENTE-CONFIRMACIÓN` | Preguntas abiertas respondidas por el responsable del sitio (sección 13) |

## 2. Alcance

### 2.1 En alcance

| Módulo | Código | Submódulos | Casos |
|---|---|---|---|
| Inicio y navegación global | HOME | navegacion (NAV), portada (POR) | 23 |
| Capacitaciones | CAP | catalogo (CAT), detalle-curso (CUR), bootcamp (BTC) | 27 |
| Eventos Testing Day | EVT | testing-day (TDY), ediciones (EDI) | 21 |
| Contacto y formularios | CON | formulario-contacto (FCO), contacto-empresa (EMP) | 20 |
| Contenido legal y blog | LEG | legales (LGL), blog (BLG), galeria (GAL) | 25 |
| **Total** | | **12** | **116** |

Tipos de prueba: funcional (navegación, filtros, cálculo, paginación), contenido y vigencia, integración por atributos o solicitudes HTTP (WhatsApp, Flow, ecopass, StreamYard, sponsors), negativa (validación en el cliente, 404, enlaces rotos), SEO, accesibilidad puntual (WCAG 1.1.1), cumplimiento (privacidad, consentimiento) y responsiva.

### 2.2 Fuera de alcance

| Exclusión | Motivo |
|---|---|
| Azure DevOps (planes, suites, bugs) | Integración deshabilitada en `qa/qa-framework.config.json` |
| Credenciales, login, panel de Webnode | El sitio no tiene usuarios; política `env-vars-only` sin secretos necesarios |
| Envío real de formularios, pagos, compra de entradas, WhatsApp o correo | Producción es el único ambiente (S7, W9); reCAPTCHA en todos los formularios |
| Pruebas de carga, estrés o rendimiento | Prohibidas contra producción; `robots.txt` declara `Crawl-delay: 10` |
| Pruebas de seguridad ofensivas | Política de la organización: se derivan al proceso formal de seguridad |
| Auditoría WCAG completa y evaluación jurídica | Se cubren controles puntuales; lo legal lo valida el área legal |
| Navegadores distintos de Chromium y dispositivos reales | `browsers: ["chromium"]` en la configuración |

## 3. Estrategia de pruebas

### 3.1 Enfoque por pista

| Pista | Qué cubre | Herramienta | Cuándo |
|---|---|---|---|
| Automatizada E2E de solo lectura | Casos `Automatizar`: deterministas, observables en el navegador o por HTTP, sin efectos | Playwright + TypeScript en `qa/07-automation/e2e/`, Chromium | Etapa 5; smoke en cada ejecución, regresión completa por sprint |
| Manual | Casos `Manual` (revisión de contenido legal, evidencia analítica única) y casos `Pendiente` por regla no confirmada (ejecución exploratoria para mantener la evidencia de las recomendaciones) | Navegador real, captura de red, checklist del plan | Timebox manual del sprint |
| Bloqueada | `PENDING-BROWSER` (comportamiento no observado) y `@destructive` (envío real) | Navegador real; entorno de pruebas inexistente | Al observar el comportamiento o al disponer de staging |

### 3.2 Criterio de decisión de automatización

| Decisión | Criterio | Estado esperado en etapa 5 |
|---|---|---|
| Automatizar | Regla confirmada (`OBSERVADO` o `ESTÁNDAR` normativo); determinista; solo lectura | `test()` si cumple; `test.fail()` vía `expectOpenDefect` + `DEF-TCH-NNN` si incumple |
| Manual | Requiere criterio humano o su ejecución produce efectos reales en terceros | Fuera de la suite automatizada |
| Pendiente | Regla `PENDIENTE-CONFIRMACIÓN` o criterio editorial/SEO no confirmado que hoy falla; comportamiento no observado; envío destructivo | `test.skip()` con `PENDING-SPEC`, `PENDING-BROWSER` o `@destructive` y su motivo |

### 3.3 Criterio de clasificación de hallazgos (regla 8 del framework)

| Origen de la regla | Ejemplos | Clasificación si se incumple |
|---|---|---|
| `OBSERVADO` | RN-EVT-008 (cada sesión ofrece inscripción) | Defecto `DEF-TCH-NNN` + `test.fail()` |
| `ESTÁNDAR` normativo (WCAG 2.1 nivel A con criterio verificable; enlace que debe resolver) | RN-HOME-012, RN-LEG-017 (WCAG 1.1.1); RN-EVT-009, RN-EVT-015 (enlaces operativos) | Defecto `DEF-TCH-NNN` + `test.fail()` |
| `ESTÁNDAR` editorial o SEO (buenas prácticas sin norma obligatoria) | RN-HOME-020 (un H1), RN-CAP-006, RN-CON-006, RN-CON-014, RN-CON-015, RN-EVT-012, RN-LEG-006, RN-LEG-012, RN-LEG-016 | Recomendación `REC-TCH-NNN`; el caso queda `Pendiente` (PENDING-SPEC) si hoy falla, hasta que el responsable eleve el criterio a regla |
| `PENDIENTE-CONFIRMACIÓN` | RN-CAP-016, RN-EVT-010, RN-CON-005, RN-LEG-002 a RN-LEG-005 | Recomendación o pregunta abierta, nunca defecto |
| Sin regla | HC-18, HC-19, HC-21 | Recomendación |

Este criterio aplica la decisión ya registrada en el análisis (RN-HOME-020: "clasificar como recomendación salvo que el responsable lo eleve a regla") de forma uniforme a todas las reglas editoriales y SEO.

### 3.4 Etiquetas de tipo

| Etiqueta | Uso | Casos |
|---|---|---|
| `@smoke` | P0: disponibilidad de cada submódulo | 13 |
| `@sanity` | P1: funcionalidad principal dentro de una página | 43 |
| `@e2e` | Recorridos multipágina (menú, hero, agenda, sponsors, blog, edición 2025) | 5 |
| `@regression` | P2 y P3: funcionalidad secundaria, enlaces, SEO, accesibilidad, responsividad | 53 |
| `@destructive` | Envíos reales; siempre `test.skip()` en producción (W9) | 2 |

### 3.5 Técnicas y controles transversales

- Validación de formularios sin envío: `checkValidity()`, `validity.valid` y `validationMessage` no vacío (los mensajes nativos dependen del idioma).
- Integraciones verificadas por atributos (`href`, `target`) o por solicitudes HTTP con el fixture `request`, sin hacer clic.
- Enlaces externos: 999, 400 y 403 se clasifican como "no verificable" (anti-bot) y se reverifican manualmente antes de declarar un defecto.
- Datos volátiles: aserciones de estructura, formato y relación de orden; literales en `enums/` y `test-data/static/`.
- Bloqueo de `googlesyndication.com`, `googleadservices.com` y `googletagmanager.com` con `page.route` en el fixture base de toda la suite.

## 4. Criterios de entrada, salida, suspensión y reanudación

### 4.1 Criterios de entrada

| # | Criterio | Estado al 2026-11-21 |
|---|---|---|
| E1 | Etapas 1-2 completas: 12 submódulos con 6 archivos de especificación | Cumplido |
| E2 | Plan de Pruebas (este documento y los 5 planes por módulo) aprobado | Pendiente de aprobación |
| E3 | Ambiente Playwright instalado (Chromium) en `qa/07-automation/e2e` | Cumplido (Playwright 1.65.1) |
| E4 | Fixture base con bloqueo de etiquetas de Google y page object del banner de cookies | Pendiente (etapa 5) |
| E5 | Sitio disponible (HTTP 200 en `/`) | Cumplido (verificado el 2026-11-21) |
| E6 | Ningún caso `PENDING-CODE` en el alcance (prerrequisito de la etapa 5) | Cumplido (0 casos) |

### 4.2 Criterios de salida (regla 8 del framework)

El sprint se cierra cuando todos los casos del alcance están en uno de estos estados y en ningún otro:

| Estado | Condición |
|---|---|
| `test()` en verde | El sitio cumple la especificación |
| `test.fail()` | El sitio incumple una regla confirmada y existe `qa/06-defects/open/DEF-TCH-NNN_*.md` |
| `test.skip()` | Caso no ejecutable con su motivo: `PENDING-SPEC` (regla no confirmada, con su `REC-TCH-NNN`), `PENDING-BROWSER` (no observado) o `@destructive` (envío real) |

Además: 100 % de los P0 ejecutados; cero fallos sin `test.fail()`; cero `test.fail()` sin archivo de defecto; lint, typecheck y escaneo de la Constitución limpios; verificadores de codificación con salida 0; casos manuales ejecutados y registrados en `qa/05-test-execution/`.

> Nota de conciliación: la regla 8 menciona `PENDING-CODE` para `test.skip()`. Este proyecto no tiene código propio (CMS de terceros), por lo que `AGENTS.md` admite también `PENDING-BROWSER` y `PENDING-SPEC` con motivo explícito.

### 4.3 Suspensión y reanudación

| Condición de suspensión | Acción | Reanudación |
|---|---|---|
| Sitio no disponible o con errores 5xx generalizados | Detener la ejecución; registrar `InfraError` | Al volver a responder 200 de forma estable |
| Bloqueo por límite de tasa o anti-bot del propio sitio | Detener; revisar workers y ritmo | Con workers <= 2 y ejecución secuencial |
| Cualquier indicio de envío real, compra o conversión generada | Detener inmediatamente y avisar al responsable | Tras corregir la causa y revisar el PR con el rubric |
| Cambio estructural del CMS (deriva masiva de selectores) | Pasar a mantenimiento (`/qa-maintenance`) | Tras actualizar page objects |

## 5. Ambientes y herramientas

| Elemento | Valor |
|---|---|
| Ambiente | Producción pública: `{QA_BASE_URL}` = https://www.testingenchile.cl (no existe staging) |
| Navegador | Chromium (Playwright 1.65.1), headless en CI |
| Viewports | Escritorio 1366x900 (y 1920x1000 de referencia); móvil Pixel 5 (393 px) |
| Paralelismo | Workers: 2 local, 1 CI (máximo 2 por S7) |
| Reintentos | 0 local, 2 CI |
| Tiempos límite | Test 30 s; navegación 60 s; acción 10 s |
| CDN | Recursos de Webnode servidos desde `*.clvaw-cdnwnd.com` (CloudFront); latencia variable |
| Repositorio de evidencias | `qa/07-automation/e2e/diagnosis/` (no versionado) y `qa/05-test-execution/` |
| Gestión de defectos | Archivos en `qa/06-defects/` (sin tracker externo) |

## 6. Riesgos y mitigaciones

| ID | Riesgo | Impacto | Probabilidad | Mitigación |
|---|---|---|---|---|
| R1 | Volatilidad del contenido de eventos y marketing (fechas, agenda, sponsors, cursos, contadores) | Falsos negativos y mantenimiento frecuente | Alta | Aserciones de estructura; literales en `enums/` y `test-data/static/`; el healer lo clasifica como deriva de datos, no como defecto |
| R2 | Producción como único ambiente: envío accidental de formularios, compras o mensajes | Datos basura para el negocio o cargos reales | Media | S7 y W9: `@destructive` + `test.skip()`; nunca clic en enviar o pagar; revisión de PR |
| R3 | Etiquetas de terceros: el autodiagnóstico dispara una conversión "purchase" de Google Ads (HC-21) | Métricas comerciales distorsionadas por las pruebas | Alta (observado) | Abortar `googlesyndication.com`, `googleadservices.com` y `googletagmanager.com` con `page.route` en el fixture base; TC-CAP-BTC-008 solo manual y una vez |
| R4 | Bloqueos anti-bot en enlaces externos (LinkedIn 999, Facebook 400, sitios 403) | Falsos positivos de enlace roto | Alta | Clasificar como "no verificable"; reverificación manual antes de declarar defecto |
| R5 | CDN de Webnode y cambios del CMS sin aviso (estructura, clases, latencia de recursos) | Deriva de selectores y tiempos de carga variables | Media | Selectores por rol y etiqueta (K3); esperas web-first; tiempos límite de la sección 5; smoke programado |
| R6 | reCAPTCHA y ausencia de staging | Caminos exitosos de formularios no verificables | Cierta | Casos `@destructive` documentados; solicitar staging si se requiere cobertura |
| R7 | Incumplimiento normativo de privacidad y condiciones (HC-01, HC-02, HC-16) | Riesgo legal y reputacional | Alta (observado) | REC-TCH-001, REC-TCH-002 y REC-TCH-012 escalados a negocio y área legal |
| R8 | Límite de tasa del sitio (`Crawl-delay: 10`) | Bloqueo o degradación | Baja | Workers <= 2; CI secuencial; sin crawling masivo |
| R9 | Diferencias entre Chromium headless y navegadores reales (hover, animaciones) | Casos no reproducibles | Media | Casos `PENDING-BROWSER` confirmados en navegador real antes de automatizar |
| R10 | Reglas sin confirmar por falta de un responsable funcional | Recomendaciones que no pueden escalar a defecto | Alta | Preguntas abiertas de la sección 13 con responsable y fecha objetivo |

## 7. Cronograma

| Actividad | Etapa | Inicio | Fin | Entregable |
|---|---|---|---|---|
| Plan de pruebas y expansión de pasos | 3-4 | 2026-11-21 | 2026-11-21 | Este plan, 5 planes por módulo, DEF y REC |
| Aprobación del plan y respuesta a preguntas abiertas | 3 (cierre) | 2026-11-23 | 2026-11-24 | Plan aprobado; reglas confirmadas o descartadas |
| Fixture base, page objects y smoke (P0) | 5 | 2026-11-23 | 2026-11-25 | 13 casos P0 (`@smoke`) en verde |
| Automatización P1 y P2/P3 `Automatizar` | 5 | 2026-11-25 | 2026-11-30 | Specs por módulo; `test.fail()` con DEF |
| Ejecución manual (timebox de 2 días) | 5 | 2026-12-01 | 2026-12-02 | Registro en `qa/05-test-execution/` |
| Estabilización y cierre del sprint | 5b | 2026-12-02 | 2026-12-02 | Informe de ejecución; criterios de salida cumplidos |

> Fechas propuestas según `sprintDurationDays: 8` y `manualTestingTimeboxDays: 2` de la configuración; sujetas a aprobación.

## 8. Roles y responsabilidades

| Rol | Responsabilidades |
|---|---|
| Líder QA | Aprueba el plan, prioriza, valida la clasificación DEF/REC y el cierre del sprint |
| Analista QA | Mantiene especificaciones y plan; ejecuta la pista manual; registra evidencias |
| Automatizador QA | Implementa la etapa 5 según la Constitución; mantiene la suite verde o con `test.fail()` documentado |
| Responsable del sitio (Testing en Chile) | Responde las preguntas abiertas; confirma o descarta reglas; corrige el contenido en Webnode |
| Área legal | Valida HC-01, HC-02 y HC-16 (REC-TCH-001, REC-TCH-002, REC-TCH-012) |
| Seguridad | Evalúa la observación pasiva de cabeceras HTTP (sección 11.3) por el proceso formal |

## 9. Resumen del universo de pruebas

### 9.1 Casos por módulo y prioridad

| Módulo | P0 | P1 | P2 | P3 | Total |
|---|---|---|---|---|---|
| HOME | 3 | 10 | 8 | 2 | 23 |
| CAP | 3 | 12 | 8 | 4 | 27 |
| EVT | 2 | 7 | 7 | 5 | 21 |
| CON | 2 | 8 | 5 | 5 | 20 |
| LEG | 3 | 8 | 7 | 7 | 25 |
| **Total** | **13** | **45** | **35** | **23** | **116** |

### 9.2 Decisión de automatización por prioridad

| Decisión | P0 | P1 | P2 | P3 | Total |
|---|---|---|---|---|---|
| Automatizar | 13 | 39 | 26 | 6 | 84 |
| Manual | 0 | 1 | 0 | 1 | 2 |
| Pendiente | 0 | 5 | 9 | 16 | 30 |
| **Total** | **13** | **45** | **35** | **23** | **116** |

### 9.3 Decisión de automatización por módulo

| Módulo | Automatizar | Manual | Pendiente | Total |
|---|---|---|---|---|
| HOME | 20 | 0 | 3 | 23 |
| CAP | 21 | 1 | 5 | 27 |
| EVT | 16 | 0 | 5 | 21 |
| CON | 11 | 0 | 9 | 20 |
| LEG | 16 | 1 | 8 | 25 |
| **Total** | **84** | **2** | **30** | **116** |

### 9.4 Estado esperado al cierre de la etapa 5

| Estado | Casos |
|---|---|
| `test()` (pasa) | 75 |
| `test.skip()` PENDING-BROWSER | 4 |
| `test.fail()` + DEF | 9 |
| `test.skip()` PENDING-SPEC + REC | 24 |
| `test.skip()` @destructive | 2 |
| Ejecución manual | 2 |
| **Total** | **116** |

## 10. Tabla consolidada de casos

Pasos, precondiciones, resultado esperado y datos de prueba de cada caso: sección 9 del plan del módulo correspondiente.

| N | TC-ID | Título | Prioridad | Etiqueta | Decisión | Motivo | RN / FL | Hallazgo | DEF / REC | Estado etapa 5 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-HOME-NAV-001 | La página de inicio carga con header, menú y footer | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-001, RN-HOME-006; FL-HOME-001 | - | - | `test()` (pasa) |
| 2 | TC-HOME-NAV-002 | El menú principal muestra los seis ítems y cada uno navega a su ruta | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-001; FL-HOME-001 | - | - | `test()` (pasa) |
| 3 | TC-HOME-NAV-003 | El submenú de Testing Day se despliega al pasar el puntero | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-002; FL-HOME-001 | - | - | `test()` (pasa) |
| 4 | TC-HOME-NAV-004 | El tercer nivel de "Ediciones anteriores" muestra las ediciones pasadas | P2 | `@regression` | Pendiente | El despliegue por hover no se observó en headless (pregunta abierta 10); RN-HOME-003 pendiente de confirmación. Observar en navegador real (K12) antes de automatizar. | RN-HOME-003; FL-HOME-001 | - | - | `test.skip()` PENDING-BROWSER |
| 5 | TC-HOME-NAV-005 | El menú móvil se abre, expande el submenú y se cierra | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-004; FL-HOME-002 | - | - | `test()` (pasa) |
| 6 | TC-HOME-NAV-006 | El banner de cookies acepta solo lo necesario y la elección persiste | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-008; FL-HOME-003 | - | - | `test()` (pasa) |
| 7 | TC-HOME-NAV-007 | El enlace "Cookies" del footer reabre el banner | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-009; FL-HOME-003 | - | - | `test()` (pasa) |
| 8 | TC-HOME-NAV-008 | El footer muestra contacto, redes y enlaces legales operativos | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-006, RN-HOME-007; FL-HOME-001 | - | - | `test()` (pasa) |
| 9 | TC-HOME-NAV-009 | Los enlaces de contacto rápido apuntan a destinos válidos | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-005, RN-HOME-010 | - | - | `test()` (pasa) |
| 10 | TC-HOME-NAV-010 | Una ruta inexistente responde 404 con navegación | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-011; FL-HOME-004 | - | - | `test()` (pasa) |
| 11 | TC-HOME-NAV-011 | Las variantes de dominio redirigen con 301 a la URL canónica | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-014 | - | - | `test()` (pasa) |
| 12 | TC-HOME-NAV-012 | El logo del header tiene texto alternativo | P2 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-004. | RN-HOME-012 | HC-08 | DEF-TCH-004 | `test.fail()` + DEF-TCH-004 |
| 13 | TC-HOME-NAV-013 | Los perfiles sociales son consistentes entre páginas | P3 | `@regression` | Pendiente | RN-HOME-013 pendiente de confirmación y hoy difiere (HC-17): no puede ser `test.fail()`. Ejecución manual hasta confirmar. | RN-HOME-013 | HC-17 | REC-TCH-013 | `test.skip()` PENDING-SPEC (REC-TCH-013) |
| 14 | TC-HOME-NAV-014 | La página de inicio no desborda horizontalmente en móvil | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-015; FL-HOME-002 | - | - | `test()` (pasa) |
| 15 | TC-HOME-POR-001 | Los CTAs del hero llevan al catálogo y al Bootcamp | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-016; FL-HOME-005 | - | - | `test()` (pasa) |
| 16 | TC-HOME-POR-002 | Los contadores muestran cifras mayores que cero tras hacer scroll | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-017; FL-HOME-005 | - | - | `test()` (pasa) |
| 17 | TC-HOME-POR-003 | Los CTAs de "Nuestros Servicios" apuntan al destino correcto | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-018; FL-HOME-005 | - | - | `test()` (pasa) |
| 18 | TC-HOME-POR-004 | Las capacitaciones destacadas enlazan a páginas de curso existentes | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-019; FL-HOME-005, FL-HOME-006 | - | - | `test()` (pasa) |
| 19 | TC-HOME-POR-005 | Las secciones de testimonios y partners están presentes | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-019 (estructura de portada, inventario); FL-HOME-005 | - | - | `test()` (pasa) |
| 20 | TC-HOME-POR-006 | Los logos de partners tienen texto alternativo | P2 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-005. | RN-HOME-012 | HC-08 | DEF-TCH-005 | `test.fail()` + DEF-TCH-005 |
| 21 | TC-HOME-POR-007 | La portada declara metadatos SEO completos | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-021 | - | - | `test()` (pasa) |
| 22 | TC-HOME-POR-008 | La portada tiene un único H1 | P3 | `@regression` | Pendiente | RN-HOME-020 es criterio SEO no confirmado como regla de negocio (hoy 5 H1, HC-09): recomendación, no `test.fail()`. | RN-HOME-020 | HC-09 | REC-TCH-005 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| 23 | TC-HOME-POR-009 | Los CTAs del hero son visibles y operables en móvil | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-HOME-016, RN-HOME-015; FL-HOME-005 | - | - | `test()` (pasa) |
| 24 | TC-CAP-CAT-001 | El catálogo carga con tarjetas y enlaces "Saber más" | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-001; FL-CAP-001 | - | - | `test()` (pasa) |
| 25 | TC-CAP-CAT-002 | Todos los "Saber más" responden HTTP 200 | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-004; FL-CAP-001, FL-CAP-003 | - | - | `test()` (pasa) |
| 26 | TC-CAP-CAT-003 | El filtro "Certificaciones" muestra solo tarjetas con insignia "Certificación" | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-003; FL-CAP-001 | - | - | `test()` (pasa) |
| 27 | TC-CAP-CAT-004 | Cada filtro reduce la lista y "Todos" la restaura | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-002; FL-CAP-001 | - | - | `test()` (pasa) |
| 28 | TC-CAP-CAT-005 | Los enlaces "Saber más" abren en pestaña nueva | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-004, RN-HOME-007; FL-CAP-001 | - | - | `test()` (pasa) |
| 29 | TC-CAP-CAT-006 | El botón "Hablemos" apunta a WhatsApp | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-005; FL-CAP-002 | HC-18 | REC-TCH-014 (informativa) | `test()` (pasa) |
| 30 | TC-CAP-CAT-007 | El catálogo tiene un H1 y un título descriptivo | P3 | `@regression` | Pendiente | RN-CAP-006 es criterio SEO no confirmado como regla de negocio (hoy sin H1, título "Capacitaciones"): recomendación. | RN-CAP-006 | HC-09, HC-10 | REC-TCH-005, REC-TCH-006 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-006) |
| 31 | TC-CAP-CAT-008 | Las imágenes del catálogo tienen texto alternativo | P3 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-005. | RN-HOME-012 | HC-08 | DEF-TCH-005 | `test.fail()` + DEF-TCH-005 |
| 32 | TC-CAP-CAT-009 | Filtros y tarjetas son usables en móvil | P2 | `@regression` | Pendiente | Vista móvil del catálogo no observada (PENDING-BROWSER): observar antes de automatizar (K12). | RN-CAP-002, RN-HOME-015; FL-CAP-001 | - | - | `test.skip()` PENDING-BROWSER |
| 33 | TC-CAP-CUR-001 | Las páginas de curso del catálogo cargan con título y H1 | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-007; FL-CAP-001 | - | - | `test()` (pasa) |
| 34 | TC-CAP-CUR-002 | El formulario de consulta muestra sus campos y obligatoriedad | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-008; FL-CAP-004 | - | - | `test()` (pasa) |
| 35 | TC-CAP-CUR-003 | El formulario vacío es inválido sin enviarlo | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-008; FL-CAP-004 | - | - | `test()` (pasa) |
| 36 | TC-CAP-CUR-004 | El formulario completo con datos sintéticos es válido en el cliente | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-008, RN-CAP-009, RN-CAP-010, RN-CAP-011; FL-CAP-004 | - | - | `test()` (pasa) |
| 37 | TC-CAP-CUR-005 | Un e-mail sin "@" es rechazado por la validación | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-009; FL-CAP-004 | - | - | `test()` (pasa) |
| 38 | TC-CAP-CUR-006 | El celular rechaza letras | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-010; FL-CAP-004 | - | - | `test()` (pasa) |
| 39 | TC-CAP-CUR-007 | En AiU el asunto es obligatorio y ofrece tres opciones | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-012; FL-CAP-004 | - | - | `test()` (pasa) |
| 40 | TC-CAP-CUR-008 | El botón de pago apunta a la pasarela externa en pestaña nueva | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-014; FL-CAP-005 | - | - | `test()` (pasa) |
| 41 | TC-CAP-CUR-009 | El consentimiento enlaza a la política de privacidad | P2 | `@regression` | Pendiente | RN-CAP-015 pendiente de confirmación y hoy no hay enlace (HC-16): recomendación hasta confirmar. | RN-CAP-015; FL-CAP-004 | HC-16 | REC-TCH-012 | `test.skip()` PENDING-SPEC (REC-TCH-012) |
| 42 | TC-CAP-CUR-010 | El envío real del formulario de consulta muestra confirmación | P3 | `@destructive` | Pendiente | Envío real prohibido en producción (S7, W9) y protegido por reCAPTCHA; requiere un entorno de pruebas que no existe. | RN-CAP-008, RN-CAP-013; FL-CAP-004 | - | - | `test.skip()` @destructive PENDING-BROWSER |
| 43 | TC-CAP-BTC-001 | La landing del Bootcamp carga con hero y CTAs | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-017; FL-CAP-006 | - | - | `test()` (pasa) |
| 44 | TC-CAP-BTC-002 | Las anclas del hero llevan a su sección | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-017; FL-CAP-006 | - | - | `test()` (pasa) |
| 45 | TC-CAP-BTC-003 | El autodiagnóstico sin respuestas no muestra resultado | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-018; FL-CAP-006 | - | - | `test()` (pasa) |
| 46 | TC-CAP-BTC-004 | El autodiagnóstico clasifica según el puntaje | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-019; FL-CAP-006 | - | - | `test()` (pasa) |
| 47 | TC-CAP-BTC-005 | La fecha de próximo inicio no está vencida | P1 | `@sanity` | Pendiente | RN-CAP-016 pendiente de confirmación (pregunta abierta 2) y hoy falla (HC-05): no puede ser `test.fail()`. | RN-CAP-016 | HC-05 | REC-TCH-004 | `test.skip()` PENDING-SPEC (REC-TCH-004) |
| 48 | TC-CAP-BTC-006 | Las preguntas frecuentes se expanden al hacer clic | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-020 | - | - | `test()` (pasa) |
| 49 | TC-CAP-BTC-007 | Los CTAs de WhatsApp y correo apuntan a destinos válidos | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CAP-021; FL-CAP-007 | - | - | `test()` (pasa) |
| 50 | TC-CAP-BTC-008 | El autodiagnóstico no dispara conversiones de compra | P3 | `@regression` | Manual | Ejecutarlo dispara una conversión real de Google Ads (HC-21): no se automatiza; ejecución manual única para evidencia, con aprobación del responsable. | Sin regla de negocio (calidad de datos); FL-CAP-006 | HC-21 | REC-TCH-017 | Fuera de la suite automatizada (ejecución manual) |
| 51 | TC-EVT-TDY-001 | La página del evento carga con edición, fechas, sede y CTAs | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-001; FL-EVT-001 | - | - | `test()` (pasa) |
| 52 | TC-EVT-TDY-002 | Los CTAs de entrada apuntan a ecopass en pestaña nueva | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-002; FL-EVT-001 | - | - | `test()` (pasa) |
| 53 | TC-EVT-TDY-003 | "Convertirse en Sponsor" desplaza a la sección de sponsors | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-003; FL-EVT-001 | - | - | `test()` (pasa) |
| 54 | TC-EVT-TDY-004 | La agenda presencial muestra bloques con horario y título | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-004; FL-EVT-001 | - | - | `test()` (pasa) |
| 55 | TC-EVT-TDY-005 | "Ver Agenda Completa e Inscribirse" lleva a Agenda Online | P1 | `@e2e` | Automatizar | Determinista; flujo multipágina, solo lectura. | RN-EVT-005; FL-EVT-001 | - | - | `test()` (pasa) |
| 56 | TC-EVT-TDY-006 | La Agenda Online lista sesiones con inscripción | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-008; FL-EVT-001 | - | - | `test()` (pasa) |
| 57 | TC-EVT-TDY-007 | Los enlaces "Inscribirse" de la Agenda Online responden | P2 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-002. | RN-EVT-008, RN-EVT-009; FL-EVT-001 | HC-06 | DEF-TCH-002 | `test.fail()` + DEF-TCH-002 |
| 58 | TC-EVT-TDY-008 | Los sponsors se muestran por nivel y enlazan a la página de sponsors | P2 | `@e2e` | Automatizar | Determinista; flujo multipágina, solo lectura. | RN-EVT-006, RN-EVT-011; FL-EVT-001 | - | - | `test()` (pasa) |
| 59 | TC-EVT-TDY-009 | Los logos de sponsors, comunidades y hoteles enlazan a dominios operativos | P2 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-003. | RN-EVT-009; FL-EVT-001 | HC-07 | DEF-TCH-003 | `test.fail()` + DEF-TCH-003 |
| 60 | TC-EVT-TDY-010 | Tras el evento no se ofrecen CTAs de compra | P1 | `@sanity` | Pendiente | RN-EVT-010 pendiente de confirmación (pregunta abierta 1) y hoy falla (HC-04): no puede ser `test.fail()`. | RN-EVT-010; FL-EVT-002 | HC-04 | REC-TCH-003 | `test.skip()` PENDING-SPEC (REC-TCH-003) |
| 61 | TC-EVT-TDY-011 | El brochure de sponsors se solicita por correo con asunto | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-007 | - | - | `test()` (pasa) |
| 62 | TC-EVT-TDY-012 | Las páginas del evento tienen título, description y H1 coherentes | P3 | `@regression` | Pendiente | RN-EVT-012 es criterio editorial y SEO no confirmado como regla de negocio; hoy falla (HC-09, HC-10, HC-11, HC-20): recomendación. | RN-EVT-012 | HC-09, HC-10, HC-11, HC-20 | REC-TCH-005, REC-TCH-006, REC-TCH-007, REC-TCH-016 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-006, REC-TCH-007, REC-TCH-016) |
| 63 | TC-EVT-EDI-001 | La página de ediciones anteriores carga con sus bloques | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-013; FL-EVT-003 | - | - | `test()` (pasa) |
| 64 | TC-EVT-EDI-002 | Todas las páginas del submenú "Ediciones anteriores" responden 200 | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-014; FL-EVT-003 | - | - | `test()` (pasa) |
| 65 | TC-EVT-EDI-003 | Los enlaces internos de la página de ediciones no devuelven 404 | P1 | `@sanity` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-001. | RN-EVT-015; FL-EVT-004 | HC-03 | DEF-TCH-001 | `test.fail()` + DEF-TCH-001 |
| 66 | TC-EVT-EDI-004 | El título de cada página de edición contiene su año | P2 | `@regression` | Pendiente | RN-EVT-016 pendiente de confirmación y hoy falla `/entrevistas-sponsors-2021/` (HC-10): recomendación. | RN-EVT-016; FL-EVT-003 | HC-10 | REC-TCH-006 | `test.skip()` PENDING-SPEC (REC-TCH-006) |
| 67 | TC-EVT-EDI-005 | La edición 2025 enlaza a sus sponsors y muestra el video | P2 | `@e2e` | Automatizar | Determinista; flujo multipágina, solo lectura. | RN-EVT-017; FL-EVT-003 | - | - | `test()` (pasa) |
| 68 | TC-EVT-EDI-006 | Los enlaces externos de resumen de ediciones responden | P3 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-EVT-009; FL-EVT-003 | - | - | `test()` (pasa) |
| 69 | TC-EVT-EDI-007 | "Ver detalles de la edición más reciente" apunta a la última edición | P3 | `@regression` | Pendiente | RN-EVT-018 pendiente de confirmación y hoy falla (HC-22): recomendación. | RN-EVT-018; FL-EVT-003 | HC-22 | REC-TCH-018 | `test.skip()` PENDING-SPEC (REC-TCH-018) |
| 70 | TC-EVT-EDI-008 | Las páginas de edición tienen un único H1 con texto | P3 | `@regression` | Pendiente | RN-HOME-020 es criterio SEO no confirmado como regla de negocio; hoy fallan varias (HC-09): recomendación. | RN-HOME-020 | HC-09 | REC-TCH-005 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| 71 | TC-EVT-EDI-009 | Las imágenes de las páginas de edición tienen texto alternativo | P3 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-005. | RN-HOME-012 | HC-08 | DEF-TCH-005 | `test.fail()` + DEF-TCH-005 |
| 72 | TC-CON-FCO-001 | El ítem "Contacto" lleva a la página de contacto | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-001; FL-CON-001 | - | - | `test()` (pasa) |
| 73 | TC-CON-FCO-002 | El CTA de WhatsApp apunta a una conversación prellenada | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-002; FL-CON-001 | - | - | `test()` (pasa) |
| 74 | TC-CON-FCO-003 | Los correos por tipo de consulta están visibles | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-004; FL-CON-001 | - | - | `test()` (pasa) |
| 75 | TC-CON-FCO-004 | Las redes sociales de la página abren en pestaña nueva | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-003, RN-HOME-007; FL-CON-001 | HC-17 | REC-TCH-013 (informativa) | `test()` (pasa) |
| 76 | TC-CON-FCO-005 | La página de contacto ofrece un formulario | P1 | `@sanity` | Pendiente | RN-CON-005 pendiente de confirmación (pregunta abierta 3) y hoy falla (HC-12): recomendación. | RN-CON-005; FL-CON-002 | HC-12 | REC-TCH-008 | `test.skip()` PENDING-SPEC (REC-TCH-008) |
| 77 | TC-CON-FCO-006 | La página de contacto declara metadatos y un único H1 | P3 | `@regression` | Pendiente | RN-CON-006 es criterio SEO no confirmado como regla de negocio (HC-09): recomendación. | RN-CON-006 | HC-09 | REC-TCH-005 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| 78 | TC-CON-FCO-007 | Los correos del footer son enlaces `mailto:` | P3 | `@regression` | Pendiente | Ninguna regla exige el enlace (HC-12): recomendación de usabilidad; se automatiza solo si el responsable lo eleva a regla. | Sin regla (relacionado RN-CON-004); FL-CON-001 | HC-12 | REC-TCH-008 | `test.skip()` PENDING-SPEC (REC-TCH-008) |
| 79 | TC-CON-FCO-008 | La página de contacto es usable en móvil | P2 | `@regression` | Pendiente | Vista móvil no observada (PENDING-BROWSER): observar antes de automatizar (K12). | RN-HOME-015; FL-CON-001 | - | - | `test.skip()` PENDING-BROWSER |
| 80 | TC-CON-EMP-001 | El formulario empresa carga con su H1 | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-007; FL-CON-003 | - | - | `test()` (pasa) |
| 81 | TC-CON-EMP-002 | El formulario muestra sus seis campos obligatorios | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-008, RN-CON-012; FL-CON-003 | - | - | `test()` (pasa) |
| 82 | TC-CON-EMP-003 | El formulario vacío es inválido sin enviarlo | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-008; FL-CON-003 | - | - | `test()` (pasa) |
| 83 | TC-CON-EMP-004 | Un email sin "@" es inválido | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-009; FL-CON-003 | - | - | `test()` (pasa) |
| 84 | TC-CON-EMP-005 | "Número de personas" no admite letras | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-010; FL-CON-003 | - | - | `test()` (pasa) |
| 85 | TC-CON-EMP-006 | "Número de personas" rechaza cero y negativos | P2 | `@regression` | Pendiente | RN-CON-011 pendiente de confirmación (pregunta abierta 4) y hoy ambos son válidos (HC-13): recomendación. | RN-CON-011; FL-CON-003 | HC-13 | REC-TCH-009 | `test.skip()` PENDING-SPEC (REC-TCH-009) |
| 86 | TC-CON-EMP-007 | Código Sence es obligatorio con tres opciones | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-012; FL-CON-003 | - | - | `test()` (pasa) |
| 87 | TC-CON-EMP-008 | El formulario completo con datos sintéticos es válido en el cliente | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-CON-008 a RN-CON-012, RN-CON-016; FL-CON-003 | - | - | `test()` (pasa) |
| 88 | TC-CON-EMP-009 | El formulario informa la política de privacidad | P2 | `@regression` | Pendiente | RN-CON-013 pendiente de confirmación (pregunta abierta 6) y hoy falla (HC-16): recomendación. | RN-CON-013; FL-CON-003 | HC-16 | REC-TCH-012 | `test.skip()` PENDING-SPEC (REC-TCH-012) |
| 89 | TC-CON-EMP-010 | Las etiquetas del formulario tienen ortografía correcta | P3 | `@regression` | Pendiente | RN-CON-014 es criterio editorial no confirmado como regla de negocio (HC-14): recomendación. | RN-CON-014 | HC-14 | REC-TCH-010 | `test.skip()` PENDING-SPEC (REC-TCH-010) |
| 90 | TC-CON-EMP-011 | Los campos obligatorios tienen indicador visual | P3 | `@regression` | Pendiente | RN-CON-015 es buena práctica (WCAG 3.3.2 se cumple con el atributo `required` y la etiqueta): recomendación (HC-15). | RN-CON-015 | HC-15 | REC-TCH-011 | `test.skip()` PENDING-SPEC (REC-TCH-011) |
| 91 | TC-CON-EMP-012 | El envío real muestra una confirmación | P3 | `@destructive` | Pendiente | Envío real prohibido en producción (S7, W9) y protegido por reCAPTCHA; requiere un entorno de pruebas que no existe. | RN-CON-016; FL-CON-004 | - | - | `test.skip()` @destructive PENDING-BROWSER |
| 92 | TC-LEG-LGL-001 | Los enlaces legales del footer abren páginas existentes en pestaña nueva | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-001; FL-LEG-001 | - | - | `test()` (pasa) |
| 93 | TC-LEG-LGL-002 | Términos y Condiciones no contiene texto de plantilla | P1 | `@sanity` | Pendiente | RN-LEG-002 pendiente de confirmación (pregunta abierta 5) y hoy falla (HC-01): recomendación de severidad alta escalada a negocio y área legal. | RN-LEG-002; FL-LEG-001 | HC-01 | REC-TCH-001 | `test.skip()` PENDING-SPEC (REC-TCH-001) |
| 94 | TC-LEG-LGL-003 | La política de privacidad no contiene marcadores sin completar | P1 | `@sanity` | Pendiente | RN-LEG-003 y RN-LEG-004 pendientes de confirmación y hoy falla (HC-02): recomendación de severidad alta escalada. | RN-LEG-003, RN-LEG-004; FL-LEG-001 | HC-02 | REC-TCH-002 | `test.skip()` PENDING-SPEC (REC-TCH-002) |
| 95 | TC-LEG-LGL-004 | La política identifica al responsable y el canal para ejercer derechos | P1 | `@sanity` | Manual | Revisión de contenido que requiere criterio humano (y del área legal); RN-LEG-003 pendiente de confirmación (HC-02). | RN-LEG-003; FL-LEG-001 | HC-02 | REC-TCH-002 | Fuera de la suite automatizada (ejecución manual) |
| 96 | TC-LEG-LGL-005 | La política de privacidad presenta sus secciones | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-001 (inventario de la página); FL-LEG-001 | - | - | `test()` (pasa) |
| 97 | TC-LEG-LGL-006 | El banner de cookies enlaza a la información de cookies | P2 | `@regression` | Pendiente | RN-LEG-005 pendiente de confirmación y hoy falla (HC-02): recomendación. | RN-LEG-005; FL-LEG-002 | HC-02 | REC-TCH-002 | `test.skip()` PENDING-SPEC (REC-TCH-002) |
| 98 | TC-LEG-LGL-007 | Las páginas legales tienen description representativa | P3 | `@regression` | Pendiente | RN-LEG-006 es criterio SEO no confirmado como regla de negocio (HC-11): recomendación. | RN-LEG-006 | HC-11 | REC-TCH-007 | `test.skip()` PENDING-SPEC (REC-TCH-007) |
| 99 | TC-LEG-LGL-008 | Las páginas legales declaran idioma y un único H1 | P3 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-006, RN-HOME-020 | - | - | `test()` (pasa) |
| 100 | TC-LEG-BLG-001 | El blog carga con al menos un artículo | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-007; FL-LEG-003 | - | - | `test()` (pasa) |
| 101 | TC-LEG-BLG-002 | Cada artículo del listado muestra título enlazado, fecha y extracto | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-007; FL-LEG-003 | - | - | `test()` (pasa) |
| 102 | TC-LEG-BLG-003 | Los artículos están en orden cronológico descendente | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-008; FL-LEG-003 | - | - | `test()` (pasa) |
| 103 | TC-LEG-BLG-004 | La paginación avanza y retrocede | P1 | `@e2e` | Automatizar | Determinista; flujo multipágina, solo lectura. | RN-LEG-009; FL-LEG-003 | - | - | `test()` (pasa) |
| 104 | TC-LEG-BLG-005 | Los artículos de la primera página responden 200 | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-010; FL-LEG-003, FL-LEG-004 | - | - | `test()` (pasa) |
| 105 | TC-LEG-BLG-006 | El artículo muestra H1 igual al título del listado y su fecha | P2 | `@e2e` | Automatizar | Determinista; flujo multipágina, solo lectura. | RN-LEG-010; FL-LEG-003 | - | - | `test()` (pasa) |
| 106 | TC-LEG-BLG-007 | El título de los artículos sigue el patrón del sitio | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-011; FL-LEG-003 | - | - | `test()` (pasa) |
| 107 | TC-LEG-BLG-008 | El listado del blog tiene H1 y description | P3 | `@regression` | Pendiente | RN-LEG-012 es criterio SEO no confirmado como regla de negocio (HC-09, HC-11): recomendación. | RN-LEG-012 | HC-09, HC-11 | REC-TCH-005, REC-TCH-007 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-007) |
| 108 | TC-LEG-BLG-009 | Las imágenes del listado tienen texto alternativo | P3 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-005. | RN-HOME-012 | HC-08 | DEF-TCH-005 | `test.fail()` + DEF-TCH-005 |
| 109 | TC-LEG-GAL-001 | La galería carga con álbumes y miniaturas | P0 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-013; FL-LEG-005 | - | - | `test()` (pasa) |
| 110 | TC-LEG-GAL-002 | Una miniatura abre el visor y Escape lo cierra | P1 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-014, RN-LEG-015; FL-LEG-005 | - | - | `test()` (pasa) |
| 111 | TC-LEG-GAL-003 | La flecha derecha avanza a la siguiente foto | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-015; FL-LEG-005 | - | - | `test()` (pasa) |
| 112 | TC-LEG-GAL-004 | El álbum más reciente aparece primero | P2 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-013; FL-LEG-005 | - | - | `test()` (pasa) |
| 113 | TC-LEG-GAL-005 | El título de la galería no tiene errores tipográficos | P3 | `@regression` | Pendiente | RN-LEG-016 es criterio editorial no confirmado como regla de negocio (HC-10): recomendación. | RN-LEG-016 | HC-10 | REC-TCH-006 | `test.skip()` PENDING-SPEC (REC-TCH-006) |
| 114 | TC-LEG-GAL-006 | Las fotos de la galería tienen texto alternativo | P3 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-005. | RN-LEG-017; FL-LEG-006 | HC-08 | DEF-TCH-005 | `test.fail()` + DEF-TCH-005 |
| 115 | TC-LEG-GAL-007 | La galería tiene un único H1 | P3 | `@regression` | Pendiente | RN-HOME-020 es criterio SEO no confirmado como regla de negocio (HC-09): recomendación. | RN-HOME-020 | HC-09 | REC-TCH-005 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| 116 | TC-LEG-GAL-008 | La galería es usable en móvil | P2 | `@regression` | Pendiente | Vista móvil no observada (PENDING-BROWSER): observar antes de automatizar (K12). | RN-HOME-015; FL-LEG-005 | - | - | `test.skip()` PENDING-BROWSER |

## 11. Clasificación de hallazgos candidatos

### 11.1 Mapeo HC -> DEF / REC

| Hallazgo | Regla relacionada | Origen de la regla | Clasificación | ID | Severidad | Casos |
|---|---|---|---|---|---|---|
| HC-01 | RN-LEG-002 | PENDIENTE-CONFIRMACIÓN | Recomendación | REC-TCH-001 | Alta | TC-LEG-LGL-002 |
| HC-02 | RN-LEG-003, RN-LEG-004, RN-LEG-005 | PENDIENTE-CONFIRMACIÓN | Recomendación | REC-TCH-002 | Alta | TC-LEG-LGL-003, TC-LEG-LGL-004, TC-LEG-LGL-006 |
| HC-03 | RN-EVT-015 | ESTÁNDAR normativo | Defecto | DEF-TCH-001 | Media | TC-EVT-EDI-003 |
| HC-04 | RN-EVT-010 | PENDIENTE-CONFIRMACIÓN | Recomendación | REC-TCH-003 | Media | TC-EVT-TDY-010 |
| HC-05 | RN-CAP-016 | PENDIENTE-CONFIRMACIÓN | Recomendación | REC-TCH-004 | Media | TC-CAP-BTC-005 |
| HC-06 | RN-EVT-009 | ESTÁNDAR normativo / OBSERVADO | Defecto | DEF-TCH-002 | Media | TC-EVT-TDY-007 |
| HC-07 | RN-EVT-009 | ESTÁNDAR normativo | Defecto | DEF-TCH-003 | Baja | TC-EVT-TDY-009 |
| HC-08 | RN-HOME-012 | ESTÁNDAR normativo | Defecto | DEF-TCH-004 | Media | TC-HOME-NAV-012 |
| HC-08 | RN-HOME-012 y RN-LEG-017 | ESTÁNDAR normativo | Defecto | DEF-TCH-005 | Media | TC-HOME-POR-006, TC-CAP-CAT-008, TC-EVT-EDI-009, TC-LEG-BLG-009, TC-LEG-GAL-006 |
| HC-09 | RN-HOME-020, RN-CAP-006, RN-CON-006, RN-EVT-012, RN-LEG-012 | ESTÁNDAR editorial/SEO | Recomendación | REC-TCH-005 | Baja | TC-HOME-POR-008, TC-CAP-CAT-007, TC-EVT-EDI-008, TC-EVT-TDY-012, TC-CON-FCO-006, TC-LEG-BLG-008, TC-LEG-GAL-007 |
| HC-10 | RN-LEG-016, RN-EVT-012, RN-CAP-006 | ESTÁNDAR editorial/SEO | Recomendación | REC-TCH-006 | Baja | TC-LEG-GAL-005, TC-EVT-EDI-004, TC-EVT-TDY-012, TC-CAP-CAT-007 |
| HC-11 | RN-EVT-012, RN-LEG-012, RN-LEG-006 | ESTÁNDAR editorial/SEO | Recomendación | REC-TCH-007 | Baja | TC-EVT-TDY-012, TC-LEG-BLG-008, TC-LEG-LGL-007 |
| HC-12 | RN-CON-005 | PENDIENTE-CONFIRMACIÓN | Recomendación | REC-TCH-008 | Media | TC-CON-FCO-005, TC-CON-FCO-007 |
| HC-13 | RN-CON-011 | PENDIENTE-CONFIRMACIÓN | Recomendación | REC-TCH-009 | Baja | TC-CON-EMP-006 |
| HC-14 | RN-CON-014 | ESTÁNDAR editorial/SEO | Recomendación | REC-TCH-010 | Baja | TC-CON-EMP-010 |
| HC-15 | RN-CON-015 | ESTÁNDAR editorial/SEO | Recomendación | REC-TCH-011 | Baja | TC-CON-EMP-011 |
| HC-16 | RN-CAP-015, RN-CON-013 | PENDIENTE-CONFIRMACIÓN | Recomendación | REC-TCH-012 | Media | TC-CAP-CUR-009, TC-CON-EMP-009 |
| HC-17 | RN-HOME-013 | PENDIENTE-CONFIRMACIÓN | Recomendación | REC-TCH-013 | Baja | TC-HOME-NAV-013, TC-CON-FCO-004 |
| HC-18 | Sin regla | Sin regla | Recomendación | REC-TCH-014 | Baja | TC-CAP-CAT-006 |
| HC-19 | Sin regla | Sin regla | Recomendación | REC-TCH-015 | Baja | Sin TC |
| HC-20 | RN-EVT-012 | ESTÁNDAR editorial/SEO | Recomendación | REC-TCH-016 | Baja | TC-EVT-TDY-012 |
| HC-21 | Sin regla | Sin regla | Recomendación | REC-TCH-017 | Media | TC-CAP-BTC-008 |
| HC-22 | RN-EVT-018 | PENDIENTE-CONFIRMACIÓN | Recomendación | REC-TCH-018 | Baja | TC-EVT-EDI-007 |

### 11.2 Defectos

| ID | Título | Severidad | Prioridad | Regla violada | Casos (`test.fail()`) | Archivo |
|---|---|---|---|---|---|---|
| DEF-TCH-001 | Enlace interno "Saber más de esta edición" (2018) responde 404 | Media | P2 | RN-EVT-015 | TC-EVT-EDI-003 | `qa/06-defects/open/DEF-TCH-001_enlace-interno-roto-edicion-2018.md` |
| DEF-TCH-002 | 3 de 4 enlaces únicos "Inscribirse" de la Agenda Online responden 404 | Media | P2 | RN-EVT-009 | TC-EVT-TDY-007 | `qa/06-defects/open/DEF-TCH-002_agenda-online-inscribirse-404.md` |
| DEF-TCH-003 | Logo de sponsor enlaza a un dominio inexistente y sitio de hotel sin respuesta | Baja | P3 | RN-EVT-009 | TC-EVT-TDY-009 | `qa/06-defects/open/DEF-TCH-003_enlaces-externos-evento-no-operativos.md` |
| DEF-TCH-004 | El logo del header no tiene texto alternativo en todo el sitio | Media | P2 | RN-HOME-012 | TC-HOME-NAV-012 | `qa/06-defects/open/DEF-TCH-004_logo-header-sin-texto-alternativo.md` |
| DEF-TCH-005 | Imágenes informativas sin texto alternativo en páginas de contenido | Media | P2 | RN-HOME-012 y RN-LEG-017 | TC-HOME-POR-006, TC-CAP-CAT-008, TC-EVT-EDI-009, TC-LEG-BLG-009, TC-LEG-GAL-006 | `qa/06-defects/open/DEF-TCH-005_imagenes-contenido-sin-texto-alternativo.md` |

### 11.3 Recomendaciones

| ID | Título | Severidad sugerida | Hallazgo | Casos | Condición para pasar a defecto |
|---|---|---|---|---|---|
| REC-TCH-001 | Términos y Condiciones contiene solo el texto de ayuda de la plantilla Webnode | Alta | HC-01 | TC-LEG-LGL-002 | Se convierte en defecto si el responsable confirma RN-LEG-002 (pregunta abierta 5). |
| REC-TCH-002 | Política de privacidad de plantilla sin completar y banner de cookies sin enlace | Alta | HC-02 | TC-LEG-LGL-003, TC-LEG-LGL-004, TC-LEG-LGL-006 | Se convierte en defecto si el responsable confirma RN-LEG-003 a RN-LEG-005 (pregunta abierta 5). |
| REC-TCH-003 | Evento 2026 finalizado mantiene CTAs de compra e inscripción | Media | HC-04 | TC-EVT-TDY-010 | Se convierte en defecto si el responsable confirma RN-EVT-010 (pregunta abierta 1). |
| REC-TCH-004 | Fecha de próximo inicio del Bootcamp vencida con CTAs activos | Media | HC-05 | TC-CAP-BTC-005 | Se convierte en defecto si el responsable confirma RN-CAP-016 (pregunta abierta 2). |
| REC-TCH-005 | Jerarquía de H1 inválida: múltiples H1, H1 vacíos o ausentes | Baja | HC-09 | TC-HOME-POR-008, TC-CAP-CAT-007, TC-EVT-EDI-008, TC-EVT-TDY-012, TC-CON-FCO-006, TC-LEG-BLG-008, TC-LEG-GAL-007 | Se convierte en defecto solo si el responsable eleva la buena práctica SEO a regla de negocio. |
| REC-TCH-006 | Títulos de página con errores o poco descriptivos | Baja | HC-10 | TC-LEG-GAL-005, TC-EVT-EDI-004, TC-EVT-TDY-012, TC-CAP-CAT-007 | El año incorrecto se convierte en defecto si se confirma RN-EVT-016; el resto, si el responsable eleva el criterio editorial a regla. |
| REC-TCH-007 | Meta description vacía o no representativa | Baja | HC-11 | TC-EVT-TDY-012, TC-LEG-BLG-008, TC-LEG-LGL-007 | Se convierte en defecto solo si el responsable eleva el criterio SEO a regla. |
| REC-TCH-008 | La página "Contacto" no tiene formulario y los correos no son enlaces | Media | HC-12 | TC-CON-FCO-005, TC-CON-FCO-007 | Se convierte en defecto si el responsable confirma RN-CON-005 (pregunta abierta 3). |
| REC-TCH-009 | "Número de personas" acepta 0 y valores negativos | Baja | HC-13 | TC-CON-EMP-006 | Se convierte en defecto si el responsable confirma RN-CON-011 (pregunta abierta 4). |
| REC-TCH-010 | Errores de ortografía en etiquetas del formulario empresa | Baja | HC-14 | TC-CON-EMP-010 | Se convierte en defecto solo si el responsable eleva el criterio editorial a regla. |
| REC-TCH-011 | Campos obligatorios sin indicador visual | Baja | HC-15 | TC-CON-EMP-011 | Se convierte en defecto solo si el responsable eleva la buena práctica a regla. |
| REC-TCH-012 | Formularios sin enlace a la política de privacidad ni consentimiento | Media | HC-16 | TC-CAP-CUR-009, TC-CON-EMP-009 | Se convierte en defecto si el responsable confirma RN-CAP-015 y RN-CON-013 (pregunta abierta 6). |
| REC-TCH-013 | Perfiles sociales inconsistentes entre páginas | Baja | HC-17 | TC-HOME-NAV-013, TC-CON-FCO-004 | Se convierte en defecto si el responsable confirma RN-HOME-013. |
| REC-TCH-014 | Número de WhatsApp distinto en el botón "Hablemos" del catálogo | Baja | HC-18 | TC-CAP-CAT-006 | Se convierte en defecto solo si el responsable define el número correcto como regla. |
| REC-TCH-015 | Errores tipográficos en la página Sponsors 2026 | Baja | HC-19 | Sin TC | Sin TC asociado; se registra para corrección editorial. |
| REC-TCH-016 | El título anuncia "GRATUITO" aunque la entrada presencial es pagada | Baja | HC-20 | TC-EVT-TDY-012 | Se convierte en defecto solo si el responsable eleva el criterio editorial a regla. |
| REC-TCH-017 | El autodiagnóstico del Bootcamp registra una conversión "purchase" sin compra | Media | HC-21 | TC-CAP-BTC-008 | Se convierte en defecto solo si el responsable declara que la conversión no es intencional y lo define como regla. |
| REC-TCH-018 | "Ver detalles de la edición más reciente" apunta a la edición 2022 | Baja | HC-22 | TC-EVT-EDI-007 | Se convierte en defecto si el responsable confirma RN-EVT-018. |

Observación pasiva derivada al proceso formal de seguridad (no es defecto ni recomendación de QA): las respuestas del sitio no incluyen `Strict-Transport-Security` ni `Content-Security-Policy` (sí `X-Frame-Options: DENY`). No se realizó ninguna prueba de seguridad.

Resumen: 22 hallazgos candidatos -> 5 defectos (a partir de 4 hallazgos: HC-03, HC-06, HC-07, HC-08) y 18 recomendaciones (18 hallazgos). 9 casos quedarán en `test.fail()`.

## 12. Supuestos y limitaciones

| # | Supuesto o limitación | Efecto en el plan |
|---|---|---|
| 1 | Sitio público sin usuarios ni credenciales | Un único rol; sin casos de acceso por rol |
| 2 | Solo lectura en producción | Caminos exitosos de envío en `Pendiente` (`@destructive`) |
| 3 | Sin documentación funcional ni responsable consultado | Reglas `PENDIENTE-CONFIRMACIÓN` y editoriales generan recomendaciones, no defectos |
| 4 | Datos observados el 2026-11-21 | Las pruebas aseguran estructura; los literales se actualizan como datos |
| 5 | Exploración con Chromium headless | Casos `PENDING-BROWSER` hasta observar en navegador real |
| 6 | Enlaces externos verificados desde una red corporativa | Reverificar fallas de red (p. ej. hotel de DEF-TCH-003) desde otra red antes de cerrar |
| 7 | Datos personales visibles en el sitio no se versionan | Números enmascarados y descripciones genéricas (S4, S5) |

## 13. Preguntas abiertas

| # | Pregunta | Reglas / hallazgos | Casos bloqueados | Responsable | Estado |
|---|---|---|---|---|---|
| 1 | ¿Qué debe mostrar `/testing-day-chile/` entre ediciones? | RN-EVT-010, HC-04 | TC-EVT-TDY-010 | Responsable del sitio | Abierta |
| 2 | ¿La fecha "próximo inicio" del Bootcamp debe actualizarse u ocultarse al vencer? | RN-CAP-016, HC-05 | TC-CAP-BTC-005 | Responsable del sitio | Abierta |
| 3 | ¿La página "Contacto" debe tener formulario? | RN-CON-005, HC-12 | TC-CON-FCO-005, TC-CON-FCO-007 | Responsable del sitio | Abierta |
| 4 | ¿Rango válido de "Número de personas"? | RN-CON-011, HC-13 | TC-CON-EMP-006 | Responsable del sitio | Abierta |
| 5 | ¿Responsable del tratamiento y confirmación de RN-LEG-002 a RN-LEG-005? | HC-01, HC-02 | TC-LEG-LGL-002, TC-LEG-LGL-003, TC-LEG-LGL-004, TC-LEG-LGL-006 | Responsable del sitio y área legal | Abierta |
| 6 | ¿El formulario B2B debe pedir consentimiento explícito? | RN-CON-013, RN-CAP-015, HC-16 | TC-CON-EMP-009, TC-CAP-CUR-009 | Responsable del sitio y área legal | Abierta |
| 7 | ¿El número de WhatsApp del botón "Hablemos" (Sence) es intencional? | HC-18 | Ninguno (informativa) | Responsable del sitio | Abierta |
| 8 | ¿La conversión "purchase" del autodiagnóstico es intencional? | HC-21 | TC-CAP-BTC-008 | Responsable del sitio | Abierta |
| 9 | ¿Criterio del filtro "Cursos" del catálogo? | RN-CAP-002 | Ninguno (se aserta solo la reducción) | Responsable del sitio | Abierta |
| 10 | ¿El tercer nivel del menú se despliega por hover o por clic en navegadores reales? | RN-HOME-003 | TC-HOME-NAV-004 | Responsable del sitio | Abierta |
| 11 | ¿Se elevan a reglas de negocio los criterios editoriales y SEO (un H1, títulos, description, ortografía, indicador de obligatorios)? | HC-09, HC-10, HC-11, HC-14, HC-15, HC-20 | 11 casos `Pendiente` PENDING-SPEC editoriales | Responsable del sitio | Abierta |
| 12 | ¿Se confirman RN-HOME-013, RN-EVT-016 y RN-EVT-018? | HC-17, HC-10, HC-22 | TC-HOME-NAV-013, TC-EVT-EDI-004, TC-EVT-EDI-007 | Responsable del sitio | Abierta |

Las preguntas 1 a 10 provienen de la sección 9 de `ANALISIS-DE-PRUEBAS.md`; la 11 y la 12 surgen de la clasificación de esta etapa.

## 14. Entregables

| Entregable | Ubicación | Etapa |
|---|---|---|
| Plan maestro de pruebas | `qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md` | 3 |
| Plan de pruebas HOME (tabla de pruebas con pasos expandidos) | `qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-testingenchile-Sprint-1-HOME.md` | 3-4 |
| Plan de pruebas CAP (tabla de pruebas con pasos expandidos) | `qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-testingenchile-Sprint-1-CAP.md` | 3-4 |
| Plan de pruebas EVT (tabla de pruebas con pasos expandidos) | `qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-testingenchile-Sprint-1-EVT.md` | 3-4 |
| Plan de pruebas CON (tabla de pruebas con pasos expandidos) | `qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-testingenchile-Sprint-1-CON.md` | 3-4 |
| Plan de pruebas LEG (tabla de pruebas con pasos expandidos) | `qa/02-test-plans/sprints/Sprint-1/Plan-de-Pruebas-testingenchile-Sprint-1-LEG.md` | 3-4 |
| Defectos (5) | `qa/06-defects/open/` | 3 |
| Recomendaciones (18) | `qa/06-defects/recommendations/` | 3 |
| Specs Playwright y page objects | `qa/07-automation/e2e/` | 5 |
| Informes de ejecución | `qa/05-test-execution/` | 5 |

## 15. Documentos relacionados

- `qa/01-specifications/ANALISIS-DE-PRUEBAS.md` (análisis, hallazgos HC-01 a HC-22, preguntas abiertas)
- `qa/01-specifications/README.md` (índice de especificaciones)
- `AGENTS.md` (reglas S, A, T, E, Constitución K/W) y `.claude/rules/testingenchile.md`
- `qa/memory/test-plan-classification.md` (criterio de clasificación de esta etapa)

## 16. Aprobaciones

| Rol | Nombre | Fecha | Decisión |
|---|---|---|---|
| Líder QA | `<PENDIENTE>` | - | Pendiente |
| Responsable del sitio | `<PENDIENTE>` | - | Pendiente |

## 17. Historial de cambios

| Versión | Fecha | Descripción |
|---|---|---|
| 1.0 | 2026-11-21 | Versión inicial: etapas 3 y 4 para los 5 módulos (116 casos), 5 defectos y 18 recomendaciones |
