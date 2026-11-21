# MÓDULO: Inicio y navegación global - Submódulo: Portada (página de inicio)

| Campo | Valor |
|---|---|
| Código de módulo | HOME |
| Código de submódulo | POR |
| URL principal | `{{QA_BASE_URL}}/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Contenido propio de la página de inicio: hero con CTAs, contadores, servicios, capacitaciones destacadas, testimonios, partners y metadatos SEO. |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/` | 200 | Testing en Chile | `lang="es"`, canonical `https://www.testingenchile.cl/`, `robots=index,follow`, 5 elementos H1 |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Hero: títulos | H1 x2 | No | "Bootcamp de Testing" y "¿QUIERES TRABAJAR EN TESTING DE SOFTWARE, PERO TE PIDEN EXPERIENCIA QUE AÚN NO TIENES?" |
| CTA "Ver Capacitaciones" | link | No | `/capacitaciones2/` |
| CTA "Bootcamp de Testing" | link | No | `/bootcamp-de-testing/`, `target=_blank` |
| Contadores | texto animado | No | Inician en 0 y se animan al hacer scroll: +879 Profesionales Capacitados, +240 Cursos Impartidos, 10 Ediciones Testing Day Chile, +600 Miembros en la Comunidad |
| "¿Qué es Testing en Chile?" | H2 + lista | No | Empresa Formadora, Comunidad Activa, ... |
| "Nuestros Servicios" | H1 + 3 tarjetas | No | Capacitaciones QA ("Ver cursos"), Certificaciones ("Ver certificaciones"), Servicios Empresas (B2B) ("Solicitar cotización" -> `/contacto-empresa/`) |
| "Capacitaciones Destacados" | H1 + 3 tarjetas | No | Selenium Webdriver..., ISTQB® CTFL 4.0..., AiU Certified GenAI...; "Ver Temario" a páginas de curso |
| "Ir a todas las Capacitaciones" | link | No | `/capacitaciones2/` |
| "Lo que dice nuestra comunidad" | H2 + testimonios | No | Sección de testimonios |
| "Nuestros Partners" / "Han confiado en nosotros" | H1/H2 + logos | No | Carrusel de logos duplicado; 2 logos de partners sin `alt` |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| GET | `/` | Página de inicio renderizada en servidor |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-08 | Logos de partners sin texto alternativo en la portada | `https://www.testingenchile.cl/` (2026-11-21): imágenes `chiletec_logo.jpeg` y `brightest_logo-7.png` con `alt=""` | Defecto candidato (RN-HOME-012) |
| HC-09 | Cinco elementos H1 en la portada (jerarquía de encabezados inválida para SEO y lectores de pantalla) | `https://www.testingenchile.cl/` (2026-11-21): H1: "Bootcamp de Testing", "¿QUIERES TRABAJAR...", "Nuestros Servicios", "Capacitaciones Destacados", "Nuestros Partners" | Recomendación (RN-HOME-020) |

## Preguntas abiertas

1. ¿Los valores de los contadores (+879, +240, 10, +600) tienen una fuente de verdad que deba validarse, o son texto de marketing?
