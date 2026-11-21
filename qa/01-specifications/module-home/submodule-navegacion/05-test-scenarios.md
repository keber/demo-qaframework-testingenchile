# Escenarios de prueba - Inicio y navegación global: Navegación global

**Código de módulo**: HOME  
**Código de submódulo**: NAV  
**Última actualización**: 2026-11-21

## Resumen

| Prioridad | Total | Automatizable | Manual | Pendiente |
|---|---|---|---|---|
| P0 | 2 | 2 | 0 | 0 |
| P1 | 6 | 6 | 0 | 0 |
| P2 | 5 | 4 | 0 | 1 |
| P3 | 1 | 1 | 0 | 0 |
| **Total** | **14** | **13** | **0** | **1** |

> "Automatizable" = automatización Sí o Parcial con origen `UI-OBSERVED`. "Pendiente" = origen `PENDING-*`. Ningún caso está automatizado aún (etapa 5).

## Cobertura del checklist obligatorio

| Categoría | Cobertura en este submódulo |
|---|---|
| Acceso sin autenticación | TC-HOME-NAV-001 (no aplica login ni roles) |
| Camino feliz | TC-HOME-NAV-002, TC-HOME-NAV-005 |
| Negativo: campo obligatorio / duplicado / formato | No aplica: sin formularios |
| Negativo: ruta inexistente | TC-HOME-NAV-010 |
| Transición de estado | TC-HOME-NAV-006 (estado del banner de cookies) |
| Exportación / búsqueda / paginación | No aplica: no existen en el submódulo |

---

### TC-HOME-NAV-001: La página de inicio carga con header, menú y footer

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
1. Navegar a `{{QA_BASE_URL}}/`.
2. Resolver el banner con "Aceptar solo lo necesario".

**Resultado esperado**: HTTP 200; el título contiene "Testing en Chile"; el menú principal y el footer son visibles.

---

### TC-HOME-NAV-002: El menú principal muestra los seis ítems y cada uno navega a su ruta

| Campo | Valor |
|---|---|
| Prioridad | P0 |
| Tipo | Funcional |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Banner de cookies resuelto con "Aceptar solo lo necesario".

**Pasos**:
1. Abrir la página de inicio en escritorio.
2. Verificar los seis ítems de RN-HOME-001 en orden.
3. Hacer clic en cada ítem y volver.

**Resultado esperado**: Cada ítem está visible y lleva a su ruta con HTTP 200.

**Notas**: Asertar ruta, no el año del ítem del evento.

---

### TC-HOME-NAV-003: El submenú de Testing Day se despliega al pasar el puntero

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
1. Pasar el puntero sobre "Testing Day Chile 2026".

**Resultado esperado**: Se ven "Agenda Online", "Nuestros Sponsors 2026", "Ediciones anteriores" y "Otras Actividades".

---

### TC-HOME-NAV-004: El tercer nivel de "Ediciones anteriores" muestra las ediciones pasadas

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Funcional |
| Origen | PENDING-BROWSER |
| Automatización | Parcial |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Desplegar el submenú de Testing Day.
2. Pasar el puntero (o hacer clic) sobre "Ediciones anteriores".

**Resultado esperado**: Se listan las ediciones por año y cada enlace responde HTTP 200.

**Notas**: No se observó el despliegue por hover en headless (pregunta abierta 1). Los enlaces sí responden 200.

---

### TC-HOME-NAV-005: El menú móvil se abre, expande el submenú y se cierra

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Funcional (responsivo) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Banner de cookies resuelto con "Aceptar solo lo necesario".

**Pasos**:
1. Abrir la página de inicio con el dispositivo Pixel 5.
2. Hacer clic en "Menú".
3. Hacer clic en "Abrir submenú".
4. Hacer clic en el botón cerrar.

**Resultado esperado**: El panel muestra los seis ítems; tras expandir aparecen los cuatro ítems de Testing Day; tras cerrar, los ítems dejan de estar visibles.

---

### TC-HOME-NAV-006: El banner de cookies acepta solo lo necesario y la elección persiste

| Campo | Valor |
|---|---|
| Prioridad | P1 |
| Tipo | Funcional (consentimiento) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Contexto de navegador sin cookies.

**Pasos**:
1. Abrir la página de inicio en un contexto sin cookies.
2. Verificar los botones "Aceptar solo lo necesario" y "Aceptar todo".
3. Hacer clic en "Aceptar solo lo necesario".
4. Recargar la página.

**Resultado esperado**: El banner desaparece, existe la cookie `cookieAccepted` y el banner no reaparece tras recargar.

**Notas**: Nunca hacer clic en "Aceptar todo" (regla 6 del proyecto).

---

### TC-HOME-NAV-007: El enlace "Cookies" del footer reabre el banner

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Funcional (consentimiento) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Aceptar solo lo necesario.
2. Hacer clic en "Cookies" del footer.

**Resultado esperado**: El banner de cookies vuelve a ser visible.

---

### TC-HOME-NAV-008: El footer muestra contacto, redes y enlaces legales operativos

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
1. Desplazarse al footer.
2. Verificar los tres correos, las cuatro redes y los dos enlaces legales.
3. Solicitar las URLs legales.

**Resultado esperado**: Todos los elementos de RN-HOME-006 están presentes; los enlaces legales responden 200 y abren en pestaña nueva.

---

### TC-HOME-NAV-009: Los enlaces de contacto rápido apuntan a destinos válidos

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
1. Leer los atributos `href` y `target` del botón flotante de WhatsApp, del `mailto:` y del `tel:` de la barra superior.

**Resultado esperado**: WhatsApp apunta a `https://wa.me/` con parámetro `text` y `target=_blank`; el correo usa `mailto:` con dominio del sitio; el teléfono usa `tel:+56`.

**Notas**: No se hace clic en los enlaces (regla S7).

---

### TC-HOME-NAV-010: Una ruta inexistente responde 404 con navegación

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
1. Navegar a `/qa-pagina-inexistente-{EXEC_IDX}/`.

**Resultado esperado**: HTTP 404, H1 "404 - Página no encontrada" y menú principal visible.

---

### TC-HOME-NAV-011: Las variantes de dominio redirigen con 301 a la URL canónica

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Funcional (HTTP) |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Solicitar `http://www.testingenchile.cl/`, `https://testingenchile.cl/` y `/capacitaciones2` sin seguir redirecciones.

**Resultado esperado**: Cada solicitud responde 301 con `Location` hacia `https://www.testingenchile.cl/...` con barra final.

**Notas**: Automatizable con el fixture `request` de Playwright.

---

### TC-HOME-NAV-012: El logo del header tiene texto alternativo

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
1. Inspeccionar el atributo `alt` de la imagen del logo en `/` y en una página interna.

**Resultado esperado**: El logo declara un `alt` descriptivo (por ejemplo, el nombre del sitio) y el enlace al inicio tiene nombre accesible.

**Notas**: Hoy falla: `alt=""` (HC-08). Candidato a `test.fail()` + DEF una vez confirmada RN-HOME-012.

---

### TC-HOME-NAV-013: Los perfiles sociales son consistentes entre páginas

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
1. Recopilar los enlaces de LinkedIn y X/Twitter de `/`, `/formulario-contacto/` y `/testing-day-chile-ediciones-anteriores/`.

**Resultado esperado**: Todas las páginas apuntan a la misma URL por red social.

**Notas**: Hoy difiere (HC-17). RN-HOME-013 pendiente de confirmación: no declarar defecto antes.

---

### TC-HOME-NAV-014: La página de inicio no desborda horizontalmente en móvil

| Campo | Valor |
|---|---|
| Prioridad | P2 |
| Tipo | Responsivo |
| Origen | UI-OBSERVED |
| Automatización | Sí |
| Playwright | (completar al automatizar) |

**Precondiciones**:
- Visitante anónimo, sin sesión.

**Pasos**:
1. Abrir `/` con el dispositivo Pixel 5.
2. Comparar `scrollWidth` y `clientWidth` del documento.

**Resultado esperado**: Ambos valores son iguales (sin desplazamiento horizontal).

---

