# Reglas de negocio - Contacto y formularios: Página de contacto

> Módulo `CON` | Submódulo `FCO` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-CON-001: El ítem "Contacto" del menú lleva a la página de contacto

- **Tipo**: Navegación
- **Disparador**: Clic en "Contacto"
- **Comportamiento**: Se carga `/formulario-contacto/` con HTTP 200 y el encabezado "¡Hablemos!".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/formulario-contacto/` (2026-11-21): HTTP 200 y H1

### RN-CON-002: La página de contacto ofrece WhatsApp con mensaje prellenado

- **Tipo**: Integración
- **Disparador**: Visualización de la página
- **Comportamiento**: "¡Hablemos por WhatsApp!" apunta a `wa.me` con parámetro `text` y abre en pestaña nueva.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/formulario-contacto/` (2026-11-21): href del CTA

### RN-CON-003: La página de contacto enlaza las redes sociales oficiales

- **Tipo**: Contenido
- **Disparador**: Visualización de la sección de redes
- **Comportamiento**: Se muestran LinkedIn, Facebook, Instagram y Twitter con `target=_blank`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/formulario-contacto/` (2026-11-21): 4 enlaces
- **Notas**: La cuenta de LinkedIn difiere de la del footer (RN-HOME-013, HC-17).

### RN-CON-004: Los correos se publican por tipo de consulta

- **Tipo**: Contenido
- **Disparador**: Visualización del footer
- **Comportamiento**: Consultas generales -> contacto@; evento y sponsors -> eventos@; cursos y certificaciones -> cursos@.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/formulario-contacto/` (2026-11-21): texto del footer

### RN-CON-005: La página de contacto ofrece un formulario para escribir al sitio

- **Tipo**: Contenido
- **Disparador**: Visita a la página de contacto
- **Comportamiento**: Existe un formulario de contacto (o un canal escrito equivalente enlazado, como `mailto:`).
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Inferido de la ruta `/formulario-contacto/`. Hoy no existe (HC-12).

### RN-CON-006: La página de contacto tiene un único H1

- **Tipo**: SEO / Accesibilidad
- **Disparador**: Carga de la página
- **Comportamiento**: Exactamente un H1.
- **Origen**: ESTÁNDAR
- **Evidencia**: Ver RN-HOME-020. Incumplido: HC-09.

