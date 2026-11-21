# Reglas de negocio - Capacitaciones: Detalle de curso

> Módulo `CAP` | Submódulo `CUR` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-CAP-007: Cada página de curso enlazada desde el catálogo está publicada

- **Tipo**: Contenido
- **Disparador**: Solicitud de la página de detalle
- **Comportamiento**: HTTP 200 con título de página y contenido del curso.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/capacitaciones2/` (2026-11-21): 15 de 15 destinos con 200

### RN-CAP-008: El formulario de consulta exige nombre, e-mail, mensaje y consentimiento

- **Tipo**: Validación
- **Disparador**: Intento de envío con campos vacíos
- **Comportamiento**: El formulario es inválido (`checkValidity()` = false) mientras falten "Nombre y Apellido", "E-mail", "Mensaje" o el consentimiento; "Celular" es opcional.
- **Mensaje de error**: Nativo del navegador (p. ej. "Please fill out this field." en Chromium en inglés).
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/curso-automatizacion-pruebas-software-web-selenium-java/` (2026-11-21): atributos `required` y `checkValidity()` sin enviar
- **Notas**: Validación nativa del navegador; el texto del mensaje depende del navegador e idioma.

### RN-CAP-009: El e-mail debe tener formato válido

- **Tipo**: Validación
- **Disparador**: Ingreso de un e-mail sin "@"
- **Comportamiento**: El campo queda inválido (`validity.valid` = false); un e-mail sintético válido lo deja válido.
- **Mensaje de error**: Nativo del navegador ("Please include an '@'...").
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/aiugenaia/` (2026-11-21): "qa-invalido" inválido; "qa.visitante@example.com" válido

### RN-CAP-010: El celular admite solo dígitos y los signos . + - ( ) y espacio

- **Tipo**: Validación
- **Disparador**: Ingreso de letras en "Celular"
- **Comportamiento**: El campo queda inválido por `pattern`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/curso-automatizacion-pruebas-software-web-selenium-java/` (2026-11-21): "abc" inválido

### RN-CAP-011: Límites de longitud de los campos de texto

- **Tipo**: Validación
- **Disparador**: Escritura en los campos
- **Comportamiento**: "Nombre y Apellido" acepta hasta 150 caracteres y "E-mail" hasta 255 (`maxlength`).
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/aiugenaia/` (2026-11-21): atributos `maxlength`

### RN-CAP-012: En AiU el asunto es obligatorio y tiene tres opciones

- **Tipo**: Validación
- **Disparador**: Envío sin elegir asunto
- **Comportamiento**: El select "Asunto | Elige una opción" es `required` con las opciones "Inscripción formación Gen AiA-TE", "Más Información Gen AiA-TE" y "Otra pregunta".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/aiugenaia/` (2026-11-21): opciones del select

### RN-CAP-013: El formulario está protegido por reCAPTCHA

- **Tipo**: Seguridad
- **Disparador**: Carga del formulario
- **Comportamiento**: Se renderiza el widget reCAPTCHA v2; el envío requiere resolverlo.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/new-curso-istqb/` (2026-11-21): iframes `recaptcha/api2/anchor` y `bframe`
- **Notas**: Por diseño, el envío no es automatizable; además está prohibido por S7.

### RN-CAP-014: El pago se realiza en una pasarela externa en pestaña nueva

- **Tipo**: Integración
- **Disparador**: Clic en el botón de pago
- **Comportamiento**: El enlace apunta a `https://www.flow.cl/btn.php?token=...` con `target=_blank`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/new-curso-istqb/` (2026-11-21): href del botón "CURSO + EXAMEN"
- **Notas**: Nunca se hace clic: transacción real.

### RN-CAP-015: El consentimiento de datos enlaza a una política de privacidad vigente

- **Tipo**: Cumplimiento
- **Disparador**: Visualización de la casilla de consentimiento
- **Comportamiento**: La casilla o su texto enlaza a la política de privacidad del sitio con contenido real.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Ley 19.628 sobre protección de la vida privada (Chile). Hoy no hay enlace (HC-16) y la política es una plantilla (HC-02).

