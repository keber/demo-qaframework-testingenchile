# Flujos - Contacto y formularios: Contacto empresa (B2B)

> Módulo `CON` | Submódulo `EMP` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-CON-003: Solicitud de capacitación empresa (validación en el cliente, sin envío)

**Actor**: Visitante anónimo
**Disparador**: Una empresa quiere cotizar
**Precondición**: Formulario visible

**Flujo**:

```text
[/contacto-empresa/] -> [Formulario]
    |
    +-- campos vacíos -> [checkValidity() = false]
    +-- email sin "@" -> [Email inválido]
    +-- "Número de personas" = 0 o negativo -> [hoy válido; esperado inválido (RN-CON-011)]
    |
    v
[datos sintéticos completos] -> [todos los campos válidos] -> "Enviar" (NO se ejecuta: S7 + reCAPTCHA)
```

**Postcondición**: Formulario válido en el cliente; nada se envía.

### FL-CON-004: Envío real (fuera de ejecución)

**Actor**: Visitante anónimo
**Disparador**: Clic en "Enviar"
**Precondición**: Formulario válido y reCAPTCHA resuelto

**Flujo**:

```text
["Enviar"] -> [POST a la misma URL] -> [confirmación (no observada)]
```

**Postcondición**: Solo documentado; prohibido en producción.

