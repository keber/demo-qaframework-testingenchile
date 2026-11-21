# MÓDULO: Contenido legal y blog - Submódulo: Páginas legales

| Campo | Valor |
|---|---|
| Código de módulo | LEG |
| Código de submódulo | LGL |
| URL principal | `{{QA_BASE_URL}}/politica-de-privacidad/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Términos y condiciones y política de privacidad enlazadas desde el footer, más la información de cookies asociada al banner de consentimiento. |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/terminos-y-condiciones/` | 200 | Términos y Condiciones :: Testing en Chile | H1 "Términos y Condiciones"; el cuerpo es solo el aviso de plantilla de Webnode |
| `/politica-de-privacidad/` | 200 | Política de privacidad :: Testing en Chile | H1 + 8 H2; plantilla de tienda online con marcadores entre corchetes sin completar |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Enlaces del footer "Términos y condiciones." y "Políticas de privacidad." | links | No | Presentes en todas las páginas inspeccionadas; `target=_blank` |
| Términos y Condiciones: cuerpo | texto | No | Comienza con "Aviso legal: como propietario de una tienda online, debe publicar usted mismo los Términos y Condiciones..." (texto de ayuda de Webnode) |
| Política de privacidad: secciones | H2 x8 | No | Normas generales; La fuente de los datos personales; Propósito del procesamiento de datos; Duración del almacenamiento de datos personales; Destinatarios y procesadores de datos personales; Derechos del cliente; Seguridad de datos personales; Disposiciones finales |
| Política de privacidad: contenido | texto | No | Menciona "La Tienda", pedidos y envíos, RGPD, "Empresa transportista"; responsable, identificación y contacto como marcadores vacíos |
| Meta description de ambas páginas | meta | No | Texto del footer con un símbolo de sobre seguido de "Consultas generales: contacto@..." |
| Política de cookies | - | - | No existe página ni enlace desde el banner |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| GET | `/terminos-y-condiciones/`, `/politica-de-privacidad/` | Páginas renderizadas en servidor |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-01 | Términos y Condiciones contiene solo el texto de ayuda de la plantilla de Webnode, sin términos propios del sitio, mientras el sitio vende cursos (botones de pago Flow) y entradas | `https://www.testingenchile.cl/terminos-y-condiciones/` (2026-11-21): cuerpo único: "Aviso legal: como propietario de una tienda online, debe publicar usted mismo los Términos y Condiciones..." | Defecto candidato (RN-LEG-002) |
| HC-02 | La Política de privacidad es una plantilla sin completar: responsable, identificación y contacto como marcadores entre corchetes, referencias a "La Tienda", pedidos, envíos, RGPD y "Empresa transportista"; no menciona los tratamientos reales observados (formularios de consulta con consentimiento "con fines comerciales", Google Ads/Analytics, reCAPTCHA, WhatsApp). No existe información de cookies enlazada desde el banner | `https://www.testingenchile.cl/politica-de-privacidad/` (2026-11-21): texto "La Tienda [...] en la página web [...] con número de identificación [...]"; banner de cookies sin enlaces | Defecto candidato (RN-LEG-003, RN-LEG-004, RN-LEG-005) |
| HC-11 | Meta description no representativa en ambas páginas legales | `https://www.testingenchile.cl/terminos-y-condiciones/` (2026-11-21): description = texto de contacto del footer | Recomendación |

## Preguntas abiertas

1. ¿Quién es el responsable del tratamiento de datos (razón social, RUT de la empresa, contacto) a declarar en la política? Necesario para fijar el contenido esperado.
2. ¿Las reglas RN-LEG-002 a RN-LEG-005 se confirman como requisitos (Ley 19.628 y su reforma por Ley 21.719)? Hasta su confirmación, HC-01 y HC-02 son defectos candidatos, no defectos.
3. Este análisis de QA no constituye una evaluación legal; el cumplimiento normativo debe validarlo el área legal.
