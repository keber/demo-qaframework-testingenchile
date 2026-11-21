# Escenarios de prueba - Contenido legal y blog: Páginas legales

**Código de módulo**: LEG  
**Código de submódulo**: LGL  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 3 | 3 | 0 | 0 |
| P2 | 2 | 2 | 0 | 0 |
| P3 | 2 | 2 | 0 | 0 |
| **Total** | **8** | **8** | **0** | **0** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-LEG-LGL-001 |
| Camino feliz | TC-LEG-LGL-001, 005 |
| Negativo: contenido de plantilla | TC-LEG-LGL-002, 003 |
| Negativo: formularios | No aplica |
| Transición de estado | No aplica |
| Exportación / búsqueda / paginación | No aplica |

---

### TC-LEG-LGL-001: Los enlaces legales del footer abren páginas existentes en pestaña nueva

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
1. Leer `href` y `target` de los enlaces legales del footer.
2. Solicitar ambos destinos.

**Resultado esperado**: `target=_blank`; ambos destinos responden 200 con H1 "Términos y Condiciones" y "Política de privacidad".

---

### TC-LEG-LGL-002: Términos y Condiciones no contiene texto de plantilla

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Contenido / cumplimiento |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Leer el texto visible de `/terminos-y-condiciones/`.
2. Buscar las cadenas de plantilla de `04-test-data.md`.

**Resultado esperado**: Ninguna cadena de plantilla presente y el documento describe servicios, pagos y devoluciones del sitio.

**Notas**: Hoy falla (HC-01). Requiere confirmar RN-LEG-002 para `test.fail()` + DEF.

---

### TC-LEG-LGL-003: La política de privacidad no contiene marcadores sin completar

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Contenido / cumplimiento |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Leer el texto visible de `/politica-de-privacidad/`.
2. Buscar corchetes con puntos y "La Tienda".

**Resultado esperado**: No aparecen marcadores ni referencias a tienda online.

**Notas**: Hoy falla (HC-02).

---

### TC-LEG-LGL-004: La política identifica al responsable y el canal para ejercer derechos

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Contenido / cumplimiento |
| Origen | UI-OBSERVED |
| Automatización | Parcial |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Revisar las secciones "Normas generales" y "Derechos del cliente".

**Resultado esperado**: Se declaran responsable y un contacto operativo (correo del dominio del sitio) para ejercer derechos.

**Notas**: Hoy falla (HC-02). Verificación de contenido parcialmente manual.

---

### TC-LEG-LGL-005: La política de privacidad presenta sus secciones

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
1. Listar los H2 de `/politica-de-privacidad/`.

**Resultado esperado**: Están las 8 secciones del inventario.

**Notas**: Pasa hoy; protege la estructura ante cambios.

---

### TC-LEG-LGL-006: El banner de cookies enlaza a la información de cookies

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Cumplimiento |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Abrir el sitio sin cookies.
2. Buscar enlaces dentro del banner.

**Resultado esperado**: El banner contiene un enlace a la política de cookies o de privacidad.

**Notas**: Hoy no hay enlaces (HC-02). RN-LEG-005 pendiente de confirmación.

---

### TC-LEG-LGL-007: Las páginas legales tienen description representativa

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
1. Leer la meta description de ambas páginas.

**Resultado esperado**: La description resume el documento y no repite el texto de contacto del footer.

**Notas**: Hoy falla (HC-11).

---

### TC-LEG-LGL-008: Las páginas legales declaran idioma y un único H1

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
1. Leer `html[lang]` y contar `h1`.

**Resultado esperado**: `lang="es"` y un único H1.

**Notas**: Pasa hoy.

---

