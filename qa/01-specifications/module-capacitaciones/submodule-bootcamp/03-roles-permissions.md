# Roles y permisos - Bootcamp de Testing

> Módulo `CAP` | Submódulo `BTC` | Última actualización: 2026-11-21

El sitio es público: no existe registro, inicio de sesión ni área privada (`loginPath: null`, `testUsers: []` en `qa/qa-framework.config.json`). El único rol es el **visitante anónimo**. El panel de administración de Webnode queda fuera de alcance.

## Matriz de acceso

| Funcionalidad / acción | Visitante anónimo | Notas |
|---|---|---|
| Ver landing y FAQ | ✅ | Sin autenticación |
| Usar autodiagnóstico | ✅ | Cliente; sin envío de datos |
| Contactar por WhatsApp o correo | ⚠️ | Disponible; no se ejecuta |

## Referencia de usuarios de prueba

| Rol | Variable de entorno (email) | Variable de entorno (contraseña) |
|---|---|---|
| Visitante anónimo | No aplica | No aplica |

No se requieren ni se versionan credenciales (reglas S1 y S2). Los casos de acceso por rol del checklist obligatorio (usuario sin sesión redirigido a login, rol sin permiso) **no aplican** a este submódulo y se reemplazan por la verificación de acceso público sin autenticación.
