# Flujos - Capacitaciones: Bootcamp de Testing

> Módulo `CAP` | Submódulo `BTC` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-CAP-006: Autodiagnóstico de afinidad

**Actor**: Visitante anónimo
**Disparador**: El visitante quiere saber si el Bootcamp le encaja
**Precondición**: Landing cargada

**Flujo**:

```text
[Landing] -> [Sección "¿Este Bootcamp encaja contigo?"]
    |
    +-- sin respuestas -> "Ver mi orientación" -> [validación nativa, sin resultado]
    |
    v
[4 respuestas] -> "Ver mi orientación" -> [puntaje]
    |-- >= 6 -> "Muy alineada"
    |-- 3-5  -> "Con potencial de desarrollo"
    |-- 0-2  -> "Vale la pena conversar"
    v
[Enlace "Conocer cómo postular" -> #btc-postula]
```

**Postcondición**: Resultado visible en `#btc-result`; no se envía nada al sitio (sí se dispara la etiqueta de Google, HC-21).

### FL-CAP-007: Postulación por canales de contacto (sin ejecutar)

**Actor**: Visitante anónimo
**Disparador**: El visitante decide postular
**Precondición**: Landing cargada

**Flujo**:

```text
[CTA "Quiero evaluar mi postulación"] -> [#btc-postula] -> ["Hablar por WhatsApp" | "Consultar por correo"] -> (no ejercido)
```

**Postcondición**: Solo se verifican destinos de los enlaces.

