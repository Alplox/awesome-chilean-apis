# Scripts — awesome-chilean-apis

## npm scripts

| Comando | Script | Descripción |
|---------|--------|-------------|
| `npm run generate` | `scripts/core/generate.js` | Regenera README.md y AGENTS.md desde `apis-database.json` + `categories.json` |
| `npm run validate` | `scripts/core/validate_apis.js` | Health checks de todos los endpoints (HTTP) |
| `npm run validate:json` | `scripts/validation/validate-json.js` | Valida estructura de `apis-database.json` y `categories.json` |
| `npm run lint` | `eslint .` | ESLint |
| `npm run ci` | — | `validate:json` → `generate` → `git diff --exit-code README.md` |

## validate — flags

```
npm run validate [flags]
```

| Flag | Descripción |
|------|-------------|
| `--update` | Guarda resultados en `apis-database.json` |
| `--automatic` | Modo CI: guarda resultados sin preguntar |
| `--dry-run` | Solo muestra resultados, no modifica |
| `--id=<api-id>` | Valida una API específica |
| `--limit=<n>` | Procesa solo las primeras N APIs |
| `--url=<url>` | Valida una URL suelta (no persiste) |
| `--status=<s>` | Filtra endpoints por estado (active/broken/offline) |
| `--missing-date` | Salta endpoints con `last_known_item_date` |

## Scripts adicionales

| Archivo | Descripción |
|---------|-------------|
| `scripts/utils/find-duplicates.js` | Busca IDs y URLs duplicadas en `apis-database.json`. Flag: `--verbose` |
| `scripts/utils/add-site-endpoints.js` | Utilidad para agregar endpoints proxy a APIs (WIP) |

## Pipeline de validación

`npm run validate` → `checkEndpoint()` → `tryFetchEndpoint()` con 3 intentos:
1. HTTPS normal
2. HTTPS con TLS inseguro (`rejectUnauthorized: false`)
3. HTTP directo

Por cada endpoint registra `last_status_code` (HTTP status) y `last_response_format` (JSON, XML, HTML, CSV, redirect, auth_required, empty, error, Other). `status` es declarado por el mantenedor (active, broken, offline, stale).
