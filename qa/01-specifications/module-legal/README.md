# Módulo LEG - Contenido legal y blog

> Última actualización: 2026-11-21 | Etapas 1 (análisis) y 2 (especificación) completadas | Fuente: Exploración en producción (solo lectura), 2026-11-21

Documentos legales del footer (términos y condiciones, política de privacidad, información de cookies), blog con paginación y artículos, y fotogalería con visor.

## Submódulos

| Submódulo | Código | Ruta principal | TCs | P0 | P1 | P2 | P3 | Carpeta |
|---|---|---|---|---|---|---|---|---|
| Páginas legales | LGL | `/politica-de-privacidad/` | 8 | 1 | 3 | 2 | 2 | `submodule-legales/` |
| Blog | BLG | `/blog/` | 9 | 1 | 4 | 2 | 2 | `submodule-blog/` |
| Fotogalería | GAL | `/galeria/` | 8 | 1 | 1 | 3 | 3 | `submodule-galeria/` |

**Total del módulo**: 25 casos de prueba.

## Flujo E2E del módulo

```text
[Footer] -> [/terminos-y-condiciones/] | [/politica-de-privacidad/]
[Menú "Blog"] -> [/blog/] -> [/l/{slug}/] ; [/blog/p-e0nza2ma/{n}/]
[Menú "Fotogalería"] -> [/galeria/] -> [Visor PhotoSwipe]
```

## Reglas de negocio

Los identificadores `RN-LEG-NNN` son únicos dentro del módulo; cada submódulo usa un rango propio.
