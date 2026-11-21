# Flujos - Inicio y navegación global: Portada (página de inicio)

> Módulo `HOME` | Submódulo `POR` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-HOME-005: Descubrimiento de la oferta desde la portada

**Actor**: Visitante anónimo
**Disparador**: El visitante llega a la portada
**Precondición**: Portada cargada

**Flujo**:

```text
[Portada] -> [Hero]
    |            +-- "Ver Capacitaciones" -> [/capacitaciones2/]
    |            +-- "Bootcamp de Testing" -> [/bootcamp-de-testing/ (pestaña nueva)]
    v
[Contadores animados] -> [Servicios] -> "Solicitar cotización" -> [/contacto-empresa/]
    |
    v
[Destacados] -> "Ver Temario" -> [Página de curso]
    |
    v
[Testimonios] -> [Partners] -> [Footer]
```

**Postcondición**: El visitante llega al catálogo, al Bootcamp, a un curso o al contacto empresa.

### FL-HOME-006: Contenido que no carga (camino de error)

**Actor**: Visitante anónimo
**Disparador**: Fallo de un recurso externo (CDN de imágenes `i.ibb.co` o `clvaw-cdnwnd.com`)
**Precondición**: Portada cargada

**Flujo**:

```text
[Portada] -> [Imagen no disponible] -> [Se muestra el texto alternativo (si existe)] -> [El resto de la página sigue operativa]
```

**Postcondición**: La página se mantiene navegable; sin `alt` el contenido de la imagen se pierde (RN-HOME-012).

