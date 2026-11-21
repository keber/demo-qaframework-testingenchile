# Reglas de negocio - Inicio y navegación global: Navegación global

> Módulo `HOME` | Submódulo `NAV` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-HOME-001: El menú principal muestra seis ítems en orden fijo

- **Tipo**: Navegación
- **Disparador**: Carga de cualquier página en escritorio
- **Comportamiento**: Se muestran Inicio, Capacitaciones, Testing Day Chile 2026, Blog, Fotogalería y Contacto, enlazados a `/`, `/capacitaciones2/`, `/testing-day-chile/`, `/blog/`, `/galeria/` y `/formulario-contacto/`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): menú visible a 1366x900 y 1920x1000
- **Notas**: El año del ítem de Testing Day es dato volátil.

### RN-HOME-002: El submenú de Testing Day se despliega al pasar el puntero

- **Tipo**: Navegación
- **Disparador**: Hover sobre "Testing Day Chile 2026" en escritorio
- **Comportamiento**: Aparece un panel con Agenda Online, Nuestros Sponsors 2026, Ediciones anteriores y Otras Actividades.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): captura con el panel desplegado a 1366x900

### RN-HOME-003: El tercer nivel de "Ediciones anteriores" da acceso a las ediciones pasadas

- **Tipo**: Navegación
- **Disparador**: Hover o clic sobre "Ediciones anteriores"
- **Comportamiento**: Se listan las ediciones (2025, 2024, 2022, 2023, 2021, Mega Testing Week 2020) y sus subpáginas, todas con HTTP 200.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): ítems presentes en el DOM y con HTTP 200; el despliegue por hover no se observó en headless
- **Notas**: Ver pregunta abierta 1.

### RN-HOME-004: En móvil el menú se ofrece en un panel con submenús expandibles

- **Tipo**: Navegación
- **Disparador**: Viewport móvil (Pixel 5, 393 px)
- **Comportamiento**: El botón "Menú" abre el panel con los seis ítems; "Abrir submenú" expande los cuatro ítems de Testing Day; el botón cerrar oculta el panel.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): panel abierto, expandido y cerrado en emulación Pixel 5

### RN-HOME-005: La barra superior ofrece contacto directo y redes

- **Tipo**: Contenido
- **Disparador**: Carga de cualquier página en escritorio
- **Comportamiento**: Se muestran íconos de Facebook, Twitter, Instagram y LinkedIn, el destacado "Bootcamp de Testing", un enlace `mailto:` a cursos@ y un enlace `tel:`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): barra superior en captura de escritorio

### RN-HOME-006: El footer contiene datos de contacto, redes y enlaces legales

- **Tipo**: Contenido
- **Disparador**: Carga de cualquier página
- **Comportamiento**: Se muestran los correos contacto@, eventos@ y cursos@, "Santiago de Chile", redes (LinkedIn, Instagram, Facebook, X), "Términos y condiciones.", "Políticas de privacidad.", "© 2026 Capacitaciones" y el enlace "Cookies".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): texto del footer en las 17 páginas inspeccionadas

### RN-HOME-007: Los enlaces a sitios externos abren en una pestaña nueva

- **Tipo**: Navegación
- **Disparador**: Clic en un enlace a red social o sitio de terceros
- **Comportamiento**: El enlace declara `target=_blank`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): redes del header y footer con `target=_blank`

### RN-HOME-008: La elección del banner de cookies se respeta y persiste

- **Tipo**: Consentimiento
- **Disparador**: Primera visita sin cookies
- **Comportamiento**: El banner aparece con "Aceptar solo lo necesario" y "Aceptar todo"; al elegir "solo lo necesario" se oculta, se guardan `cookieAccepted`/`cookieWarning` y no reaparece tras recargar. La etiqueta de Google envía `gcs=G100` (consentimiento denegado).
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): banner oculto tras la elección y tras recarga; cookies registradas

### RN-HOME-009: El enlace "Cookies" del footer permite revisar la elección

- **Tipo**: Consentimiento
- **Disparador**: Clic en "Cookies" del footer
- **Comportamiento**: El banner de cookies vuelve a mostrarse.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): banner visible tras el clic

### RN-HOME-010: El botón flotante de WhatsApp abre una conversación prellenada

- **Tipo**: Integración
- **Disparador**: Visualización de cualquier página
- **Comportamiento**: Existe un enlace `.whatsapp-float` con `aria-label="Consultar por WhatsApp"` hacia `wa.me` con parámetro `text`, `target=_blank`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): atributos del enlace; no se hizo clic (regla S7)

### RN-HOME-011: Una ruta inexistente responde 404 con navegación disponible

- **Tipo**: Error
- **Disparador**: Solicitud de una ruta que no existe
- **Comportamiento**: HTTP 404, título "404 - Página no encontrada :: Testing en Chile", H1 "404 - Página no encontrada" y menú principal visible.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/qa-pagina-inexistente-xyz/` (2026-11-21): status 404 y H1 observados

### RN-HOME-012: Las imágenes informativas tienen texto alternativo

- **Tipo**: Accesibilidad
- **Disparador**: Renderizado de imágenes
- **Comportamiento**: Toda imagen con significado (logo, logos de partners, fotos de contenido) declara un `alt` descriptivo; las decorativas usan `alt=""` explícito.
- **Origen**: ESTÁNDAR
- **Evidencia**: WCAG 2.1 criterio 1.1.1 (A). Incumplido: ver HC-08.
- **Notas**: El logo enlazado a `/` sin `alt` deja el enlace sin nombre accesible.

### RN-HOME-013: Los perfiles sociales enlazados son los oficiales y consistentes

- **Tipo**: Contenido
- **Disparador**: Enlaces a redes en cualquier página
- **Comportamiento**: Todas las páginas enlazan las mismas cuentas oficiales (misma URL de LinkedIn, misma red para X/Twitter).
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Ver HC-17.

### RN-HOME-014: Las redirecciones canónicas consolidan el dominio

- **Tipo**: SEO
- **Disparador**: Acceso por `http://`, por el dominio sin `www` o sin barra final
- **Comportamiento**: Responde 301 hacia `https://www.testingenchile.cl/{ruta}/`.
- **Origen**: OBSERVADO
- **Evidencia**: `http://testingenchile.cl/` (2026-11-21): 301 a `https://www.testingenchile.cl/`

### RN-HOME-015: El diseño móvil no genera desplazamiento horizontal

- **Tipo**: Responsivo
- **Disparador**: Viewport móvil
- **Comportamiento**: `scrollWidth` del documento igual a `clientWidth`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): 393/393 en Pixel 5

