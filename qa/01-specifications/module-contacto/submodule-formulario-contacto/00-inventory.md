# MÓDULO: Contacto y formularios - Submódulo: Página de contacto

| Campo | Valor |
|---|---|
| Código de módulo | CON |
| Código de submódulo | FCO |
| URL principal | `{{QA_BASE_URL}}/formulario-contacto/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Página enlazada desde el ítem "Contacto" del menú: CTA de WhatsApp, redes sociales y correos por tipo de consulta del footer. Pese a su ruta, la página no contiene formulario. |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/formulario-contacto/` | 200 | Contacto - Testing en Chile | 2 H1 ("¡Hablemos!" y "¿Quieres estar al tanto de nuestros próximos cursos y certificaciones?"); 0 formularios; 0 iframes; video de fondo |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| "¡Hablemos!" | H1 | No | Encabezado principal |
| "¡Hablemos por WhatsApp!" | link `wa.me` | No | Mensaje prellenado sobre el Bootcamp, `target=_blank` |
| Redes sociales | links (x4) | No | LinkedIn (perfil personal `/in/capti-...`), Facebook, Instagram, Twitter; `target=_blank` |
| Correos por tipo de consulta (footer) | texto (no enlazado) | No | Generales: contacto@; evento y Sponsor 2026: eventos@; cursos y certificaciones: cursos@ (dominio del sitio) |
| Formulario de contacto | - | - | No existe en la página (0 elementos `form`) |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| GET | `/formulario-contacto/` | Página renderizada en servidor |
| GET | `https://wa.me/569XXXX0587?text=...` | WhatsApp (no ejercido) |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-12 | La página de contacto del menú no ofrece formulario, a pesar de su ruta `/formulario-contacto/`; solo WhatsApp y redes. Los correos del footer son texto sin enlace `mailto:` | `https://www.testingenchile.cl/formulario-contacto/` (2026-11-21): 0 elementos `form`; correos del footer sin `<a>` | Recomendación / pregunta abierta (RN-CON-005) |
| HC-17 | El enlace de LinkedIn apunta a un perfil personal y no a la página de empresa usada en header y footer | `https://www.testingenchile.cl/formulario-contacto/` (2026-11-21): `linkedin.com/in/capti-de-testing-en-chile-...` | Recomendación |
| HC-09 | Dos H1 en la página de contacto | `https://www.testingenchile.cl/formulario-contacto/` (2026-11-21): H1 "¡Hablemos!" y H1 "¿Quieres estar al tanto...?" | Recomendación |

## Preguntas abiertas

1. ¿La página de contacto debe tener un formulario (como sugiere la ruta) o WhatsApp es el canal principal por decisión de negocio? Define RN-CON-005.
2. No se observó la página en viewport móvil en esta sesión.
