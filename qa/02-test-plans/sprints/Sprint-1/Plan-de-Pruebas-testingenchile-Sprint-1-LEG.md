# Plan de Pruebas - Testing en Chile - Sprint 1 - Contenido legal y blog

| Campo | Valor |
|---|---|
| Proyecto | Testing en Chile (`testingenchile`) |
| Sprint | 1 (etapas 3-4 del pipeline; automatización en la etapa 5) |
| Módulo | Contenido legal y blog |
| Código módulo | LEG |
| Submódulos | legales (LGL), blog (BLG), galeria (GAL) |
| Fecha planificación | 2026-11-21 |
| Ventana QA | 2026-11-23 y 2026-12-02 (propuesta, sujeta a aprobación) |
| ADO Test Plan | No aplica (`integrations.azureDevOps.enabled` = false) |
| Plan maestro | `qa/02-test-plans/Plan-Maestro-de-Pruebas-testingenchile.md` |
| Especificaciones | `qa/01-specifications/module-legal/` |

---

## 1. Objetivo

Verificar, en modo de solo lectura sobre el sitio público de producción, que el módulo Contenido legal y blog cumple sus reglas de negocio confirmadas (origen `OBSERVADO` o `ESTÁNDAR` normativo), documentar como defecto (`DEF-TCH-NNN`) cada incumplimiento de una regla confirmada y como recomendación (`REC-TCH-NNN`) cada hallazgo sin regla confirmada, y dejar cada caso listo para la etapa 5 en uno de los estados válidos de la regla 8 del framework.

## 2. Alcance

### En alcance

- Páginas legales: acceso, contenido de plantilla, responsable del tratamiento e información de cookies
- Blog: listado, orden cronológico, paginación y artículos
- Fotogalería: álbumes, visor PhotoSwipe, orden y accesibilidad

### Fuera de alcance

- Envío real de formularios, pagos (Flow), compra de entradas (ecopass), conversaciones de WhatsApp o correo (regla S7)
- Credenciales, panel de Webnode y cualquier área privada (el sitio no tiene usuarios)
- Integración con Azure DevOps (deshabilitada)
- Pruebas de carga, estrés o rendimiento y pruebas de seguridad ofensivas
- Navegadores distintos de Chromium y dispositivos reales

## 3. Items del Sprint (normalizados)

No existen tareas ADO. Los items se normalizan por área funcional y hallazgo candidato:

| Área funcional | Casos | Hallazgos vinculados |
|---|---|---|
| Páginas legales | 8 | HC-01, HC-02, HC-11 |
| Blog | 9 | HC-08, HC-09, HC-11 |
| Fotogalería | 8 | HC-08, HC-09, HC-10 |

## 4. Priorización

| Prioridad | Criterio | Casos |
|---|---|---|
| P0 | Disponibilidad de la página o flujo principal (smoke) | 3 |
| P1 | Funcionalidad principal, validaciones obligatorias, destinos de CTAs, vigencia | 8 |
| P2 | Funcionalidad secundaria, enlaces externos, responsividad, accesibilidad | 7 |
| P3 | SEO, ortografía, consistencia y casos de borde | 7 |
| **Total** | | **25** |

| Tipo de ejecución | Casos |
|---|---|
| Automatizado | 16 |
| Manual | 8 |
| Bloqueado | 1 |

| Decisión de automatización | Casos |
|---|---|
| Automatizar | 16 |
| Manual | 1 |
| Pendiente | 8 |

## 5. TestSuites (agrupación)

| Suite / Área funcional | Descripción | N casos (tabla) |
|---|---|---|
| Páginas legales | Términos y Condiciones, Política de privacidad e información de cookies | 1, 2, 3, 4, 5, 6, 7, 8 |
| Blog | Listado, orden, paginación y artículos | 9, 10, 11, 12, 13, 14, 15, 16, 17 |
| Fotogalería | Álbumes, visor, orden, título y accesibilidad | 18, 19, 20, 21, 22, 23, 24, 25 |

## 6. Precondiciones generales

| Precondición | Detalle |
|---|---|
| Ambiente | Producción pública `{QA_BASE_URL}` = https://www.testingenchile.cl (único ambiente) |
| Rol | Visitante anónimo (sin login, sin usuarios) |
| Navegador | Chromium (Playwright 1.65.1), escritorio 1366x900; móvil con dispositivo Pixel 5 |
| Etiquetas de terceros | Abortar `googlesyndication.com`, `googleadservices.com` y `googletagmanager.com` con `page.route` en toda ejecución automatizada (HC-21) |
| Banner de cookies | Resolver siempre con "Aceptar solo lo necesario" (regla 6 del proyecto); nunca "Aceptar todo" |
| Solo lectura | Ningún clic en enviar, pagar, comprar ni enlaces a WhatsApp; workers <= 2 (S7) |

## 7. Datos mínimos sugeridos

| Dato | Valor o referencia | Fuente |
|---|---|---|
| URL base | `{QA_BASE_URL}` | Variable de entorno; respaldo `project.qaBaseUrl` en `qa/qa-framework.config.json` |
| Sufijo de ejecución | `EXEC_IDX` | Generado por ejecución |
| Datos de formulario | Prefijo `QA`, correos `qa.{EXEC_IDX}@example.com`, teléfono `+56 9 0000 0000` | Factories Faker en `test-data/factories/` (S5) |
| Textos esperados volátiles | Años, nombres de cursos, encabezados | `enums/messages.ts` y `test-data/static/` |
| Formas de datos por submódulo | `04-test-data.md` | `qa/01-specifications/module-legal/submodule-*/` |
| Credenciales | No aplica | El sitio no tiene usuarios |

## 8. Supuestos & Faltantes críticos

| # | Supuesto o faltante | Efecto |
|---|---|---|
| 1 | Pregunta abierta 5: responsable del tratamiento y confirmación de RN-LEG-002 a RN-LEG-005 (HC-01, HC-02, severidad alta) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 2 | La revisión de contenido legal es de calidad, no una evaluación jurídica: validar con el área legal | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 3 | Vista móvil de la galería no observada (TC-LEG-GAL-008) | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |
| 4 | El orden del blog y de la galería depende de contenido volátil: se aserta la relación de orden, no fechas concretas | Los casos afectados quedan en `Pendiente` o con aserciones estructurales hasta resolverse |

## 9. Tabla de Pruebas

Pasos expandidos en la etapa 4 (`qa-test-cases`). `Confirma` = `N/A` porque no hay tareas ADO. `{QA_BASE_URL}` y `EXEC_IDX` según la sección 7. Tipo: `Automatizado` = decisión Automatizar; `Manual` = ejecución manual (casos Manual y casos Pendiente por regla no confirmada, que se ejecutan a mano para mantener la evidencia de su recomendación); `Bloqueado` = PENDING-BROWSER o @destructive.

| N | TC-ID | Suite / Área Funcional | Título | Descripción | Precondiciones | Steps | Resultado Esperado | Datos de prueba | Confirma | Tipo | Prioridad |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-LEG-LGL-001 | Páginas legales | [SMOKE][P0] Los enlaces legales del footer abren páginas existentes en pestaña nueva | Valida el acceso a las páginas legales desde el footer. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/<br>2) Leer `href` y `target` de "Términos y condiciones." y "Políticas de privacidad." del footer<br>3) Verificar `target=_blank` en ambos<br>4) Navegar a cada destino y verificar HTTP 200<br>5) Verificar los H1 "Términos y Condiciones" y "Política de privacidad" | `target=_blank`; ambos destinos responden 200 con los H1 indicados. | N/A | N/A | Automatizado | P0 |
| 2 | TC-LEG-LGL-002 | Páginas legales | [REGRESION][P1] Términos y Condiciones no contiene texto de plantilla | Valida que los términos describen la relación real con el usuario. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/terminos-y-condiciones/<br>2) Leer el texto visible del documento<br>3) Buscar las cadenas de plantilla de `04-test-data.md` (p. ej. "Aviso legal: como propietario de una tienda online")<br>4) Verificar que el documento describe servicios, pagos y devoluciones del sitio | Ninguna cadena de plantilla presente; el documento describe servicios, pagos y devoluciones. | Cadenas de plantilla curadas en `test-data/static/` | N/A | Manual | P1 |
| 3 | TC-LEG-LGL-003 | Páginas legales | [REGRESION][P1] La política de privacidad no contiene marcadores sin completar | Valida que la política no conserva texto de plantilla. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/politica-de-privacidad/<br>2) Leer el texto visible del documento<br>3) Buscar marcadores "[...]" y la expresión "La Tienda"<br>4) Verificar que no aparece ninguno | No aparecen marcadores ni referencias a tienda online. | Marcadores curados en `test-data/static/` | N/A | Manual | P1 |
| 4 | TC-LEG-LGL-004 | Páginas legales | [REGRESION][P1] La política identifica al responsable y el canal para ejercer derechos | Valida la identificación del responsable del tratamiento y del canal de derechos. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/politica-de-privacidad/<br>2) Revisar la sección "Normas generales" y localizar al responsable del tratamiento<br>3) Revisar la sección "Derechos del cliente"<br>4) Verificar un contacto operativo (correo del dominio del sitio) para ejercer derechos | Se declaran el responsable y un contacto operativo del dominio del sitio para ejercer derechos. | N/A | N/A | Manual | P1 |
| 5 | TC-LEG-LGL-005 | Páginas legales | [REGRESION][P2] La política de privacidad presenta sus secciones | Protege la estructura de la política ante cambios. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/politica-de-privacidad/<br>2) Listar los H2 del documento<br>3) Verificar que están las 8 secciones del inventario | Las 8 secciones del inventario están presentes como H2. | Lista de secciones en `test-data/static/` | N/A | Automatizado | P2 |
| 6 | TC-LEG-LGL-006 | Páginas legales | [REGRESION][P2] El banner de cookies enlaza a la información de cookies | Valida el acceso a la información de cookies desde el banner. | Contexto de navegador sin cookies; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/ en un contexto sin cookies<br>2) Localizar el banner de cookies<br>3) Buscar enlaces dentro del banner<br>4) Verificar un enlace a la política de cookies o de privacidad | El banner contiene un enlace a la política de cookies o de privacidad. | Observado: el banner no tiene enlaces | N/A | Manual | P2 |
| 7 | TC-LEG-LGL-007 | Páginas legales | [REGRESION][P3] Las páginas legales tienen description representativa | Valida la meta description de las páginas legales. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a `/terminos-y-condiciones/` y leer la meta description<br>2) Navegar a `/politica-de-privacidad/` y leer la meta description<br>3) Verificar que resumen el documento y no repiten el texto de contacto del footer | Cada description resume su documento y no repite el texto del footer. | N/A | N/A | Manual | P3 |
| 8 | TC-LEG-LGL-008 | Páginas legales | [REGRESION][P3] Las páginas legales declaran idioma y un único H1 | Valida idioma y encabezado de las páginas legales. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a `/terminos-y-condiciones/` y `/politica-de-privacidad/`<br>2) Leer `html[lang]` y verificar `es`<br>3) Contar los `h1` y verificar exactamente uno por página | `lang="es"` y un único H1 en cada página. | Pasa hoy (guardia de regresión) | N/A | Automatizado | P3 |
| 9 | TC-LEG-BLG-001 | Blog | [SMOKE][P0] El blog carga con al menos un artículo | Valida el acceso al blog desde el menú. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/<br>2) Hacer clic en "Blog" del menú principal<br>3) Verificar URL `/blog/` con HTTP 200<br>4) Verificar al menos un artículo visible | URL `/blog/`, HTTP 200 y al menos un artículo visible. | N/A | N/A | Automatizado | P0 |
| 10 | TC-LEG-BLG-002 | Blog | [REGRESION][P1] Cada artículo del listado muestra título enlazado, fecha y extracto | Valida la estructura de las tarjetas del listado. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/blog/<br>2) Recorrer las tarjetas de artículos<br>3) Verificar en cada una un título enlazado a `/l/`<br>4) Verificar una fecha con formato dd.mm.aaaa<br>5) Verificar un extracto no vacío | Cada tarjeta con título enlazado a `/l/`, fecha dd.mm.aaaa y extracto no vacío. | N/A | N/A | Automatizado | P1 |
| 11 | TC-LEG-BLG-003 | Blog | [REGRESION][P1] Los artículos están en orden cronológico descendente | Valida el orden del listado dentro y entre páginas. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/blog/ y leer las fechas en orden<br>2) Hacer clic en "Artículos antiguos" y leer las fechas de la página siguiente<br>3) Verificar que la secuencia completa es no creciente | Secuencia de fechas no creciente dentro y entre páginas. | N/A | N/A | Automatizado | P1 |
| 12 | TC-LEG-BLG-004 | Blog | [REGRESION][P1] La paginación avanza y retrocede | Valida la paginación del listado. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/blog/<br>2) Hacer clic en "Artículos antiguos"<br>3) Verificar una página con artículos más antiguos que el último de `/blog/`<br>4) Hacer clic en "Artículos recientes"<br>5) Verificar que se vuelve a `/blog/` | Se muestra la página con artículos más antiguos y luego se vuelve a `/blog/`. | Paginación de 10 artículos (RN-LEG-009) | N/A | Automatizado | P1 |
| 13 | TC-LEG-BLG-005 | Blog | [REGRESION][P1] Los artículos de la primera página responden 200 | Valida que los artículos enlazados están publicados. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/blog/<br>2) Recopilar los enlaces `/l/{slug}/`<br>3) Solicitar cada uno con el fixture `request`<br>4) Verificar HTTP 200 en todos | Todas las respuestas son HTTP 200. | Lista dinámica de enlaces | N/A | Automatizado | P1 |
| 14 | TC-LEG-BLG-006 | Blog | [REGRESION][P2] El artículo muestra H1 igual al título del listado y su fecha | Valida la coherencia entre listado y artículo. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/blog/<br>2) Registrar el título y la fecha del primer artículo<br>3) Hacer clic en el primer título<br>4) Verificar que el H1 coincide con el título registrado<br>5) Verificar que la fecha coincide | H1 igual al título del listado y misma fecha. | N/A | N/A | Automatizado | P2 |
| 15 | TC-LEG-BLG-007 | Blog | [REGRESION][P2] El título de los artículos sigue el patrón del sitio | Valida el patrón de `<title>` de los artículos. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/blog/ y recopilar los enlaces de la primera página<br>2) Navegar a cada artículo y leer `<title>`<br>3) Verificar que termina en " :: Testing en Chile" | Cada título termina en " :: Testing en Chile". | N/A | N/A | Automatizado | P2 |
| 16 | TC-LEG-BLG-008 | Blog | [REGRESION][P3] El listado del blog tiene H1 y description | Valida encabezado y description del listado. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/blog/<br>2) Contar los `h1` y verificar uno<br>3) Leer la meta description y verificar que no está vacía | Un H1 y description no vacía. | Observado: sin H1 y description vacía | N/A | Manual | P3 |
| 17 | TC-LEG-BLG-009 | Blog | [REGRESION][P3] Las imágenes del listado tienen texto alternativo | Valida WCAG 1.1.1 en las imágenes del listado. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/blog/<br>2) Leer el `alt` de cada imagen de artículo<br>3) Verificar que ninguna tiene `alt` vacío o ausente | Cada imagen de artículo tiene `alt` no vacío (por ejemplo, el título). | Observado: 11/11 sin `alt` | N/A | Automatizado | P3 |
| 18 | TC-LEG-GAL-001 | Fotogalería | [SMOKE][P0] La galería carga con álbumes y miniaturas | Valida el acceso a la galería desde el menú. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/<br>2) Hacer clic en "Fotogalería" del menú principal<br>3) Verificar URL `/galeria/` con HTTP 200<br>4) Verificar al menos un encabezado de álbum y una miniatura visibles | URL `/galeria/`, HTTP 200, al menos un encabezado de álbum y una miniatura visibles. | N/A | N/A | Automatizado | P0 |
| 19 | TC-LEG-GAL-002 | Fotogalería | [REGRESION][P1] Una miniatura abre el visor y Escape lo cierra | Valida la transición cerrado, abierto y cerrado del visor. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/galeria/<br>2) Hacer clic en la primera miniatura<br>3) Verificar que el visor se abre con contador "1 / N" y la URL no cambia<br>4) Pulsar la tecla Escape<br>5) Verificar que el visor se cierra | Visor abierto con "1 / N" sin cambiar la URL; cerrado tras Escape. | N/A | N/A | Automatizado | P1 |
| 20 | TC-LEG-GAL-003 | Fotogalería | [REGRESION][P2] La flecha derecha avanza a la siguiente foto | Valida la navegación por teclado del visor. | Contexto limpio; banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/galeria/<br>2) Abrir el visor en un álbum con más de una foto<br>3) Pulsar la tecla flecha derecha<br>4) Verificar que el contador pasa a "2 / N" | El contador pasa a "2 / N". | N/A | N/A | Automatizado | P2 |
| 21 | TC-LEG-GAL-004 | Fotogalería | [REGRESION][P2] El álbum más reciente aparece primero | Valida el orden de los álbumes. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/galeria/<br>2) Leer los encabezados de álbum en orden<br>3) Extraer el año de cada encabezado<br>4) Verificar que el primer álbum corresponde al año más reciente detectado | El primer álbum corresponde a la edición o actividad más reciente. | Observado: 2026 primero | N/A | Automatizado | P2 |
| 22 | TC-LEG-GAL-005 | Fotogalería | [REGRESION][P3] El título de la galería no tiene errores tipográficos | Valida el `<title>` de la galería. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/galeria/<br>2) Leer `<title>`<br>3) Verificar que no contiene "Tesitng" y nombra "Testing en Chile" | El título nombra correctamente "Testing en Chile". | Observado: "CapTI de Tesitng en Chile" | N/A | Manual | P3 |
| 23 | TC-LEG-GAL-006 | Fotogalería | [REGRESION][P3] Las fotos de la galería tienen texto alternativo | Valida WCAG 1.1.1 en las fotos de la galería. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/galeria/<br>2) Contar las `img` sin `alt` o con `alt` vacío<br>3) Verificar que ninguna imagen informativa carece de `alt` | Ninguna imagen informativa sin `alt`. | Observado: 558/572 sin `alt` | N/A | Automatizado | P3 |
| 24 | TC-LEG-GAL-007 | Fotogalería | [REGRESION][P3] La galería tiene un único H1 | Valida la jerarquía de encabezados de la galería. | Visitante anónimo en contexto de navegador limpio; etiquetas de Google bloqueadas (`page.route`). | 1) Navegar a {QA_BASE_URL}/galeria/<br>2) Contar los `h1`<br>3) Verificar exactamente uno y que los álbumes usan H2 | Exactamente un H1; los álbumes usan H2. | Observado: 9 H1 | N/A | Manual | P3 |
| 25 | TC-LEG-GAL-008 | Fotogalería | [REGRESION][P2] La galería es usable en móvil | Valida la responsividad de la galería y del visor. | Contexto limpio con dispositivo Pixel 5 (393 px); banner resuelto con "Aceptar solo lo necesario"; etiquetas de Google bloqueadas. | 1) Navegar a {QA_BASE_URL}/galeria/ con el dispositivo Pixel 5<br>2) Verificar miniaturas visibles y `scrollWidth` igual a `clientWidth`<br>3) Tocar la primera miniatura y verificar que el visor se abre<br>4) Cerrar el visor y verificar que se oculta | Miniaturas visibles sin desplazamiento horizontal; el visor abre y cierra. | Dispositivo Pixel 5 | N/A | Bloqueado | P2 |

### 9.1 Decisión de automatización y trazabilidad

| N | TC-ID | Etiqueta | Decisión | Motivo | Reglas (RN) | Flujos (FL) | Hallazgos | DEF / REC | Estado esperado en etapa 5 |
|---|---|---|---|---|---|---|---|---|---|
| 1 | TC-LEG-LGL-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-001 | FL-LEG-001 | - | - | `test()` (pasa) |
| 2 | TC-LEG-LGL-002 | `@sanity` | Pendiente | RN-LEG-002 pendiente de confirmación (pregunta abierta 5) y hoy falla (HC-01): recomendación de severidad alta escalada a negocio y área legal. | RN-LEG-002 | FL-LEG-001 | HC-01 | REC-TCH-001 | `test.skip()` PENDING-SPEC (REC-TCH-001) |
| 3 | TC-LEG-LGL-003 | `@sanity` | Pendiente | RN-LEG-003 y RN-LEG-004 pendientes de confirmación y hoy falla (HC-02): recomendación de severidad alta escalada. | RN-LEG-003, RN-LEG-004 | FL-LEG-001 | HC-02 | REC-TCH-002 | `test.skip()` PENDING-SPEC (REC-TCH-002) |
| 4 | TC-LEG-LGL-004 | `@sanity` | Manual | Revisión de contenido que requiere criterio humano (y del área legal); RN-LEG-003 pendiente de confirmación (HC-02). | RN-LEG-003 | FL-LEG-001 | HC-02 | REC-TCH-002 | Fuera de la suite automatizada (ejecución manual) |
| 5 | TC-LEG-LGL-005 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-001 (inventario de la página) | FL-LEG-001 | - | - | `test()` (pasa) |
| 6 | TC-LEG-LGL-006 | `@regression` | Pendiente | RN-LEG-005 pendiente de confirmación y hoy falla (HC-02): recomendación. | RN-LEG-005 | FL-LEG-002 | HC-02 | REC-TCH-002 | `test.skip()` PENDING-SPEC (REC-TCH-002) |
| 7 | TC-LEG-LGL-007 | `@regression` | Pendiente | RN-LEG-006 es criterio SEO no confirmado como regla de negocio (HC-11): recomendación. | RN-LEG-006 | - | HC-11 | REC-TCH-007 | `test.skip()` PENDING-SPEC (REC-TCH-007) |
| 8 | TC-LEG-LGL-008 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-006, RN-HOME-020 | - | - | - | `test()` (pasa) |
| 9 | TC-LEG-BLG-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-007 | FL-LEG-003 | - | - | `test()` (pasa) |
| 10 | TC-LEG-BLG-002 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-007 | FL-LEG-003 | - | - | `test()` (pasa) |
| 11 | TC-LEG-BLG-003 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-008 | FL-LEG-003 | - | - | `test()` (pasa) |
| 12 | TC-LEG-BLG-004 | `@e2e` | Automatizar | Determinista; flujo multipágina, solo lectura. | RN-LEG-009 | FL-LEG-003 | - | - | `test()` (pasa) |
| 13 | TC-LEG-BLG-005 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-010 | FL-LEG-003, FL-LEG-004 | - | - | `test()` (pasa) |
| 14 | TC-LEG-BLG-006 | `@e2e` | Automatizar | Determinista; flujo multipágina, solo lectura. | RN-LEG-010 | FL-LEG-003 | - | - | `test()` (pasa) |
| 15 | TC-LEG-BLG-007 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-011 | FL-LEG-003 | - | - | `test()` (pasa) |
| 16 | TC-LEG-BLG-008 | `@regression` | Pendiente | RN-LEG-012 es criterio SEO no confirmado como regla de negocio (HC-09, HC-11): recomendación. | RN-LEG-012 | - | HC-09, HC-11 | REC-TCH-005, REC-TCH-007 | `test.skip()` PENDING-SPEC (REC-TCH-005, REC-TCH-007) |
| 17 | TC-LEG-BLG-009 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-005. | RN-HOME-012 | - | HC-08 | DEF-TCH-005 | `test.fail()` + DEF-TCH-005 |
| 18 | TC-LEG-GAL-001 | `@smoke` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-013 | FL-LEG-005 | - | - | `test()` (pasa) |
| 19 | TC-LEG-GAL-002 | `@sanity` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-014, RN-LEG-015 | FL-LEG-005 | - | - | `test()` (pasa) |
| 20 | TC-LEG-GAL-003 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-015 | FL-LEG-005 | - | - | `test()` (pasa) |
| 21 | TC-LEG-GAL-004 | `@regression` | Automatizar | Determinista, observable en el navegador y de solo lectura. | RN-LEG-013 | FL-LEG-005 | - | - | `test()` (pasa) |
| 22 | TC-LEG-GAL-005 | `@regression` | Pendiente | RN-LEG-016 es criterio editorial no confirmado como regla de negocio (HC-10): recomendación. | RN-LEG-016 | - | HC-10 | REC-TCH-006 | `test.skip()` PENDING-SPEC (REC-TCH-006) |
| 23 | TC-LEG-GAL-006 | `@regression` | Automatizar | Regla confirmada incumplida: `test.fail()` vía `expectOpenDefect` con DEF-TCH-005. | RN-LEG-017 | FL-LEG-006 | HC-08 | DEF-TCH-005 | `test.fail()` + DEF-TCH-005 |
| 24 | TC-LEG-GAL-007 | `@regression` | Pendiente | RN-HOME-020 es criterio SEO no confirmado como regla de negocio (HC-09): recomendación. | RN-HOME-020 | - | HC-09 | REC-TCH-005 | `test.skip()` PENDING-SPEC (REC-TCH-005) |
| 25 | TC-LEG-GAL-008 | `@regression` | Pendiente | Vista móvil no observada (PENDING-BROWSER): observar antes de automatizar (K12). | RN-HOME-015 | FL-LEG-005 | - | - | `test.skip()` PENDING-BROWSER |

## 10. Matriz de Trazabilidad

Sin tareas ADO: la matriz se construye sobre reglas de negocio y hallazgos candidatos.

| Regla de negocio | N casos (tabla) |
|---|---|
| RN-HOME-012 | 17 |
| RN-HOME-015 | 25 |
| RN-HOME-020 | 8, 24 |
| RN-LEG-001 | 1, 5 |
| RN-LEG-002 | 2 |
| RN-LEG-003 | 3, 4 |
| RN-LEG-004 | 3 |
| RN-LEG-005 | 6 |
| RN-LEG-006 | 7, 8 |
| RN-LEG-007 | 9, 10 |
| RN-LEG-008 | 11 |
| RN-LEG-009 | 12 |
| RN-LEG-010 | 13, 14 |
| RN-LEG-011 | 15 |
| RN-LEG-012 | 16 |
| RN-LEG-013 | 18, 21 |
| RN-LEG-014 | 19 |
| RN-LEG-015 | 19, 20 |
| RN-LEG-016 | 22 |
| RN-LEG-017 | 23 |

| Hallazgo candidato | N casos (tabla) |
|---|---|
| HC-01 | 2 |
| HC-02 | 3, 4, 6 |
| HC-08 | 17, 23 |
| HC-09 | 16, 24 |
| HC-10 | 22 |
| HC-11 | 7, 16 |

## 11. Notas de automatización

- Specs en `qa/07-automation/e2e/tests/legal/`, siguiendo la Constitución de `AGENTS.md` (K1-K12, W1-W11).
- Título `[TC-...] {título} @P#` y exactamente una etiqueta de tipo en `{ tag }` (K10); la etiqueta de cada caso está en la sección 9.1.
- Casos con DEF: `expectOpenDefect('DEF-TCH-NNN', ...)` con la aserción de la especificación, nunca invertida (reglas 8 y 10).
- Casos `Pendiente` por regla no confirmada: `test.skip()` con `PENDING-SPEC` y el ID de la recomendación en el mensaje; se reactivan al confirmarse la regla (con `test.fail()` + DEF si sigue fallando).
- Casos `@destructive`: `test.skip()` por defecto con el motivo en el mensaje (S7, W9).
- Aserciones de estructura y rutas; textos volátiles en `enums/` o `test-data/static/` (regla 7 del proyecto).
- Fixture base con el bloqueo de etiquetas de Google y page object del banner de cookies con la acción "Aceptar solo lo necesario".

## 12. Defectos y recomendaciones vinculados

| ID | Tipo | Título | Severidad | Hallazgo | Casos del módulo |
|---|---|---|---|---|---|
| DEF-TCH-005 | Defecto | Imágenes informativas sin texto alternativo en páginas de contenido | Media | HC-08 | TC-LEG-BLG-009, TC-LEG-GAL-006 |
| REC-TCH-001 | Recomendación | Términos y Condiciones contiene solo el texto de ayuda de la plantilla Webnode | Alta | HC-01 | TC-LEG-LGL-002 |
| REC-TCH-002 | Recomendación | Política de privacidad de plantilla sin completar y banner de cookies sin enlace | Alta | HC-02 | TC-LEG-LGL-003, TC-LEG-LGL-004, TC-LEG-LGL-006 |
| REC-TCH-005 | Recomendación | Jerarquía de H1 inválida: múltiples H1, H1 vacíos o ausentes | Baja | HC-09 | TC-LEG-BLG-008, TC-LEG-GAL-007 |
| REC-TCH-006 | Recomendación | Títulos de página con errores o poco descriptivos | Baja | HC-10 | TC-LEG-GAL-005 |
| REC-TCH-007 | Recomendación | Meta description vacía o no representativa | Baja | HC-11 | TC-LEG-BLG-008, TC-LEG-LGL-007 |

Detalle y criterio de clasificación: sección 11 del plan maestro, `qa/06-defects/open/` y `qa/06-defects/recommendations/`.
