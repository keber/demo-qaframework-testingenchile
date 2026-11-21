# Módulo HOME - Inicio y navegación global

> Última actualización: 2026-11-21 | Etapas 1 (análisis) y 2 (especificación) completadas | Fuente: Exploración en producción (solo lectura), 2026-11-21

Página de inicio y elementos globales compartidos por todo el sitio: header (barra superior y menú), menú móvil, footer, banner de cookies, botón flotante de WhatsApp, página 404 y redirecciones.

## Submódulos

| Submódulo | Código | Ruta principal | TCs | P0 | P1 | P2 | P3 | Carpeta |
|---|---|---|---|---|---|---|---|---|
| Navegación global | NAV | `/` | 14 | 2 | 6 | 5 | 1 | `submodule-navegacion/` |
| Portada (página de inicio) | POR | `/` | 9 | 1 | 4 | 3 | 1 | `submodule-portada/` |

**Total del módulo**: 23 casos de prueba.

## Flujo E2E del módulo

```text
[Visitante] -> [/] -> [Banner cookies: "Aceptar solo lo necesario"]
    |
    +-- Menú principal -> [Capacitaciones | Testing Day | Blog | Fotogalería | Contacto]
    +-- Hero / Servicios / Destacados -> [Catálogo, Bootcamp, curso, contacto empresa]
    +-- Footer -> [Legales, redes, correos]
    +-- Ruta inexistente -> [404 con navegación]
```

## Reglas de negocio

Las reglas `RN-HOME-*` transversales (header, footer, banner de cookies) se definen en `submodule-navegacion` y aplican a todas las páginas del sitio.
