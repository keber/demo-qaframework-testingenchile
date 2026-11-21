# Escenarios de prueba - Capacitaciones: Bootcamp de Testing

**Código de módulo**: CAP  
**Código de submódulo**: BTC  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 1 | 1 | 0 | 0 |
| P1 | 3 | 3 | 0 | 0 |
| P2 | 3 | 3 | 0 | 0 |
| P3 | 1 | 1 | 0 | 0 |
| **Total** | **8** | **8** | **0** | **0** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-CAP-BTC-001 |
| Camino feliz | TC-CAP-BTC-004 |
| Negativo: campo obligatorio | TC-CAP-BTC-003 |
| Negativo: formato / duplicado | No aplica (solo radios) |
| Transición de estado | TC-CAP-BTC-004 (resultado oculto -> visible), TC-CAP-BTC-006 (FAQ cerrada -> abierta) |
| Exportación / búsqueda / paginación | No aplica |

---

### TC-CAP-BTC-001: La landing del Bootcamp carga con hero y CTAs

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
1. Navegar a `/bootcamp-de-testing/`.

**Resultado esperado**: HTTP 200; visibles el H1 del hero, "Quiero evaluar mi postulación" y "Ver la ruta de aprendizaje".

---

### TC-CAP-BTC-002: Las anclas del hero llevan a su sección

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
1. Hacer clic en "Ver la ruta de aprendizaje".
2. Volver y hacer clic en "Quiero evaluar mi postulación".

**Resultado esperado**: La URL termina en `#btc-ruta` y luego en `#btc-postula`; la sección destino está en el viewport.

---

### TC-CAP-BTC-003: El autodiagnóstico sin respuestas no muestra resultado

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
1. Hacer clic en "Ver mi orientación" sin marcar opciones.

**Resultado esperado**: `#btc-result` sigue oculto y la URL no cambia.

**Notas**: Bloquear etiquetas de Google (04-test-data).

---

### TC-CAP-BTC-004: El autodiagnóstico clasifica según el puntaje

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Funcional (cálculo) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Para cada combinación de "Autodiagnóstico" en `04-test-data.md`, marcar las respuestas y pulsar "Ver mi orientación".

**Resultado esperado**: Se muestra "Tu orientación: {resultado}" según RN-CAP-019 y el enlace "Conocer cómo postular"; no hay solicitudes al dominio del sitio.

**Notas**: Incluye bordes 6/5/3/2. Observados 8, 3 y 0.

---

### TC-CAP-BTC-005: La fecha de próximo inicio no está vencida

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
1. Leer la fecha junto a "próximo inicio".
2. Compararla con la fecha actual (zona America/Santiago).

**Resultado esperado**: La fecha publicada es igual o posterior a hoy.

**Notas**: Hoy falla: 2 de noviembre de 2026 frente a 2026-11-21 (HC-05). Requiere confirmar RN-CAP-016 antes de `test.fail()`.

---

### TC-CAP-BTC-006: Las preguntas frecuentes se expanden al hacer clic

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
1. Hacer clic en "¿Debo saber Testing antes de comenzar?".

**Resultado esperado**: El `details` queda abierto y muestra la respuesta; existen 5 preguntas.

---

### TC-CAP-BTC-007: Los CTAs de WhatsApp y correo apuntan a destinos válidos

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
1. Leer `href` de "Hablar por WhatsApp", "Iniciar chat en WhatsApp" y "Consultar por correo".

**Resultado esperado**: WhatsApp usa `https://wa.me/` con `text`; el correo usa `mailto:` con `subject` "Postulación Bootcamp de Testing".

**Notas**: No se hace clic.

---

### TC-CAP-BTC-008: El autodiagnóstico no dispara conversiones de compra

| Campo | Valor |
|---|---|
| Prioridad | P3 |
| Tipo | Integración (analítica) |
| Origen | UI-OBSERVED |
| Automatización | Parcial |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Sin bloquear etiquetas, completar el autodiagnóstico en un contexto aislado y capturar la red.

**Resultado esperado**: No se envía una conversión con `bttype=purchase`.

**Notas**: Hoy se envía (HC-21). Ejecutar a lo sumo una vez y solo para evidencia; por defecto las pruebas bloquean las etiquetas.

---

