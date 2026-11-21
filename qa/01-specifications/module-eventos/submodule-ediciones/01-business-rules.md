# Reglas de negocio - Eventos Testing Day: Ediciones anteriores

> Módulo `EVT` | Submódulo `EDI` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-EVT-013: La página de ediciones anteriores resume las ediciones 2016-2019

- **Tipo**: Contenido
- **Disparador**: Carga de la página
- **Comportamiento**: Se muestran los bloques Testing Day Chile 2019, 2018, 2017 y la participación en Córdoba Testing Day 2016.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/testing-day-chile-ediciones-anteriores/` (2026-11-21): H1 y H2 de los bloques

### RN-EVT-014: Las páginas de edición enlazadas desde el menú están publicadas

- **Tipo**: Navegación
- **Disparador**: Solicitud de cada página del tercer nivel del menú
- **Comportamiento**: HTTP 200.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): 16 páginas del tercer nivel "Ediciones anteriores" con HTTP 200

### RN-EVT-015: Los enlaces internos de las páginas de edición no están rotos

- **Tipo**: Navegación
- **Disparador**: Clic en un enlace interno
- **Comportamiento**: El destino responde HTTP 200.
- **Origen**: ESTÁNDAR
- **Evidencia**: Mantenimiento de enlaces. Incumplido: HC-03.

### RN-EVT-016: El título de cada página de edición corresponde a su año

- **Tipo**: SEO / Contenido
- **Disparador**: Carga de una página de edición
- **Comportamiento**: El `<title>` contiene el año de la edición que documenta la página.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Incumplido en `/entrevistas-sponsors-2021/` (HC-10).

### RN-EVT-017: La página de la edición 2025 enlaza a sus sponsors y muestra la entrevista

- **Tipo**: Contenido
- **Disparador**: Carga de `/testing-day-chile-2025/`
- **Comportamiento**: "¡Conócelos aquí!" lleva a `/nuestros-sponsors-2025/` (200) y existe un video embebido de YouTube (`youtube-nocookie`).
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/testing-day-chile-2025/` (2026-11-21): enlace e iframe presentes

### RN-EVT-018: Los enlaces de "edición más reciente" apuntan a la última edición publicada

- **Tipo**: Navegación
- **Disparador**: Clic en "Ver detalles de la edición más reciente"
- **Comportamiento**: El destino es la edición más reciente con página propia.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Hoy apunta a 2022 (HC-22).

