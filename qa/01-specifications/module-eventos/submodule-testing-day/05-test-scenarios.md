# Escenarios de prueba - Eventos Testing Day: Testing Day Chile (edición vigente)

**Código de módulo**: EVT  
**Código de submódulo**: TDY  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 5 | 5 | 0 | 0 |
| P2 | 5 | 5 | 0 | 0 |
| P3 | 1 | 1 | 0 | 0 |
| **Total** | **12** | **12** | **0** | **0** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-EVT-TDY-001 |
| Camino feliz | TC-EVT-TDY-001, 005, 006 |
| Negativo: formularios | No aplica: sin formularios |
| Negativo: enlaces externos rotos | TC-EVT-TDY-007, 009 |
| Transición de estado | TC-EVT-TDY-010 (vigencia: evento futuro -> finalizado) |
| Exportación / búsqueda / paginación | No aplica |

---

### TC-EVT-TDY-001: La página del evento carga con edición, fechas, sede y CTAs

| Campo | Valor |
|---|---|
| Prioridad | P0 |
| Tipo | Funcional (smoke) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Banner de cookies resuelto con "Aceptar solo lo necesario".

**Pasos**:
1. Navegar a `/testing-day-chile/`.

**Resultado esperado**: HTTP 200; H1 con "TESTING DAY CHILE"; visibles fechas, sede, "Asegura tu entrada" y "Convertirse en Sponsor".

---

### TC-EVT-TDY-002: Los CTAs de entrada apuntan a ecopass en pestaña nueva

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Integración |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Leer `href` y `target` de "Asegura tu entrada" y "Comprar Entrada".

**Resultado esperado**: Host `www.ecopass.cl` y `target=_blank`.

**Notas**: No se hace clic.

---

### TC-EVT-TDY-003: "Convertirse en Sponsor" desplaza a la sección de sponsors

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Funcional |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Hacer clic en "Convertirse en Sponsor".

**Resultado esperado**: La URL termina en `#sponsors-cta` y la sección "Sé parte del evento" está en el viewport.

---

### TC-EVT-TDY-004: La agenda presencial muestra bloques con horario y título

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Contenido |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Localizar "Conoce nuestra Agenda".
2. Leer los bloques.

**Resultado esperado**: Al menos un bloque con rango "HH:MM - HH:MM" y título no vacío.

---

### TC-EVT-TDY-005: "Ver Agenda Completa e Inscribirse" lleva a Agenda Online

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Funcional |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Hacer clic en "Ver Agenda Completa e Inscribirse".

**Resultado esperado**: URL `/agenda-online/` con HTTP 200 y H2 "Agenda Online - ...".

---

### TC-EVT-TDY-006: La Agenda Online lista sesiones con inscripción

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Contenido |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Navegar a `/agenda-online/`.

**Resultado esperado**: Al menos una sesión con horario, tipo (TALLER o CHARLA), título y enlace "Inscribirse".

---

### TC-EVT-TDY-007: Los enlaces "Inscribirse" de la Agenda Online responden

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Integración |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Solicitar cada `href` de "Inscribirse".

**Resultado esperado**: Todas las respuestas son 2xx/3xx.

**Notas**: Hoy 3 de 4 únicos responden 404 (HC-06).

---

### TC-EVT-TDY-008: Los sponsors se muestran por nivel y enlazan a la página de sponsors

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Funcional |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Localizar "Sponsors Oficiales".
2. Hacer clic en "Conoce más de nuestros sponsors".

**Resultado esperado**: Visibles los niveles PLATINUM, ORO, PLATA y BRONCE; el enlace lleva a `/nuestros-sponsors-2026/` (200) con al menos una tarjeta con "Sitio web".

---

### TC-EVT-TDY-009: Los logos de sponsors, comunidades y hoteles enlazan a dominios operativos

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Integración |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Solicitar los `href` externos de `/testing-day-chile/`.

**Resultado esperado**: Todos resuelven y responden 2xx/3xx (salvo bloqueos anti-bot documentados).

**Notas**: Hoy `mendezdistribucion.com` no existe en DNS y el hotel no responde (HC-07).

---

### TC-EVT-TDY-010: Tras el evento no se ofrecen CTAs de compra

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Contenido / vigencia |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Comparar la fecha actual con la última jornada publicada.
2. Si es posterior, buscar "Asegura tu entrada" y "Comprar Entrada".

**Resultado esperado**: Con el evento finalizado, la página no muestra CTAs de compra o inscripción y comunica el estado del evento.

**Notas**: Hoy falla (HC-04). RN-EVT-010 pendiente de confirmación: no declarar defecto antes.

---

### TC-EVT-TDY-011: El brochure de sponsors se solicita por correo con asunto

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Integración |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Leer el `href` de "Solicitar Brochure Ver Planes de Sponsor".

**Resultado esperado**: `mailto:` hacia eventos@ (dominio del sitio) con `subject` no vacío.

**Notas**: No se hace clic.

---

### TC-EVT-TDY-012: Las páginas del evento tienen título, description y H1 coherentes

| Campo | Valor |
|---|---|
| Prioridad | P3 |
| Tipo | SEO |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Leer `<title>`, meta description y H1 de las tres páginas.

**Resultado esperado**: Description no vacía, H1 con texto y títulos sin errores de concordancia ni afirmaciones contradictorias.

**Notas**: Hoy fallan: description vacía en Agenda Online, H1 vacío y "Nuestros sponsor" en Sponsors 2026, "GRATUITO" (HC-09, HC-10, HC-11, HC-20).

---

