# Flujos - Capacitaciones: Catálogo de capacitaciones

> Módulo `CAP` | Submódulo `CAT` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-CAP-001: Explorar el catálogo y abrir un curso

**Actor**: Visitante anónimo
**Disparador**: El visitante busca una capacitación
**Precondición**: Catálogo cargado

**Flujo**:

```text
[/capacitaciones2/] -> [15 tarjetas]
    |
    +-- clic filtro (p. ej. "Certificaciones") -> [4 tarjetas] -> clic "Todos" -> [15 tarjetas]
    |
    v
[clic "Saber más"] -> [Detalle del curso en pestaña nueva (HTTP 200)]
```

**Postcondición**: El visitante ve el detalle del curso elegido.

### FL-CAP-002: Consulta por convenio Sence

**Actor**: Visitante anónimo
**Disparador**: El visitante quiere financiar con Sence
**Precondición**: Catálogo cargado

**Flujo**:

```text
[/capacitaciones2/] -> [Sección "Consulta por convenio Sence"] -> [botón "Hablemos"] -> [wa.me en pestaña nueva (no ejercido)]
```

**Postcondición**: Se abriría una conversación de WhatsApp; fuera de ejecución (S7).

### FL-CAP-003: Destino de curso no disponible (camino de error)

**Actor**: Visitante anónimo
**Disparador**: Un "Saber más" apunta a una página eliminada
**Precondición**: Catálogo cargado

**Flujo**:

```text
[clic "Saber más"] -> [HTTP 404] -> [Página 404 con menú (RN-HOME-011)] -> [volver al catálogo]
```

**Postcondición**: Hoy no ocurre (15/15 con 200); se cubre con TC-CAP-CAT-002.

