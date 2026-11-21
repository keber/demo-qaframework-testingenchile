# Flujos - Contenido legal y blog: Fotogalería

> Módulo `LEG` | Submódulo `GAL` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-LEG-005: Ver fotos de un álbum

**Actor**: Visitante anónimo
**Disparador**: El visitante quiere ver fotos de un evento
**Precondición**: Galería cargada

**Flujo**:

```text
[Menú "Fotogalería"] -> [/galeria/] -> [álbum] -> clic miniatura -> [Visor "1 / N"]
                                                                  |
                                                                  +-- flecha derecha -> ["2 / N"]
                                                                  +-- Escape -> [Visor cerrado]
```

**Postcondición**: El visitante vuelve a la galería en la misma posición.

### FL-LEG-006: Imagen que no carga (camino de error)

**Actor**: Visitante anónimo
**Disparador**: Fallo del CDN
**Precondición**: Galería cargada

**Flujo**:

```text
[Miniatura sin imagen] -> [sin alt: no hay texto alternativo] -> [el resto de la galería sigue operativa]
```

**Postcondición**: Se pierde la información de la imagen (RN-LEG-017).

