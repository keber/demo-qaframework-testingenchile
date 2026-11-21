# Escenarios de prueba - Eventos Testing Day: Ediciones anteriores

**Código de módulo**: EVT  
**Código de submódulo**: EDI  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 2 | 2 | 0 | 0 |
| P2 | 2 | 2 | 0 | 0 |
| P3 | 4 | 4 | 0 | 0 |
| **Total** | **9** | **9** | **0** | **0** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-EVT-EDI-001 |
| Camino feliz | TC-EVT-EDI-001, 002, 005 |
| Negativo: enlace roto | TC-EVT-EDI-003 |
| Negativo: formularios | No aplica |
| Transición de estado | No aplica: contenido estático |
| Exportación / búsqueda / paginación | No aplica |

---

### TC-EVT-EDI-001: La página de ediciones anteriores carga con sus bloques

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
1. Navegar a `/testing-day-chile-ediciones-anteriores/`.

**Resultado esperado**: HTTP 200; visibles los encabezados de 2019, 2018, 2017 y Córdoba 2016.

---

### TC-EVT-EDI-002: Todas las páginas del submenú "Ediciones anteriores" responden 200

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
1. Recopilar los `href` del tercer nivel del menú desde el DOM.
2. Solicitar cada URL.

**Resultado esperado**: Todas responden 200.

---

### TC-EVT-EDI-003: Los enlaces internos de la página de ediciones no devuelven 404

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Negativo (enlaces) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Recopilar los enlaces internos de `/testing-day-chile-ediciones-anteriores/`.
2. Solicitar cada uno.

**Resultado esperado**: Ningún enlace interno responde 404.

**Notas**: Hoy falla `/testing-day-en-latam-2018/` (HC-03).

---

### TC-EVT-EDI-004: El título de cada página de edición contiene su año

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | SEO / Contenido |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Para cada par ruta -> año de `04-test-data.md`, leer `<title>`.

**Resultado esperado**: El título contiene el año esperado.

**Notas**: Hoy falla `/entrevistas-sponsors-2021/` (dice 2022) (HC-10). RN-EVT-016 pendiente de confirmación.

---

### TC-EVT-EDI-005: La edición 2025 enlaza a sus sponsors y muestra el video

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
1. Navegar a `/testing-day-chile-2025/`.
2. Hacer clic en "¡Conócelos aquí!".

**Resultado esperado**: Existe un iframe `youtube-nocookie.com`; el enlace lleva a `/nuestros-sponsors-2025/` con HTTP 200.

---

### TC-EVT-EDI-006: Los enlaces externos de resumen de ediciones responden

| Campo | Valor |
|---|---|
| Prioridad | P3 |
| Tipo | Integración |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Solicitar "Ver lo más destacado".

**Resultado esperado**: Responde 2xx/3xx.

**Notas**: Observado 200.

---

### TC-EVT-EDI-007: "Ver detalles de la edición más reciente" apunta a la última edición

| Campo | Valor |
|---|---|
| Prioridad | P3 |
| Tipo | Contenido |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Leer el `href` del enlace.
2. Compararlo con la última edición del menú.

**Resultado esperado**: Apunta a la edición más reciente publicada.

**Notas**: Hoy apunta a 2022 (HC-22). RN-EVT-018 pendiente de confirmación.

---

### TC-EVT-EDI-008: Las páginas de edición tienen un único H1 con texto

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
1. Contar `h1` con texto en cada página de edición.

**Resultado esperado**: Exactamente un H1 con texto por página.

**Notas**: Hoy fallan varias (HC-09).

---

### TC-EVT-EDI-009: Las imágenes de las páginas de edición tienen texto alternativo

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
1. Inspeccionar `alt` en `/testing-day-chile-2025/` y en la página de ediciones.

**Resultado esperado**: Toda imagen informativa tiene `alt` no vacío.

**Notas**: Hoy 13/13 y 4/4 sin `alt` (HC-08).

---

