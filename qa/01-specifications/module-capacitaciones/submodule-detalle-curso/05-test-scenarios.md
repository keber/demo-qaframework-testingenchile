# Escenarios de prueba - Capacitaciones: Detalle de curso

**Código de módulo**: CAP  
**Código de submódulo**: CUR  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 6 | 6 | 0 | 0 |
| P2 | 2 | 2 | 0 | 0 |
| P3 | 1 | 0 | 1 | 1 |
| **Total** | **10** | **9** | **1** | **1** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-CAP-CUR-001 |
| Camino feliz (cliente) | TC-CAP-CUR-004 |
| Negativo: campo obligatorio | TC-CAP-CUR-003 |
| Negativo: formato | TC-CAP-CUR-005, 006 |
| Negativo: duplicado | No aplica: sin registros únicos |
| Transición de estado | No aplica: el envío no se ejecuta (TC-CAP-CUR-010 skip) |
| Exportación / búsqueda / paginación | No aplica |

---

### TC-CAP-CUR-001: Las páginas de curso del catálogo cargan con título y H1

| Campo | Valor |
|---|---|
| Prioridad | P0 |
| Tipo | Funcional (smoke) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Para cada destino de "Saber más", navegar a la URL.

**Resultado esperado**: HTTP 200, `<title>` no vacío y al menos un H1 visible.

**Notas**: Parametrizado sobre los destinos del catálogo.

---

### TC-CAP-CUR-002: El formulario de consulta muestra sus campos y obligatoriedad

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Funcional |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Banner de cookies resuelto con "Aceptar solo lo necesario".

**Pasos**:
1. Abrir `/curso-automatizacion-pruebas-software-web-selenium-java/`.
2. Localizar el formulario por sus etiquetas.

**Resultado esperado**: Existen "Nombre y Apellido", "E-mail", "Celular", "Mensaje" y la casilla de consentimiento; todos salvo "Celular" son obligatorios.

---

### TC-CAP-CUR-003: El formulario vacío es inválido sin enviarlo

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
1. Evaluar `form.checkValidity()` con todos los campos vacíos.
2. Leer `validationMessage` de cada obligatorio.

**Resultado esperado**: `checkValidity()` = false y cada obligatorio tiene `validationMessage` no vacío.

**Notas**: No hacer clic en "¡Enviar mensaje!".

---

### TC-CAP-CUR-004: El formulario completo con datos sintéticos es válido en el cliente

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
2. Evaluar `checkValidity()` de los campos (excluido el reCAPTCHA).

**Resultado esperado**: Todos los campos visibles quedan válidos; no se envía nada.

---

### TC-CAP-CUR-005: Un e-mail sin "@" es rechazado por la validación

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
1. Escribir `qa-invalido` en "E-mail".
2. Leer `validity.valid`.
3. Reemplazar por un e-mail sintético válido.

**Resultado esperado**: Primero inválido; con el e-mail válido, el campo pasa a válido.

---

### TC-CAP-CUR-006: El celular rechaza letras

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
1. Escribir `abc` en "Celular".
2. Leer `validity.valid`.

**Resultado esperado**: El campo es inválido por patrón.

---

### TC-CAP-CUR-007: En AiU el asunto es obligatorio y ofrece tres opciones

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
1. Abrir `/aiugenaia/`.
2. Leer el select "Asunto" y sus opciones.

**Resultado esperado**: El select es obligatorio y contiene las tres opciones de RN-CAP-012.

---

### TC-CAP-CUR-008: El botón de pago apunta a la pasarela externa en pestaña nueva

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
1. Leer `href` y `target` del botón de pago en `/new-curso-istqb/` y `/aiugenaia/`.

**Resultado esperado**: El `href` usa el host `www.flow.cl` y `target=_blank`.

**Notas**: NUNCA hacer clic (transacción real).

---

### TC-CAP-CUR-009: El consentimiento enlaza a la política de privacidad

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
1. Inspeccionar el contenedor de la casilla de consentimiento.

**Resultado esperado**: Existe un enlace a `/politica-de-privacidad/`.

**Notas**: Hoy no existe (HC-16). RN-CAP-015 pendiente de confirmación.

---

### TC-CAP-CUR-010: El envío real del formulario de consulta muestra confirmación

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
3. Hacer clic en "¡Enviar mensaje!".

**Resultado esperado**: Mensaje de confirmación del sitio (texto no observado).

**Notas**: Nunca se ejecuta en producción: `test.skip()` + tag `@destructive` (S7, W9). Requiere un entorno de prueba que no existe.

---

