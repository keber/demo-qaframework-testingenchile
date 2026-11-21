# MÓDULO: Capacitaciones - Submódulo: Catálogo de capacitaciones

| Campo | Valor |
|---|---|
| Código de módulo | CAP |
| Código de submódulo | CAT |
| URL principal | `{{QA_BASE_URL}}/capacitaciones2/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Página de catálogo con tarjetas de cursos y certificaciones, filtros por categoría, enlaces "Saber más" y contacto por WhatsApp para convenio Sence. |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/capacitaciones2/` | 200 | Capacitaciones | Sin H1; 15 tarjetas (H2); description "Cursos, capacitaciones, entrenamientos, globales" |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Filtros de categoría | controles de filtro (cliente) | No | Todos, Certificaciones, Cursos, Bootcamp, IA, SAP, Automation, Performance; filtran sin recargar la página |
| Tarjeta de capacitación | tarjeta (x15) | No | Insignias de categoría y nivel (p. ej. "AUTOMATIZACIÓN", "Certificación", "Nivel avanzado"), título H2, público objetivo, "Saber más", "Programa Completo" |
| "Saber más" | link (x15) | No | Página de detalle del curso, `target=_blank` |
| "Hablemos" | link WhatsApp | No | `wa.me/569XXXX7767` (número distinto del general); junto a "Consulta por convenio Sence" |
| Imagen SENCE | img | No | Sin `alt` |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| GET | `/capacitaciones2/` | Catálogo renderizado en servidor; el filtrado es solo en el cliente (sin solicitudes) |
| GET | 15 páginas de detalle | Destinos de "Saber más", todos HTTP 200 |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-09 | El catálogo no tiene H1 | `https://www.testingenchile.cl/capacitaciones2/` (2026-11-21): solo H2 por tarjeta | Recomendación (RN-HOME-020) |
| HC-10 | Título genérico "Capacitaciones" y description poco descriptiva | `https://www.testingenchile.cl/capacitaciones2/` (2026-11-21): `<title>Capacitaciones</title>`, description "Cursos, capacitaciones, entrenamientos, globales" | Recomendación |
| HC-18 | El botón "Hablemos" usa un número de WhatsApp distinto del publicado en el resto del sitio | `https://www.testingenchile.cl/capacitaciones2/` (2026-11-21): `wa.me/569XXXX7767` frente a `wa.me/569XXXX0587` del botón flotante | Pregunta abierta (puede ser una línea Sence intencional) |

## Preguntas abiertas

1. ¿Cuál es el criterio del filtro "Cursos"? Incluye AiU e ISTQB (certificaciones con curso) pero excluye SeU (CSE) y PtU, que también son curso + examen.
2. ¿El número de WhatsApp del botón "Hablemos" (convenio Sence) es intencionalmente distinto del número general?
3. No se observó el catálogo en viewport móvil en esta sesión (TC-CAP-CAT-009 queda PENDING-BROWSER).
