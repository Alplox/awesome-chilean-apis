# 🇨🇱 Awesome Chilean APIs

[![Awesome](https://awesome.re/badge.svg)](https://github.com/alplox/awesome-chilean-apis)
![APIs](https%3A%2F%2Fimg.shields.io%2Fbadge%2Fapis-31-brightgreen)
![Endpoints](https%3A%2F%2Fimg.shields.io%2Fbadge%2Fendpoints-58-blue)

> Directorio curado de APIs chilenas públicas y privadas con endpoints verificados. **31 APIs** y **58 endpoints**, organizados por categoría y mantenidos activamente.

## 📑 Índice

- [🏛️ Gobierno y Datos Públicos](#cat-government) — 7 APIs
- [💰 Finanzas e Impuestos](#cat-finance) — 8 APIs
- [🌤️ Clima y Meteorología](#cat-weather) — 1 API
- [🌿 Medio Ambiente](#cat-environment) — 4 APIs
- [💼 Negocios y Comercio](#cat-business) — 6 APIs
- [📢 Alertas y Notificaciones](#cat-notifications) — 3 APIs
- [🤝 Comunidad y Otros](#cat-community) — 2 APIs

> Última actualización: 26 de junio de 2026

<a id="cat-government"></a>
### 🏛️ Gobierno y Datos Públicos (7 APIs)

*APIs gubernamentales, datos abiertos y servicios del Estado*

- **datos.gob.cl - Portal de Datos Abiertos** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F6_endpoints-active-brightgreen)
  - 🌐 [https://datos.gob.cl/guide_faq](https://datos.gob.cl/guide_faq)
  - 📝 Catálogo central de datasets públicos del Estado chileno, implementado sobre CKAN
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://datos.gob.cl/api/3/action/package_list`](https://datos.gob.cl/api/3/action/package_list) — Listado de todos los datasets disponibles
    - ✅ `200` `JSON` `GET` [`https://datos.gob.cl/api/3/action/package_search`](https://datos.gob.cl/api/3/action/package_search) — Búsqueda avanzada en el catálogo de datasets con parámetros: q, rows, start
    - ✅ `409` `Other` `GET` [`https://datos.gob.cl/api/action/datastore_search`](https://datos.gob.cl/api/action/datastore_search) — Consulta de datos de un recurso del DataStore. Parámetros: resource_id (obligatorio), limit, offset, q, records_format
    - ✅ `400` `Other` `GET` [`https://datos.gob.cl/api/action/datastore_search_sql`](https://datos.gob.cl/api/action/datastore_search_sql) — Consulta de datos del DataStore mediante SQL. Parámetro: sql (obligatorio)
    - ✅ `200` `JSON` `GET` [`https://datos.gob.cl/api/3/action/tag_list`](https://datos.gob.cl/api/3/action/tag_list) — Lista todas las etiquetas (tags) del catálogo de datos
    - ✅ `200` `XML` `GET` [`https://datos.gob.cl/dataset/farmacias-en-chile`](https://datos.gob.cl/dataset/farmacias-en-chile) — Farmacias del país con turnos nocturnos

- **Ley Chile - Biblioteca del Congreso Nacional** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://www.bcn.cl/leychile/leychile-api-doc/leychile-api-doc](https://www.bcn.cl/leychile/leychile-api-doc/leychile-api-doc)
  - 📜 [OpenAPI Spec](https://www.bcn.cl/leychile/leychile-api-doc/assets/leychile-api-doc-v1.yaml)
  - 📝 API REST de leyes, proyectos de ley y normas jurídicas chilenas del Congreso Nacional, con autenticación mediante API-Key
  - **Endpoints:**
    - ✅ 🔑 `200` `XML` `GET` [`https://www.bcn.cl/leychile/api/v1`](https://www.bcn.cl/leychile/api/v1) — API REST con autenticación API-Key para acceder a normas, leyes y documentos jurídicos

- **ChileAtiende** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F3_endpoints-active-brightgreen)
  - 🌐 [https://www.chileatiende.gob.cl/desarrolladores](https://www.chileatiende.gob.cl/desarrolladores)
  - 📝 API REST del Portal de Servicios del Estado, con fichas de trámites, servicios (instituciones) y sucursales en formato JSON o XML, requiere access_token
  - **Endpoints:**
    - ✅ 🔑 `403` `auth_required` `GET` [`https://www.chileatiende.gob.cl/api/fichas`](https://www.chileatiende.gob.cl/api/fichas) — Lista todas las fichas con paginación y búsqueda por texto. Para obtener por ID: GET /api/fichas/{id}
    - ✅ 🔑 `403` `auth_required` `GET` [`https://www.chileatiende.gob.cl/api/servicios`](https://www.chileatiende.gob.cl/api/servicios) — Lista todos los servicios que publican en el portal. Para obtener por ID: GET /api/servicios/{id}
    - ✅ 🔑 `403` `auth_required` `GET` [`https://www.chileatiende.gob.cl/api/sucursales`](https://www.chileatiende.gob.cl/api/sucursales) — Lista todas las sucursales, con filtro opcional por oficinas móviles. Para obtener por ID: GET /api/sucursales/{id}

- **ChileCompra - Mercado Público** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F4_endpoints-active-brightgreen)
  - 🌐 [https://www.chilecompra.cl/api/](https://www.chilecompra.cl/api/)
  - 📝 API de la plataforma de compras públicas del Estado chileno
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=02022014&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`](https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=02022014&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844) — Licitaciones diarias, por código, diarias por estado, por día, por estado y día, por código de organismo público o proveedor
    - ✅ 🔑 `403` `auth_required` `GET` [`https://api2.mercadopublico.cl/`](https://api2.mercadopublico.cl/) — Permite obtener, de forma estructurada y paginada, la información publicada en el mecanismo Compra Ágil de Mercado Público
    - ✅ `429` `Other` `GET` [`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?codigo=2097-241-SE14&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`](https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?codigo=2097-241-SE14&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844) — Órdenes de compra diarias, de compra por código, de compra diarias por estado, de compra por día, de compra por estado y día, de compra por código de organismo público o proveedor 
    - ✅ `200` `JSON` `GET` [`https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarComprador?ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`](https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarComprador?ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844) — Lista todos los organismos públicos de la plataforma Mercado Público

- **Feriados Chile** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://feriados-cl.netlify.app](https://feriados-cl.netlify.app)
  - 📝 API de feriados oficiales para Chile con datos actualizados
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://feriados-cl.netlify.app/holidays/2026`](https://feriados-cl.netlify.app/holidays/2026) — Feriados oficiales de Chile años 2026-2027

- **INE - Instituto Nacional de Estadísticas** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://www.ine.gob.cl/simel/guia-de-uso](https://www.ine.gob.cl/simel/guia-de-uso)
  - 📝 Datos demográficos, económicos y sociales de Chile, incluyendo censos y proyecciones de población
  - **Endpoints:**
    - ✅ `200` `CSV` `GET` [`https://sdmx.ine.gob.cl/rest/data/CL01,DF_TAT_SEXO,1.0?format=csv`](https://sdmx.ine.gob.cl/rest/data/CL01,DF_TAT_SEXO,1.0?format=csv) — SDMX REST API

- **Chile Abierto** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F5_endpoints-active-brightgreen)
  - 🌐 [https://www.chileabierto.cl/api](https://www.chileabierto.cl/api)
  - 📝 API pública con indicadores comunales de Chile: economía, demografía, educación, salud, seguridad, medio ambiente y gobierno. No requiere autenticación, 60 req/min.
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://chileabierto.cl/api/v1/comunas`](https://chileabierto.cl/api/v1/comunas) — Retorna listado de todas las comunas con datos básicos. Filtros: region, search
    - ✅ `200` `JSON` `GET` [`https://chileabierto.cl/api/v1/comunas/13101`](https://chileabierto.cl/api/v1/comunas/13101) — Retorna datos de una comuna específica con todos sus indicadores. Parámetro: code
    - ✅ `200` `JSON` `GET` [`https://chileabierto.cl/api/v1/indicators`](https://chileabierto.cl/api/v1/indicators) — Retorna listado de todos los indicadores disponibles con metadatos. Filtro: category
    - ✅ `200` `JSON` `GET` [`https://chileabierto.cl/api/v1/indicators/poverty_rate_pct`](https://chileabierto.cl/api/v1/indicators/poverty_rate_pct) — Retorna metadatos de un indicador con valores de todas las comunas. Parámetro: code
    - ✅ `200` `JSON` `GET` [`https://chileabierto.cl/api/v1/compare?comunas=13101,13119&indicators=crime_rate_per_100k,poverty_rate_pct`](https://chileabierto.cl/api/v1/compare?comunas=13101,13119&indicators=crime_rate_per_100k,poverty_rate_pct) — Compara 2+ comunas en múltiples indicadores. Parámetros: comunas, indicators

<a id="cat-finance"></a>
### 💰 Finanzas e Impuestos (8 APIs)

*APIs del sistema financiero, tributario y mercado de capitales*

- **Banco Central de Chile** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://si3.bcentral.cl/estadisticas/Principal1/Web_Services/doc_es.htm](https://si3.bcentral.cl/estadisticas/Principal1/Web_Services/doc_es.htm)
  - 📝 Bases de Datos Estadísticos del Banco Central, con manuales y ejemplos en Python, R y C#
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `GET` [`https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=123456789&pass=tuPassword&firstdate=YYYY-MM-DD&lastdate=YYYY-MM-DD&timeseries=codigodeserie&function=GetSeries`](https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=123456789&pass=tuPassword&firstdate=YYYY-MM-DD&lastdate=YYYY-MM-DD&timeseries=codigodeserie&function=GetSeries) — Bases de datos estadísticos con documentación y ejemplos

- **CMF - Comisión para el Mercado Financiero** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://api.sbif.cl/index.html](https://api.sbif.cl/index.html)
  - 📝 Indicadores financieros, instituciones fiscalizadas y reportes del mercado financiero chileno
  - **Endpoints:**
    - ✅ 🔑 `302` `redirect` `GET` [`https://api.sbif.cl/api-sbifv3/`](https://api.sbif.cl/api-sbifv3/) — Indicadores financieros históricos (UF, UTM, dólar, etc.)

- **mindicador.cl** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://mindicador.cl](https://mindicador.cl)
  - 📝 Web service open source con los principales indicadores económicos de Chile en formato JSON
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://mindicador.cl/api`](https://mindicador.cl/api) — Indicadores diarios e históricos en formato JSON

- **findic.cl** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://findic.cl/docs/](https://findic.cl/docs/)
  - 📝 API gratuita con indicadores económicos de Chile en JSON, resúmenes diarios y CSVs históricos
  - **Endpoints:**
    - ✅ `301` `redirect` `GET` [`https://findic.cl/api`](https://findic.cl/api) — Indicadores económicos diarios e históricos

- **DolarApi.com** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F7_endpoints-active-brightgreen)
  - 🌐 [https://cl.dolarapi.com](https://cl.dolarapi.com)
  - 📝 API gratuita para obtener el precio del dólar y otras monedas en Chile
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://cl.dolarapi.com/v1/cotizaciones`](https://cl.dolarapi.com/v1/cotizaciones) — Cotización de todas las monedas disponibles en Chile (USD, EUR, BRL, ARS, UYU, etc.)
    - ✅ `200` `JSON` `GET` [`https://cl.dolarapi.com/v1/cotizaciones/usd`](https://cl.dolarapi.com/v1/cotizaciones/usd) — Cotización del Dólar estadounidense en Chile
    - ✅ `200` `JSON` `GET` [`https://cl.dolarapi.com/v1/cotizaciones/eur`](https://cl.dolarapi.com/v1/cotizaciones/eur) — Cotización del Euro en Chile
    - ✅ `200` `JSON` `GET` [`https://cl.dolarapi.com/v1/cotizaciones/brl`](https://cl.dolarapi.com/v1/cotizaciones/brl) — Cotización del Real brasileño en Chile
    - ✅ `200` `JSON` `GET` [`https://cl.dolarapi.com/v1/cotizaciones/ars`](https://cl.dolarapi.com/v1/cotizaciones/ars) — Cotización del Peso argentino en Chile
    - ✅ `200` `JSON` `GET` [`https://cl.dolarapi.com/v1/cotizaciones/uyu`](https://cl.dolarapi.com/v1/cotizaciones/uyu) — Cotización del Peso uruguayo en Chile
    - ✅ `200` `JSON` `GET` [`https://cl.dolarapi.com/v1/estado`](https://cl.dolarapi.com/v1/estado) — Estado actual de la API dolarapi.com para Chile

- **Buda.com** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F3_endpoints-active-brightgreen)
  - 🌐 [https://api.buda.com/#la-api-de-buda-com](https://api.buda.com/#la-api-de-buda-com)
  - 📝 API REST del exchange de criptomonedas Buda.com, con órdenes, abonos e información del mercado en tiempo real
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://www.buda.com/api/v2/markets`](https://www.buda.com/api/v2/markets) — Endpoint público que devuelve la lista de todos los mercados disponibles en Buda, junto con la configuración de cada uno
    - ✅ `200` `JSON` `GET` [`https://www.buda.com/api/v2/tickers`](https://www.buda.com/api/v2/tickers) — Entrega la varianción del precio en el último día y en la última semana, junto con el precio de la última transacción (last_price) para cada mercado
    - ✅ 🔑 `403` `auth_required` `GET` [`https://www.buda.com/api/`](https://www.buda.com/api/) — Las llamadas privadas consisten en endpoints que acceden a información privada del usuario que las invocan, les permiten crear o cancelar órdenes o les permiten abonar o retirar dinero hacia o desde el exchange

- **BCI API Market** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://www.bci.cl/apimarket](https://www.bci.cl/apimarket)
  - 📝 APIs públicas del Banco de Crédito e Inversiones: cuentas, indicadores económicos e información del banco
  - **Endpoints:**
    - ✅ 🔑 `403` `auth_required` `GET` [`https://www.bci.cl/apimarket`](https://www.bci.cl/apimarket) — APIs financieras del Banco BCI

- **queTalMiAFP** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://www.quetalmiafp.cl/AccederCuotas](https://www.quetalmiafp.cl/AccederCuotas)
  - 📝 API de valores de cuotas de las AFP, gratuita y sin restricciones
  - **Endpoints:**
    - ✅ 🔑 `200` `XML` `GET` [`https://www.quetalmiafp.cl/AccederCuotas`](https://www.quetalmiafp.cl/AccederCuotas) — Valores diarios de las cuotas de las AFP

<a id="cat-weather"></a>
### 🌤️ Clima y Meteorología (1 API)

*APIs del clima, meteorología y condiciones ambientales*

- **Dirección Meteorológica de Chile - Climatología** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://climatologia.meteochile.gob.cl/application/index/menuTematicoJson](https://climatologia.meteochile.gob.cl/application/index/menuTematicoJson)
  - 📝 Datos meteorológicos en tiempo real y registros históricos de estaciones automáticas en Chile
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `GET` [`https://climatologia.meteochile.gob.cl/application/servicios/getEstacion/330020?usuario=correo@correo.cl&token=apiKey_personal `](https://climatologia.meteochile.gob.cl/application/servicios/getEstacion/330020?usuario=correo@correo.cl&token=apiKey_personal ) — Datos meteorológicos en tiempo real e históricos

<a id="cat-environment"></a>
### 🌿 Medio Ambiente (4 APIs)

*APIs de calidad del aire, biodiversidad y datos ambientales*

- **SINCA - Sistema de Información Nacional de Calidad del Aire** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://sinca.mma.gob.cl](https://sinca.mma.gob.cl)
  - 📝 API Pública (Sin Documentación) con información en tiempo real de calidad del aire de estaciones de monitoreo en todo Chile
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://sinca.mma.gob.cl/index.php/json/listadomapa2k19`](https://sinca.mma.gob.cl/index.php/json/listadomapa2k19) — Datos en tiempo real de estaciones de calidad del aire

- **ARClim - Atlas de Riesgo Climático** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://arclim.mma.gob.cl/atlas/api](https://arclim.mma.gob.cl/atlas/api)
  - 📝 Indicadores climáticos históricos y proyectados con capas geográficas para análisis de riesgos climáticos
  - **Endpoints:**
    - ✅ `301` `redirect` `GET` [`https://arclim.mma.gob.cl/api`](https://arclim.mma.gob.cl/api) — Indicadores climáticos históricos y proyectados

- **Chilean Birds** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://aves.ninjas.cl](https://aves.ninjas.cl)
  - 📝 API (Sin documentación) con información sobre aves de Chile usando datos de Buscaves.cl
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://aves.ninjas.cl/api/birds`](https://aves.ninjas.cl/api/birds) — Información sobre especies de aves chilenas

- **Datos para Resiliencia ante Desastres - Itrend** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F2_endpoints-active-brightgreen)
  - 🌐 [https://guides.dataverse.org/en/latest/api/index.html](https://guides.dataverse.org/en/latest/api/index.html)
  - 📝 Repositorio de datos abiertos sobre desastres naturales en Chile: sismos, tsunamis, incendios, volcanes, meteorología y vulnerabilidad (Harvard Dataverse). Endpoints públicos y autenticados con API key.
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://datospararesiliencia.cl/api/search?q=sismo&type=dataset`](https://datospararesiliencia.cl/api/search?q=sismo&type=dataset) — Búsqueda pública de datasets. Parámetros: q, type, sort, order, fq, start, rows
    - ✅ 🔑 `200` `JSON` `GET` [`https://datospararesiliencia.cl/api/dataverses/inicio`](https://datospararesiliencia.cl/api/dataverses/inicio) — Info de colecciones, datasets y administración. Usa header X-Dataverse-key para autenticación

<a id="cat-business"></a>
### 💼 Negocios y Comercio (6 APIs)

*APIs de comercio, licitaciones, pagos y registro de empresas*

- **Khipu - Pagos Online** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F2_endpoints-active-brightgreen)
  - 🌐 [https://docs.khipu.com/products](https://docs.khipu.com/products)
  - 📝 APIs de Khipu: Pagos Instantáneos, Pagos Automáticos y Open Finance para acceder a información bancaria
  - **Endpoints:**
    - ✅ 🔑 `403` `auth_required` `GET` [`https://payment-api.khipu.com/v3/banks`](https://payment-api.khipu.com/v3/banks) — Convierte transferencias bancarias en pagos digitales
    - ✅ 🔑 `405` `Other` `POST` [`https://payment-api.khipu.com/v1/automatic-payment/subscription`](https://payment-api.khipu.com/v1/automatic-payment/subscription) — Automatiza cobros recurrentes
    - ❌ 🔑 `404` `empty` `GET` [`https://api.khipu.com/v1/ar/banking/business`](https://api.khipu.com/v1/ar/banking/business) — Accede a información bancaria y financiera real desde múltiples instituciones

- **Flow - Pagos Online** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://developers.flow.cl/api](https://developers.flow.cl/api)
  - 📝 API REST de plataforma de pagos online chilena para pagos con tarjetas de crédito y débito
  - **Endpoints:**
    - ✅ 🔑 `301` `redirect` `POST` [`https://www.flow.cl/api`](https://www.flow.cl/api) — Pagos con tarjetas de crédito y débito

- **Kushki - Pagos Globales** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://api-docs.kushkipagos.com/](https://api-docs.kushkipagos.com/)
  - 📝 API de pagos globales con recepción en moneda local, multi-medio de pago en cada país
  - **Endpoints:**
    - ✅ 🔑 `403` `auth_required` `POST` [`https://api.kushkipagos.com`](https://api.kushkipagos.com) — Pagos globales con múltiples medios de pago

- **Reveniu - Suscripciones** 
  - 🌐 [https://docs.reveniu.com](https://docs.reveniu.com)
  - 📝 API REST para gestión de cobro de suscripciones y pagos recurrentes en Chile. Documentación desactualizada (~4 años sin cambios)
  - **Endpoints:**
    - ❌ 🔑 `404` `empty` `POST` [`https://production.reveniu.com`](https://production.reveniu.com) — Cobro de suscripciones y pagos recurrentes. Endpoints disponibles: /api/plans, /api/subscriptions, /api/webhooks

- **Fintoc - Pagos por Transferencia** 
  - 🌐 [https://docs.fintoc.com/reference/introduction](https://docs.fintoc.com/reference/introduction)
  - 📝 API REST para iniciación de pagos mediante transferencias bancarias, tarjetas y conciliación de movimientos
  - **Endpoints:**
    - ❌ 🔑 `404` `empty` `POST` [`https://api.fintoc.com`](https://api.fintoc.com) — Iniciación de pagos y conciliación bancaria

- **Reqlut** 
  - 🌐 [https://reqlut.com/api/v3/doc](https://reqlut.com/api/v3/doc)
  - 📝 API REST para integración con el ecosistema de empleabilidad universitaria Reqlut. Requiere API key para uso institucional.

<a id="cat-notifications"></a>
### 📢 Alertas y Notificaciones (3 APIs)

*APIs de alertas tempranas, emergencias y comunicaciones oficiales*

- **CSN - Centro Sismológico Nacional** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F3_endpoints-active-brightgreen)
  - 🌐 [https://eew.csn.uchile.cl/](https://eew.csn.uchile.cl/)
  - 📝 API FDSN Web Services del Centro Sismológico Nacional con datos sísmicos en tiempo real, estaciones y disponibilidad
  - **Endpoints:**
    - ✅ `200` `XML` `GET` [`https://eew.csn.uchile.cl/fdsnws/station/1/`](https://eew.csn.uchile.cl/fdsnws/station/1/) — Información de estaciones sismológicas de la red del CSN vía FDSNWS
    - ✅ `200` `XML` `GET` [`https://eew.csn.uchile.cl/fdsnws/dataselect/1/`](https://eew.csn.uchile.cl/fdsnws/dataselect/1/) — Descarga de datos sísmicos en formato MiniSEED vía FDSNWS
    - ✅ `200` `XML` `GET` [`https://eew.csn.uchile.cl/fdsnws/availability/1/`](https://eew.csn.uchile.cl/fdsnws/availability/1/) — Disponibilidad de datos sísmicos por estación vía FDSNWS

- **Sismos Chile - Gael** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://api.gael.cloud](https://api.gael.cloud)
  - 📝 API pública de últimos sismos en Chile
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://api.gael.cloud/general/public/sismos`](https://api.gael.cloud/general/public/sismos) — Últimos sismos registrados en Chile

- **XORCL - API Sismología** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F2_endpoints-active-brightgreen)
  - 🌐 [https://github.com/xorcl/api-sismo](https://github.com/xorcl/api-sismo)
  - 📝 API pública de sismología con sismos recientes e históricos en Chile
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://api.xor.cl/sismo/recent`](https://api.xor.cl/sismo/recent) — Lista de sismos recientes en Chile. Filtro opcional: ?magnitude=5
    - ✅ `200` `JSON` `GET` [`https://api.xor.cl/sismo/historic/20100227`](https://api.xor.cl/sismo/historic/20100227) — Sismos históricos por fecha (YYYYMMDD). Filtro opcional: ?magnitude=5

<a id="cat-community"></a>
### 🤝 Comunidad y Otros (2 APIs)

*APIs comunitarias, adopción animal, feriados y utilidades varias*

- **Huachitos - Plataforma de Adopción Animal** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://huachitos.cl/docs](https://huachitos.cl/docs)
  - 📝 API abierta con animales disponibles para adopción, encontrados o perdidos, organizados por región y comuna
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://huachitos.cl/api/animales/`](https://huachitos.cl/api/animales/) — Animales en adopción, perdidos y encontrados por región

- **boostr.cl - APIs de Uso Libre** ![Active](https%3A%2F%2Fimg.shields.io%2Fbadge%2F1_endpoints-active-brightgreen)
  - 🌐 [https://docs.boostr.cl/reference/welcome](https://docs.boostr.cl/reference/welcome)
  - 📝 Colección de APIs útiles y gratuitas para diversos propósitos
  - **Endpoints:**
    - ✅ `301` `redirect` `GET` [`https://api.boostr.cl/`](https://api.boostr.cl/) — Múltiples APIs de uso libre

---

## 🤝 Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para instrucciones detalladas.

## 📜 Licencia

CC0-1.0 — Ver [LICENSE](LICENSE).