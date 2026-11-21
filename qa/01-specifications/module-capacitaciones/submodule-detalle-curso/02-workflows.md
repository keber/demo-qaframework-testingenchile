# Flujos - Capacitaciones: Detalle de curso

> Módulo `CAP` | Submódulo `CUR` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-CAP-004: Revisar un curso y preparar una consulta (sin enviar)

**Actor**: Visitante anónimo
**Disparador**: El visitante quiere información del curso
**Precondición**: Página de curso cargada

**Flujo**:

```text
[Detalle del curso] -> [Contenido / instructores / video]
    |
    v
[Formulario de consulta] -> completar con datos sintéticos -> [checkValidity() = true]
    |
    +-- falta un campo obligatorio -> [checkValidity() = false, mensaje nativo]
    +-- e-mail sin "@" -> [campo inválido]
    v
["¡Enviar mensaje!"] -> (NO se ejecuta: S7 + reCAPTCHA)
```

**Postcondición**: Formulario completo y válido en el cliente; nada se envía.

### FL-CAP-005: Pago del curso (fuera de ejecución)

**Actor**: Visitante anónimo
**Disparador**: El visitante decide pagar
**Precondición**: Página de curso cargada

**Flujo**:

```text
[Botón de pago] -> [flow.cl en pestaña nueva] -> (pasarela real: nunca se ejecuta)
```

**Postcondición**: Solo se verifica el destino del enlace.

