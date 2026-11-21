# MÓDULO: Eventos Testing Day - Submódulo: Ediciones anteriores

| Campo | Valor |
|---|---|
| Código de módulo | EVT |
| Código de submódulo | EDI |
| URL principal | `{{QA_BASE_URL}}/testing-day-chile-ediciones-anteriores/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Página resumen de ediciones 2016-2019 y las páginas por edición accesibles desde el menú (2021-2025, Mega Testing Week 2020, agendas, charlas, entrevistas, speakers, sponsors 2025, notas y reconocimiento a la innovación) y "Otras Actividades". |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/testing-day-chile-ediciones-anteriores/` | 200 | Testing Day Chile - Ediciones anteriores | H1 2019, 2018, 2017; H2 Córdoba 2016; 4/4 imágenes sin `alt` |
| `/testing-day-chile-2025/` | 200 | Testing Day Chile 2025 | H1 vacío; 13/13 imágenes sin `alt`; video embebido |
| `/notas-testing-day/`, `/primer-lugar-innovacion/`, `/speakers25/`, `/agenda2025/`, `/nuestros-sponsors-2025/` | 200 | "Notas - Testing Day :: Testing en Chile", "Primer lugar Innovación :: ...", "Speakers-2025", "Agenda", "Sponsor 2025" | `/agenda2025/` sin H1 |
| `/testing-day-chile-2024/`, `/mega-testing-week/` | 200 | "Testing Day Chile 2024 :: Testing en Chile", "Mega Testing Week 2020" |  |
| `/testing-day-chile-2022/`, `/entrevistas-sponsors-2022/`, `/charlas-talleres-testing-day-chile-2022/` | 200 | Varios | Charlas 2022 con 18 H1 |
| `/testing-day-chile-2023/`, `/agenda-testing-day-chile-2023/` | 200 | Varios |  |
| `/testing-day-chile-2021/`, `/charlas-talleres-testing-day-chile-2021/`, `/entrevistas-sponsors-2021/` | 200 | "... 2021", "Entrevistas a Sponsors - Testing Day Chile 2022" | El título de la página 2021 dice 2022 |
| `/actividades-otras-comunidades-testing-qa/` | 200 | Actividades con otras comunidades de Testing y QA |  |
| `/testing-day-en-latam-2018/` | 404 | 404 - Página no encontrada | Destino de "Saber más de esta edición" |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Bloques por edición (2019, 2018, 2017, Córdoba 2016) | H1/H2 + texto + imagen | No | Menciones a speakers con enlaces a LinkedIn (datos personales: no se versionan) |
| "Ver lo más destacado" | link externo | No | Resumen 2019 en un blog externo (HTTP 200) |
| "Saber más de esta edición" | link interno | No | `/testing-day-en-latam-2018/` -> 404 |
| "Ver detalles de la edición más reciente" | link interno | No | Apunta a `/testing-day-chile-2022/` aunque existen 2023, 2024 y 2025 |
| Redes sociales del bloque final | links | No | LinkedIn de perfil personal `/in/capti-...`, Instagram, Facebook, Twitter |
| Páginas de edición 2025 | contenido + video + logos | No | Reconocimiento a la innovación, entrevista (YouTube), "¡Conócelos aquí!" -> `/nuestros-sponsors-2025/`, comunidades |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| GET | 16 páginas de edición + resumen | Todas HTTP 200 salvo el destino roto de 2018 |
| GET | `https://www.youtube-nocookie.com/embed/...` | Videos embebidos |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-03 | Enlace interno roto "Saber más de esta edición" | `https://www.testingenchile.cl/testing-day-chile-ediciones-anteriores/` (2026-11-21): destino `/testing-day-en-latam-2018/` responde HTTP 404 | Defecto candidato (RN-EVT-015) |
| HC-10 | Título con año incorrecto y títulos genéricos en páginas de edición | `https://www.testingenchile.cl/entrevistas-sponsors-2021/` (2026-11-21): `<title>Entrevistas a Sponsors - Testing Day Chile 2022</title>` en la página de 2021; "Agenda" en `/agenda2025/`; "Speakers-2025" | Defecto candidato para el año incorrecto (RN-EVT-016); recomendación para el resto |
| HC-22 | "Ver detalles de la edición más reciente" apunta a la edición 2022 | `https://www.testingenchile.cl/testing-day-chile-ediciones-anteriores/` (2026-11-21): href `/testing-day-chile-2022/` con ediciones 2023-2025 publicadas | Recomendación / pregunta abierta |
| HC-09 | H1 vacío, ausente o múltiple en páginas de edición | `https://www.testingenchile.cl/charlas-talleres-testing-day-chile-2022/` (2026-11-21): 18 H1; `/agenda2025/` sin H1; `/testing-day-chile-2025/` H1 vacío | Recomendación |
| HC-08 | Imágenes sin `alt` en páginas de edición | `https://www.testingenchile.cl/testing-day-chile-2025/` (2026-11-21): 13 de 13 imágenes sin `alt` | Defecto candidato (RN-HOME-012) |

## Preguntas abiertas

1. ¿Existe un reemplazo para `/testing-day-en-latam-2018/` o debe retirarse el enlace?
2. "Ver detalles de la edición más reciente": ¿debe apuntar a la última edición publicada (2025) o el texto es histórico?
