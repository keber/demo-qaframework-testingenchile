# Reglas de negocio - Contenido legal y blog: Blog

> Módulo `LEG` | Submódulo `BLG` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-LEG-007: El listado muestra artículos con título, fecha y extracto

- **Tipo**: Contenido
- **Disparador**: Carga de `/blog/`
- **Comportamiento**: Cada artículo muestra imagen, título enlazado a `/l/{slug}/`, fecha `dd.mm.aaaa` y extracto.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/blog/` (2026-11-21): 10 artículos

### RN-LEG-008: Los artículos se ordenan del más reciente al más antiguo

- **Tipo**: Orden
- **Disparador**: Carga del listado y de sus páginas
- **Comportamiento**: Las fechas son no crecientes dentro de cada página y entre páginas consecutivas.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/blog/` (2026-11-21): 04.09.2026 ... 26.03.2025; página siguiente 17.01.2025 ... 20.06.2024

### RN-LEG-009: El listado se pagina de a 10 artículos

- **Tipo**: Paginación
- **Disparador**: Clic en "Artículos antiguos" / "Artículos recientes"
- **Comportamiento**: "Artículos antiguos" lleva a la página siguiente (`/blog/p-e0nza2ma/{n}/`) y "Artículos recientes" vuelve a `/blog/`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/blog/p-e0nza2ma/1/` (2026-11-21): 10 artículos y enlaces de paginación

### RN-LEG-010: Cada artículo tiene su página con H1, fecha y contenido

- **Tipo**: Contenido
- **Disparador**: Clic en un título del listado
- **Comportamiento**: La página `/l/{slug}/` responde 200 con un H1 igual al título del listado, la fecha y el cuerpo.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/l/analisis-del-valor-frontera/` (2026-11-21): H1, fecha 03.07.2025 y contenido

### RN-LEG-011: El título del artículo sigue el patrón del sitio

- **Tipo**: SEO
- **Disparador**: Carga del artículo
- **Comportamiento**: `<title>` = "{título del artículo} :: Testing en Chile".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/blog/` (2026-11-21): 10 de 10 artículos con el patrón

### RN-LEG-012: El listado del blog tiene H1 y description

- **Tipo**: SEO
- **Disparador**: Carga de `/blog/`
- **Comportamiento**: Un H1 y una description no vacía.
- **Origen**: ESTÁNDAR
- **Evidencia**: Incumplido: HC-09, HC-11.

