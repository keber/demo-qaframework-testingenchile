# Escenarios de prueba - Contacto y formularios: Página de contacto

**Código de módulo**: CON  
**Código de submódulo**: FCO  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 3 | 3 | 0 | 0 |
| P2 | 2 | 1 | 0 | 1 |
| P3 | 2 | 2 | 0 | 0 |
| **Total** | **8** | **7** | **0** | **1** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-CON-FCO-001 |
| Camino feliz | TC-CON-FCO-001, 002 |
| Negativo: formulario | No aplica: la página no tiene formulario (TC-CON-FCO-005 verifica su ausencia frente a RN-CON-005) |
| Transición de estado | No aplica |
| Exportación / búsqueda / paginación | No aplica |

---

### TC-CON-FCO-001: El ítem "Contacto" lleva a la página de contacto

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
1. Desde `/`, hacer clic en "Contacto" del menú.

**Resultado esperado**: URL `/formulario-contacto/`, HTTP 200 y encabezado "¡Hablemos!" visible.

---

### TC-CON-FCO-002: El CTA de WhatsApp apunta a una conversación prellenada

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
1. Leer `href` y `target` de "¡Hablemos por WhatsApp!".

**Resultado esperado**: `https://wa.me/` con parámetro `text` y `target=_blank`.

**Notas**: No se hace clic.

---

### TC-CON-FCO-003: Los correos por tipo de consulta están visibles

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
1. Desplazarse al footer.

**Resultado esperado**: Visibles los textos de consultas generales, evento/sponsors y cursos con sus correos del dominio del sitio.

---

### TC-CON-FCO-004: Las redes sociales de la página abren en pestaña nueva

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
1. Leer `href` y `target` de LinkedIn, Facebook, Instagram y Twitter.

**Resultado esperado**: Cuatro enlaces con `target=_blank` hacia los dominios de cada red.

**Notas**: LinkedIn apunta a un perfil personal (HC-17, ver TC-HOME-NAV-013).

---

### TC-CON-FCO-005: La página de contacto ofrece un formulario

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
1. Contar elementos `form` con campos de contacto en `/formulario-contacto/`.

**Resultado esperado**: Existe un formulario de contacto (o un enlace `mailto:` equivalente).

**Notas**: Hoy no existe (HC-12). RN-CON-005 pendiente de confirmación: no declarar defecto antes.

---

### TC-CON-FCO-006: La página de contacto declara metadatos y un único H1

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
1. Leer `<title>`, meta description y contar `h1`.

**Resultado esperado**: Título y description no vacíos; un único H1.

**Notas**: Hoy 2 H1 (HC-09).

---

### TC-CON-FCO-007: Los correos del footer son enlaces `mailto:`

| Campo | Valor |
|---|---|
| Prioridad | P3 |
| Tipo | Usabilidad |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Buscar enlaces `mailto:` en el footer.

**Resultado esperado**: Cada correo del footer es un enlace `mailto:`.

**Notas**: Hoy son texto plano (HC-12). Recomendación, sin regla que lo exija.

---

### TC-CON-FCO-008: La página de contacto es usable en móvil

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
1. Abrir `/formulario-contacto/` con Pixel 5.

**Resultado esperado**: CTA de WhatsApp y redes visibles sin desplazamiento horizontal.

**Notas**: No observado en esta sesión.

---

