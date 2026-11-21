# MÓDULO: Capacitaciones - Submódulo: Detalle de curso

| Campo | Valor |
|---|---|
| Código de módulo | CAP |
| Código de submódulo | CUR |
| URL principal | `{{QA_BASE_URL}}/curso-automatizacion-pruebas-software-web-selenium-java/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Páginas de detalle de cada capacitación (15 destinos del catálogo): contenido, instructores, video, botón de pago externo y formulario de consulta. Se inspeccionaron a fondo Selenium Java, ISTQB y AiU; el resto se verificó por HTTP, título y H1. |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/curso-automatizacion-pruebas-software-web-selenium-java/` | 200 | Curso de Automatización de Pruebas Web con Selenium Webdriver (IntelliJ, Java, Junit) - Nivel intermedio | 9 H1; 7/7 imágenes sin `alt`; botón "PAGAR CURSO" |
| `/new-curso-istqb/` | 200 | New ISTQB® | 5 H1; 11/11 imágenes sin `alt`; botón "CURSO + EXAMEN" |
| `/aiugenaia/` | 200 | AiU-GenAiA-TE | 2 H1; 7/7 imágenes sin `alt`; campo "Asunto"; botón "Pagar Curso + Examen" |
| `/certificacion-automatizacion-pruebas-software-selenium/` | 200 | Certificación de Automatización de Pruebas con Selenium | 14 H1 |
| `/curso-avanzado-testing-performance-jmeter/` | 200 | Curso de Testing de Performance con JMeter - PTU Certified Performance Tester con JMeter - Nivel avanzado | 6 H1 |
| `/curso-automatizacion-pruebas-software-web-selenium-python/` | 200 | Curso de Automatización de pruebas web con Selenium Webdriver (PyCharm, Python, PyTest) - Nivel intermedio | 7 H1 |
| `/cursos-sap-automatizacion/`, `/sap-master-build/`, `/copia-de-nuevo-curso-testing-en-sap/`, `/copia-de-nuevo-curso-testing-en-sap2/` | 200 | Varios | Slugs "copia-de-..." heredados de duplicar páginas |
| `/aut-int-playwright/`, `/curso-testing-desde-cero/`, `/prog-desde-cero/`, `/programacion-con-aut/` | 200 | Varios | `/aut-int-playwright/` usa como description el texto de facturación |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Título y contenido del curso | H1/H2 + texto | No | Varias páginas con múltiples H1 |
| Video | iframe `youtube-nocookie.com` | No | Presente en Selenium Java e ISTQB |
| Instructores | texto + enlaces LinkedIn | No | Nombres reales: no se versionan en datos de prueba |
| Botón de pago | link externo `flow.cl/btn.php?token=...` | No | `target=_blank`; NUNCA se hace clic (pasarela de pago real) |
| Asunto (solo AiU) | select | Sí (`required`) | Opciones: "Inscripción formación Gen AiA-TE", "Más Información Gen AiA-TE", "Otra pregunta" |
| Nombre y Apellido | text | Sí (`required`) | `maxlength=150`; sin asterisco visible |
| E-mail | email | Sí (`required`) | `maxlength=255`; validación nativa de formato |
| Celular | tel | No | `pattern="[\.\+\-\(\)0-9 ]+"`; "abc" es inválido |
| Mensaje | textarea | Sí (`required`) |  |
| Consentimiento "Acepto el uso de mis datos personales con fines comerciales" | checkbox | Sí (`required`) | En AiU dice "con fines educacionales"; sin enlace a la política de privacidad |
| reCAPTCHA v2 | iframe Google | Sí (implícito) | Impide el envío automatizado |
| "¡Enviar mensaje!" | button submit | - | NUNCA se ejecuta (regla S7) |
| Disclaimer de facturación | texto | No | Solicitar factura antes de pagar |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| POST | Misma URL de la página (`action=""`) | Envío del formulario Webnode (no ejercido) |
| GET | `https://www.flow.cl/btn.php?token=...` | Pasarela de pago Flow (no ejercida) |
| GET | `https://www.google.com/recaptcha/api2/anchor` | reCAPTCHA v2 del formulario |
| GET | `https://www.youtube-nocookie.com/embed/...` | Video embebido |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-08 | Todas las imágenes de contenido de las páginas de curso sin texto alternativo | `https://www.testingenchile.cl/new-curso-istqb/` (2026-11-21): 11 de 11 imágenes sin `alt`; Selenium Java 7/7; AiU 7/7 | Defecto candidato (RN-HOME-012) |
| HC-09 | Múltiples H1 por página de curso | `https://www.testingenchile.cl/certificacion-automatizacion-pruebas-software-selenium/` (2026-11-21): 14 H1; Selenium Java 9; Python 7 | Recomendación |
| HC-10 | Títulos poco descriptivos o internos | `https://www.testingenchile.cl/new-curso-istqb/` (2026-11-21): "New ISTQB®"; `/aiugenaia/` "AiU-GenAiA-TE"; `/curso-testing-desde-cero/` "Int al Testing desde cero" | Recomendación |
| HC-15 | Campos obligatorios sin indicador visual | `https://www.testingenchile.cl/curso-automatizacion-pruebas-software-web-selenium-java/` (2026-11-21): atributo `required` sin asterisco ni texto "obligatorio" | Recomendación (WCAG 3.3.2) |
| HC-16 | La casilla de consentimiento no enlaza a la política de privacidad | `https://www.testingenchile.cl/aiugenaia/` (2026-11-21): casilla sin enlaces en su contenedor | Recomendación; ver HC-02 |

## Preguntas abiertas

1. ¿Qué mensaje y qué destino tiene un envío exitoso del formulario? No se puede observar sin enviar (S7) y el reCAPTCHA lo impide en automatización.
2. ¿Las páginas con slug "copia-de-nuevo-curso-..." son definitivas? Afectan a URLs indexadas.
