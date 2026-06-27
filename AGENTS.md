# AGENTS.md — awesome-chilean-apis

> **Auto-evolutivo**: Este archivo se actualiza automáticamente al ejecutar `npm run generate`. Si agregas/quitas archivos o cambias la estructura, vuelve a generar.

## 📋 Descripción del proyecto

Directorio curado de APIs chilenas públicas y privadas, con endpoints verificados, health checks automáticos y documentación centralizada.

## 📁 Estructura del repositorio

```
/\
│   ├── ISSUE_TEMPLATE
│   │   ├── 01_register_api.yml
│   │   ├── 02_update_api.yml
│   │   ├── 03_report_issue.yml
│   │   └── config.yml
│   ├── workflows
│   │   └── validate.yml  ← CI: valida JSON + health checks
│   └── PULL_REQUEST_TEMPLATE.md
├── lib
│   ├── api-utils.js  ← Utilidades compartidas
│   ├── api-validator.js  ← Validación de endpoints REST
│   ├── cli-args.js  ← Parseo de args CLI
│   ├── network-utils.js  ← Utilidades de red
│   ├── prompter.js  ← Prompts interactivos
│   └── rate-limiter.js  ← Control de concurrencia
├── scripts
│   ├── core
│   │   ├── generate.js  ← Genera README.md y actualiza AGENTS.md
│   │   └── validate_apis.js  ← Health checks de endpoints
│   ├── utils
│   │   ├── add-site-endpoints.js
│   │   └── find-duplicates.js
│   └── validation
│       └── validate-json.js  ← Valida estructura JSON (CI)
├── AGENTS.md  ← Este archivo (auto-generado)
├── apis-database.json  ← Base de datos central de APIs (NO EDITABLE MANUALMENTE)
├── categories.json  ← Definición de categorías con slugs
├── CODE_OF_CONDUCT.md  ← Código de conducta
├── CONTRIBUTING.md  ← Guía de contribución
├── eslint.config.js  ← Configuración ESLint
├── LICENSE
├── package.json  ← Dependencias y scripts
├── README.md  ← Generado por scripts/core/generate.js
├── regions.json  ← Regiones de Chile
├── scripts-readme.md
└── watchlist.json  ← APIs candidatas sin endpoints verificados

```

## 🚀 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run generate` | Regenera README.md desde `apis-database.json` + `categories.json` |
| `npm run validate` | Health checks de todos los endpoints |
| `npm run validate:json` | Valida estructura de JSONs |
| `npm run lint` | ESLint |

## 📝 Cómo agregar una API

1. Agrega la entrada en `apis-database.json` dentro del array `"apis"`
2. Ejecuta `npm run generate` para regenerar README

### Formato de entrada en apis-database.json

```json
{
  "id": "nombre-api",
  "name": "Nombre Oficial",
  "url": "https://sitio.oficial.cl",
  "openapi": "https://ejemplo.cl/api/openapi.yaml",
  "category": "government",
  "pricing": "free",
  "pricing_url": "https://ejemplo.cl/pricing",
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
      "status": "active"
    }
  ]
}
```

## 🔄 Auto-evolución

- Al ejecutar `npm run generate`, se actualiza AGENTS.md reflejando la estructura real del proyecto
- Los scripts de validación mantienen `apis-database.json` actualizado con estados de endpoints
- AGENTS.md se regenera con la lista actual de directorios y archivos del proyecto

## 🏷️ Categorías disponibles

Ver `categories.json` para la lista completa de categorías con sus slugs.

## 🌐 Regiones disponibles

Ver `regions.json` para el mapa de regiones de Chile.
