# Reglas de negocio - Capacitaciones: Catálogo de capacitaciones

> Módulo `CAP` | Submódulo `CAT` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-CAP-001: El catálogo lista las capacitaciones vigentes como tarjetas

- **Tipo**: Contenido
- **Disparador**: Carga de `/capacitaciones2/`
- **Comportamiento**: Cada tarjeta muestra insignias, título, público objetivo y el enlace "Saber más" a su página de detalle (pestaña nueva). Observadas 15 tarjetas.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/capacitaciones2/` (2026-11-21): 15 H2 y 15 enlaces "Saber más"
- **Notas**: Cantidad volátil.

### RN-CAP-002: Los filtros de categoría restringen las tarjetas visibles sin recargar

- **Tipo**: Filtro
- **Disparador**: Clic en un filtro
- **Comportamiento**: Solo quedan visibles las tarjetas de la categoría; "Todos" restaura la lista completa. Observado: Todos 15, Certificaciones 4, Cursos 13, Bootcamp 1, IA 2, SAP 4, Automation 6, Performance 1.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/capacitaciones2/` (2026-11-21): conteo de tarjetas visibles por filtro

### RN-CAP-003: El filtro "Certificaciones" muestra exactamente las tarjetas con insignia "Certificación"

- **Tipo**: Filtro
- **Disparador**: Clic en "Certificaciones"
- **Comportamiento**: Se muestran AiU (GenAiA-TE), ISTQB CTFL 4.0, SeU (CSE) y PtU, que son las cuatro tarjetas con insignia "Certificación".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/capacitaciones2/` (2026-11-21): insignias y resultado del filtro coinciden

### RN-CAP-004: Todos los enlaces "Saber más" llevan a una página existente

- **Tipo**: Navegación
- **Disparador**: Clic en "Saber más"
- **Comportamiento**: El destino responde HTTP 200.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/capacitaciones2/` (2026-11-21): 15 de 15 destinos con HTTP 200

### RN-CAP-005: El catálogo ofrece contacto para convenio Sence

- **Tipo**: Integración
- **Disparador**: Visualización de la sección final
- **Comportamiento**: El botón "Hablemos" abre WhatsApp (`wa.me`) en pestaña nueva.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/capacitaciones2/` (2026-11-21): href `wa.me/569XXXX7767`
- **Notas**: El número difiere del general: ver HC-18.

### RN-CAP-006: El catálogo declara título, H1 y description descriptivos

- **Tipo**: SEO
- **Disparador**: Carga de la página
- **Comportamiento**: Título que identifica el catálogo y el sitio, un H1 y una description representativa.
- **Origen**: ESTÁNDAR
- **Evidencia**: Buenas prácticas SEO. Incumplido: ver HC-09 y HC-10.

