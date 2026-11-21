# Escenarios de prueba - Capacitaciones: Catálogo de capacitaciones

**Código de módulo**: CAP  
**Código de submódulo**: CAT  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 3 | 3 | 0 | 0 |
| P2 | 3 | 2 | 0 | 1 |
| P3 | 2 | 2 | 0 | 0 |
| **Total** | **9** | **8** | **0** | **1** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-CAP-CAT-001 |
| Camino feliz | TC-CAP-CAT-001, 002 |
| Negativo: formularios | No aplica: sin formularios |
| Transición de estado | TC-CAP-CAT-004 (estado del filtro activo) |
| Búsqueda / filtrado | TC-CAP-CAT-003, 004 |
| Exportación / paginación | No aplica |

---

### TC-CAP-CAT-001: El catálogo carga con tarjetas y enlaces "Saber más"

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
1. Navegar a `/capacitaciones2/`.

**Resultado esperado**: HTTP 200; al menos una tarjeta visible y cada tarjeta tiene un enlace "Saber más".

**Notas**: Observadas 15 tarjetas (volátil).

---

### TC-CAP-CAT-002: Todos los "Saber más" responden HTTP 200

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Funcional (enlaces) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Recopilar los `href` de "Saber más".
2. Solicitar cada URL con el fixture `request`.

**Resultado esperado**: Todas las respuestas son 200.

---

### TC-CAP-CAT-003: El filtro "Certificaciones" muestra solo tarjetas con insignia "Certificación"

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Funcional (filtro) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Hacer clic en "Certificaciones".
2. Comparar las tarjetas visibles con las que tienen insignia "Certificación".

**Resultado esperado**: Ambos conjuntos coinciden y no queda visible ninguna tarjeta sin la insignia.

---

### TC-CAP-CAT-004: Cada filtro reduce la lista y "Todos" la restaura

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Funcional (filtro) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Para cada filtro (Bootcamp, IA, SAP, Automation, Performance, Cursos), hacer clic y contar tarjetas visibles.
2. Hacer clic en "Todos".

**Resultado esperado**: Cada filtro muestra al menos una tarjeta y menos que el total; "Todos" vuelve al total inicial; la URL no cambia.

**Notas**: Conteos observados en RN-CAP-002 (volátiles).

---

### TC-CAP-CAT-005: Los enlaces "Saber más" abren en pestaña nueva

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
1. Leer el atributo `target` de los enlaces "Saber más".

**Resultado esperado**: Todos declaran `target=_blank`.

---

### TC-CAP-CAT-006: El botón "Hablemos" apunta a WhatsApp

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
1. Leer `href` y `target` del botón "Hablemos".

**Resultado esperado**: El `href` usa `https://wa.me/` y abre en pestaña nueva.

**Notas**: No se hace clic. El número difiere del general (HC-18, pregunta abierta).

---

### TC-CAP-CAT-007: El catálogo tiene un H1 y un título descriptivo

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
1. Contar `h1` y leer `<title>` de `/capacitaciones2/`.

**Resultado esperado**: Existe un H1 y el título identifica el catálogo y el sitio.

**Notas**: Hoy no hay H1 y el título es "Capacitaciones" (HC-09, HC-10).

---

### TC-CAP-CAT-008: Las imágenes del catálogo tienen texto alternativo

| Campo | Valor |
|---|---|
| Prioridad | P3 |
| Tipo | Accesibilidad |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Inspeccionar `alt` de las imágenes de `/capacitaciones2/`.

**Resultado esperado**: Toda imagen informativa tiene `alt` no vacío.

**Notas**: Hoy fallan el logo y la imagen SENCE (HC-08).

---

### TC-CAP-CAT-009: Filtros y tarjetas son usables en móvil

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Responsivo |
| Origen | PENDING-BROWSER |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Abrir `/capacitaciones2/` con Pixel 5.
2. Aplicar un filtro.

**Resultado esperado**: Filtros y tarjetas visibles, sin desplazamiento horizontal; el filtro funciona igual que en escritorio.

**Notas**: No observado en esta sesión.

---

