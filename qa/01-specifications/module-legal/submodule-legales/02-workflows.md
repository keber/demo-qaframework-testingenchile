# Flujos - Contenido legal y blog: Páginas legales

> Módulo `LEG` | Submódulo `LGL` | Última actualización: 2026-11-21
>
> Diagramas en ASCII (`|`, `v`, `->`) por la regla 11 del framework. Ningún flujo incluye el envío real de formularios ni la ejecución de pagos.

### FL-LEG-001: Consultar las condiciones y la privacidad

**Actor**: Visitante anónimo
**Disparador**: El visitante quiere conocer sus derechos antes de enviar datos o pagar
**Precondición**: Cualquier página

**Flujo**:

```text
[Footer] -> "Términos y condiciones." -> [/terminos-y-condiciones/ (pestaña nueva)]
    |                                         +-- hoy: solo aviso de plantilla (HC-01)
    v
[Footer] -> "Políticas de privacidad." -> [/politica-de-privacidad/ (pestaña nueva)]
                                              +-- hoy: plantilla con marcadores (HC-02)
```

**Postcondición**: El visitante lee los documentos legales vigentes.

### FL-LEG-002: Buscar información de cookies desde el banner (camino de error)

**Actor**: Visitante anónimo
**Disparador**: El visitante quiere saber qué cookies se usan
**Precondición**: Banner visible

**Flujo**:

```text
[Banner de cookies] -> (sin enlace) -> [Footer "Cookies" reabre el banner] -> [sin política de cookies]
```

**Postcondición**: El visitante no encuentra la información (RN-LEG-005).

