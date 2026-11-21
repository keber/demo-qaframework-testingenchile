# Reglas de negocio - Contenido legal y blog: Fotogalería

> Módulo `LEG` | Submódulo `GAL` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-LEG-013: La galería agrupa fotos por álbum con encabezado

- **Tipo**: Contenido
- **Disparador**: Carga de `/galeria/`
- **Comportamiento**: Cada álbum tiene un encabezado descriptivo seguido de sus miniaturas; el más reciente aparece primero.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/galeria/` (2026-11-21): álbum 2026 primero, luego 2025, 2023...

### RN-LEG-014: Una miniatura abre el visor en la foto elegida

- **Tipo**: Interacción
- **Disparador**: Clic en una miniatura
- **Comportamiento**: Se abre el visor (`.pswp--open`) con contador "1 / N" del álbum, sin cambiar la URL.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/galeria/` (2026-11-21): contador "1 / 16"

### RN-LEG-015: El visor permite avanzar y cerrar con teclado

- **Tipo**: Interacción / accesibilidad
- **Disparador**: Flecha derecha y Escape con el visor abierto
- **Comportamiento**: Flecha derecha avanza el contador; Escape cierra el visor.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/galeria/` (2026-11-21): "2 / 16" tras flecha derecha; visor cerrado tras Escape

### RN-LEG-016: El título de la galería es correcto

- **Tipo**: SEO / contenido
- **Disparador**: Carga de la página
- **Comportamiento**: El `<title>` no contiene errores tipográficos y nombra el sitio correctamente.
- **Origen**: ESTÁNDAR
- **Evidencia**: Incumplido: "Tesitng" (HC-10).

### RN-LEG-017: Las fotos de la galería tienen texto alternativo

- **Tipo**: Accesibilidad
- **Disparador**: Renderizado de miniaturas
- **Comportamiento**: Cada imagen tiene `alt` descriptivo (al menos el nombre del álbum).
- **Origen**: ESTÁNDAR
- **Evidencia**: Ver RN-HOME-012. Incumplido: HC-08.

