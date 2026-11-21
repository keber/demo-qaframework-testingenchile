# Reglas de negocio - Eventos Testing Day: Testing Day Chile (edición vigente)

> Módulo `EVT` | Submódulo `TDY` | Última actualización: 2026-11-21
>
> No existe documentación funcional del sitio. Cada regla declara su **origen**: `OBSERVADO` (comportamiento visto en la UI), `ESTÁNDAR` (HTML, WCAG 2.1 o buenas prácticas SEO aplicables a todo sitio público) o `PENDIENTE-CONFIRMACIÓN` (expectativa razonable que debe validar el responsable del sitio antes de usarse para declarar un defecto).

### RN-EVT-001: La página del evento presenta edición, fechas, sede y CTAs

- **Tipo**: Contenido
- **Disparador**: Carga de `/testing-day-chile/`
- **Comportamiento**: Se muestran la edición, las fechas (online y presencial), la sede y los CTAs de entrada y sponsor.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/testing-day-chile/` (2026-11-21): "10° EDICIÓN", "27 y 28 de Agosto", "Hotel Plaza San Francisco"

### RN-EVT-002: La compra de entradas se hace en ecopass en pestaña nueva

- **Tipo**: Integración
- **Disparador**: Clic en "Asegura tu entrada" o "Comprar Entrada"
- **Comportamiento**: El enlace apunta al host `www.ecopass.cl` con `target=_blank`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/testing-day-chile/` (2026-11-21): href y target de los dos CTAs
- **Notas**: Nunca se hace clic (transacción real).

### RN-EVT-003: "Convertirse en Sponsor" lleva a la sección de sponsors

- **Tipo**: Navegación
- **Disparador**: Clic en el CTA
- **Comportamiento**: La página se desplaza a `#sponsors-cta`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/testing-day-chile/` (2026-11-21): `id="sponsors-cta"` presente

### RN-EVT-004: La agenda presencial lista bloques con horario y título

- **Tipo**: Contenido
- **Disparador**: Visualización de "Conoce nuestra Agenda"
- **Comportamiento**: Cada bloque muestra un rango "HH:MM - HH:MM", un tipo y un título; las pausas se identifican como "PAUSA".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/testing-day-chile/` (2026-11-21): bloques desde 08:30 - 09:00 "ACREDITACIÓN"

### RN-EVT-005: La agenda completa está en Agenda Online

- **Tipo**: Navegación
- **Disparador**: Clic en "Ver Agenda Completa e Inscribirse" o "Inscribirse" (entrada online)
- **Comportamiento**: Lleva a `/agenda-online/` (HTTP 200).
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/testing-day-chile/` (2026-11-21): href `/agenda-online/`

### RN-EVT-006: Los sponsors se agrupan por nivel

- **Tipo**: Contenido
- **Disparador**: Visualización de "Sponsors Oficiales"
- **Comportamiento**: Se muestran los niveles PLATINUM, ORO, PLATA y BRONCE con logos enlazados a sitios externos en pestaña nueva; "Conoce más de nuestros sponsors" lleva a `/nuestros-sponsors-2026/`.
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/testing-day-chile/` (2026-11-21): H3 de niveles y enlaces

### RN-EVT-007: El brochure de sponsors se solicita por correo

- **Tipo**: Integración
- **Disparador**: Clic en "Solicitar Brochure Ver Planes de Sponsor"
- **Comportamiento**: Abre `mailto:` hacia eventos@ con asunto "Solicitud de Brochure - Planes de Sponsor Testing Day 2026".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/testing-day-chile/` (2026-11-21): href del enlace

### RN-EVT-008: La Agenda Online lista las sesiones con su inscripción

- **Tipo**: Contenido
- **Disparador**: Carga de `/agenda-online/`
- **Comportamiento**: Cada sesión muestra horario, tipo (TALLER/CHARLA), país, título, descripción y "Inscribirse".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/agenda-online/` (2026-11-21): 7 sesiones del 27 de agosto

### RN-EVT-009: Los enlaces externos del evento están operativos

- **Tipo**: Integración
- **Disparador**: Clic en un enlace externo (inscripción, sponsor, comunidad, hotel)
- **Comportamiento**: El destino resuelve y responde sin error (2xx/3xx). Bloqueos anti-bot (LinkedIn 999, Facebook 400) no cuentan como roto.
- **Origen**: ESTÁNDAR
- **Evidencia**: Buenas prácticas de mantenimiento de enlaces. Incumplido: HC-06, HC-07.

### RN-EVT-010: Un evento finalizado no ofrece compra ni inscripción

- **Tipo**: Contenido / vigencia
- **Disparador**: Fecha actual posterior a la última jornada del evento
- **Comportamiento**: La página indica que el evento finalizó (o anuncia la próxima edición) y no muestra CTAs de compra o inscripción.
- **Origen**: PENDIENTE-CONFIRMACIÓN
- **Evidencia**: Expectativa de vigencia. Hoy incumplida (HC-04).

### RN-EVT-011: Cada sponsor 2026 tiene tarjeta con enlaces propios

- **Tipo**: Contenido
- **Disparador**: Carga de `/nuestros-sponsors-2026/`
- **Comportamiento**: Cada tarjeta muestra logo, descripción y al menos "Sitio web"; opcionalmente "LinkedIn" e "Instagram".
- **Origen**: OBSERVADO
- **Evidencia**: `https://www.testingenchile.cl/nuestros-sponsors-2026/` (2026-11-21): 9 sponsors con "Sitio web"

### RN-EVT-012: Las páginas del evento tienen título, description y H1 coherentes

- **Tipo**: SEO
- **Disparador**: Carga de cada página
- **Comportamiento**: Título correcto y coherente con el contenido, description no vacía y un H1 con texto.
- **Origen**: ESTÁNDAR
- **Evidencia**: Buenas prácticas SEO. Incumplido: HC-09, HC-10, HC-11, HC-20.

