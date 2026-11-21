# Reglas de negocio - Contacto y formularios: Contacto empresa (B2B)

> Módulo `CON` | Submódulo `EMP` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-CON-007: El contacto empresa es accesible desde la portada

- **Tipo**: Navegación
- **Disparador**: Clic en "Solicitar cotización" de la portada
- **Comportamiento**: Se carga `/contacto-empresa/` con HTTP 200 y el H1 "Potencia a tu Equipo de QA".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): href del CTA y destino 200

### RN-CON-008: Todos los campos del formulario empresa son obligatorios

- **Tipo**: Validación
- **Disparador**: Intento de envío con campos vacíos
- **Comportamiento**: El formulario es inválido (`checkValidity()` = false) mientras falte Nombre, Email, Empresa, Código Sence, Número de personas o la capacitación de interés.
- **Mensaje de error**: Nativo del navegador; texto dependiente del navegador e idioma.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/contacto-empresa/` (2026-11-21): `required` en los 6 campos y `checkValidity()` = false sin enviar

### RN-CON-009: El email debe tener formato válido

- **Tipo**: Validación
- **Disparador**: Ingreso de un email sin "@"
- **Comportamiento**: El campo queda inválido.
- **Mensaje de error**: Nativo del navegador.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/contacto-empresa/` (2026-11-21): "qa-invalido" inválido

### RN-CON-010: El número de personas solo admite valores numéricos

- **Tipo**: Validación
- **Disparador**: Escritura de letras
- **Comportamiento**: El campo `number` no acepta letras.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/contacto-empresa/` (2026-11-21): "abc" no se puede ingresar

### RN-CON-011: El número de personas es un entero mayor o igual a 1

- **Tipo**: Validación
- **Disparador**: Ingreso de 0 o negativos
- **Comportamiento**: El campo queda inválido para valores menores que 1.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Expectativa de dominio (una solicitud B2B implica al menos 1 persona). Hoy incumplida (HC-13).

### RN-CON-012: Código Sence se elige entre tres opciones

- **Tipo**: Validación
- **Disparador**: Envío sin elegir opción
- **Comportamiento**: El grupo de radios es obligatorio con "Si", "No" y "Aún no sabemos".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/contacto-empresa/` (2026-11-21): radios `required`

### RN-CON-013: Un formulario que recolecta datos personales informa la política de privacidad

- **Tipo**: Cumplimiento
- **Disparador**: Visualización del formulario
- **Comportamiento**: El formulario incluye consentimiento o, al menos, un enlace a la política de privacidad vigente.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Ley 19.628 (Chile). Hoy no hay consentimiento ni enlace (HC-16).

### RN-CON-014: Las etiquetas del formulario tienen ortografía correcta

- **Tipo**: Contenido
- **Disparador**: Visualización del formulario
- **Comportamiento**: Etiquetas y opciones con tildes y signos correctos.
- **Origen**: ESTÁNDAR
- **Evidencia**: Norma ortográfica (RAE). Incumplido: HC-14.

### RN-CON-015: Los campos obligatorios se identifican visualmente

- **Tipo**: Accesibilidad
- **Disparador**: Visualización del formulario
- **Comportamiento**: Cada campo obligatorio muestra un indicador visible (asterisco o texto) además del atributo `required`.
- **Origen**: ESTÁNDAR
- **Evidencia**: WCAG 2.1 criterio 3.3.2 (A). Incumplido: HC-15.

### RN-CON-016: El formulario empresa está protegido por reCAPTCHA

- **Tipo**: Seguridad
- **Disparador**: Carga del formulario
- **Comportamiento**: Se renderiza el widget reCAPTCHA v2.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/contacto-empresa/` (2026-11-21): iframe `recaptcha/api2/anchor`

