# MÓDULO: Eventos Testing Day - Submódulo: Testing Day Chile (edición vigente)

| Campo | Valor |
|---|---|
| Código de módulo | EVT |
| Código de submódulo | TDY |
| URL principal | `{{QA_BASE_URL}}/testing-day-chile/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Página del evento Testing Day Chile 2026 (10.ª edición), Agenda Online y Nuestros Sponsors 2026: fechas, sede, agenda, sponsors por nivel, entradas (enlaces externos a ecopass), brochure de sponsors y hoteles de referencia. |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/testing-day-chile/` | 200 | Testing Day Chile - Evento de Testing y Calidad de Software GRATUITO | 1 H1 "TESTING DAY CHILE 2026"; 38 imágenes, 1 sin `alt` |
| `/agenda-online/` | 200 | Agenda Online :: Testing en Chile | Meta description vacía; 7 sesiones del 27 de agosto |
| `/nuestros-sponsors-2026/` | 200 | Nuestros sponsor | H1 vacío; 12/12 imágenes sin `alt` |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Hero del evento | H1 + texto | No | "10° EDICIÓN", "TESTING DAY CHILE 2026", "27 y 28 de Agosto", "Hotel Plaza San Francisco", "Santiago, Chile & Online", "+500 Asistentes" |
| "Asegura tu entrada" / "Comprar Entrada" | link externo | No | `ecopass.cl/events/pre-venta-testing-day-chile...`, `target=_blank` |
| "Convertirse en Sponsor" | link ancla | No | `#sponsors-cta` (existe) |
| Agenda presencial (28 de agosto) | lista de bloques | No | Horario "HH:MM - HH:MM", tipo (ACREDITACIÓN, APERTURA, Charla, PAUSA), país, título, descripción |
| "Ver Agenda Completa e Inscribirse" | link | No | `/agenda-online/` |
| Sponsors oficiales | H3 por nivel + logos enlazados | No | PLATINUM, ORO, PLATA, BRONCE; logos a sitios externos (`target=_blank`) |
| "Conoce más de nuestros sponsors" | link | No | `/nuestros-sponsors-2026/` |
| "Solicitar Brochure Ver Planes de Sponsor" | link `mailto:` | No | `mailto:eventos@...?subject=Solicitud de Brochure - Planes de Sponsor Testing Day 2026` |
| Entradas | 2 tarjetas | No | "Entrada Online" (GRATUITO, "Inscribirse" -> `/agenda-online/`) y "Entrada Presencial" ("Comprar Entrada" -> ecopass) |
| Hoteles de referencia | logos enlazados | No | Sitios externos de hoteles |
| Agenda Online: sesión | tarjeta (x7) | No | Horario, tipo (TALLER/CHARLA), país, speaker, título, descripción, "Inscribirse" (`streamyard.com/watch/...`) |
| Agenda Online: "Ir al Evento Presencial" | link externo | No | ecopass |
| Sponsors 2026: tarjeta de sponsor | logo + texto + enlaces | No | "Sitio web", "LinkedIn", "Instagram"; tarjeta de cupo libre "Tu sitio"/"Tu linkedin" |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| GET | `https://www.ecopass.cl/events/pre-venta-testing-day-chile,-celebramos-10%C2%B0-edicin/18032` | Venta de entradas (HTTP 200; no ejercida) |
| GET | `https://streamyard.com/watch/{id}` | Transmisión/inscripción online (3 de 4 enlaces únicos con 404) |
| GET | Sitios de sponsors, comunidades y hoteles | Enlaces externos (ver hallazgos) |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-04 | El evento 2026 (27 y 28 de agosto) ya ocurrió, pero la página mantiene "Asegura tu entrada", "Comprar Entrada" (pre-venta) e "Inscribirse", y el menú sigue anunciando "Testing Day Chile 2026" | `https://www.testingenchile.cl/testing-day-chile/` (2026-11-21): CTAs activos; el blog confirma el 04.09.2026 que el evento "celebró en 2026 su 10.ª edición" | Recomendación (dato volátil); defecto si se confirma RN-EVT-010 |
| HC-06 | Tres de los cuatro enlaces únicos "Inscribirse" de la Agenda Online devuelven 404 | `https://www.testingenchile.cl/agenda-online/` (2026-11-21): `streamyard.com/watch/d2Y5CqepHVu6`, `.../fxfpYcRcykN7`, `.../zcWQhitGTYXW` con HTTP 404 | Defecto candidato (RN-EVT-009) |
| HC-07 | Enlace de logo a un dominio inexistente y sitio de hotel sin respuesta | `https://www.testingenchile.cl/testing-day-chile/` (2026-11-21): `mendezdistribucion.com` sin registro DNS (NXDOMAIN, verificado con 8.8.8.8); `www.hotelvegassantiago.com` sin conexión (timeout 21 s, a reverificar) | Defecto candidato (RN-EVT-009) |
| HC-19 | Errores tipográficos en Sponsors 2026 | `https://www.testingenchile.cl/nuestros-sponsors-2026/` (2026-11-21): "QAlifield" (el sponsor es "QAlified"), "nuestramisión", "acompañándolosen" | Recomendación |
| HC-20 | El título anuncia el evento como "GRATUITO" aunque la entrada presencial es pagada | `https://www.testingenchile.cl/testing-day-chile/` (2026-11-21): `<title>` con "GRATUITO"; tarjeta "Entrada Presencial" con "Comprar Entrada"; solo la online es gratuita | Recomendación |
| HC-10 | Título "Nuestros sponsor" (concordancia) en Sponsors 2026 | `https://www.testingenchile.cl/nuestros-sponsors-2026/` (2026-11-21): `<title>Nuestros sponsor</title>` | Recomendación |
| HC-11 | Meta description vacía en Agenda Online | `https://www.testingenchile.cl/agenda-online/` (2026-11-21): `<meta name="description" content="">` | Recomendación |
| HC-09 | H1 vacío en Sponsors 2026 | `https://www.testingenchile.cl/nuestros-sponsors-2026/` (2026-11-21): elemento H1 sin texto | Recomendación |
| HC-08 | Logos de sponsors sin texto alternativo | `https://www.testingenchile.cl/nuestros-sponsors-2026/` (2026-11-21): 12 de 12 imágenes sin `alt` | Defecto candidato (RN-HOME-012) |

## Preguntas abiertas

1. ¿Qué debe mostrar `/testing-day-chile/` entre ediciones (evento finalizado, "próximamente", fecha de la siguiente edición)? Define RN-EVT-010.
2. Los enlaces de StreamYard, ¿deben redirigir a las grabaciones tras el evento?
3. ¿La tarjeta "Tu sitio / Tu linkedin" de Sponsors 2026 es un cupo comercial intencional?
