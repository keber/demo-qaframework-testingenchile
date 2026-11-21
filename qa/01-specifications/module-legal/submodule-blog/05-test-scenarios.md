# Escenarios de prueba - Contenido legal y blog: Blog

**Código de módulo**: LEG  
**Código de submódulo**: BLG  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 4 | 4 | 0 | 0 |
| P2 | 2 | 2 | 0 | 0 |
| P3 | 2 | 2 | 0 | 0 |
| **Total** | **9** | **9** | **0** | **0** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-LEG-BLG-001 |
| Camino feliz | TC-LEG-BLG-001, 006 |
| Paginación | TC-LEG-BLG-004 |
| Búsqueda / orden | TC-LEG-BLG-003 (no hay buscador) |
| Negativo: formularios | No aplica |
| Exportación | No aplica |

---

### TC-LEG-BLG-001: El blog carga con al menos un artículo

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
1. Desde el menú, hacer clic en "Blog".

**Resultado esperado**: URL `/blog/`, HTTP 200 y al menos un artículo visible.

---

### TC-LEG-BLG-002: Cada artículo del listado muestra título enlazado, fecha y extracto

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
1. Recorrer las tarjetas de `/blog/`.

**Resultado esperado**: Cada tarjeta tiene título enlazado a `/l/`, fecha con patrón `\d{2}\.\d{2}\.\d{4}` y extracto no vacío.

---

### TC-LEG-BLG-003: Los artículos están en orden cronológico descendente

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Funcional (orden) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Leer las fechas de `/blog/` y de la página siguiente.

**Resultado esperado**: Secuencia de fechas no creciente dentro y entre páginas.

---

### TC-LEG-BLG-004: La paginación avanza y retrocede

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Funcional (paginación) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Hacer clic en "Artículos antiguos".
2. Hacer clic en "Artículos recientes".

**Resultado esperado**: Se muestra una página con artículos más antiguos; luego se vuelve a `/blog/`.

---

### TC-LEG-BLG-005: Los artículos de la primera página responden 200

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
1. Solicitar cada enlace `/l/{slug}/` de `/blog/`.

**Resultado esperado**: Todas las respuestas son 200.

---

### TC-LEG-BLG-006: El artículo muestra H1 igual al título del listado y su fecha

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
1. Hacer clic en el primer título del listado.

**Resultado esperado**: El H1 coincide con el título del listado y la fecha es la misma.

---

### TC-LEG-BLG-007: El título de los artículos sigue el patrón del sitio

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | SEO |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Leer `<title>` de los artículos de la primera página.

**Resultado esperado**: Cada título termina en " :: Testing en Chile".

---

### TC-LEG-BLG-008: El listado del blog tiene H1 y description

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
1. Contar `h1` y leer meta description de `/blog/`.

**Resultado esperado**: Un H1 y description no vacía.

**Notas**: Hoy falla (HC-09, HC-11).

---

### TC-LEG-BLG-009: Las imágenes del listado tienen texto alternativo

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
1. Inspeccionar `alt` de las imágenes de `/blog/`.

**Resultado esperado**: Cada imagen de artículo tiene `alt` no vacío (por ejemplo, el título).

**Notas**: Hoy falla (HC-08).

---

