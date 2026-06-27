# 🤝 Guía de Contribución - Awesome Chilean APIs

¡Gracias por querer contribuir a este directorio de APIs chilenas!

## 📋 Cómo agregar una API

### Información requerida

- **Nombre oficial** de la API o servicio
- **URL del sitio web** del proveedor
- **Categoría** existente en `categories.json` (o propón una nueva)
- **Descripción objetiva** sin superlativos ni valoraciones
- **Endpoints** verificados con método HTTP, formato de respuesta y tipo de autenticación

Nota: no se aceptarán proyectos cuyo proposito sea solo demostrar/consumir APIs. API (sin api-key) debe tener un endpoint valido.

### Formato de entrada

Agrega en `apis-database.json` dentro del array `"apis"`:

```json
{
  "id": "nombre-api",
  "name": "Nombre Oficial",
  "url": "https://sitio.oficial.cl",
  "category": "government",
  "description": "Descripción objetiva de la API",
  "endpoints": [
    {
      "id": "nombre-api-endpoint",
      "name": "Nombre del Endpoint",
      "url": "https://api.ejemplo.cl/v1/recurso",
      "method": "GET",
      "auth": "none",
      "format": "JSON",
      "description": "Descripción del endpoint",
      "status": "active",
      "verified": true
    }
  ]
}
```

Luego ejecuta:

```bash
npm install
npm run generate
```

### Criterios para una buena descripción

✅ Correcto:
- "API del Banco Central para consultar indicadores económicos diarios"
- "Servicio del Registro Civil para obtención de certificados en línea"
- "API geoespacial con límites territoriales del país"

❌ Evitar:
- Superlativos: "la mejor", "la más completa"
- Valoraciones: "muy confiable", "de excelente calidad"
- Juicios de valor: "imprescindible", "fundamental"

## 🔍 Validación

Antes de contribuir, verifica que:
- ✅ El endpoint responda correctamente (no 404/500)
- ✅ La documentación esté accesible públicamente
- ✅ No esté duplicado en la lista

## 🤖 Scripts

```bash
npm run generate    # Regenera README.md
npm run validate    # Health checks de endpoints
npm run validate:json  # Valida estructura JSON
```

## 📜 Código de conducta

Este proyecto adhiere a un código de conducta inclusivo. Ver [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).
