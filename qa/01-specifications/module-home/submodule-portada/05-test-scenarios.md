# Escenarios de prueba - Inicio y navegación global: Portada (página de inicio)

**Código de módulo**: HOME  
**Código de submódulo**: POR  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 4 | 4 | 0 | 0 |
| P2 | 3 | 3 | 0 | 0 |
| P3 | 1 | 1 | 0 | 0 |
| **Total** | **9** | **9** | **0** | **0** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-HOME-POR-001 |
| Camino feliz | TC-HOME-POR-001, 003, 004 |
| Negativo: formularios | No aplica: sin formularios |
| Transición de estado | TC-HOME-POR-002 (contadores de 0 a valor final) |
| Exportación / búsqueda / paginación | No aplica |

---

### TC-HOME-POR-001: Los CTAs del hero llevan al catálogo y al Bootcamp

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
1. Abrir `/`.
2. Verificar "Ver Capacitaciones" y "Bootcamp de Testing".
3. Hacer clic en "Ver Capacitaciones".

**Resultado esperado**: Los dos CTAs son visibles; "Ver Capacitaciones" lleva a `/capacitaciones2/` (200) y "Bootcamp de Testing" apunta a `/bootcamp-de-testing/` con `target=_blank`.

---

### TC-HOME-POR-002: Los contadores muestran cifras mayores que cero tras hacer scroll

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
1. Desplazarse hasta "Profesionales Capacitados".
2. Esperar con aserción web-first a que el valor cambie.

**Resultado esperado**: Los cuatro contadores muestran un número mayor que 0.

**Notas**: No asertar valores exactos (dato volátil).

---

### TC-HOME-POR-003: Los CTAs de "Nuestros Servicios" apuntan al destino correcto

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
1. Localizar las tres tarjetas de servicios.
2. Leer el `href` de "Ver cursos", "Ver certificaciones" y "Solicitar cotización".

**Resultado esperado**: "Ver cursos" y "Ver certificaciones" apuntan a `/capacitaciones2/`; "Solicitar cotización" a `/contacto-empresa/`; destinos con HTTP 200.

---

### TC-HOME-POR-004: Las capacitaciones destacadas enlazan a páginas de curso existentes

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
1. Localizar las tarjetas de "Capacitaciones Destacados".
2. Solicitar el destino de cada "Ver Temario".
3. Verificar "Ir a todas las Capacitaciones".

**Resultado esperado**: Tres tarjetas con "Ver Temario" cuyos destinos responden 200; "Ir a todas las Capacitaciones" apunta a `/capacitaciones2/`.

---

### TC-HOME-POR-005: Las secciones de testimonios y partners están presentes

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
1. Desplazarse hasta "Lo que dice nuestra comunidad" y "Han confiado en nosotros".

**Resultado esperado**: Ambos encabezados son visibles y la sección de partners contiene al menos un logo.

---

### TC-HOME-POR-006: Los logos de partners tienen texto alternativo

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Accesibilidad |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Inspeccionar el `alt` de las imágenes de "Nuestros Partners" y "Han confiado en nosotros".

**Resultado esperado**: Cada logo declara un `alt` no vacío con el nombre de la organización.

**Notas**: Hoy fallan 2 logos (HC-08).

---

### TC-HOME-POR-007: La portada declara metadatos SEO completos

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | SEO |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Leer `<title>`, meta description, `html[lang]`, `link[rel=canonical]`, meta robots y `og:*`.

**Resultado esperado**: Todos presentes y no vacíos; `lang="es"`; canonical `https://www.testingenchile.cl/`; robots `index,follow`.

---

### TC-HOME-POR-008: La portada tiene un único H1

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
1. Contar los elementos `h1` de `/`.

**Resultado esperado**: Existe exactamente un H1.

**Notas**: Hoy hay 5 (HC-09). RN-HOME-020 es estándar; clasificar como recomendación salvo que el responsable lo eleve a regla.

---

### TC-HOME-POR-009: Los CTAs del hero son visibles y operables en móvil

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Responsivo |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Banner de cookies resuelto con "Aceptar solo lo necesario".

**Pasos**:
1. Abrir `/` con Pixel 5.
2. Verificar visibilidad de "Ver Capacitaciones" y "Bootcamp de Testing".

**Resultado esperado**: Ambos CTAs son visibles dentro del viewport inicial o tras un scroll mínimo y son clicables.

---

