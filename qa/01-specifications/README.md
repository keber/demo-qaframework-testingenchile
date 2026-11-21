# Especificaciones - Testing en Chile

> Última actualización: 2026-11-21 | Etapas 1 y 2 completadas para los 5 módulos | Resumen del análisis: `ANALISIS-DE-PRUEBAS.md`

| Módulo | Código | Carpeta | Submódulos | TCs | P0 | P1 | P2 | P3 |
|---|---|---|---|---|---|---|---|---|
| Inicio y navegación global | HOME | `module-home/` | navegacion (NAV), portada (POR) | 23 | 3 | 10 | 8 | 2 |
| Capacitaciones | CAP | `module-capacitaciones/` | catalogo (CAT), detalle-curso (CUR), bootcamp (BTC) | 27 | 3 | 12 | 8 | 4 |
| Eventos Testing Day | EVT | `module-eventos/` | testing-day (TDY), ediciones (EDI) | 21 | 2 | 7 | 7 | 5 |
| Contacto y formularios | CON | `module-contacto/` | formulario-contacto (FCO), contacto-empresa (EMP) | 20 | 2 | 8 | 5 | 5 |
| Contenido legal y blog | LEG | `module-legal/` | legales (LGL), blog (BLG), galeria (GAL) | 25 | 3 | 8 | 7 | 7 |
| **Total** | | | **12** | **116** | **13** | **45** | **35** | **23** |

Cada submódulo contiene `00-inventory.md`, `01-business-rules.md`, `02-workflows.md`, `03-roles-permissions.md`, `04-test-data.md` y `05-test-scenarios.md`. Los hallazgos candidatos (`HC-NN`) están consolidados en la sección 7 de `ANALISIS-DE-PRUEBAS.md`.
