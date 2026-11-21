# Módulo CON - Contacto y formularios

> Última actualización: 2026-11-21 | Etapas 1 (análisis) y 2 (especificación) completadas | Fuente: Exploración en producción (solo lectura), 2026-11-21

Canales de contacto del sitio: la página "Contacto" del menú (sin formulario: WhatsApp, redes y correos) y el formulario B2B de contacto empresa. Validación solo en el cliente, nunca con envío real.

## Submódulos

| Submódulo | Código | Ruta principal | TCs | P0 | P1 | P2 | P3 | Carpeta |
|---|---|---|---|---|---|---|---|---|
| Página de contacto | FCO | `/formulario-contacto/` | 8 | 1 | 3 | 2 | 2 | `submodule-formulario-contacto/` |
| Contacto empresa (B2B) | EMP | `/contacto-empresa/` | 12 | 1 | 5 | 3 | 3 | `submodule-contacto-empresa/` |

**Total del módulo**: 20 casos de prueba.

## Flujo E2E del módulo

```text
[Menú "Contacto"] -> [/formulario-contacto/] -> [WhatsApp | redes | correos]
[Portada "Solicitar cotización"] -> [/contacto-empresa/] -> [Formulario completo con datos sintéticos] -> (sin enviar)
```

## Reglas de negocio

Los identificadores `RN-CON-NNN` son únicos dentro del módulo; cada submódulo usa un rango propio.
