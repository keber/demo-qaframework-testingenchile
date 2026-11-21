# MÓDULO: Capacitaciones - Submódulo: Bootcamp de Testing

| Campo | Valor |
|---|---|
| Código de módulo | CAP |
| Código de submódulo | BTC |
| URL principal | `{{QA_BASE_URL}}/bootcamp-de-testing/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Landing del Bootcamp: hero con CTAs y anclas, datos del programa, perfiles, ruta de aprendizaje, autodiagnóstico de 4 preguntas (100 % en el cliente), preguntas frecuentes, CTAs de WhatsApp y correo, docentes y avisos. |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/bootcamp-de-testing/` | 200 | Bootcamp | 2 H1; 3 imágenes sin `alt`; description "Bootcamp que abarca el E2E de un proyecto real..." |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| "Quiero evaluar mi postulación" | link ancla | No | `#btc-postula` (existe) |
| "Ver la ruta de aprendizaje" | link ancla | No | `#btc-ruta` (existe); la URL pasa a `/bootcamp-de-testing/#btc-ruta` |
| Datos clave | texto | No | "5 meses de duración", "2 de noviembre de 2026 próximo inicio", "Grupos pequeños", "Sin experiencia previa" |
| Autodiagnóstico | form `#btc-quiz` (4 grupos radio `q1`-`q4`) | Sí (`required`) | Valores 0/1/2 por pregunta; botón "Ver mi orientación"; `preventDefault`, sin solicitudes al sitio |
| Resultado del autodiagnóstico | región `#btc-result` (`aria-live=polite`) | - | Puntaje >= 6 "Muy alineada"; >= 3 "Con potencial de desarrollo"; < 3 "Vale la pena conversar"; enlace "Conocer cómo postular" |
| Preguntas frecuentes | `details/summary` x5 | No | Se expanden al hacer clic |
| "Hablar por WhatsApp" / "Iniciar chat en WhatsApp" | link `wa.me` | No | Mensaje prellenado, `target=_blank` |
| "Consultar por correo" | link `mailto:` | No | `mailto:cursos@...?subject=Postulación Bootcamp de Testing` |
| Comunidad | link `chat.whatsapp.com` | No | "Únete haciendo clic" (grupo de WhatsApp) |
| Panel de WhatsApp propio | `#btc-waPanel` + botón `#btc-waToggle` | No | Script lo abre una vez por sesión a los 4 s; no se observó abierto en headless |
| Docentes | imágenes enlazadas | No | Nombres reales: no se versionan en datos |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| - | Autodiagnóstico | Cálculo en el cliente; no envía datos al sitio |
| POST | `pagead2.googlesyndication.com/pagead/conversion/...` | Al pulsar "Ver mi orientación" se dispara una conversión de Google Ads con `bttype=purchase` y `value=0` |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-05 | Fecha de inicio vencida: el Bootcamp anuncia "2 de noviembre de 2026 próximo inicio" e "Inicio: 2 de noviembre de 2026. Admisión por postulación." con fecha de observación 2026-11-21; los CTAs de postulación siguen activos | `https://www.testingenchile.cl/bootcamp-de-testing/` (2026-11-21): textos del hero y del cierre | Defecto candidato si se confirma RN-CAP-016; si no, recomendación |
| HC-21 | El botón "Ver mi orientación" registra una conversión de Google Ads de tipo "purchase" aunque no hay compra (también la disparan las pruebas automatizadas) | `https://www.testingenchile.cl/bootcamp-de-testing/` (2026-11-21): POST a `pagead2.googlesyndication.com/pagead/conversion/...` con `bttype=purchase` | Recomendación (calidad de datos analíticos) |
| HC-08 | Imágenes sin `alt` (logo del Bootcamp, medios de pago) | `https://www.testingenchile.cl/bootcamp-de-testing/` (2026-11-21): 3 de 11 imágenes sin `alt` | Defecto candidato (RN-HOME-012) |

## Preguntas abiertas

1. ¿La fecha "próximo inicio" debe ocultarse o actualizarse automáticamente al pasar? (RN-CAP-016 pendiente de confirmación).
2. ¿El panel propio de WhatsApp debe abrirse solo a los 4 s? No se observó abierto en Chromium headless.
3. ¿La conversión "purchase" del autodiagnóstico es intencional?
