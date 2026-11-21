# MÓDULO: Contenido legal y blog - Submódulo: Fotogalería

| Campo | Valor |
|---|---|
| Código de módulo | LEG |
| Código de submódulo | GAL |
| URL principal | `{{QA_BASE_URL}}/galeria/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Galería de fotos de eventos y cursos agrupada por álbum, con visor (lightbox PhotoSwipe). |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/galeria/` | 200 | Galería de Cursos, Eventos y capacitaciones - CapTI de Tesitng en Chile | 14 álbumes (H1/H2 mezclados); 572 imágenes, 558 sin `alt` |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Encabezado de álbum | H1/H2 | No | Ej. "10° Edición Testing Day Chile - 2026 \| Santiago", "9° Edición Testing Day Chile - 2025 \| Santiago", "Testing Day Chile 2017 - Primera Edición" |
| Miniatura | link a imagen (CDN) + img | No | Abre el visor; mayoría sin `alt` |
| Visor PhotoSwipe | diálogo `.pswp` | No | Contador "n / total" por álbum (observado "1 / 16"); flecha derecha avanza; Escape cierra |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| GET | `https://3af2bd36ef.clvaw-cdnwnd.com/...` | Imágenes del CDN de Webnode |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-10 | Error tipográfico en el título de la página | `https://www.testingenchile.cl/galeria/` (2026-11-21): `<title>` contiene "CapTI de Tesitng en Chile" | Recomendación |
| HC-08 | 558 de 572 imágenes de la galería sin texto alternativo | `https://www.testingenchile.cl/galeria/` (2026-11-21): conteo de `img` sin `alt` | Defecto candidato (RN-HOME-012) |
| HC-09 | Nueve H1 en la galería (uno por álbum, mezclados con H2) | `https://www.testingenchile.cl/galeria/` (2026-11-21): 9 H1 | Recomendación |

## Preguntas abiertas

1. No se observó la galería en móvil ni el gesto de deslizar del visor.
2. La página carga 572 imágenes: ¿se evaluará rendimiento? Fuera de alcance (no se generan pruebas de carga contra producción).
