# Reglas de negocio - Inicio y navegación global: Portada (página de inicio)

> Módulo `HOME` | Submódulo `POR` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-HOME-016: El hero ofrece acceso al catálogo y al Bootcamp

- **Tipo**: Navegación
- **Disparador**: Carga de la portada
- **Comportamiento**: "Ver Capacitaciones" lleva a `/capacitaciones2/` y "Bootcamp de Testing" a `/bootcamp-de-testing/` (pestaña nueva).
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): CTAs del hero en escritorio y móvil

### RN-HOME-017: Los contadores muestran cifras distintas de cero tras hacer scroll

- **Tipo**: Contenido
- **Disparador**: Scroll hasta la sección de contadores
- **Comportamiento**: Los cuatro contadores pasan de 0 a su valor final (observado: +879, +240, 10, +600).
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): valores tras 4 s de animación
- **Notas**: Valores volátiles; asertar cifra > 0.

### RN-HOME-018: La sección de servicios enlaza al catálogo y al contacto empresa

- **Tipo**: Navegación
- **Disparador**: Clic en un CTA de servicio
- **Comportamiento**: "Ver cursos" y "Ver certificaciones" llevan a `/capacitaciones2/`; "Solicitar cotización" lleva a `/contacto-empresa/`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): href de los tres CTAs

### RN-HOME-019: Las capacitaciones destacadas enlazan a su temario

- **Tipo**: Navegación
- **Disparador**: Clic en "Ver Temario"
- **Comportamiento**: Cada tarjeta lleva a una página de curso existente (HTTP 200).
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): `/curso-automatizacion-pruebas-software-web-selenium-java/`, `/new-curso-istqb/`, `/aiugenaia/` con HTTP 200

### RN-HOME-020: Cada página tiene un único H1 descriptivo

- **Tipo**: SEO / Accesibilidad
- **Disparador**: Renderizado de la página
- **Comportamiento**: La página expone exactamente un H1 que describe su contenido.
- **Origen**: ESTÁNDAR
- **Evidencia**: Buenas prácticas SEO y WCAG 2.1 1.3.1 / 2.4.6. Incumplido en la portada: ver HC-09.

### RN-HOME-021: La portada declara metadatos SEO completos

- **Tipo**: SEO
- **Disparador**: Carga de la portada
- **Comportamiento**: Título, meta description, `lang="es"`, canonical, `robots=index,follow` y Open Graph (título, descripción, imagen, URL) presentes y no vacíos.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/` (2026-11-21): todos presentes; description "Testing en Chile ofrece cursos online y certificaciones..."

