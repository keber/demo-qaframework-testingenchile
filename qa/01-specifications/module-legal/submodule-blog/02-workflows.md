# Flujos - Contenido legal y blog: Blog

> Módulo `LEG` | Submódulo `BLG` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-LEG-003: Leer un artículo del blog

**Actor**: Visitante anónimo
**Disparador**: El visitante busca contenido
**Precondición**: Cualquier página

**Flujo**:

```text
[Menú "Blog"] -> [/blog/ (10 artículos)] -> clic título -> [/l/{slug}/ con H1 y fecha]
    |
    +-- "Artículos antiguos" -> [/blog/p-e0nza2ma/1/] -> "Artículos recientes" -> [/blog/]
```

**Postcondición**: El visitante lee el artículo o navega entre páginas del listado.

### FL-LEG-004: Artículo inexistente (camino de error)

**Actor**: Visitante anónimo
**Disparador**: Enlace a un slug eliminado
**Precondición**: Ninguna

**Flujo**:

```text
[/l/slug-inexistente/] -> [HTTP 404 con menú (RN-HOME-011)]
```

**Postcondición**: El visitante vuelve al blog desde el menú.

