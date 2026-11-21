# Reglas de negocio - Capacitaciones: Bootcamp de Testing

> Módulo `CAP` | Submódulo `BTC` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-CAP-016: La fecha de "próximo inicio" anunciada es futura

- **Tipo**: Contenido / vigencia
- **Disparador**: Visualización del hero y del cierre
- **Comportamiento**: La fecha de inicio publicada es igual o posterior a la fecha actual; si la convocatoria cerró, el sitio lo indica.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Expectativa de vigencia. Hoy incumplida (HC-05).

### RN-CAP-017: Las anclas del hero desplazan a su sección

- **Tipo**: Navegación
- **Disparador**: Clic en "Quiero evaluar mi postulación" o "Ver la ruta de aprendizaje"
- **Comportamiento**: La URL pasa a `#btc-postula` o `#btc-ruta` y la sección correspondiente queda visible.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/bootcamp-de-testing/` (2026-11-21): URL `#btc-ruta` tras el clic; ambos `id` existen

### RN-CAP-018: El autodiagnóstico exige responder las cuatro preguntas

- **Tipo**: Validación
- **Disparador**: Clic en "Ver mi orientación" sin respuestas
- **Comportamiento**: No se muestra resultado (validación nativa `required`) y la URL no cambia.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/bootcamp-de-testing/` (2026-11-21): resultado oculto y URL sin cambios

### RN-CAP-019: El autodiagnóstico clasifica por puntaje

- **Tipo**: Cálculo
- **Disparador**: Envío del autodiagnóstico con las 4 respuestas
- **Comportamiento**: Suma de valores (0-2 por pregunta): >= 6 "Tu orientación: Muy alineada"; 3-5 "Con potencial de desarrollo"; 0-2 "Vale la pena conversar"; siempre con el enlace "Conocer cómo postular".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/bootcamp-de-testing/` (2026-11-21): puntajes 8, 3 y 0 producen los tres resultados
- **Notas**: Cálculo 100 % en el cliente; ningún dato llega al sitio.

### RN-CAP-020: Las preguntas frecuentes se expanden al hacer clic

- **Tipo**: Interacción
- **Disparador**: Clic en una pregunta
- **Comportamiento**: El `details` correspondiente pasa a `open`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/bootcamp-de-testing/` (2026-11-21): 5 preguntas; `open` false -> true

### RN-CAP-021: Los CTAs de contacto del Bootcamp usan canales válidos

- **Tipo**: Integración
- **Disparador**: Visualización del cierre
- **Comportamiento**: "Hablar por WhatsApp" apunta a `wa.me` con mensaje prellenado y "Consultar por correo" a `mailto:` con asunto "Postulación Bootcamp de Testing".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/bootcamp-de-testing/` (2026-11-21): href de ambos CTAs

