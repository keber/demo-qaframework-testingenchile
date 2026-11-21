# Módulo CAP - Capacitaciones

> Última actualización: 2026-11-21 | Etapas 1 (análisis) y 2 (especificación) completadas | Fuente: Exploración en producción (solo lectura), 2026-11-21

Oferta formativa: catálogo filtrable, páginas de detalle de cada curso o certificación (con formulario de consulta y botón de pago externo) y landing del Bootcamp de Testing con autodiagnóstico.

## Submódulos

| Submódulo | Código | Ruta principal | TCs | P0 | P1 | P2 | P3 | Carpeta |
|---|---|---|---|---|---|---|---|---|
| Catálogo de capacitaciones | CAT | `/capacitaciones2/` | 9 | 1 | 3 | 3 | 2 | `submodule-catalogo/` |
| Detalle de curso | CUR | `/curso-automatizacion-pruebas-software-web-selenium-java/` | 10 | 1 | 6 | 2 | 1 | `submodule-detalle-curso/` |
| Bootcamp de Testing | BTC | `/bootcamp-de-testing/` | 8 | 1 | 3 | 3 | 1 | `submodule-bootcamp/` |

**Total del módulo**: 27 casos de prueba.

## Flujo E2E del módulo

```text
[/] -> "Ver Capacitaciones" -> [/capacitaciones2/] -> filtro -> "Saber más"
                                                          |
                                                          v
                                   [Detalle de curso] -> [Formulario (sin enviar)] / [Pago flow.cl (no ejecutado)]
[/] -> "Bootcamp de Testing" -> [/bootcamp-de-testing/] -> [Autodiagnóstico] -> [#btc-postula] -> [WhatsApp / correo (no ejecutado)]
```

## Reglas de negocio

Los identificadores `RN-CAP-NNN` son únicos dentro del módulo; cada submódulo usa un rango propio.
