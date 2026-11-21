# Escenarios de prueba - Contenido legal y blog: Fotogalería

**Código de módulo**: LEG  
**Código de submódulo**: GAL  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 1 | 1 | 0 | 0 |
| P2 | 3 | 2 | 0 | 1 |
| P3 | 3 | 3 | 0 | 0 |
| **Total** | **8** | **7** | **0** | **1** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-LEG-GAL-001 |
| Camino feliz | TC-LEG-GAL-002, 003 |
| Transición de estado | TC-LEG-GAL-002 (visor cerrado -> abierto -> cerrado) |
| Negativo: formularios | No aplica |
| Exportación / búsqueda / paginación | No aplica |

---

### TC-LEG-GAL-001: La galería carga con álbumes y miniaturas

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
1. Desde el menú, hacer clic en "Fotogalería".

**Resultado esperado**: URL `/galeria/`, HTTP 200, al menos un encabezado de álbum y una miniatura visibles.

---

### TC-LEG-GAL-002: Una miniatura abre el visor y Escape lo cierra

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
1. Hacer clic en la primera miniatura.
2. Pulsar Escape.

**Resultado esperado**: El visor se abre con contador "1 / N" sin cambiar la URL; tras Escape se cierra.

---

### TC-LEG-GAL-003: La flecha derecha avanza a la siguiente foto

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
1. Abrir el visor en un álbum con más de una foto.
2. Pulsar flecha derecha.

**Resultado esperado**: El contador pasa a "2 / N".

---

### TC-LEG-GAL-004: El álbum más reciente aparece primero

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Contenido |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Leer los encabezados de álbum en orden.

**Resultado esperado**: El primer álbum corresponde a la edición o actividad más reciente.

**Notas**: Observado: 2026 primero. Asertar orden de años detectados en los encabezados.

---

### TC-LEG-GAL-005: El título de la galería no tiene errores tipográficos

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
1. Leer `<title>` de `/galeria/`.

**Resultado esperado**: El título no contiene "Tesitng" y nombra correctamente "Testing en Chile".

**Notas**: Hoy falla (HC-10).

---

### TC-LEG-GAL-006: Las fotos de la galería tienen texto alternativo

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
1. Contar `img` sin `alt` en `/galeria/`.

**Resultado esperado**: Ninguna imagen informativa sin `alt`.

**Notas**: Hoy 558/572 sin `alt` (HC-08).

---

### TC-LEG-GAL-007: La galería tiene un único H1

| Campo | Valor |
|---|---|
| Prioridad | P3 |
| Tipo | SEO / Accesibilidad |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Contar `h1` en `/galeria/`.

**Resultado esperado**: Exactamente un H1; los álbumes usan H2.

**Notas**: Hoy 9 H1 (HC-09).

---

### TC-LEG-GAL-008: La galería es usable en móvil

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
1. Abrir `/galeria/` con Pixel 5.
2. Abrir y cerrar el visor.

**Resultado esperado**: Miniaturas visibles sin desplazamiento horizontal; el visor abre y cierra.

**Notas**: No observado en esta sesión.

---

