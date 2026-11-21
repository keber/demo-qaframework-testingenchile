# Flujos - Inicio y navegación global: Navegación global

> Módulo `HOME` | Submódulo `NAV` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-HOME-001: Navegación por el menú principal (escritorio)

**Actor**: Visitante anónimo
**Disparador**: El visitante quiere ir a una sección
**Precondición**: Página cualquiera cargada en escritorio

**Flujo**:

```text
[Inicio]
    |
    v
[Banner de cookies] -> "Aceptar solo lo necesario"
    |
    v
[Menú principal] --hover "Testing Day Chile 2026"--> [Submenú: Agenda, Sponsors, Ediciones, Otras]
    |                                                        |
    | clic en ítem de primer nivel                           +--hover "Ediciones anteriores"--> [Tercer nivel (pendiente de confirmar)]
    v
[Página destino HTTP 200]
```

**Postcondición**: El visitante está en la sección elegida; el menú sigue disponible.

### FL-HOME-002: Navegación con el menú móvil

**Actor**: Visitante anónimo
**Disparador**: El visitante usa un teléfono
**Precondición**: Viewport móvil

**Flujo**:

```text
[Página] -> clic "Menú" -> [Panel con 6 ítems]
                              |
                              +-- clic "Abrir submenú" -> [4 ítems de Testing Day]
                              |
                              +-- clic en ítem -> [Página destino]
                              |
                              +-- clic cerrar -> [Panel oculto]
```

**Postcondición**: Panel cerrado o página destino cargada.

### FL-HOME-003: Gestión del consentimiento de cookies

**Actor**: Visitante anónimo
**Disparador**: Primera visita
**Precondición**: Navegador sin cookies del sitio

**Flujo**:

```text
[Primera visita] -> [Banner visible]
    |
    +-- "Aceptar solo lo necesario" -> [Banner oculto, cookieAccepted guardada] -> [Recarga: banner no reaparece]
    |
    +-- footer "Cookies" -> [Banner visible otra vez]
```

**Postcondición**: La elección queda persistida; la etiqueta de Google opera en modo consentimiento denegado.

### FL-HOME-004: Ruta inexistente (camino de error)

**Actor**: Visitante anónimo
**Disparador**: El visitante sigue un enlace roto o escribe mal una URL
**Precondición**: Ninguna

**Flujo**:

```text
[GET /ruta-inexistente/] -> [HTTP 404 + "404 - Página no encontrada"] -> [Menú principal] -> [Página válida]
```

**Postcondición**: El visitante puede volver al sitio desde la página 404.

