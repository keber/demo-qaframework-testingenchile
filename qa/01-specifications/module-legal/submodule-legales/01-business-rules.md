# Reglas de negocio - Contenido legal y blog: Páginas legales

> Módulo `LEG` | Submódulo `LGL` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-LEG-001: Las páginas legales son accesibles desde el footer de todo el sitio

- **Tipo**: Navegación
- **Disparador**: Clic en "Términos y condiciones." o "Políticas de privacidad."
- **Comportamiento**: Abre la página correspondiente en pestaña nueva con HTTP 200.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): enlaces en el footer de las 17 páginas inspeccionadas; destinos 200

### RN-LEG-002: Los Términos y Condiciones describen la relación real con el usuario

- **Tipo**: Cumplimiento / contenido
- **Disparador**: Lectura de la página
- **Comportamiento**: El texto identifica al prestador, los servicios (cursos, certificaciones, entradas), condiciones de pago, devoluciones y facturación, y no contiene texto de ayuda de la plantilla.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Ley 19.496 (protección al consumidor) y buenas prácticas. Incumplido: HC-01.

### RN-LEG-003: La política de privacidad identifica al responsable y un canal para ejercer derechos

- **Tipo**: Cumplimiento / contenido
- **Disparador**: Lectura de la página
- **Comportamiento**: Declara responsable, datos de contacto y el procedimiento para ejercer derechos de acceso, rectificación, cancelación y oposición; sin marcadores sin completar.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Ley 19.628 (Chile). Incumplido: HC-02.

### RN-LEG-004: La política de privacidad describe los tratamientos que el sitio realiza

- **Tipo**: Cumplimiento / contenido
- **Disparador**: Lectura de la página
- **Comportamiento**: Menciona los datos recolectados por los formularios (nombre, email, teléfono, empresa), su finalidad (incluida la comercial declarada en la casilla) y los terceros observados (Webnode, Google, reCAPTCHA).
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Coherencia con los formularios observados en CAP y CON. Incumplido: HC-02.

### RN-LEG-005: La información de cookies es accesible desde el banner

- **Tipo**: Cumplimiento / consentimiento
- **Disparador**: Visualización del banner de cookies
- **Comportamiento**: El banner enlaza a una política de cookies o a la sección correspondiente de la política de privacidad.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Buenas prácticas de consentimiento. Incumplido: el banner no tiene enlaces (HC-02).

### RN-LEG-006: Las páginas legales tienen título, H1 y description representativos

- **Tipo**: SEO
- **Disparador**: Carga de la página
- **Comportamiento**: Título y H1 coherentes con el documento y description que lo resuma.
- **Origen**: ESTÁNDAR
- **Evidencia**: Título y H1 correctos (observado); description no representativa (HC-11).

