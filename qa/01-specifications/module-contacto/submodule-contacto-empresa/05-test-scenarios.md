# Escenarios de prueba - Contacto y formularios: Contacto empresa (B2B)

**Código de módulo**: CON  
**Código de submódulo**: EMP  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 5 | 5 | 0 | 0 |
| P2 | 3 | 3 | 0 | 0 |
| P3 | 3 | 2 | 1 | 1 |
| **Total** | **12** | **11** | **1** | **1** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-CON-EMP-001 |
| Camino feliz (cliente) | TC-CON-EMP-008 |
| Negativo: campo obligatorio | TC-CON-EMP-003, 007 |
| Negativo: formato | TC-CON-EMP-004, 005, 006 |
| Negativo: duplicado | No aplica: el sitio no expone unicidad |
| Transición de estado | No aplica: el envío no se ejecuta (TC-CON-EMP-012 skip) |
| Exportación / búsqueda / paginación | No aplica |

---

### TC-CON-EMP-001: El formulario empresa carga con su H1

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
1. Navegar a `/contacto-empresa/`.
2. Esperar (web-first) a que el campo "Nombre" sea visible.

**Resultado esperado**: HTTP 200; H1 "Potencia a tu Equipo de QA"; formulario visible con botón "Enviar".

**Notas**: El formulario se renderiza después de la carga inicial.

---

### TC-CON-EMP-002: El formulario muestra sus seis campos obligatorios

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
1. Localizar los campos por etiqueta.

**Resultado esperado**: Existen Nombre, Email, Empresa, Código Sence (3 opciones), Número de personas y la capacitación de interés, todos `required`.

---

### TC-CON-EMP-003: El formulario vacío es inválido sin enviarlo

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Negativo |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Evaluar `checkValidity()` con campos vacíos.

**Resultado esperado**: `checkValidity()` = false y cada campo obligatorio tiene `validationMessage` no vacío.

**Notas**: No hacer clic en "Enviar".

---

### TC-CON-EMP-004: Un email sin "@" es inválido

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Negativo |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Escribir `qa-invalido` en "Email".

**Resultado esperado**: `validity.valid` = false.

---

### TC-CON-EMP-005: "Número de personas" no admite letras

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Negativo |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Intentar escribir `abc` en "Número de personas".

**Resultado esperado**: El campo queda vacío o sin las letras.

---

### TC-CON-EMP-006: "Número de personas" rechaza cero y negativos

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Negativo |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Escribir `0` y luego `-5`.
2. Leer `validity.valid`.

**Resultado esperado**: Ambos valores son inválidos.

**Notas**: Hoy ambos son válidos (HC-13). RN-CON-011 pendiente de confirmación.

---

### TC-CON-EMP-007: Código Sence es obligatorio con tres opciones

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
1. Localizar el grupo "Código Sence".

**Resultado esperado**: Tres radios ("Si", "No", "Aún no sabemos"), obligatorios.

---

### TC-CON-EMP-008: El formulario completo con datos sintéticos es válido en el cliente

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
1. Completar con la forma "Formulario válido" de `04-test-data.md`.
2. Evaluar la validez de cada campo (excluido el reCAPTCHA).

**Resultado esperado**: Todos los campos válidos; no se realiza ninguna solicitud POST al sitio.

---

### TC-CON-EMP-009: El formulario informa la política de privacidad

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
1. Buscar en el formulario una casilla de consentimiento o un enlace a `/politica-de-privacidad/`.

**Resultado esperado**: Existe al menos uno de los dos.

**Notas**: Hoy no existe ninguno (HC-16). RN-CON-013 pendiente de confirmación.

---

### TC-CON-EMP-010: Las etiquetas del formulario tienen ortografía correcta

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
1. Leer las etiquetas y opciones.

**Resultado esperado**: Se lee "Sí" y "¿En qué capacitación estás interesado?" (o equivalente correcto).

**Notas**: Hoy falla (HC-14).

---

### TC-CON-EMP-011: Los campos obligatorios tienen indicador visual

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
1. Inspeccionar el texto visible de cada etiqueta obligatoria.

**Resultado esperado**: Cada etiqueta obligatoria muestra un indicador visible.

**Notas**: Hoy falla (HC-15).

---

### TC-CON-EMP-012: El envío real muestra una confirmación

| Campo | Valor |
|---|---|
| Prioridad | P3 |
| Tipo | Funcional (@destructive) |
| Origen | PENDING-BROWSER |
| Automatización | No |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Completar el formulario.
2. Resolver reCAPTCHA.
3. Hacer clic en "Enviar".

**Resultado esperado**: Mensaje de confirmación del sitio (no observado).

**Notas**: Nunca se ejecuta en producción: `test.skip()` + `@destructive` (S7, W9).

---

