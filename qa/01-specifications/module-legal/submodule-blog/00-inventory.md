# MÓDULO: Contenido legal y blog - Submódulo: Blog

| Campo | Valor |
|---|---|
| Código de módulo | LEG |
| Código de submódulo | BLG |
| URL principal | `{{QA_BASE_URL}}/blog/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Listado de artículos del blog, paginación y página individual de artículo. |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/blog/` | 200 | Blog - CapTI de Testing en Chile | Sin H1; meta description vacía; 10 artículos; 11/11 imágenes sin `alt` |
| `/blog/p-e0nza2ma/1/` | 200 | Blog - CapTI de Testing en Chile | Segunda página: 10 artículos (17.01.2025 a 20.06.2024); enlaces a `/blog/` y `/blog/p-e0nza2ma/2/` |
| `/l/{slug}/` | 200 | {Título} :: Testing en Chile | Artículo: 1 H1, fecha, contenido; 10 de 10 artículos de la primera página con HTTP 200 |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Tarjeta de artículo | imagen enlazada + H2 enlazado + fecha + extracto | No | Fecha en formato `dd.mm.aaaa` |
| "Artículos recientes" | link | No | En la primera página es `#`; en las siguientes apunta a `/blog/` |
| "Artículos antiguos" | link | No | `/blog/p-e0nza2ma/{n}/` |
| Artículo: encabezado | H1 + fecha | No | Ejemplo `/l/analisis-del-valor-frontera/`: H1 "Análisis del Valor Frontera", fecha 03.07.2025 |
| Artículo: navegación | links | No | Menú global con "Blog" -> `/blog/` |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| GET | `/blog/`, `/blog/p-e0nza2ma/{n}/`, `/l/{slug}/` | Páginas renderizadas en servidor |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-09 | El listado del blog no tiene H1 | `https://www.testingenchile.cl/blog/` (2026-11-21): solo H2 por artículo | Recomendación |
| HC-11 | Meta description vacía en el blog | `https://www.testingenchile.cl/blog/` (2026-11-21): `content=""` | Recomendación |
| HC-08 | Imágenes del listado sin texto alternativo | `https://www.testingenchile.cl/blog/` (2026-11-21): 11 de 11 imágenes sin `alt` | Defecto candidato (RN-HOME-012) |

## Preguntas abiertas

1. ¿El blog debe mostrar autor o categorías? No existen hoy; no se generan casos sobre ello.
