# Análisis de Pruebas - Testing en Chile

| Campo | Valor |
|---|---|
| Proyecto | Testing en Chile (`testingenchile`) |
| Sitio bajo prueba | `https://www.testingenchile.cl` (Webnode CMS, producción) |
| Etapas del pipeline | 1 - Análisis de módulos y 2 - Generación de especificaciones (`@keber/qa-framework` 1.14.0-rc.9) |
| Fecha de observación | 2026-11-21 (America/Santiago, inicio 11:58 -03:00) |
| Método | Exploración del sitio en vivo con Playwright (Chromium headless, escritorio 1366x900 y 1920x1000, móvil Pixel 5) y solicitudes HTTP de solo lectura |
| Rol cubierto | Visitante anónimo (el sitio no tiene usuarios ni área privada) |
| Estado | Especificaciones generadas; pendiente de revisión humana antes de la etapa 3 (plan de pruebas) |

---

## 1. Objetivo y alcance

**Objetivo**: caracterizar el sitio público de Testing en Chile, delimitar sus módulos funcionales, definir reglas de negocio y escenarios de prueba trazables, y registrar con evidencia las anomalías observadas, como base del plan de pruebas y de la automatización de regresión.

### 1.1 Dentro del alcance

| Área | Qué se cubre |
|---|---|
| Navegación global | Menú de escritorio y móvil, submenús, header, footer, botón flotante de WhatsApp, página 404, redirecciones canónicas |
| Contenido | Portada, catálogo de capacitaciones, páginas de curso, Bootcamp, evento Testing Day (edición vigente y anteriores), blog, galería, páginas legales |
| Formularios | Presencia de campos y validación en el cliente (`required`, tipo, patrón, `checkValidity()`) con datos sintéticos, **sin envío** |
| Integraciones | Destino de enlaces externos (WhatsApp, Flow, ecopass, StreamYard, sitios de sponsors) verificado por atributo `href` o por solicitud HTTP, sin ejecutar acciones |
| Calidad transversal | Estado HTTP de enlaces, metadatos SEO (título, description, `lang`, canonical), jerarquía de encabezados, texto alternativo de imágenes, consentimiento de cookies, responsividad básica |

### 1.2 Fuera del alcance

| Área | Motivo |
|---|---|
| Envío real de formularios, pagos (Flow), compra de entradas (ecopass), inicio de conversaciones de WhatsApp o correo | Único entorno disponible es producción; las pruebas son de solo lectura (regla S7 y regla 1 del proyecto) |
| Panel de administración de Webnode | No es parte del sitio público; sin credenciales |
| Pruebas de carga, estrés o rendimiento | Prohibidas contra producción; `robots.txt` declara `Crawl-delay: 10` |
| Pruebas de seguridad ofensivas | Política de la organización: se derivan al proceso formal de seguridad |
| Auditoría WCAG completa y evaluación legal | Se cubren controles puntuales (texto alternativo, encabezados, etiquetas); el cumplimiento legal lo valida el área legal |
| Navegadores distintos de Chromium y dispositivos reales | Configuración actual del proyecto (`browsers: ["chromium"]`) |

---

## 2. Mapa del sitio

El sitio declara 182 URLs en `sitemap.xml`. Se inspeccionaron en detalle 17 páginas y se verificó el estado HTTP de 57 URLs internas y 71 externas.

| Sección (menú) | Rutas principales | Módulo |
|---|---|---|
| Inicio | `/` | HOME |
| Capacitaciones | `/capacitaciones2/` y 15 páginas de curso (p. ej. `/curso-automatizacion-pruebas-software-web-selenium-java/`, `/new-curso-istqb/`, `/aiugenaia/`), `/bootcamp-de-testing/` | CAP |
| Testing Day Chile 2026 | `/testing-day-chile/`, `/agenda-online/`, `/nuestros-sponsors-2026/`, `/actividades-otras-comunidades-testing-qa/` | EVT |
| Ediciones anteriores (tercer nivel) | `/testing-day-chile-ediciones-anteriores/` y 16 páginas por edición (2020-2025: agendas, charlas, entrevistas, speakers, sponsors, notas) | EVT |
| Blog | `/blog/`, `/blog/p-e0nza2ma/{n}/`, `/l/{slug}/` | LEG |
| Fotogalería | `/galeria/` | LEG |
| Contacto | `/formulario-contacto/` | CON |
| (Portada, "Solicitar cotización") | `/contacto-empresa/` | CON |
| (Footer) | `/terminos-y-condiciones/`, `/politica-de-privacidad/` | LEG |

```text
www.testingenchile.cl
|
+-- /                         Portada (hero, contadores, servicios, destacados, testimonios, partners)
+-- /capacitaciones2/         Catálogo (8 filtros, 15 tarjetas) -> 15 páginas de curso -> [formulario | pago Flow]
+-- /bootcamp-de-testing/     Landing + autodiagnóstico (cliente)
+-- /testing-day-chile/       Evento 2026 -> /agenda-online/ -> StreamYard ; /nuestros-sponsors-2026/ ; ecopass
|   +-- /testing-day-chile-ediciones-anteriores/ -> ediciones 2020-2025
+-- /blog/                    Listado paginado -> /l/{slug}/
+-- /galeria/                 Álbumes + visor PhotoSwipe
+-- /formulario-contacto/     Contacto (WhatsApp, redes; sin formulario)
+-- /contacto-empresa/        Formulario B2B (validación en el cliente)
+-- /terminos-y-condiciones/  /politica-de-privacidad/   (footer)
```

---

## 3. Módulos y submódulos

| Módulo | Código | Submódulo | Código | Ruta principal | Carpeta de especificación |
|---|---|---|---|---|---|
| Inicio y navegación global | HOME | Navegación global | NAV | `/` | `module-home/submodule-navegacion/` |
| | | Portada (página de inicio) | POR | `/` | `module-home/submodule-portada/` |
| Capacitaciones | CAP | Catálogo de capacitaciones | CAT | `/capacitaciones2/` | `module-capacitaciones/submodule-catalogo/` |
| | | Detalle de curso | CUR | `/curso-automatizacion-pruebas-software-web-selenium-java/` (y 14 más) | `module-capacitaciones/submodule-detalle-curso/` |
| | | Bootcamp de Testing | BTC | `/bootcamp-de-testing/` | `module-capacitaciones/submodule-bootcamp/` |
| Eventos Testing Day | EVT | Testing Day Chile (edición vigente) | TDY | `/testing-day-chile/` | `module-eventos/submodule-testing-day/` |
| | | Ediciones anteriores | EDI | `/testing-day-chile-ediciones-anteriores/` | `module-eventos/submodule-ediciones/` |
| Contacto y formularios | CON | Página de contacto | FCO | `/formulario-contacto/` | `module-contacto/submodule-formulario-contacto/` |
| | | Contacto empresa (B2B) | EMP | `/contacto-empresa/` | `module-contacto/submodule-contacto-empresa/` |
| Contenido legal y blog | LEG | Páginas legales | LGL | `/politica-de-privacidad/` | `module-legal/submodule-legales/` |
| | | Blog | BLG | `/blog/` | `module-legal/submodule-blog/` |
| | | Fotogalería | GAL | `/galeria/` | `module-legal/submodule-galeria/` |

Cada submódulo contiene los 6 archivos del framework (`00-inventory.md` a `05-test-scenarios.md`). Los submódulos también quedaron registrados en `qa/qa-framework.config.json` (`modules[].submodules`).

---

## 4. Universo de pruebas

### 4.1 Casos por módulo y prioridad

| Módulo | Submódulos | RN | FL | P0 | P1 | P2 | P3 | Total TCs |
|---|---|---|---|---|---|---|---|---|
| HOME | 2 | 21 | 6 | 3 | 10 | 8 | 2 | 23 |
| CAP | 3 | 21 | 7 | 3 | 12 | 8 | 4 | 27 |
| EVT | 2 | 18 | 4 | 2 | 7 | 7 | 5 | 21 |
| CON | 2 | 16 | 4 | 2 | 8 | 5 | 5 | 20 |
| LEG | 3 | 17 | 6 | 3 | 8 | 7 | 7 | 25 |
| **Total** | **12** | **93** | **27** | **13** | **45** | **35** | **23** | **116** |

Todos los submódulos quedan dentro del objetivo configurado de 8 a 20 casos (`tc_per_submodule_target`).

### 4.2 Casos por submódulo

| Submódulo | P0 | P1 | P2 | P3 | Total |
|---|---|---|---|---|---|
| HOME-NAV | 2 | 6 | 5 | 1 | 14 |
| HOME-POR | 1 | 4 | 3 | 1 | 9 |
| CAP-CAT | 1 | 3 | 3 | 2 | 9 |
| CAP-CUR | 1 | 6 | 2 | 1 | 10 |
| CAP-BTC | 1 | 3 | 3 | 1 | 8 |
| EVT-TDY | 1 | 5 | 5 | 1 | 12 |
| EVT-EDI | 1 | 2 | 2 | 4 | 9 |
| CON-FCO | 1 | 3 | 2 | 2 | 8 |
| CON-EMP | 1 | 5 | 3 | 3 | 12 |
| LEG-LGL | 1 | 3 | 2 | 2 | 8 |
| LEG-BLG | 1 | 4 | 2 | 2 | 9 |
| LEG-GAL | 1 | 1 | 3 | 3 | 8 |

### 4.3 Casos por origen

| Origen | Cantidad | Significado |
|---|---|---|
| `UI-OBSERVED` | 110 | Elemento y comportamiento observados en esta sesión |
| `PENDING-BROWSER` | 6 | Elemento observado pero comportamiento no ejercido: tercer nivel del menú por hover (1), vistas móviles no observadas (3), envíos reales de formularios marcados `@destructive` (2) |
| `PENDING-CODE` / `BLOCKED-PERMISSIONS` | 0 | No aplica |

### 4.4 Casos por tipo

| Tipo | Cantidad |
|---|---|
| Funcional (incluye smoke, filtros, enlaces, orden, paginación, cálculo) | 50 |
| Contenido y vigencia | 13 |
| Integración (enlaces externos, WhatsApp, pagos, analítica) | 11 |
| Negativo (validación de formularios, 404, enlaces rotos) | 10 |
| SEO y SEO / accesibilidad | 13 |
| Accesibilidad | 7 |
| Cumplimiento (privacidad, consentimiento, legales) | 6 |
| Responsivo | 5 |
| Usabilidad | 1 |
| **Total** | **116** |

### 4.5 Criterio de prioridad

| Prioridad | Criterio aplicado |
|---|---|
| P0 | Disponibilidad de la página o flujo principal del submódulo (smoke): sin esto el submódulo no sirve |
| P1 | Funcionalidad principal (navegación, filtros, validaciones obligatorias, destinos de CTAs, vigencia de fechas, contenido legal) |
| P2 | Funcionalidad secundaria, integridad de enlaces externos, responsividad, accesibilidad relevante |
| P3 | SEO, ortografía, consistencia y mejoras de baja severidad |

---

## 5. Factibilidad de automatización

| Módulo | Automatizables (Sí / Parcial) | Pendientes | Factibilidad | Consideraciones |
|---|---|---|---|---|
| HOME | 22 / 0 | 1 | Alta | Page object del banner de cookies ("Aceptar solo lo necesario"); hover del tercer nivel no reproducido en headless; redirecciones con el fixture `request` |
| CAP | 24 / 1 | 2 | Alta (catálogo y Bootcamp) / Media (detalle de curso) | Formularios solo con `checkValidity()`; el envío es imposible por reCAPTCHA y prohibido por S7; botones de pago nunca se pulsan; bloquear etiquetas de Google en el autodiagnóstico (HC-21) |
| EVT | 21 / 0 | 0 | Alta técnicamente, mantenimiento alto | Contenido muy volátil (fechas, agenda, sponsors): aserciones estructurales y textos en `enums/` o `test-data/static/`; enlaces externos con bloqueos anti-bot |
| CON | 18 / 0 | 2 | Media | Solo validación en el cliente; el formulario empresa se renderiza después de la carga (esperas web-first); mensajes nativos dependen del idioma del navegador |
| LEG | 23 / 1 | 1 | Alta | Detección de texto de plantilla por cadenas curadas; la revisión de contenido legal es parcialmente manual |
| **Total** | **108 / 2** | **6** | | |

Herramientas: Playwright + TypeScript en `qa/07-automation/e2e/` según la Constitución de `AGENTS.md` (sección 6). Workers <= 2, sin reintentos locales, ejecución de solo lectura.

---

## 6. Riesgos

| ID | Riesgo | Impacto | Probabilidad | Mitigación |
|---|---|---|---|---|
| R1 | Volatilidad del contenido de marketing y eventos (fechas, agenda, sponsors, nombres de cursos) | Falsos negativos y mantenimiento frecuente | Alta | Aserciones de estructura y rutas; textos en `enums/messages.ts` y `test-data/static/`; el healer clasifica como deriva de datos |
| R2 | Producción como único entorno: envío accidental de formularios, compras o mensajes | Datos basura para el negocio, cargos reales | Media | Regla S7, `@destructive` + `test.skip()`, nunca clic en enviar/pagar; revisión de PR con el rubric |
| R3 | Contaminación analítica: el autodiagnóstico dispara una conversión "purchase" de Google Ads | Métricas comerciales distorsionadas por las pruebas | Alta (observado) | Abortar `googlesyndication.com`, `googleadservices.com` y `googletagmanager.com` con `page.route` en el fixture base |
| R4 | Bloqueos anti-bot en enlaces externos (LinkedIn 999, Facebook 400, sitios 403) | Falsos positivos de enlace roto | Alta | Clasificar 999/400/403 como "no verificable"; reverificar manualmente antes de declarar defecto |
| R5 | Cambios del CMS de terceros sin aviso (estructura Webnode, clases CSS) | Deriva de selectores | Media | Selectores por rol y etiqueta (K3); smoke programado |
| R6 | reCAPTCHA y ausencia de entorno de pruebas | Los caminos exitosos de formularios no son verificables | Cierta | Documentados como `PENDING-BROWSER @destructive`; solicitar un entorno de staging si se requiere cobertura |
| R7 | Incumplimiento normativo de privacidad y condiciones (HC-01, HC-02, HC-16) | Riesgo legal y reputacional para el negocio | Alta (observado) | Escalar a negocio y área legal; reglas marcadas `PENDIENTE-CONFIRMACIÓN` |
| R8 | Límite de tasa del sitio (`Crawl-delay: 10`) | Bloqueo o degradación al ejecutar en paralelo | Baja | Workers <= 2, ejecución secuencial en CI, sin crawling masivo |
| R9 | Diferencias entre Chromium headless y navegadores reales (hover, animaciones, panel de WhatsApp a los 4 s) | Casos no reproducibles | Media | Casos marcados `PENDING-BROWSER`; confirmar en navegador real |

---

## 7. Hallazgos candidatos

Observaciones reales con evidencia (fecha de observación 2026-11-21). No son defectos todavía: en etapas posteriores se clasificarán como defecto (`DEF-TCH-NNN`, cuando violen una regla de negocio confirmada) o recomendación (`REC-TCH-NNN`). Las reglas marcadas `PENDIENTE-CONFIRMACIÓN` deben validarse con el responsable del sitio antes de abrir un defecto. Los números de teléfono se enmascaran (`569XXXX0587`).

| ID | Módulo | Hallazgo | Evidencia (URL + observación) | Severidad propuesta | Clasificación propuesta |
|---|---|---|---|---|---|
| HC-01 | LEG | Términos y Condiciones contiene solo el texto de ayuda de la plantilla Webnode, sin términos propios, aunque el sitio vende cursos y entradas | `/terminos-y-condiciones/`: cuerpo único "Aviso legal: como propietario de una tienda online, debe publicar usted mismo los Términos y Condiciones..." | Alta | Defecto candidato (RN-LEG-002) |
| HC-02 | LEG | Política de privacidad es una plantilla de tienda online sin completar (responsable y contacto como marcadores entre corchetes, "La Tienda", envíos, RGPD); no describe los tratamientos reales; el banner de cookies no enlaza a información de cookies | `/politica-de-privacidad/`: "La Tienda [...] en la página web [...] con número de identificación [...]"; banner sin enlaces | Alta | Defecto candidato (RN-LEG-003 a RN-LEG-005) |
| HC-03 | EVT | Enlace interno roto "Saber más de esta edición" | `/testing-day-chile-ediciones-anteriores/` -> `/testing-day-en-latam-2018/` responde 404 | Media | Defecto candidato (RN-EVT-015) |
| HC-04 | EVT | Evento 2026 (27 y 28 de agosto) finalizado, pero se mantienen "Asegura tu entrada", "Comprar Entrada" (pre-venta) e "Inscribirse"; el menú sigue anunciando "Testing Day Chile 2026" | `/testing-day-chile/`; el blog confirma el 04.09.2026 que el evento ya se realizó | Media | Recomendación; defecto si se confirma RN-EVT-010 |
| HC-05 | CAP | Fecha de inicio del Bootcamp vencida ("2 de noviembre de 2026 próximo inicio") con CTAs de postulación activos | `/bootcamp-de-testing/`: hero y cierre "Inicio: 2 de noviembre de 2026. Admisión por postulación." | Media | Defecto candidato si se confirma RN-CAP-016 |
| HC-06 | EVT | 3 de 4 enlaces únicos "Inscribirse" de la Agenda Online devuelven 404 | `/agenda-online/`: `streamyard.com/watch/d2Y5CqepHVu6`, `fxfpYcRcykN7`, `zcWQhitGTYXW` | Media | Defecto candidato (RN-EVT-009) |
| HC-07 | EVT | Enlace de logo a dominio inexistente; sitio de hotel sin respuesta | `/testing-day-chile/`: `mendezdistribucion.com` NXDOMAIN (DNS 8.8.8.8); `www.hotelvegassantiago.com` timeout (reverificar) | Baja | Defecto candidato (RN-EVT-009) |
| HC-08 | Transversal | Imágenes sin texto alternativo, incluido el logo del header en todas las páginas | `/galeria/` 558/572; `/new-curso-istqb/` 11/11; `/nuestros-sponsors-2026/` 12/12; `/blog/` 11/11; logo `alt=""` en todo el sitio | Media | Defecto candidato (RN-HOME-012, WCAG 1.1.1) |
| HC-09 | Transversal | Jerarquía de H1 inválida: múltiples H1, H1 vacíos o ausentes | `/` 5 H1; `/certificacion-automatizacion-pruebas-software-selenium/` 14; `/charlas-talleres-testing-day-chile-2022/` 18; sin H1 en `/capacitaciones2/`, `/blog/`, `/agenda2025/`; H1 vacío en `/nuestros-sponsors-2026/` y `/testing-day-chile-2025/` | Baja | Recomendación (RN-HOME-020) |
| HC-10 | Transversal | Títulos de página con errores o poco descriptivos | `/galeria/` "CapTI de Tesitng en Chile"; `/entrevistas-sponsors-2021/` dice "Testing Day Chile 2022"; `/nuestros-sponsors-2026/` "Nuestros sponsor"; títulos genéricos ("Capacitaciones", "Bootcamp", "Agenda", "New ISTQB®"); sufijos inconsistentes | Baja | Recomendación; defecto candidato el año incorrecto (RN-EVT-016) |
| HC-11 | Transversal | Meta description vacía o no representativa | Vacía en `/agenda-online/` y `/blog/`; en páginas legales repite el texto de contacto del footer | Baja | Recomendación |
| HC-12 | CON | La página "Contacto" del menú (`/formulario-contacto/`) no tiene formulario; los correos del footer no son enlaces `mailto:` | 0 elementos `form` en la página | Media | Pregunta abierta (RN-CON-005) |
| HC-13 | CON | "Número de personas" acepta 0 y negativos | `/contacto-empresa/`: `-5` y `0` válidos; sin `min`/`max` | Baja | Recomendación (RN-CON-011) |
| HC-14 | CON | Ortografía en etiquetas del formulario empresa | "Indícanos que capacitación estas interesado"; opción "Si" | Baja | Recomendación (RN-CON-014) |
| HC-15 | CAP, CON | Campos obligatorios sin indicador visual | `required` sin asterisco ni texto en formularios de curso y empresa | Baja | Recomendación (WCAG 3.3.2) |
| HC-16 | CAP, CON | Consentimiento sin enlace a la política de privacidad; el formulario empresa recolecta datos personales sin consentimiento ni enlace | `/aiugenaia/` y `/contacto-empresa/` | Media | Recomendación; ligado a HC-02 |
| HC-17 | HOME, CON | Perfiles sociales inconsistentes (LinkedIn de empresa frente a perfil personal; Twitter y X mezclados) | Footer `linkedin.com/company/testingenchile`; `/formulario-contacto/` `linkedin.com/in/capti-...` | Baja | Recomendación |
| HC-18 | CAP | Número de WhatsApp distinto en el botón "Hablemos" del catálogo | `/capacitaciones2/`: `wa.me/569XXXX7767` frente a `wa.me/569XXXX0587` | Baja | Pregunta abierta |
| HC-19 | EVT | Errores tipográficos en Sponsors 2026 | "QAlifield" (sponsor "QAlified"), "nuestramisión", "acompañándolosen" | Baja | Recomendación |
| HC-20 | EVT | El título anuncia "GRATUITO" aunque la entrada presencial es pagada | `/testing-day-chile/`: `<title>` con "GRATUITO" y tarjeta "Entrada Presencial" con "Comprar Entrada" | Baja | Recomendación |
| HC-21 | CAP | El autodiagnóstico del Bootcamp registra una conversión de Google Ads tipo "purchase" sin compra | `/bootcamp-de-testing/`: POST a `pagead2.googlesyndication.com/pagead/conversion/...` con `bttype=purchase` al pulsar "Ver mi orientación" | Media | Recomendación (calidad de datos) |
| HC-22 | EVT | "Ver detalles de la edición más reciente" apunta a la edición 2022 | `/testing-day-chile-ediciones-anteriores/` con 2023-2025 publicadas | Baja | Pregunta abierta (RN-EVT-018) |

**Resumen**: 22 hallazgos candidatos (2 de severidad alta, 8 media, 12 baja). Defectos candidatos directos (regla `OBSERVADO` o `ESTÁNDAR` incumplida): HC-03, HC-06, HC-07, HC-08. Los demás dependen de confirmar reglas `PENDIENTE-CONFIRMACIÓN` o son recomendaciones.

### 7.1 Observación derivada al proceso formal de seguridad

Las respuestas HTTP del sitio no incluyen las cabeceras `Strict-Transport-Security` ni `Content-Security-Policy` (sí `X-Frame-Options: DENY`). No se realizó ninguna prueba de seguridad; se informa como observación pasiva para que el proceso formal de seguridad de la empresa evalúe su relevancia en un sitio alojado por un tercero (Webnode).

---

## 8. Supuestos y limitaciones

| # | Supuesto o limitación | Efecto en el análisis |
|---|---|---|
| 1 | Sitio público sin usuarios ni credenciales | Un único rol (visitante anónimo); los casos obligatorios de acceso por rol y redirección a login no aplican |
| 2 | Solo lectura en producción: ningún formulario enviado, ningún pago, ninguna conversación iniciada | Los caminos exitosos de envío no se observaron; quedan como `PENDING-BROWSER @destructive` |
| 3 | No existe documentación funcional ni responsable consultado | Las reglas se basan en lo observado (`OBSERVADO`), en estándares (`ESTÁNDAR`) o en expectativas razonables (`PENDIENTE-CONFIRMACIÓN`); estas últimas no justifican un defecto hasta confirmarse |
| 4 | Volatilidad de datos: eventos, sponsors, agenda, fechas, cursos y contadores cambian con frecuencia | Los valores observados valen para el 2026-11-21; las pruebas aseguran estructura, no literales |
| 5 | Exploración con Chromium headless (escritorio y emulación Pixel 5) | Comportamientos de hover, animaciones y paneles temporizados pueden diferir en navegadores reales; vistas móviles de catálogo, contacto y galería no observadas |
| 6 | Mensajes de validación nativos del navegador (en inglés en la sesión) | No se aseguran textos de error; se asegura `validity` y `validationMessage` no vacío |
| 7 | Enlaces externos verificados por HTTP desde una red corporativa | Bloqueos anti-bot (999, 400, 403) y fallas transitorias requieren reverificación manual |
| 8 | Los datos personales visibles en el sitio (nombres de docentes y speakers, teléfonos) no se versionan | Las especificaciones usan descripciones genéricas y números enmascarados (reglas S4 y S5) |
| 9 | El análisis de páginas legales es de calidad de contenido, no una evaluación jurídica | HC-01 y HC-02 deben validarse con el área legal |
| 10 | Tasa de solicitudes baja y secuencial durante la exploración | No se exploraron las 182 URLs del sitemap en profundidad; se priorizaron las alcanzables desde el menú, el footer y los CTAs |

---

## 9. Preguntas abiertas para el responsable del sitio

1. ¿Qué debe mostrar `/testing-day-chile/` entre ediciones (evento finalizado, próxima fecha)? (RN-EVT-010, HC-04)
2. ¿La fecha "próximo inicio" del Bootcamp debe actualizarse u ocultarse al vencer? (RN-CAP-016, HC-05)
3. ¿La página "Contacto" debe tener formulario? (RN-CON-005, HC-12)
4. ¿Rango válido de "Número de personas" en el formulario empresa? (RN-CON-011, HC-13)
5. ¿Quién es el responsable del tratamiento de datos a declarar y se confirman RN-LEG-002 a RN-LEG-005? (HC-01, HC-02)
6. ¿El formulario B2B debe pedir consentimiento explícito? (RN-CON-013, HC-16)
7. ¿El número de WhatsApp del botón "Hablemos" (Sence) es intencional? (HC-18)
8. ¿La conversión "purchase" del autodiagnóstico es intencional? (HC-21)
9. ¿Criterio del filtro "Cursos" del catálogo (incluye AiU e ISTQB, excluye SeU y PtU)?
10. ¿El tercer nivel del menú se despliega por hover o por clic en navegadores reales?

---

## 10. Próximos pasos

| Paso | Etapa | Entregable |
|---|---|---|
| Revisión humana de especificaciones y respuesta a las preguntas abiertas | 2 (cierre) | Reglas `PENDIENTE-CONFIRMACIÓN` confirmadas o descartadas |
| Plan de pruebas por módulo | 3 (`/qa-test-plan`) | `qa/02-test-plans/` |
| Casos de prueba detallados | 4 (`/qa-test-cases`) | `qa/03-test-cases/` |
| Automatización de P0 y P1 | 5 (`/qa-automation`) | Specs en `qa/07-automation/e2e/tests/{modulo}/`, defectos `DEF-TCH-NNN` y recomendaciones `REC-TCH-NNN` |

Especificaciones por submódulo: ver el índice `qa/01-specifications/README.md`.
