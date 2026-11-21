# MÓDULO: Inicio y navegación global - Submódulo: Navegación global

| Campo | Valor |
|---|---|
| Código de módulo | HOME |
| Código de submódulo | NAV |
| URL principal | `{{QA_BASE_URL}}/` |
| Estado | Activo (producción) |
| Última actualización | 2026-11-21 |
| Fuente de evidencia | Exploración en producción (solo lectura), 2026-11-21 |
| Alcance | Header (barra superior y menú principal), menú móvil, footer, banner de cookies, botón flotante de WhatsApp, página 404 y redirecciones canónicas. Elementos compartidos por todas las páginas del sitio. |

## Páginas y rutas observadas

| Ruta | HTTP | Título (`<title>`) | Notas |
|---|---|---|---|
| `/` | 200 | Testing en Chile | Página de inicio; header y footer compartidos |
| `/qa-pagina-inexistente-xyz/` | 404 | 404 - Página no encontrada :: Testing en Chile | Página 404 propia de Webnode con header y footer |
| `http://www.testingenchile.cl/` | 301 | - | Redirige a `https://www.testingenchile.cl/` |
| `https://testingenchile.cl/` | 301 | - | Redirige a `https://www.testingenchile.cl/` |
| `/capacitaciones2` (sin barra) | 301 | - | Redirige a `/capacitaciones2/` |
| `/robots.txt` | 200 | - | `Disallow: /servers/frontend/`, `Crawl-delay: 10`, referencia a `sitemap.xml` |
| `/sitemap.xml` | 200 | - | 182 URLs declaradas |

## Elementos de UI

| Elemento | Tipo | Obligatorio | Notas |
|---|---|---|---|
| Barra superior: íconos sociales | link (ícono, sin texto) | No | Facebook, Twitter, Instagram, LinkedIn; nombre accesible solo por atributo `title`; `target=_blank` |
| Barra superior: "Bootcamp de Testing" | texto con ícono | No | Destacado del header |
| Barra superior: correo | link `mailto:` | No | `mailto:cursos@testingenchile.cl` |
| Barra superior: teléfono | link `tel:` | No | Número comercial (se enmascara en specs: `+569XXXX0587`) |
| Logo | img | No | `alt=""` en todas las páginas; en páginas internas enlaza a `/` (`a.logo-link`) |
| Menú principal | navegación (6 ítems) | No | Inicio, Capacitaciones, Testing Day Chile 2026, Blog, Fotogalería, Contacto |
| Submenú "Testing Day Chile 2026" | desplegable (hover) | No | Agenda Online, Nuestros Sponsors 2026, Ediciones anteriores (con tercer nivel), Otras Actividades |
| Tercer nivel "Ediciones anteriores" | desplegable anidado | No | Ediciones 2025, 2024, 2022, 2023, 2021, Mega Testing Week 2020 y subpáginas; presente en el DOM, no desplegado por hover en Chromium headless |
| Botón "Menú" (móvil) | link `#` | No | Visible en viewport móvil (Pixel 5); abre panel lateral |
| Botón "Abrir submenú" (móvil) | button `.mm-arrow` (`aria-label`) | No | Expande los ítems de Testing Day en el panel móvil |
| Botón cerrar menú (móvil) | link `.menu-close` (`title="Close Menu"`) | No | Cierra el panel |
| Botón flotante WhatsApp | link `.whatsapp-float` | No | Texto "¡Hablemos por WhatsApp!", `aria-label="Consultar por WhatsApp"`, `wa.me` con mensaje prellenado, `target=_blank` |
| Footer: texto institucional y correos | texto | No | contacto@, eventos@ y cursos@ (dominio del sitio); "Santiago de Chile" |
| Footer: redes sociales | links | No | LinkedIn, Instagram, Facebook, X; `target=_blank` |
| Footer: legales | links | No | "Términos y condiciones." y "Políticas de privacidad.", `target=_blank` |
| Footer: "© 2026 Capacitaciones" | texto | No | Año vigente |
| Footer: "Cookies" | link `#` | No | Reabre el banner de cookies |
| Banner de cookies | diálogo | No | Texto "Utilizamos cookies..."; botones "Aceptar solo lo necesario" y "Aceptar todo"; sin enlace a política |

## Endpoints e integraciones

Sitio Webnode renderizado en servidor: no expone una API propia consumida por el navegador. Se registran las integraciones observadas; ninguna fue ejercida con envío de datos (regla S7).

| Método | Ruta / destino | Propósito |
|---|---|---|
| GET | Páginas HTML `/{ruta}/` | Contenido renderizado en servidor por Webnode (`Server: webnode`) |
| GET | `https://wa.me/569XXXX0587?text=...` | Conversación de WhatsApp con mensaje prellenado (no ejercido) |
| POST | `pagead2.googlesyndication.com/ccm/collect` | Etiqueta Google (Ads/Analytics) con modo de consentimiento: tras "solo lo necesario" envía `gcs=G100` y `npa=1` |
| - | Cookies `cookieAccepted`, `cookieWarning`, `PHPSESSID`, `preferred_lang` | Persistencia de la elección del banner y sesión técnica |

## Hallazgos candidatos

Observaciones reales con evidencia. Se clasificarán como defecto (`DEF-TCH-NNN`, si violan una regla de negocio) o recomendación (`REC-TCH-NNN`) en etapas posteriores. La numeración `HC-NN` es global (ver `qa/01-specifications/ANALISIS-DE-PRUEBAS.md`).

| ID | Descripción | Evidencia (URL + observación) | Clasificación propuesta |
|---|---|---|---|
| HC-08 | Imágenes sin texto alternativo, empezando por el logo del header (`alt=""`) presente en todas las páginas | `https://www.testingenchile.cl/` (2026-11-21): 25 imágenes, 4 sin `alt`, incluido el logo `wnd-logo-img` | Defecto candidato (RN-HOME-012, WCAG 1.1.1) |
| HC-17 | Perfiles sociales inconsistentes: el header/footer usan `linkedin.com/company/testingenchile` y otras páginas usan un perfil personal `linkedin.com/in/capti-de-testing-en-chile-...`; se mezclan "Twitter" (`twitter.com`) y "X" (`x.com`) | `https://www.testingenchile.cl/formulario-contacto/` (2026-11-21): enlace LinkedIn a perfil `/in/`; header con `twitter.com`, footer con `x.com` | Recomendación |

## Preguntas abiertas

1. El tercer nivel del menú ("Ediciones anteriores" -> ediciones por año) no se desplegó al pasar el puntero en Chromium headless (sí está en el DOM). Confirmar en navegador real si se despliega por hover o requiere clic.
2. ¿El banner de cookies debería enlazar a la política de cookies o de privacidad? Hoy no tiene enlaces.
3. ¿El ítem de menú "Testing Day Chile 2026" se renombrará para la próxima edición? Afecta a los textos esperados (dato volátil).
