# MÓDULO: Contacto y formularios - Submódulo: Contacto empresa (B2B)

| Campo | Valor |
|---|---|
| Código de módulo | CON |
| Código de submódulo | EMP |
| URL principal | `{{QA_BASE_URL}}/contacto-empresa/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Formulario de solicitud de capacitación para empresas. Solo se verifica presencia de campos y validación en el cliente con datos sintéticos; nunca se envía (regla 1 del proyecto, S7). |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/contacto-empresa/` | 200 | Contacto empresa :: Testing en Chile | H1 "Potencia a tu Equipo de QA"; description "Diseñamos planes de formación a medida..."; formulario renderizado tras la carga (esperar con aserción web-first) |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Nombre | text | Sí (`required`) | `maxlength=150`; sin asterisco visible |
| Email | email | Sí (`required`) | `maxlength=255`; validación nativa de formato |
| Empresa | text | Sí (`required`) | `maxlength=150` |
| Código Sence | radio (3 opciones) | Sí (`required`) | "Si" (sin tilde), "No", "Aún no sabemos" |
| Número de personas | number | Sí (`required`) | Sin `min`/`max`: acepta -5, 0 y 100000 como válidos; no admite letras |
| "Indícanos que capacitación estas interesado" | textarea | Sí (`required`) | Etiqueta sin tildes en "qué" y "estás" |
| reCAPTCHA v2 | iframe Google | Sí (implícito) | Impide el envío automatizado |
| Consentimiento de datos | - | - | No existe en este formulario |
| "Enviar" | button submit | - | NUNCA se ejecuta (regla S7) |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| POST | Misma URL (`action=""`) | Envío Webnode (no ejercido) |
| GET | `https://www.google.com/recaptcha/api2/anchor` | reCAPTCHA |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-13 | "Número de personas" acepta cero y negativos | `https://www.testingenchile.cl/contacto-empresa/` (2026-11-21): `-5` y `0` con `validity.valid` = true; sin atributos `min`/`max` | Recomendación (o defecto si se confirma RN-CON-011) |
| HC-14 | Ortografía en etiquetas del formulario | `https://www.testingenchile.cl/contacto-empresa/` (2026-11-21): "Indícanos que capacitación estas interesado" (correcto: "qué", "estás", "en qué ... estás interesado"); opción "Si" (correcto: "Sí") | Recomendación |
| HC-15 | Campos obligatorios sin indicador visual | `https://www.testingenchile.cl/contacto-empresa/` (2026-11-21): los 6 campos son `required` y ninguna etiqueta muestra asterisco ni texto "obligatorio" | Recomendación (WCAG 3.3.2) |
| HC-16 | El formulario recolecta datos personales (nombre, email) sin casilla de consentimiento ni enlace a la política de privacidad | `https://www.testingenchile.cl/contacto-empresa/` (2026-11-21): sin checkbox ni enlace en el formulario | Recomendación; ver HC-02 |

## Preguntas abiertas

1. ¿Cuál es el rango válido de "Número de personas" (mínimo 1, máximo)? Define RN-CON-011.
2. ¿Qué confirmación muestra un envío exitoso? No observable sin enviar (S7).
3. ¿El formulario B2B debe pedir consentimiento explícito como los formularios de curso? Define RN-CON-013.
