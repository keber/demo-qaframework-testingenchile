# Flujos - Eventos Testing Day: Ediciones anteriores

> Módulo `EVT` | Submódulo `EDI` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-EVT-003: Recorrer las ediciones anteriores

**Actor**: Visitante anónimo
**Disparador**: El visitante quiere conocer la historia del evento
**Precondición**: Cualquier página

**Flujo**:

```text
[Menú] -> "Testing Day Chile 2026" -> "Ediciones anteriores"
    |
    +-- [/testing-day-chile-ediciones-anteriores/] -> [2019 | 2018 | 2017 | Córdoba 2016]
    |        +-- "Ver lo más destacado" -> [blog externo 200]
    |        +-- "Saber más de esta edición" -> [404 (HC-03)]
    |        +-- "Ver detalles de la edición más reciente" -> [/testing-day-chile-2022/]
    |
    +-- tercer nivel -> [/testing-day-chile-2025/] -> "¡Conócelos aquí!" -> [/nuestros-sponsors-2025/]
```

**Postcondición**: El visitante consulta la edición elegida.

### FL-EVT-004: Enlace de edición inexistente (camino de error)

**Actor**: Visitante anónimo
**Disparador**: Clic en un enlace roto
**Precondición**: Página de ediciones cargada

**Flujo**:

```text
[clic "Saber más de esta edición"] -> [HTTP 404] -> [Página 404 con menú (RN-HOME-011)]
```

**Postcondición**: El visitante queda en la 404 (HC-03).

