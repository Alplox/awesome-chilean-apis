# AGENTS.md — awesome-chilean-apis

> **Auto-evolutivo**: Este archivo se actualiza automáticamente al ejecutar `npm run generate`. Si agregas/quitas archivos o cambias la estructura, vuelve a generar.

## 📋 Descripción del proyecto

Directorio curado de APIs chilenas públicas y privadas, con endpoints verificados, health checks automáticos y documentación centralizada.

**Snapshot actual:** 89 APIs · 182 endpoints · 181 activos ✅ · 1 rotos ❌ · 0 offline 📡

## 📁 Estructura del repositorio

```
/
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
│   │   └── find-duplicates.js  ← Detecta IDs/URLs duplicados
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
├── scripts-readme.md  ← Documentación de los scripts
└── watchlist.json  ← APIs candidatas sin endpoints verificados

```

## 🔄 Flujo de datos

```
humano/PR edita apis-database.json o watchlist.json
        │
        ▼
npm run validate:json ──► valida estructura de todos los JSON
        │
        ▼
npm run validate ───────► health checks HTTP; actualiza status/last_checked en la DB
        │
        ▼
npm run generate ───────► regenera README.md y este archivo (AGENTS.md)
```

- El CI (`.github/workflows/validate.yml`) ejecuta `validate:json` + `generate` y falla si hay cambios sin regenerar.
- Los estados de endpoints solo los escribe `scripts/core/validate_apis.js`; no editarlos a mano.

## 🚀 Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run generate` | Regenera README.md desde `apis-database.json` + `categories.json` |
| `npm run validate` | Health checks de los endpoints; con `--update` persiste resultados en la DB |
| `npm run validate:json` | Valida estructura de database + watchlist + categorías + regiones. Exit 1 si hay errores |
| `npm run find:duplicates` | Detecta IDs/URLs duplicados en database y watchlist (y cruces entre ambos). Exit 1 si encuentra |
| `npm run lint` | ESLint |
| `npm run ci` | `validate:json` + `generate` + `git diff --exit-code README.md` |

### Flags de `npm run validate`

```
--id=<id>         valida una sola API por su ID
--url=<u>         valida una URL suelta (no toca la base de datos)
--status=<s>      filtra por estado del endpoint (active, broken, ...)
--limit=<n>       valida solo las primeras N APIs
--missing-date    solo endpoints sin last_known_item_date
--update          escribe los resultados en apis-database.json
```

## 📝 Cómo agregar una API (base de datos)

1. Agrega la entrada en `apis-database.json` dentro del array `"apis"`
2. Ejecuta `npm run validate:json` para verificar la estructura
3. Ejecuta `npm run generate` para regenerar README

Usa esta vía cuando la API tenga **al menos un endpoint verificado** (que responda o exija credenciales).
Si no hay endpoints comprobables, usa el watchlist (ver sección siguiente).

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

**Valores permitidos por campo:**

| Campo | Valores válidos |
|-------|-----------------|
| `method` | `GET`, `POST`, `PUT`, `PATCH`, `DELETE` |
| `auth` | `none`, `api-key`, `oauth`, `basic`, `bearer` |
| `format` | `JSON`, `XML`, `HTML`, `CSV`, `Other` |
| `pricing` | `free`, `freemium`, `paid` |
| `status` | `active`, `stale`, `broken`, `offline`, `no_endpoint`, `endpoint_empty` |

**Significado de cada estado (`status`):**

| Estado | Significado |
|--------|-------------|
| `active` | Responde correctamente (2xx; también 401/403/redirect: el servicio existe y exige credenciales o redirige) |
| `stale` | Sin verificación hace más de 90 días (STALE_THRESHOLD_DAYS) |
| `broken` | Responde con error (404/410/5xx) |
| `offline` | Host inaccesible: DNS no resuelve o conexión rechazada |
| `endpoint_empty` | Responde 2xx pero sin contenido |

> Los IDs (`id` de API y de endpoint) deben ser únicos y en kebab-case.

## 🗂️ Cómo proponer una API (watchlist)

Usa `watchlist.json` cuando la API/sitio **no tiene un endpoint público verificado**:
documentación que exige registro, acceso por correo, endpoints caídos, etc.

### Formato de entrada en watchlist.json

```json
{
  "id": "nombre-candidato",
  "name": "Nombre Oficial",
  "url": "https://sitio.oficial.cl/documentacion",
  "category": "government",
  "description": "Qué datos ofrecería la API",
  "reason": "Por qué aún no está en la base de datos (sin endpoint verificado, caído, etc.)",
  "endpoints": []
}
```

- El campo `reason` es **obligatorio** y debe explicar qué falta para promocionarla.
- Cuando exista un endpoint verificado, mueve la entrada a `apis-database.json` y elimínala del watchlist.
- `npm run find:duplicates` detecta entradas presentes en ambos archivos a la vez.

## 🏷️ Categorías disponibles

| Categoría | Clave (`category`) | APIs |
|-----------|--------------------|------|
| 🏛️ Gobierno y Datos Públicos | `government` | 18 |
| 💰 Finanzas e Impuestos | `finance` | 18 |
| 🚌 Transporte y Tránsito | `transport` | 9 |
| 🌤️ Clima y Meteorología | `weather` | 1 |
| 🌿 Medio Ambiente | `environment` | 4 |
| 📚 Educación | `education` | 3 |
| 🏥 Salud | `health` | 1 |
| 🗺️ Geografía y Mapas | `maps` | 3 |
| 💼 Negocios y Comercio | `business` | 23 |
| 🔧 Servicios Básicos | `utilities` | 2 |
| 📢 Alertas y Notificaciones | `notifications` | 4 |
| 🤝 Comunidad y Otros | `community` | 3 |

## 🌐 Regiones disponibles

`regions.json` contiene el mapa de regiones de Chile (datos de referencia para futuras funciones de filtrado geográfico; actualmente ningún script lo consume).
