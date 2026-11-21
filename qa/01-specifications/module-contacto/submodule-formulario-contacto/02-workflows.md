# Flujos - Contacto y formularios: Página de contacto

> Módulo `CON` | Submódulo `FCO` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-CON-001: Contactar al sitio desde el menú

**Actor**: Visitante anónimo
**Disparador**: El visitante quiere hacer una consulta
**Precondición**: Cualquier página

**Flujo**:

```text
[Menú "Contacto"] -> [/formulario-contacto/] -> ["¡Hablemos!"]
    |
    +-- "¡Hablemos por WhatsApp!" -> [wa.me (no ejercido)]
    +-- redes sociales -> [perfiles externos]
    +-- footer -> [correo según tipo de consulta (texto)]
    +-- formulario -> (no existe: HC-12)
```

**Postcondición**: El visitante identifica un canal de contacto; ningún dato se envía.

### FL-CON-002: El visitante busca un formulario y no lo encuentra (camino de error)

**Actor**: Visitante anónimo
**Disparador**: Expectativa creada por la ruta y el menú
**Precondición**: Página de contacto cargada

**Flujo**:

```text
[/formulario-contacto/] -> [sin formulario] -> [WhatsApp o correo manual] | [/contacto-empresa/ solo para empresas]
```

**Postcondición**: El visitante debe usar otro canal.

