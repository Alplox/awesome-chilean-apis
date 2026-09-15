<a id="top"></a>
# 🇨🇱 Awesome Chilean APIs

[![Awesome](https://awesome.re/badge.svg)](https://github.com/alplox/awesome-chilean-apis)
![APIs](https://img.shields.io/badge/apis-89-brightgreen)
![Endpoints](https://img.shields.io/badge/endpoints-182-blue)

> Directorio curado de APIs chilenas públicas y privadas con endpoints verificados. **89 APIs** y **182 endpoints**, organizados por categoría y mantenidos activamente.

## 📑 Índice

- [🏛️ Gobierno y Datos Públicos](#cat-government) — 18 APIs
- [💰 Finanzas e Impuestos](#cat-finance) — 18 APIs
- [🚌 Transporte y Tránsito](#cat-transport) — 9 APIs
- [🌤️ Clima y Meteorología](#cat-weather) — 1 API
- [🌿 Medio Ambiente](#cat-environment) — 4 APIs
- [📚 Educación](#cat-education) — 3 APIs
- [🏥 Salud](#cat-health) — 1 API
- [🗺️ Geografía y Mapas](#cat-maps) — 3 APIs
- [💼 Negocios y Comercio](#cat-business) — 23 APIs
- [🔧 Servicios Básicos](#cat-utilities) — 2 APIs
- [📢 Alertas y Notificaciones](#cat-notifications) — 4 APIs
- [🤝 Comunidad y Otros](#cat-community) — 3 APIs

> Última actualización: 14 de septiembre de 2026

<a id="cat-government"></a>

### 🏛️ Gobierno y Datos Públicos (18 APIs)

**APIs gubernamentales, datos abiertos y servicios del Estado**

- **datos.gob.cl - Portal de Datos Abiertos** ![Active](https://img.shields.io/badge/6_endpoints-active-brightgreen)
  - 🌐 [https://datos.gob.cl/guide_faq](https://datos.gob.cl/guide_faq)
  - 📝 Catálogo central de datasets públicos del Estado chileno, implementado sobre CKAN
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://datos.gob.cl/api/3/action/package_list`](https://datos.gob.cl/api/3/action/package_list) — Listado de todos los datasets disponibles
    - ✅ `200` `JSON` `GET` [`https://datos.gob.cl/api/3/action/package_search`](https://datos.gob.cl/api/3/action/package_search) — Búsqueda avanzada en el catálogo de datasets con parámetros: q, rows, start
    - ✅ `409` `Other` `GET` [`https://datos.gob.cl/api/action/datastore_search`](https://datos.gob.cl/api/action/datastore_search) — Consulta de datos de un recurso del DataStore. Parámetros: resource_id (obligatorio), limit, offset, q, records_format
    - ✅ `400` `Other` `GET` [`https://datos.gob.cl/api/action/datastore_search_sql`](https://datos.gob.cl/api/action/datastore_search_sql) — Consulta de datos del DataStore mediante SQL. Parámetro: sql (obligatorio)
    - ✅ `200` `JSON` `GET` [`https://datos.gob.cl/api/3/action/tag_list`](https://datos.gob.cl/api/3/action/tag_list) — Lista todas las etiquetas (tags) del catálogo de datos
    - ✅ `200` `XML` `GET` [`https://datos.gob.cl/dataset/farmacias-en-chile`](https://datos.gob.cl/dataset/farmacias-en-chile) — Farmacias del país con turnos nocturnos

- **Ley Chile - Biblioteca del Congreso Nacional** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://www.bcn.cl/leychile/leychile-api-doc/leychile-api-doc](https://www.bcn.cl/leychile/leychile-api-doc/leychile-api-doc)
  - 📜 [OpenAPI Spec](https://www.bcn.cl/leychile/leychile-api-doc/assets/leychile-api-doc-v1.yaml)
  - 📝 API REST de leyes, proyectos de ley y normas jurídicas chilenas del Congreso Nacional, con autenticación mediante API-Key
  - **Endpoints:**
    - ✅ 🔑 `200` `XML` `GET` [`https://www.bcn.cl/leychile/api/v1`](https://www.bcn.cl/leychile/api/v1) — API REST con autenticación API-Key para acceder a normas, leyes y documentos jurídicos

- **Datos BCN - Linked Data Legislativo** ![Active](https://img.shields.io/badge/2_endpoints-active-brightgreen)
  - 🌐 [https://datos.bcn.cl/es/documentacion](https://datos.bcn.cl/es/documentacion)
  - 📝 Datos abiertos de la Biblioteca del Congreso Nacional vía Linked Open Data: consultas SPARQL de leyes, proyectos de ley y sesiones parlamentarias, sin autenticación
  - **Endpoints:**
    - ✅ `200` `XML` `GET` [`https://datos.bcn.cl/sparql`](https://datos.bcn.cl/sparql) — Consulta SPARQL de normas, proyectos de ley y sesiones parlamentarias (Accept: application/json)
    - ✅ `200` `JSON` `GET` [`https://datos.bcn.cl/recurso/cl/ley/330/datos.json`](https://datos.bcn.cl/recurso/cl/ley/330/datos.json) — Acceso directo a recursos en JSON/RDF. Patrón: /recurso/cl/{tipo}/{path}/datos.{format}

- **ChileAtiende** ![Active](https://img.shields.io/badge/3_endpoints-active-brightgreen)
  - 🌐 [https://www.chileatiende.gob.cl/desarrolladores](https://www.chileatiende.gob.cl/desarrolladores)
  - 📝 API REST del Portal de Servicios del Estado, con fichas de trámites, servicios (instituciones) y sucursales en formato JSON o XML, requiere access_token
  - **Endpoints:**
    - ✅ 🔑 `403` `auth_required` `GET` [`https://www.chileatiende.gob.cl/api/fichas`](https://www.chileatiende.gob.cl/api/fichas) — Lista todas las fichas con paginación y búsqueda por texto. Para obtener por ID: GET /api/fichas/{id}
    - ✅ 🔑 `403` `auth_required` `GET` [`https://www.chileatiende.gob.cl/api/servicios`](https://www.chileatiende.gob.cl/api/servicios) — Lista todos los servicios que publican en el portal. Para obtener por ID: GET /api/servicios/{id}
    - ✅ 🔑 `403` `auth_required` `GET` [`https://www.chileatiende.gob.cl/api/sucursales`](https://www.chileatiende.gob.cl/api/sucursales) — Lista todas las sucursales, con filtro opcional por oficinas móviles. Para obtener por ID: GET /api/sucursales/{id}

- **ChileCompra - Mercado Público** ![Active](https://img.shields.io/badge/4_endpoints-active-brightgreen)
  - 🌐 [https://www.chilecompra.cl/api/](https://www.chilecompra.cl/api/)
  - 📝 API de la plataforma de compras públicas del Estado chileno
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=02022014&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`](https://api.mercadopublico.cl/servicios/v1/publico/licitaciones.json?fecha=02022014&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844) — Licitaciones diarias, por código, diarias por estado, por día, por estado y día, por código de organismo público o proveedor
    - ✅ 🔑 `403` `auth_required` `GET` [`https://api2.mercadopublico.cl/`](https://api2.mercadopublico.cl/) — Permite obtener, de forma estructurada y paginada, la información publicada en el mecanismo Compra Ágil de Mercado Público
    - ✅ `200` `JSON` `GET` [`https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?codigo=2097-241-SE14&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`](https://api.mercadopublico.cl/servicios/v1/publico/ordenesdecompra.json?codigo=2097-241-SE14&ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844) — Órdenes de compra diarias, de compra por código, de compra diarias por estado, de compra por día, de compra por estado y día, de compra por código de organismo público o proveedor
    - ✅ `200` `JSON` `GET` [`https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarComprador?ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844`](https://api.mercadopublico.cl/servicios/v1/Publico/Empresas/BuscarComprador?ticket=F8537A18-6766-4DEF-9E59-426B4FEE2844) — Lista todos los organismos públicos de la plataforma Mercado Público

- **Feriados Chile** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://feriados-cl.netlify.app](https://feriados-cl.netlify.app)
  - 📝 API de feriados oficiales para Chile con datos actualizados
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://feriados-cl.netlify.app/holidays/2026`](https://feriados-cl.netlify.app/holidays/2026) — Feriados oficiales de Chile años 2026-2027

- **INE - Instituto Nacional de Estadísticas** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://www.ine.gob.cl/simel/guia-de-uso](https://www.ine.gob.cl/simel/guia-de-uso)
  - 📝 Datos demográficos, económicos y sociales de Chile, incluyendo censos y proyecciones de población
  - **Endpoints:**
    - ✅ `200` `CSV` `GET` [`https://sdmx.ine.gob.cl/rest/data/CL01,DF_TAT_SEXO,1.0?format=csv`](https://sdmx.ine.gob.cl/rest/data/CL01,DF_TAT_SEXO,1.0?format=csv) — SDMX REST API

- **Chile Abierto** ![Active](https://img.shields.io/badge/5_endpoints-active-brightgreen)
  - 🌐 [https://www.chileabierto.cl/api](https://www.chileabierto.cl/api)
  - 📝 API pública con indicadores comunales de Chile: economía, demografía, educación, salud, seguridad, medio ambiente y gobierno. No requiere autenticación, 60 req/min
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://chileabierto.cl/api/v1/comunas`](https://chileabierto.cl/api/v1/comunas) — Retorna listado de todas las comunas con datos básicos. Filtros: region, search
    - ✅ `200` `JSON` `GET` [`https://chileabierto.cl/api/v1/comunas/13101`](https://chileabierto.cl/api/v1/comunas/13101) — Retorna datos de una comuna específica con todos sus indicadores. Parámetro: code
    - ✅ `200` `JSON` `GET` [`https://chileabierto.cl/api/v1/indicators`](https://chileabierto.cl/api/v1/indicators) — Retorna listado de todos los indicadores disponibles con metadatos. Filtro: category
    - ✅ `200` `JSON` `GET` [`https://chileabierto.cl/api/v1/indicators/poverty_rate_pct`](https://chileabierto.cl/api/v1/indicators/poverty_rate_pct) — Retorna metadatos de un indicador con valores de todas las comunas. Parámetro: code
    - ✅ `200` `JSON` `GET` [`https://chileabierto.cl/api/v1/compare?comunas=13101,13119&indicators=crime_rate_per_100k,poverty_rate_pct`](https://chileabierto.cl/api/v1/compare?comunas=13101,13119&indicators=crime_rate_per_100k,poverty_rate_pct) — Compara 2+ comunas en múltiples indicadores. Parámetros: comunas, indicators

- **DataEstado - API de Autoridades del Estado** ![Active](https://img.shields.io/badge/7_endpoints-active-brightgreen)
  - 🌐 [https://dataestado.cl/docs](https://dataestado.cl/docs)
  - 📝 API pública con datos históricos y actuales de autoridades del Estado chileno: ministros, subsecretarios, gobiernos, ministerios desde 1990. Sin autenticación
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://api.dataestado.cl/health`](https://api.dataestado.cl/health) — Devuelve estado de la API, nombre del servicio y timestamp en formato ISO 8601
    - ✅ `200` `JSON` `GET` [`https://api.dataestado.cl/v1/autoridades`](https://api.dataestado.cl/v1/autoridades) — Listado completo de ministros y subsecretarios registrados, con filtro opcional por gobierno (ej: ?gobierno=Boric)
    - ✅ `200` `JSON` `GET` [`https://api.dataestado.cl/v1/gobiernos`](https://api.dataestado.cl/v1/gobiernos) — Gobiernos disponibles, presidentes y rangos presidenciales desde 1990
    - ✅ `200` `JSON` `GET` [`https://api.dataestado.cl/v1/ministerios`](https://api.dataestado.cl/v1/ministerios) — Ministerios vigentes con autoridades actuales y códigos internos
    - ✅ `200` `JSON` `GET` [`https://api.dataestado.cl/v1/personas`](https://api.dataestado.cl/v1/personas) — Listado de personas registradas en el sistema, con posibilidad de filtro por diferentes criterios
    - ✅ `200` `JSON` `GET` [`https://api.dataestado.cl/v1/autoridades/estadisticas`](https://api.dataestado.cl/v1/autoridades/estadisticas) — Estadísticas agregadas de autoridades agrupadas por gobierno
    - ✅ `400` `Other` `GET` [`https://api.dataestado.cl/v1/search?q=&limit=20`](https://api.dataestado.cl/v1/search?q=&limit=20) — Búsqueda de datos en el sistema por diferentes criterios

- **BaseAPI - Infraestructura Tributaria** ![Active](https://img.shields.io/badge/11_endpoints-active-brightgreen) [![paid](https://img.shields.io/badge/paid-red)](https://baseapi.cl#precios)
  - 🌐 [https://baseapi.cl](https://baseapi.cl)
  - 📝 API REST tributaria con datos del SII, Previred y Tesorería: consulta RCV, DTEs, contribuyentes, cesiones; emisión de boletas de honorarios y facturación electrónica. Servicio disponible hasta el 11 de diciembre de 2026 solo para suscripciones de pago activas
  - **Endpoints:**
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.baseapi.cl/v1/sii/contribuyente/11111111-1`](https://api.baseapi.cl/v1/sii/contribuyente/11111111-1) — Razón social, giro, dirección y situación tributaria de un contribuyente
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.baseapi.cl/v1/sii/rcv`](https://api.baseapi.cl/v1/sii/rcv) — Registro de Compras y Ventas mensual y anual del SII
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.baseapi.cl/v1/sii/boletas`](https://api.baseapi.cl/v1/sii/boletas) — Boletas de Honorarios Electrónicas (BHE) recibidas y BTE emitidas, con detalle y PDF
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.baseapi.cl/v1/sii/dte/emitidos`](https://api.baseapi.cl/v1/sii/dte/emitidos) — Facturas y documentos emitidos por período
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.baseapi.cl/v1/sii/dte/recibidos`](https://api.baseapi.cl/v1/sii/dte/recibidos) — Facturas de proveedores con detalle e ítems
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.baseapi.cl/v1/sii/cesiones`](https://api.baseapi.cl/v1/sii/cesiones) — Registro Electrónico de Cesión de Créditos (factoring)
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.baseapi.cl/v1/sii/verificar`](https://api.baseapi.cl/v1/sii/verificar) — Validación de comprobantes y facturas de terceros contra el SII (anti-fraude)
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.baseapi.cl/v1/previred/deudas`](https://api.baseapi.cl/v1/previred/deudas) — Deudas previsionales, certificados AFP y planillas pagadas de Previred
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.baseapi.cl/v1/tgr/cartola`](https://api.baseapi.cl/v1/tgr/cartola) — Cartola fiscal, certificado de deuda y convenios de Tesorería
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.baseapi.cl/v1/riesgo/boletin-concursal`](https://api.baseapi.cl/v1/riesgo/boletin-concursal) — Procedimientos de insolvencia (Ley 20.720): búsqueda, detalle y PDF oficial
    - ✅ 🔑 `404` `auth_required` `POST` [`https://api.baseapi.cl/v1/dte/emitir`](https://api.baseapi.cl/v1/dte/emitir) — Emisión de facturas afectas (33), exentas (34) y guías de despacho (52)

- **CNE - API de Combustibles** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://apidocs.cne.cl/](https://apidocs.cne.cl/)
  - 📝 API gratuita (con registro) de la Comisión Nacional de Energía con datos de precios de combustibles en Chile: bencina, gas, parafina y estaciones de servicio a nivel nacional
  - **Endpoints:**
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.tramites.cne.cl/api/v1/bencina`](https://api.tramites.cne.cl/api/v1/bencina) — Datos de estaciones de servicio y precios de combustibles vehiculares. Requiere registro gratuito en api.tramites.cne.cl/register

- **DataInnovación - InnovaChile CORFO** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://datainnovacion.cl/api](https://datainnovacion.cl/api)
  - 📝 API REST con datos públicos de más de 10.300 proyectos beneficiados por InnovaChile/CORFO. Permite consultar el portafolio de proyectos de I+D+i empresarial con filtros por código, beneficiario, tipo de intervención, estado y año
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `GET` [`https://datainnovacion.cl/api/v1/proyectos`](https://datainnovacion.cl/api/v1/proyectos) — Consulta del portafolio de proyectos. Parámetros: filter[codigo], filter[rut_beneficiario], filter[tipo_intervencion], filter[estado_data], filter[sostenible], filter[año_adjudicacion], limit. Requiere token JWT público en header Authorization

- **BIDAT - Banco Integrado de Datos** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://bidat.gob.cl/](https://bidat.gob.cl/)
  - 📝 Datos abiertos del Ministerio de Desarrollo Social y Familia: información social, económica y de inversión pública
  - **Endpoints:**
    - ✅ `200` `HTML` `GET` [`https://bidat.gob.cl/datos-abiertos`](https://bidat.gob.cl/datos-abiertos) — Descarga de datos sociales y de inversión pública del Ministerio

- **Energía Abierta - CNE** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [http://energiaabierta.cl/](http://energiaabierta.cl/)
  - 📝 Plataforma de datos abiertos del sector energético de Chile de la Comisión Nacional de Energía: distribución geográfica de infraestructura, redes de distribución y datos de generación
  - **Endpoints:**
    - ✅ `200` `XML` `GET` [`http://energiaabierta.cl/`](http://energiaabierta.cl/) — Acceso a datasets del sector energético: generación, distribución, subestaciones y redes

- **Cámara de Diputados - Datos Abiertos Legislativos** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://www.camara.cl/transparencia/datosAbiertos.aspx](https://www.camara.cl/transparencia/datosAbiertos.aspx)
  - 📝 Portal de datos abiertos de la Cámara de Diputados de Chile: sesiones, votaciones, proyectos de ley, diputados y transparencia activa. API SOAP/REST
  - **Endpoints:**
    - ✅ `403` `auth_required` `GET` [`https://www.camara.cl/transparencia/datosAbiertos.aspx`](https://www.camara.cl/transparencia/datosAbiertos.aspx) — Catalogo de metodos SOAP/REST de datos abiertos: sesiones, votaciones, proyectos de ley y datos de diputados

- **Senado de Chile - Datos Abiertos Legislativos** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://www.senado.cl/transparencia/datos-abiertos-legislativos](https://www.senado.cl/transparencia/datos-abiertos-legislativos)
  - 📝 Portal de datos abiertos del Senado de Chile: senadores, sesiones, proyectos de ley, votaciones y transparencia activa
  - **Endpoints:**
    - ✅ `200` `XML` `GET` [`https://www.senado.cl/transparencia/datos-abiertos-legislativos`](https://www.senado.cl/transparencia/datos-abiertos-legislativos) — Descarga de datos abiertos legislativos: senadores, proyectos, votaciones y sesiones

- **Observa MinCiencia - Datos Abiertos del Ministerio de Ciencia** ![Active](https://img.shields.io/badge/3_endpoints-active-brightgreen)
  - 🌐 [https://observa.minciencia.gob.cl/](https://observa.minciencia.gob.cl/)
  - 📝 API pública de datos abiertos del Ministerio de Ciencia, Tecnología, Conocimiento e Innovación de Chile. Contiene conjuntos de datos de investigación, innovación e indicadores científicos. Sin autenticación
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://api.observa.minciencia.gob.cl/api/datosabiertos/`](https://api.observa.minciencia.gob.cl/api/datosabiertos/) — Listado de conjuntos de datos abiertos del Ministerio de Ciencia. Retorna metadata completa de cada dataset
    - ✅ `200` `Other` `GET` [`https://api.observa.minciencia.gob.cl/api/datosabiertos/download/?uuid=337e0a01-4e23-4574-bd0c-02ab2f9606a0`](https://api.observa.minciencia.gob.cl/api/datosabiertos/download/?uuid=337e0a01-4e23-4574-bd0c-02ab2f9606a0) — Descarga directa de un dataset por UUID. Patrón: /api/datosabiertos/download/?uuid={uuid}
    - ✅ `200` `JSON` `GET` [`https://api.observa.minciencia.gob.cl/api/indicadores/`](https://api.observa.minciencia.gob.cl/api/indicadores/) — Indicadores de ciencia, tecnología, conocimiento e innovación. Incluye datos de exportaciones, I+D, patentes y más

- **Presupuesto Abierto - DIPRES** ![Active](https://img.shields.io/badge/2_endpoints-active-brightgreen)
  - 🌐 [https://presupuestoabierto.gob.cl/](https://presupuestoabierto.gob.cl/)
  - 📝 Plataforma de DIPRES y Hacienda con la ejecución presupuestaria transaccional del Gobierno Central por institución, proveedor y honorarios, con descargas CSV y JSON por vista. Sin autenticación
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://api.presupuestoabierto.gob.cl/api/v1/providers/96987050-9`](https://api.presupuestoabierto.gob.cl/api/v1/providers/96987050-9) — Ficha de un proveedor o receptor de recursos del Estado por RUT (ejemplo: 96987050-9). Patrón: /api/v1/providers/{rut}
    - ✅ `200` `JSON` `GET` [`https://api.presupuestoabierto.gob.cl/api/v1/data/pagos?group-by=[%22partida%22,%22capitulo%22,%22area%22]&where={%22periodo%22:2026}`](https://api.presupuestoabierto.gob.cl/api/v1/data/pagos?group-by=[%22partida%22,%22capitulo%22,%22area%22]&where={%22periodo%22:2026}) — Consulta de pagos del Gobierno Central agrupados por partida, capítulo y área para el periodo 2026. Retorna JSON con totales y detalles de pagos

  [⬆ Volver al índice](#top)

<a id="cat-finance"></a>

### 💰 Finanzas e Impuestos (18 APIs)

**APIs del sistema financiero, tributario y mercado de capitales**

- **Banco Central de Chile** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://si3.bcentral.cl/estadisticas/Principal1/Web_Services/doc_es.htm](https://si3.bcentral.cl/estadisticas/Principal1/Web_Services/doc_es.htm)
  - 📝 Bases de Datos Estadísticos del Banco Central, con manuales y ejemplos en Python, R y C#
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `GET` [`https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=123456789&pass=tuPassword&firstdate=YYYY-MM-DD&lastdate=YYYY-MM-DD&timeseries=codigodeserie&function=GetSeries`](https://si3.bcentral.cl/SieteRestWS/SieteRestWS.ashx?user=123456789&pass=tuPassword&firstdate=YYYY-MM-DD&lastdate=YYYY-MM-DD&timeseries=codigodeserie&function=GetSeries) — Bases de datos estadísticos con documentación y ejemplos

- **CMF - Comisión para el Mercado Financiero** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://api.sbif.cl/index.html](https://api.sbif.cl/index.html)
  - 📝 Indicadores financieros, instituciones fiscalizadas y reportes del mercado financiero chileno
  - **Endpoints:**
    - ✅ 🔑 `302` `redirect` `GET` [`https://api.sbif.cl/api-sbifv3/`](https://api.sbif.cl/api-sbifv3/) — Indicadores financieros históricos (UF, UTM, dólar, etc.)

- **mindicador.cl** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://mindicador.cl](https://mindicador.cl)
  - 📝 Web service open source con los principales indicadores económicos de Chile en formato JSON
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://mindicador.cl/api`](https://mindicador.cl/api) — Indicadores diarios e históricos en formato JSON

- **findic.cl** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://findic.cl/docs/](https://findic.cl/docs/)
  - 📝 API gratuita con indicadores económicos de Chile en JSON, resúmenes diarios y CSVs históricos
  - **Endpoints:**
    - ✅ `301` `redirect` `GET` [`https://findic.cl/api`](https://findic.cl/api) — Indicadores económicos diarios e históricos

- **DolarApi.com** ![Active](https://img.shields.io/badge/7_endpoints-active-brightgreen)
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

- **Buda.com** ![Active](https://img.shields.io/badge/3_endpoints-active-brightgreen)
  - 🌐 [https://api.buda.com/#la-api-de-buda-com](https://api.buda.com/#la-api-de-buda-com)
  - 📝 API REST del exchange de criptomonedas Buda.com, con órdenes, abonos e información del mercado en tiempo real
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://www.buda.com/api/v2/markets`](https://www.buda.com/api/v2/markets) — Endpoint público que devuelve la lista de todos los mercados disponibles en Buda, junto con la configuración de cada uno
    - ✅ `200` `JSON` `GET` [`https://www.buda.com/api/v2/tickers`](https://www.buda.com/api/v2/tickers) — Entrega la varianción del precio en el último día y en la última semana, junto con el precio de la última transacción (last_price) para cada mercado
    - ✅ 🔑 `403` `auth_required` `GET` [`https://www.buda.com/api/`](https://www.buda.com/api/) — Las llamadas privadas consisten en endpoints que acceden a información privada del usuario que las invocan, les permiten crear o cancelar órdenes o les permiten abonar o retirar dinero hacia o desde el exchange

- **BCI API Market** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://www.bci.cl/apimarket](https://www.bci.cl/apimarket)
  - 📝 APIs públicas del Banco de Crédito e Inversiones: cuentas, indicadores económicos e información del banco
  - **Endpoints:**
    - ✅ 🔑 `403` `auth_required` `GET` [`https://www.bci.cl/apimarket`](https://www.bci.cl/apimarket) — APIs financieras del Banco BCI

- **queTalMiAFP** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://www.quetalmiafp.cl/AccederCuotas](https://www.quetalmiafp.cl/AccederCuotas)
  - 📝 API de valores de cuotas de las AFP, gratuita y sin restricciones
  - **Endpoints:**
    - ✅ 🔑 `200` `XML` `GET` [`https://www.quetalmiafp.cl/AccederCuotas`](https://www.quetalmiafp.cl/AccederCuotas) — Valores diarios de las cuotas de las AFP

- **Magnet Data - API de Datos Públicos Chilenos** ![Active](https://img.shields.io/badge/4_endpoints-active-brightgreen)
  - 🌐 [https://data.magnet.cl/](https://data.magnet.cl/)
  - 📝 API gratuita con datos públicos de Chile: monedas (UF, USD, EUR, CLF a CLP), feriados, días hábiles, Isapres y AFP. Sin autenticación
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://data.magnet.cl/api/v1/currencies/usd/clp/`](https://data.magnet.cl/api/v1/currencies/usd/clp/) — Valor actual de monedas en CLP. Ej: usd/clp, eur/clp, clf/clp, utm/clp. Soporta consultas por fecha (/?YYYY/MM/DD)
    - ✅ `200` `JSON` `GET` [`https://data.magnet.cl/api/v1/holidays/cl/`](https://data.magnet.cl/api/v1/holidays/cl/) — Feriados chilenos y días hábiles con endpoint working-days-count
    - ✅ `200` `JSON` `GET` [`https://data.magnet.cl/api/v1/prevision/health/`](https://data.magnet.cl/api/v1/prevision/health/) — Listado de Isapres con comisiones y datos de afiliación
    - ✅ `200` `JSON` `GET` [`https://data.magnet.cl/api/v1/prevision/pension/`](https://data.magnet.cl/api/v1/prevision/pension/) — Listado de AFP con comisiones, código Previred y RUT

- **Floid - Open Finance API** ![Active](https://img.shields.io/badge/6_endpoints-active-brightgreen) [![paid](https://img.shields.io/badge/paid-red)](https://www.floid.io/pricing)
  - 🌐 [https://docs.floid.io](https://docs.floid.io)
  - 📝 API REST B2B para Open Finance en Chile, Perú y México: cuentas bancarias, tarjetas de crédito, créditos, ahorros y consent manager RDC30
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `POST` [`https://api.floid.app/cl/bank/get_bank_accounts`](https://api.floid.app/cl/bank/get_bank_accounts) — Retorna las cuentas bancarias del usuario autenticado vía Open Finance
    - ✅ 🔑 `401` `auth_required` `POST` [`https://api.floid.app/cl/bank/get_credit_cards`](https://api.floid.app/cl/bank/get_credit_cards) — Retorna las tarjetas de crédito del usuario autenticado
    - ✅ 🔑 `401` `auth_required` `POST` [`https://api.floid.app/cl/consent_manager/create_consent`](https://api.floid.app/cl/consent_manager/create_consent) — Crea un consentimiento RDC30 para acceso a datos financieros del usuario
    - ✅ 🔑 `401` `auth_required` `GET` [`https://api.floid.app/cl/consent_manager/list_consents`](https://api.floid.app/cl/consent_manager/list_consents) — Lista todos los consentimientos activos del cliente
    - ✅ 🔑 `401` `auth_required` `POST` [`https://api.floid.app/cl/consent_manager/revoke_consent`](https://api.floid.app/cl/consent_manager/revoke_consent) — Revoca un consentimiento RDC30 existente
    - ✅ 🔑 `401` `auth_required` `POST` [`https://api.floid.app/cl/bank/get_loans`](https://api.floid.app/cl/bank/get_loans) — Retorna los créditos del usuario autenticado

- **Boufin - Open Finance API** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://boufin.com/](https://boufin.com/)
  - 📝 API de datos financieros para Chile: conecta bancos, SII, TGR y AFP a través de endpoints estandarizados. Open Banking API para bancos y fintechs
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `GET` [`https://api.boufin.com/`](https://api.boufin.com/) — API de datos financieros: cuentas bancarias, información tributaria (SII), TGR y AFP

- **Belvo - Open Finance API LATAM** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://belvo.com/](https://belvo.com/)
  - 📝 Open Banking API para Latinoamérica: datos bancarios, empleo y pagos. Soporta Chile, Brasil, México, Colombia
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `POST` [`https://api.belvo.com/`](https://api.belvo.com/) — Open Banking: aggregación de datos bancarios y pagos A2A

- **Banco de Chile - API Store** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://sitiospublicos.bancochile.cl/api-store](https://sitiospublicos.bancochile.cl/api-store)
  - 📝 APIs del Banco de Chile: abonos en línea, saldos y movimientos. Transferencias 24/7 a otros bancos
  - **Endpoints:**
    - ✅ 🔑 `200` `XML` `POST` [`https://sitiospublicos.bancochile.cl/api-store/abono-en-linea`](https://sitiospublicos.bancochile.cl/api-store/abono-en-linea) — Transferencias electrónicas automáticas desde cuentas de la empresa hacia clientes

- **Clay - API Bancos, SII, Contabilidad e IA** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://www.clay.cl/apis-bancarias-y-sii](https://www.clay.cl/apis-bancarias-y-sii)
  - 📝 API REST: movimientos bancarios (14 bancos), DTEs del SII, asientos contables. Compatible con LLMs y agentes IA. Actualización cada 2 horas
  - **Endpoints:**
    - ✅ 🔑 `307` `redirect` `GET` [`https://api.clay.cl/`](https://api.clay.cl/) — API de datos financieros: bancos, SII, contabilidad. Un token para todas las empresas

- **ApiPyme - API SII Chile** ![Active](https://img.shields.io/badge/3_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://apipyme.cl/](https://apipyme.cl/)
  - 📝 API REST: Registro de Compras, Ventas, F29 y honorarios del SII. Datos actualizados cada 2 horas
  - **Endpoints:**
    - ✅ 🔑 `301` `redirect` `GET` [`https://apipyme.cl/api/v1/ventas/{periodo}`](https://apipyme.cl/api/v1/ventas/{periodo}) — Descarga del libro de ventas del SII con detalle de documentos tributarios
    - ✅ 🔑 `301` `redirect` `GET` [`https://apipyme.cl/api/v1/compras/{periodo}`](https://apipyme.cl/api/v1/compras/{periodo}) — Documentos recibidos consolidados para integración contable
    - ✅ 🔑 `301` `redirect` `GET` [`https://apipyme.cl/api/v1/f29/{periodo}`](https://apipyme.cl/api/v1/f29/{periodo}) — Datos del F29 declarado: IVA débito, crédito, ventas y compras afectas

- **Gears - API SII y Bancos** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://www.gears.cl/](https://www.gears.cl/)
  - 📝 API para conectar al SII y bancos de Chile: Libro IVA, boletas honorarios, F22/F29 y movimientos bancarios
  - **Endpoints:**
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.gears.cl/`](https://api.gears.cl/) — API de datos SII y bancarios: Libro IVA, honorarios, movimientos

- **BICE Connect - Banking as a Service** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://banco.bice.cl/empresas/bice-connect](https://banco.bice.cl/empresas/bice-connect)
  - 📝 Banking as a Service del Banco BICE: APIs de pagos (payout), recaudación (payin) y datos financieros. Transferencias unitarias y masivas
  - **Endpoints:**
    - ✅ 🔑 `400` `Other` `POST` [`https://connect.bice.cl/api/v1/payout`](https://connect.bice.cl/api/v1/payout) — Transferencias bancarias: pagos de sueldos, envíos de dinero programados, dispersión de pagos

- **Chipax - Automatización Financiera Pymes** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://www.chipax.com/](https://www.chipax.com/)
  - 📝 Software de automatización financiera para pymes: sincroniza bancos y SII, conciliación automática, reportes
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `GET` [`https://api.chipax.com/`](https://api.chipax.com/) — API de datos financieros: movimientos bancarios, DTEs del SII, conciliación

  [⬆ Volver al índice](#top)

<a id="cat-transport"></a>

### 🚌 Transporte y Tránsito (9 APIs)

**APIs de transporte público, tránsito y movilidad urbana**

- **Observatorio Logístico - API de Datos Logísticos** ![Active](https://img.shields.io/badge/3_endpoints-active-brightgreen)
  - 🌐 [https://filesprod.observatoriologistico.cl/assets/frontend-graficos/api-datastream-docs/datastreams_api_docs.html](https://filesprod.observatoriologistico.cl/assets/frontend-graficos/api-datastream-docs/datastreams_api_docs.html)
  - 📝 API RESTful pública del Ministerio de Transportes con datos de logística y comercio exterior de Chile: puertos, carga aérea, ferroviaria, carretera, indicadores. Sin autenticación, 100 req/min
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://www.observatoriologistico.cl/api/v1/datastreams/lists`](https://www.observatoriologistico.cl/api/v1/datastreams/lists) — Obtiene una lista paginada de todos los datastreams disponibles en el sistema con información básica y URLs para acceder a sus datos y metadatos
    - ✅ `200` `JSON` `GET` [`https://www.observatoriologistico.cl/api/v1/datastreams/C010/metadata`](https://www.observatoriologistico.cl/api/v1/datastreams/C010/metadata) — /datastreams/{code}/metadata. Obtiene los metadatos de un datastream específico con información sobre la estructura de datos, variables disponibles y descripciones detalladas
    - ✅ `200` `JSON` `GET` [`https://www.observatoriologistico.cl/api/v1/datastreams/C010/data`](https://www.observatoriologistico.cl/api/v1/datastreams/C010/data) — /datastreams/{code}/data. Obtiene los datos de un datastream específico con opciones avanzadas de paginación, filtrado dinámico y ordenamiento

- **GetAPI Chile - Vehículos y Peajes** ![Active](https://img.shields.io/badge/12_endpoints-active-brightgreen) [![paid](https://img.shields.io/badge/paid-red)](https://getapi.cl/planes/)
  - 🌐 [https://getapi.cl/docs/](https://getapi.cl/docs/)
  - 📝 API REST para consulta de vehículos chilenos (patente, tasación, VIN, recalls, alertas por robo) y cálculo de costos de peajes en autopistas de Chile
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `GET` [`https://chile.getapi.cl/v1/vehicles/plate/{plate}`](https://chile.getapi.cl/v1/vehicles/plate/{plate}) — Retorna datos del vehículo: marca, modelo, año, motor, transmisión, resultados de revisión técnica
    - ✅ 🔑 `401` `auth_required` `GET` [`https://chile.getapi.cl/v1/vehicles/appraisal/{plate}`](https://chile.getapi.cl/v1/vehicles/appraisal/{plate}) — Retorna tasación fiscal, precio usado y precio retoma del vehículo
    - ✅ 🔑 `401` `auth_required` `GET` [`https://chile.getapi.cl/v1/vehicles/vin/{vin}`](https://chile.getapi.cl/v1/vehicles/vin/{vin}) — Decodifica un número VIN de 17 caracteres (PRO)
    - ✅ 🔑 `401` `auth_required` `GET` [`https://chile.getapi.cl/v1/vehicles/recall/{vin}`](https://chile.getapi.cl/v1/vehicles/recall/{vin}) — Retorna campañas de recall asociadas a un VIN
    - ✅ 🔑 `401` `auth_required` `GET` [`https://chile.getapi.cl/v1/vehicles/stolen/{patente}`](https://chile.getapi.cl/v1/vehicles/stolen/{patente}) — Consulta si un vehículo tiene alerta por robo (PRO)
    - ✅ 🔑 `401` `auth_required` `GET` [`https://chile.getapi.cl/v1/vehicles/stolen/latest`](https://chile.getapi.cl/v1/vehicles/stolen/latest) — Retorna los vehículos robados más recientes (PRO)
    - ✅ 🔑 `401` `auth_required` `GET` [`https://chile.getapi.cl/v1/tollroutes/api/route-cost`](https://chile.getapi.cl/v1/tollroutes/api/route-cost) — Calcula costo de peajes entre dos ciudades origen/destino
    - ✅ 🔑 `401` `auth_required` `GET` [`https://chile.getapi.cl/v1/tollroutes/api/highways`](https://chile.getapi.cl/v1/tollroutes/api/highways) — Lista todas las autopistas disponibles en Chile
    - ✅ 🔑 `401` `auth_required` `GET` [`https://chile.getapi.cl/v1/tollroutes/api/categories`](https://chile.getapi.cl/v1/tollroutes/api/categories) — Lista las categorías de vehículos (LIVIANO, PESADO)
    - ✅ 🔑 `401` `auth_required` `GET` [`https://chile.getapi.cl/v1/tollroutes/api/locations`](https://chile.getapi.cl/v1/tollroutes/api/locations) — Lista las ciudades disponibles como origen/destino
    - ✅ 🔑 `404` `auth_required` `POST` [`https://chile.getapi.cl/v1/tollroutes/api/calculate-by-path`](https://chile.getapi.cl/v1/tollroutes/api/calculate-by-path) — Calcula peajes desde un recorrido GPS
    - ✅ 🔑 `404` `auth_required` `POST` [`https://chile.getapi.cl/v1/tollroutes/api/route-cost-by-coords`](https://chile.getapi.cl/v1/tollroutes/api/route-cost-by-coords) — Calcula peajes entre dos coordenadas GPS

- **GTFS Red Metropolitana de Movilidad** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://www.dtpm.cl/index.php/noticias/gtfs-vigente](https://www.dtpm.cl/index.php/noticias/gtfs-vigente)
  - 📝 Datos abiertos GTFS del transporte público de Santiago: ~380 servicios de bus, 136 estaciones de Metro, 11.000+ paraderos
  - **Endpoints:**
    - ✅ `200` `HTML` `GET` [`https://www.dtpm.cl/index.php/noticias/gtfs-vigente`](https://www.dtpm.cl/index.php/noticias/gtfs-vigente) — Descarga del feed GTFS con horarios, rutas, paradas y shapes del transporte público

- **Shipit - API de Logística** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://developers.shipit.cl/](https://developers.shipit.cl/)
  - 📝 API de logística para ecommerce: múltiples couriers, cotización, seguimiento, inventario y fulfillment
  - **Endpoints:**
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.shipit.cl/`](https://api.shipit.cl/) — API REST: ventas, envíos, seguimiento, cotización, couriers, inventario, webhooks

- **Starken - API de Envíos** ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://starken.cl/integraciones](https://starken.cl/integraciones)
  - 📝 API REST y SOAP para envíos a todo Chile: cotización, generación de órdenes de flete y seguimiento
  - **Endpoints:**
    - ❌ 🔑 `0` `error` `GET` [`https://gateway.starken.cl/`](https://gateway.starken.cl/) — API REST: cotización, ciudades, agencias, órdenes de flete

- **Chilenvíos - API Multi-courier** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://chilenvios.cl/](https://chilenvios.cl/)
  - 📝 API de envíos multi-courier para Chile: Starken, Chilexpress y Bluexpress en una sola integración JSON
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `POST` [`https://multicourier.p.rapidapi.com/quote`](https://multicourier.p.rapidapi.com/quote) — Cotizacion multi-courier (POST /quote): Starken, Chilexpress, Bluexpress. Hospedada en RapidAPI, requiere x-rapidapi-key

- **Chilexpress Developers - API Logística** ![Active](https://img.shields.io/badge/3_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://developers.wschilexpress.com/](https://developers.wschilexpress.com/)
  - 📝 API REST de Chilexpress para integración logística: cotización de envíos, generación de órdenes de transporte, seguimiento (tracking), coberturas y georeferenciación de direcciones. Requiere registro y TCC
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://services.wschilexpress.com/georeference/api/v1/regions`](https://services.wschilexpress.com/georeference/api/v1/regions) — Listado de regiones con cobertura. Base georeference: tambien expone comunas, calles, numeraciones y oficinas de entrega
    - ✅ 🔑 `404` `auth_required` `POST` [`https://services.wschilexpress.com/rating/api/v1.0/rates/courier`](https://services.wschilexpress.com/rating/api/v1.0/rates/courier) — Tarificacion de envios courier (POST). Requiere header Ocp-Apim-Subscription-Key. Existe variante /rates/business para tarifas empresariales
    - ✅ 🔑 `400` `Other` `POST` [`https://services.wschilexpress.com/transport-orders/api/v1.0/transport-orders`](https://services.wschilexpress.com/transport-orders/api/v1.0/transport-orders) — Generacion y consulta de ordenes de transporte (OT) y etiquetas (POST). Requiere header Ocp-Apim-Subscription-Key

- **CorreosChile Developers** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://developers.correos.cl/](https://developers.correos.cl/)
  - 📝 APIs oficiales de CorreosChile (SOAP v1 y REST v2): tarifificación, cobertura, regiones y comunas, sucursales, admisión de envíos, etiquetas y trazabilidad. Requiere ser cliente y credenciales de integración
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `GET` [`https://cert-apib2bv2.correos.cl:8000/servicios`](https://cert-apib2bv2.correos.cl:8000/servicios) — Consulta los servicios disponibles del cliente (ambiente de certificación documentado). Requiere header Authorization

- **XorCl Red - Transporte de Santiago** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://github.com/xorcl/api-red](https://github.com/xorcl/api-red)
  - 📝 API comunitaria (Go, GPL-3.0) que consulta los sitios oficiales de Red y Metro. Solo el estado de la red de Metro responde actualmente; paraderos (400) y saldo bip! (500) fallan por cambios en los sitios de origen. Sin autenticación
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://api.xor.cl/red/metro-network`](https://api.xor.cl/red/metro-network) — Estado en vivo de la red de Metro según la página oficial (issues, time, lines por línea; 0 operativa, 1 cerrada temporal, 2 no habilitada, 3 accesos cerrados). lines viene vacío cuando no hay incidentes

  [⬆ Volver al índice](#top)

<a id="cat-weather"></a>

### 🌤️ Clima y Meteorología (1 API)

**APIs del clima, meteorología y condiciones ambientales**

- **Dirección Meteorológica de Chile - Climatología** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://climatologia.meteochile.gob.cl/application/index/menuTematicoJson](https://climatologia.meteochile.gob.cl/application/index/menuTematicoJson)
  - 📝 Datos meteorológicos en tiempo real y registros históricos de estaciones automáticas en Chile
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `GET` [`https://climatologia.meteochile.gob.cl/application/servicios/getEstacion/330020?usuario=correo@correo.cl&token=apiKey_personal`](https://climatologia.meteochile.gob.cl/application/servicios/getEstacion/330020?usuario=correo@correo.cl&token=apiKey_personal) — Datos meteorológicos en tiempo real e históricos

  [⬆ Volver al índice](#top)

<a id="cat-environment"></a>

### 🌿 Medio Ambiente (4 APIs)

**APIs de calidad del aire, biodiversidad y datos ambientales**

- **SINCA - Sistema de Información Nacional de Calidad del Aire** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://sinca.mma.gob.cl](https://sinca.mma.gob.cl)
  - 📝 API Pública (Sin Documentación) con información en tiempo real de calidad del aire de estaciones de monitoreo en todo Chile
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://sinca.mma.gob.cl/index.php/json/listadomapa2k19`](https://sinca.mma.gob.cl/index.php/json/listadomapa2k19) — Datos en tiempo real de estaciones de calidad del aire

- **ARClim - Atlas de Riesgo Climático** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://arclim.mma.gob.cl/atlas/api](https://arclim.mma.gob.cl/atlas/api)
  - 📝 Indicadores climáticos históricos y proyectados con capas geográficas para análisis de riesgos climáticos
  - **Endpoints:**
    - ✅ `301` `redirect` `GET` [`https://arclim.mma.gob.cl/api`](https://arclim.mma.gob.cl/api) — Indicadores climáticos históricos y proyectados

- **Chilean Birds** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://aves.ninjas.cl](https://aves.ninjas.cl)
  - 📝 API (Sin documentación) con información sobre aves de Chile usando datos de Buscaves.cl
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://aves.ninjas.cl/api/birds`](https://aves.ninjas.cl/api/birds) — Información sobre especies de aves chilenas

- **Datos para Resiliencia ante Desastres - Itrend** ![Active](https://img.shields.io/badge/2_endpoints-active-brightgreen)
  - 🌐 [https://guides.dataverse.org/en/latest/api/index.html](https://guides.dataverse.org/en/latest/api/index.html)
  - 📝 Repositorio de datos abiertos sobre desastres naturales en Chile: sismos, tsunamis, incendios, volcanes, meteorología y vulnerabilidad (Harvard Dataverse). Endpoints públicos y autenticados con API key
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://datospararesiliencia.cl/api/search?q=sismo&type=dataset`](https://datospararesiliencia.cl/api/search?q=sismo&type=dataset) — Búsqueda pública de datasets. Parámetros: q, type, sort, order, fq, start, rows
    - ✅ 🔑 `200` `JSON` `GET` [`https://datospararesiliencia.cl/api/dataverses/inicio`](https://datospararesiliencia.cl/api/dataverses/inicio) — Info de colecciones, datasets y administración. Usa header X-Dataverse-key para autenticación

  [⬆ Volver al índice](#top)

<a id="cat-education"></a>

### 📚 Educación (3 APIs)

**APIs educativas, universitarias y de admisión**

- **Centro de Estudios Mineduc - Datos Abiertos** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://datosabiertos.mineduc.cl/](https://datosabiertos.mineduc.cl/)
  - 📝 Plataforma de datos abiertos del Ministerio de Educación: 21+ conjuntos de datos sobre matrícula, docentes, establecimientos y sostenedores
  - **Endpoints:**
    - ✅ `200` `XML` `GET` [`https://datosabiertos.mineduc.cl/`](https://datosabiertos.mineduc.cl/) — Bases de datos descargables: matrícula, docentes, establecimientos, asistentes de la educación

- **Superintendencia de Educación - Datos Abiertos** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://www.supereduc.cl/datosabiertos/](https://www.supereduc.cl/datosabiertos/)
  - 📝 Repositorio de datos y estadísticas de la Superintendencia de Educación: denuncias, mediaciones, procesos administrativos sancionatorios
  - **Endpoints:**
    - ✅ `200` `XML` `GET` [`https://www.supereduc.cl/datosabiertos/`](https://www.supereduc.cl/datosabiertos/) — Bases de datos descargables organizadas por año con esquemas de registros detallados

- **Agencia de Calidad de la Educación - Bases de Datos** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://informacionestadistica.agenciaeducacion.cl/](https://informacionestadistica.agenciaeducacion.cl/)
  - 📝 Bases de datos de resultados de acceso público de la Agencia de Calidad de la Educación
  - **Endpoints:**
    - ✅ `200` `XML` `GET` [`https://informacionestadistica.agenciaeducacion.cl/`](https://informacionestadistica.agenciaeducacion.cl/) — Bases de datos de resultados educativos para descarga pública

  [⬆ Volver al índice](#top)

<a id="cat-health"></a>

### 🏥 Salud (1 API)

**APIs de salud, hospitales y servicios médicos**

- **Superintendencia de Salud** ![Active](https://img.shields.io/badge/2_endpoints-active-brightgreen)
  - 🌐 [https://apis-documentacion.superdesalud.gob.cl/](https://apis-documentacion.superdesalud.gob.cl/)
  - 📝 Portal de APIs de la Superintendencia de Salud con datos del Registro Nacional de Prestadores Individuales de Salud, búsqueda por RUT y número de registro
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `GET` [`https://apis.superdesalud.gob.cl/api/v2/prestadores/rut/11111111`](https://apis.superdesalud.gob.cl/api/v2/prestadores/rut/11111111) — Ficha de un prestador de salud buscado por RUT (sin dígito verificador)
    - ✅ 🔑 `401` `auth_required` `GET` [`https://apis.superdesalud.gob.cl/api/v2/prestadores/registro/334583`](https://apis.superdesalud.gob.cl/api/v2/prestadores/registro/334583) — Ficha de un prestador de salud buscado por número de registro

  [⬆ Volver al índice](#top)

<a id="cat-maps"></a>

### 🗺️ Geografía y Mapas (3 APIs)

**APIs geoespaciales, mapas y datos territoriales**

- **SMA - Infraestructura de Datos Geoespaciales** ![Active](https://img.shields.io/badge/2_endpoints-active-brightgreen)
  - 🌐 [https://ideserver.sma.gob.cl/arcgis/rest/services/IDE](https://ideserver.sma.gob.cl/arcgis/rest/services/IDE)
  - 📝 Servicios ArcGIS REST de la Superintendencia del Medio Ambiente: capas de biodiversidad, energía, planes reguladores y otras capas territoriales
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://ideserver.sma.gob.cl/arcgis/rest/services/IDE?f=pjson`](https://ideserver.sma.gob.cl/arcgis/rest/services/IDE?f=pjson) — Listado de capas geoespaciales disponibles de la IDE institucional
    - ✅ `200` `JSON` `GET` [`https://ideserver.sma.gob.cl/arcgis/rest/services/IDE/Energia/MapServer/0/query?where=1%3D1&outFields=nombre%2Ccomuna%2Cregion&returnGeometry=true&outSR=4326&f=pjson`](https://ideserver.sma.gob.cl/arcgis/rest/services/IDE/Energia/MapServer/0/query?where=1%3D1&outFields=nombre%2Ccomuna%2Cregion&returnGeometry=true&outSR=4326&f=pjson) — Consulta de features de una capa. OJO: este servidor da error 400 si se incluye resultRecordCount

- **Geoportal de Chile** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://geoportal.cl/](https://geoportal.cl/)
  - 📝 Catálogo Nacional de Información Geoespacial del Estado de Chile. Servicios WMS/WFS de múltiples instituciones públicas
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://geoportal.cl/`](https://geoportal.cl/) — Acceso a metadatos y servicios geoespaciales del Estado

- **IDE Chile - Infraestructura de Datos Geoespaciales** ![Active](https://img.shields.io/badge/2_endpoints-active-brightgreen)
  - 🌐 [https://www.ide.cl](https://www.ide.cl)
  - 📝 Portal institucional de la Infraestructura de Datos Geoespaciales de Chile. El catálogo y visor viven en Geoportal, con servicios OGC y ArcGIS de organismos del Estado. Sin autenticación
  - **Endpoints:**
    - ✅ `200` `XML` `GET` [`https://geoportal.cl/csw?SERVICE=CSW&REQUEST=GetCapabilities`](https://geoportal.cl/csw?SERVICE=CSW&REQUEST=GetCapabilities) — Servicio OGC CSW del Catálogo Nacional de Información Geoespacial (pycsw). Responde XML con las operaciones GetCapabilities, GetRecords y GetRecordById
    - ✅ `200` `JSON` `GET` [`https://services6.arcgis.com/feQ9HId8vmgonvvD/ArcGIS/rest/services/CICLOV_validVisor_WFL1/FeatureServer?f=pjson`](https://services6.arcgis.com/feQ9HId8vmgonvvD/ArcGIS/rest/services/CICLOV_validVisor_WFL1/FeatureServer?f=pjson) — Capa de ejemplo del Catálogo Nacional de Información Geoespacial (ciclovías SECTRA). Metadata del FeatureServer en JSON

  [⬆ Volver al índice](#top)

<a id="cat-business"></a>

### 💼 Negocios y Comercio (23 APIs)

**APIs de comercio, licitaciones, pagos y registro de empresas**

- **Khipu - Pagos Online** ![Active](https://img.shields.io/badge/3_endpoints-active-brightgreen) [![paid](https://img.shields.io/badge/paid-red)](https://www.khipu.com/page/tarifas-instantaneos-chile)
  - 🌐 [https://docs.khipu.com/products](https://docs.khipu.com/products)
  - 📝 APIs de Khipu: Pagos Instantáneos, Pagos Automáticos y Open Finance para acceder a información bancaria
  - **Endpoints:**
    - ✅ 🔑 `403` `auth_required` `GET` [`https://payment-api.khipu.com/v3/banks`](https://payment-api.khipu.com/v3/banks) — Convierte transferencias bancarias en pagos digitales
    - ✅ 🔑 `405` `Other` `POST` [`https://payment-api.khipu.com/v1/automatic-payment/subscription`](https://payment-api.khipu.com/v1/automatic-payment/subscription) — Automatiza cobros recurrentes
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.khipu.com/v1/cl/banking/business`](https://api.khipu.com/v1/cl/banking/business) — Open Finance Khipu: datos bancarios de empresas en Chile. Requiere credenciales de partner; el gateway solo enruta rutas exactas

- **Flow - Pagos Online** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://developers.flow.cl/api](https://developers.flow.cl/api)
  - 📜 [OpenAPI Spec](https://developers.flow.cl/es-openApiFlow.yaml)
  - 📝 API REST de plataforma de pagos online chilena para pagos con tarjetas de crédito y débito
  - **Endpoints:**
    - ✅ 🔑 `301` `redirect` `POST` [`https://www.flow.cl/api`](https://www.flow.cl/api) — Pagos con tarjetas de crédito y débito

- **Kushki - Pagos Globales** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) [![paid](https://img.shields.io/badge/paid-red)](https://www.kushkipagos.com/api-integracion-pagos-kushki)
  - 🌐 [https://api-docs.kushkipagos.com/](https://api-docs.kushkipagos.com/)
  - 📝 API de pagos globales con recepción en moneda local, multi-medio de pago en cada país
  - **Endpoints:**
    - ✅ 🔑 `403` `auth_required` `POST` [`https://api.kushkipagos.com`](https://api.kushkipagos.com) — Pagos globales con múltiples medios de pago

- **Reveniu - Suscripciones** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) [![paid](https://img.shields.io/badge/paid-red)](https://reveniu.com/#rec237022060)
  - 🌐 [https://docs.reveniu.com](https://docs.reveniu.com)
  - 📝 API REST para gestión de cobro de suscripciones y pagos recurrentes en Chile. Documentación desactualizada (~4 años sin cambios)
  - **Endpoints:**
    - ✅ 🔑 `301` `redirect` `POST` [`https://production.reveniu.com/api/v1/plans`](https://production.reveniu.com/api/v1/plans) — Planes de suscripcion via POST con header Reveniu-Secret-Key. Verificado: sin key responde 401

- **Fintoc - Pagos por Transferencia** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://docs.fintoc.com/reference/introduction](https://docs.fintoc.com/reference/introduction)
  - 📝 API REST para iniciación de pagos mediante transferencias bancarias, tarjetas y conciliación de movimientos
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `GET` [`https://api.fintoc.com/v1/payment_intents`](https://api.fintoc.com/v1/payment_intents) — Intentos de pago via API v1. Requiere header Authorization Bearer con secret key; sin key responde 401

- **Transbank - Webpay** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://www.transbankdevelopers.cl](https://www.transbankdevelopers.cl)
  - 📝 API REST de Webpay Plus para pagos con tarjeta de crédito y débito en Chile, con integración en línea (Oneclick, Transbank Onepay y Mall)
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `POST` [`https://webpay3g.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions`](https://webpay3g.transbank.cl/rswebpaytransaction/api/webpay/v1.2/transactions) — Creación de transacciones Webpay (requiere Tbk-Api-Key-Id y Tbk-Api-Key-Secret)

- **Reqlut** ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://reqlut.com/api/v3/doc](https://reqlut.com/api/v3/doc)
  - 📝 API REST para integración con el ecosistema de empleabilidad universitaria Reqlut. Requiere API key para uso institucional

- **feriados.io - Motor de Calendario Operativo LATAM** ![Active](https://img.shields.io/badge/6_endpoints-active-brightgreen) [![freemium](https://img.shields.io/badge/freemium-orange)](https://feriados.io/pricing)
  - 🌐 [https://feriados.io/docs](https://feriados.io/docs)
  - 📝 API REST con feriados, días hábiles y calendarios personalizados para 11 países LATAM. Plan Free: 1,000 req/mes. Para Chile: feriados civiles, religiosos y regionales
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `GET` [`https://api.feriados.io/v1/countries`](https://api.feriados.io/v1/countries) — Lista los países soportados con sus códigos ISO y nombres
    - ✅ 🔑 `401` `auth_required` `GET` [`https://api.feriados.io/v1/CL/holidays/{year}`](https://api.feriados.io/v1/CL/holidays/{year}) — Retorna los feriados de Chile para un año específico (incluye regionales)
    - ✅ 🔑 `401` `auth_required` `GET` [`https://api.feriados.io/v1/CL/is-business-day/{date}`](https://api.feriados.io/v1/CL/is-business-day/{date}) — Indica si una fecha es día hábil (Free: limitado a 90 días adelante)
    - ✅ 🔑 `401` `auth_required` `GET` [`https://api.feriados.io/v1/CL/next-holiday`](https://api.feriados.io/v1/CL/next-holiday) — Retorna el próximo feriado en el calendario chileno
    - ✅ 🔑 `401` `auth_required` `GET` [`https://api.feriados.io/v1/CL/calendar/{year}`](https://api.feriados.io/v1/CL/calendar/{year}) — Retorna el calendario anual completo (cada día marcado como hábil o feriado)
    - ✅ 🔑 `401` `auth_required` `POST` [`https://api.feriados.io/v1/CL/business-days/add`](https://api.feriados.io/v1/CL/business-days/add) — Calcula fecha sumando o restando días hábiles desde una fecha base (plan Developer+)

- **SimpleAPI - Facturación Electrónica SII** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) [![freemium](https://img.shields.io/badge/freemium-orange)](https://www.simpleapi.cl/)
  - 🌐 [https://www.simpleapi.cl/](https://www.simpleapi.cl/)
  - 📝 API REST y SDK .NET para integración con el SII: emisión de facturas, boletas, guías de despacho y cesiones. Gratuita hasta 500 req/mes
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `POST` [`https://www.simpleapi.cl/api/`](https://www.simpleapi.cl/api/) — Emisión de DTEs al SII. Requiere certificado digital y CAF autorizado

- **SimpleFactura - API Facturación Electrónica** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://www.simplefactura.cl/soluciones/desarrolladores](https://www.simplefactura.cl/soluciones/desarrolladores)
  - 📝 API de SimpleFactura (ChileSystems) para emitir DTE y boletas de honorarios, recuperar PDF y XML, administrar folios, clientes, productos y sucursales. Integración con el SII en un solo paso
  - **Endpoints:**
    - ✅ 🔑 `404` `auth_required` `POST` [`https://api.simplefactura.cl/`](https://api.simplefactura.cl/) — Emisión de DTEs, boletas de honorarios, gestión de folios y clientes

- **API Gateway CL** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://www.apigateway.cl/](https://www.apigateway.cl/)
  - 📝 API REST con acceso a datos del SII, Previred, TGR y más fuentes oficiales de Chile
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `GET` [`https://www.apigateway.cl/docs/api`](https://www.apigateway.cl/docs/api) — Consulta SII, Previred, TGR y otras fuentes oficiales

- **MercadoLibre Chile** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://developers.mercadolibre.com/](https://developers.mercadolibre.com/)
  - 📝 API REST del marketplace MercadoLibre para Chile: productos, pedidos, envíos, usuarios. OAuth 2.0
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `GET` [`https://api.mercadolibre.com/sites/MLC`](https://api.mercadolibre.com/sites/MLC) — API del marketplace para Chile (MLC). Endpoints de items, categorías, pedidos, etc

- **Bsale - API Punto de Venta** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://docs.bsale.dev/](https://docs.bsale.dev/)
  - 📝 API REST para integración con Bsale: facturación electrónica, inventario, clientes y e-commerce para PyMEs en Chile
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `GET` [`https://api.bsale.io/v1/`](https://api.bsale.io/v1/) — API REST para gestión de ventas, inventario y facturación

- **Apipay - Orquestador de Pagos** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://apipay.cl/](https://apipay.cl/)
  - 📝 Startup chilena: orquestador de medios de pago, recargas telefónicas, criptomonedas y transferencias. API REST para integración
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `POST` [`https://api.apipay.cl/`](https://api.apipay.cl/) — Orquestador de pagos: múltiples medios de pago y transferencias

- **Shinkansen Finance - Payouts API** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://shinkansen.finance/](https://shinkansen.finance/)
  - 📝 API de payouts y transferencias bancarias automáticas en Chile. Automatiza envíos de fondos con IA. Cámara de pagos autorizada por CMF
  - **Endpoints:**
    - ✅ 🔑 `404` `auth_required` `POST` [`https://api.shinkansen.finance/v1/payouts`](https://api.shinkansen.finance/v1/payouts) — Envio de payouts via POST. Host actual segun docs oficiales (docs.shinkansen.tech); el antiguo api.shinkansen.tech tiene DNS roto

- **PayU Latam - API de Pagos Chile** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://developers.payulatam.com/](https://developers.payulatam.com/)
  - 📝 API de procesamiento de pagos para Chile: tarjetas de crédito/débito, transferencias bancarias vía Khipu, y otros medios de pago
  - **Endpoints:**
    - ✅ 🔑 `200` `JSON` `POST` [`https://sandbox.api.payulatam.com/payments-api/4.0/service/es/CHL`](https://sandbox.api.payulatam.com/payments-api/4.0/service/es/CHL) — Procesamiento de pagos: tarjetas, transferencias Khipu, y otros medios en Chile

- **Floid - API Registro Civil Chile** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://www.floid.io/servicios/api-registro-civil](https://www.floid.io/servicios/api-registro-civil)
  - 📝 API para verificación de identidad contra el Registro Civil de Chile: validación de RUT y vigencia de cédula
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `POST` [`https://api.floid.app/cl/civil_registry/validate_id`](https://api.floid.app/cl/civil_registry/validate_id) — Validación de cédula de identidad chilena contra el Registro Civil

- **Impish API - Vigencia Documento Identidad** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![freemium](https://img.shields.io/badge/freemium-orange)
  - 🌐 [https://impishapi.com/vigencia-documento-identidad/](https://impishapi.com/vigencia-documento-identidad/)
  - 📝 API SaaS para consultar vigencia de cédula de identidad o pasaporte chileno. Conexión directa con Registro Civil. CLP$5 por consulta, 10 gratis/hora
  - **Endpoints:**
    - ✅ 🔑 `400` `JSON` `POST` [`https://regcivil.impish.top/query`](https://regcivil.impish.top/query) — Vigencia de cedula/pasaporte via POST (run + tipo y numero de documento). Key por correo; tier gratuito limita 10 req/hora por IP. Verificado manualmente: POST sin key devuelve 400 INVALID_PARAM

- **Mercado Pago Chile - API de Pagos** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![freemium](https://img.shields.io/badge/freemium-orange)
  - 🌐 [https://www.mercadopago.cl/developers/es](https://www.mercadopago.cl/developers/es)
  - 📝 API de pagos para Chile: Checkout API, pagos recurrentes, Checkout Pro. Base URL: api.mercadopago.com
  - **Endpoints:**
    - ✅ 🔑 `405` `Other` `POST` [`https://api.mercadopago.com/v1/payments`](https://api.mercadopago.com/v1/payments) — API de pagos: creación de pagos, consultas, reembolsos. Autenticación vía Access Token

- **DUODTE - API Facturación Electrónica SII** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![freemium](https://img.shields.io/badge/freemium-orange)
  - 🌐 [https://duodte.cl/api-docs.html](https://duodte.cl/api-docs.html)
  - 📝 API REST para integración con el SII de Chile: emisión de facturas, boletas, notas de crédito, guías de despacho y cesión de documentos. Respaldo automático y PDF
  - **Endpoints:**
    - ✅ 🔑 `404` `auth_required` `POST` [`https://api.duodte.cl/v1/dte`](https://api.duodte.cl/v1/dte) — Emisión de documentos tributarios electrónicos al SII

- **Tupana - API Facturación Electrónica SII** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://www.tupana.ai/api-factura](https://www.tupana.ai/api-factura)
  - 📝 API REST que replica el facturador MiPyme del SII: emisión de facturas, boletas, notas de crédito y más. Multicredencial, webhooks, 100% programable
  - **Endpoints:**
    - ✅ 🔑 `404` `auth_required` `POST` [`https://api.tupana.ai/v1/`](https://api.tupana.ai/v1/) — Facturación electrónica al SII: emisión de DTEs, consultas y webhooks

- **OpenFactura - API Facturación Electrónica Haulmer** ![Active](https://img.shields.io/badge/2_endpoints-active-brightgreen) ![freemium](https://img.shields.io/badge/freemium-orange)
  - 🌐 [https://docsapi-openfactura.haulmer.com/](https://docsapi-openfactura.haulmer.com/)
  - 📝 API RESTful de Haulmer para facturación electrónica al SII: emisión de facturas (33), boletas (39), notas de crédito (61), guías de despacho (52) y más. Entorno de desarrollo gratuito con CAF simulado. Rate limit: 3 req/s, 100 req/min
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `POST` [`https://api.haulmer.com/v2/dte/document`](https://api.haulmer.com/v2/dte/document) — Emisión de documentos tributarios electrónicos al SII. Devuelve XML, PDF, timbre y resolución
    - ✅ 🔑 `401` `auth_required` `POST` [`https://dev-api.haulmer.com/v2/dte/document`](https://dev-api.haulmer.com/v2/dte/document) — Entorno de desarrollo gratuito para pruebas de integración sin cuenta

- **Facturador Pulsando - API Facturación Electrónica SII** ![Active](https://img.shields.io/badge/3_endpoints-active-brightgreen) ![paid](https://img.shields.io/badge/paid-red)
  - 🌐 [https://docs.facturador.pulsandotech.cl/](https://docs.facturador.pulsandotech.cl/)
  - 📝 API REST completa para emisión y consulta de DTEs chilenos: facturas, boletas, notas de crédito/débito, guías de despacho. Multi-RUT, RCV, folios (CAF), webhooks, sandbox gratuito, integración MCP/IA. OpenAPI 1.3
  - **Endpoints:**
    - ✅ 🔑 `401` `auth_required` `POST` [`https://api.facturador.pulsandotech.cl/api/public/v1/dte`](https://api.facturador.pulsandotech.cl/api/public/v1/dte) — Emisión de DTEs al SII con estados asíncronos. Soporta factura (33/34), boleta (39/41), NC (61/56), ND (55/46), GD (52)
    - ✅ 🔑 `401` `auth_required` `GET` [`https://api.facturador.pulsandotech.cl/api/public/v1/rcv`](https://api.facturador.pulsandotech.cl/api/public/v1/rcv) — Consulta y sincronización del Registro de Compras y Ventas desde el SII
    - ✅ 🔑 `404` `auth_required` `GET` [`https://api.facturador.pulsandotech.cl/api/public/v1/contribuyentes`](https://api.facturador.pulsandotech.cl/api/public/v1/contribuyentes) — Consulta de contribuyente en el padrón del SII

  [⬆ Volver al índice](#top)

<a id="cat-utilities"></a>

### 🔧 Servicios Básicos (2 APIs)

**APIs de servicios básicos, energía y telecomunicaciones**

- **DGA - Red Hidrométrica Nacional** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://dga.mop.gob.cl/servicios-de-informacion](https://dga.mop.gob.cl/servicios-de-informacion)
  - 📝 Servicio de mapas ArcGIS de la Dirección General de Aguas con estaciones fluviométricas y niveles de alerta de caudales, actualizado cada 15-60 minutos. Sin autenticación
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://rest-sit.mop.gob.cl/arcgis/rest/services/DGA/ALERTAS/MapServer/0/query?where=1%3D1&returnCountOnly=true&f=pjson`](https://rest-sit.mop.gob.cl/arcgis/rest/services/DGA/ALERTAS/MapServer/0/query?where=1%3D1&returnCountOnly=true&f=pjson) — Conteo de estaciones fluviométricas con nivel de alerta. Acepta parámetros where, outFields y returnGeometry para consultas completas

- **Coordinador Eléctrico Nacional** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://portal.api.coordinador.cl/](https://portal.api.coordinador.cl/)
  - 📝 APIs del Coordinador Eléctrico Nacional (operación, SIP, mercados, medidas). Requiere registro gratuito en el portal y API Key u OpenID; las APIs públicas (SIP) se activan de inmediato sin aprobación
  - **Endpoints:**
    - ✅ 🔑 `403` `auth_required` `GET` [`https://operacion.api.coordinador.cl/reportes/v3/generation`](https://operacion.api.coordinador.cl/reportes/v3/generation) — Clasificación de generación del sistema OpReal (Gerencia de Operaciones). Requiere API Key del portal

  [⬆ Volver al índice](#top)

<a id="cat-notifications"></a>

### 📢 Alertas y Notificaciones (4 APIs)

**APIs de alertas tempranas, emergencias y comunicaciones oficiales**

- **CSN - Centro Sismológico Nacional** ![Active](https://img.shields.io/badge/3_endpoints-active-brightgreen)
  - 🌐 [https://eew.csn.uchile.cl/](https://eew.csn.uchile.cl/)
  - 📝 API FDSN Web Services del Centro Sismológico Nacional con datos sísmicos en tiempo real, estaciones y disponibilidad
  - **Endpoints:**
    - ✅ `200` `XML` `GET` [`https://eew.csn.uchile.cl/fdsnws/station/1/`](https://eew.csn.uchile.cl/fdsnws/station/1/) — Información de estaciones sismológicas de la red del CSN vía FDSNWS
    - ✅ `200` `XML` `GET` [`https://eew.csn.uchile.cl/fdsnws/dataselect/1/`](https://eew.csn.uchile.cl/fdsnws/dataselect/1/) — Descarga de datos sísmicos en formato MiniSEED vía FDSNWS
    - ✅ `200` `XML` `GET` [`https://eew.csn.uchile.cl/fdsnws/availability/1/`](https://eew.csn.uchile.cl/fdsnws/availability/1/) — Disponibilidad de datos sísmicos por estación vía FDSNWS

- **XORCL - API Sismología** ![Active](https://img.shields.io/badge/2_endpoints-active-brightgreen)
  - 🌐 [https://github.com/xorcl/api-sismo](https://github.com/xorcl/api-sismo)
  - 📝 API pública de sismología con sismos recientes e históricos en Chile
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://api.xor.cl/sismo/recent`](https://api.xor.cl/sismo/recent) — Lista de sismos recientes en Chile. Filtro opcional: ?magnitude=5
    - ✅ `200` `JSON` `GET` [`https://api.xor.cl/sismo/historic/20100227`](https://api.xor.cl/sismo/historic/20100227) — Sismos históricos por fecha (YYYYMMDD). Filtro opcional: ?magnitude=5

- **Sismos en Chile** ![Active](https://img.shields.io/badge/2_endpoints-active-brightgreen)
  - 🌐 [https://sismosenchile.cl/](https://sismosenchile.cl/)
  - 📝 API JSON con recompilado de los ultimos sismos de Chile (CSN) con estadisticas
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://sismosenchile.cl/api/earthquakes/recent?limit=10`](https://sismosenchile.cl/api/earthquakes/recent?limit=10) — Ultimos sismos registrados. Parametros: limit
    - ✅ `200` `JSON` `GET` [`https://sismosenchile.cl/api/earthquakes/stats`](https://sismosenchile.cl/api/earthquakes/stats) — Estadisticas generales: total de sismos, sismos de hoy, magnitud maxima

- **Temblores 24** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://temblores24.cl/](https://temblores24.cl/)
  - 📝 Mapa de sismos en tiempo real basado en el Centro Sismologico Nacional, con endpoint JSON de sismos
  - **Endpoints:**
    - ✅ `301` `redirect` `GET` [`https://temblores24.cl/api/sismos`](https://temblores24.cl/api/sismos) — Listado de sismos con campos: count, campos, data

  [⬆ Volver al índice](#top)

<a id="cat-community"></a>

### 🤝 Comunidad y Otros (3 APIs)

**APIs comunitarias, adopción animal, feriados y utilidades varias**

- **Huachitos - Plataforma de Adopción Animal** ![Active](https://img.shields.io/badge/1_endpoints-active-brightgreen)
  - 🌐 [https://huachitos.cl/docs](https://huachitos.cl/docs)
  - 📝 API abierta con animales disponibles para adopción, encontrados o perdidos, organizados por región y comuna
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://huachitos.cl/api/animales/`](https://huachitos.cl/api/animales/) — Animales en adopción, perdidos y encontrados por región

- **boostr.cl - APIs de Uso Libre** ![Active](https://img.shields.io/badge/5_endpoints-active-brightgreen) ![freemium](https://img.shields.io/badge/freemium-orange)
  - 🌐 [https://docs.boostr.cl/reference/welcome](https://docs.boostr.cl/reference/welcome)
  - 📝 Colección de APIs útiles y gratuitas para diversos propósitos
  - **Endpoints:**
    - ✅ `301` `redirect` `GET` [`https://api.boostr.cl/`](https://api.boostr.cl/) — Múltiples APIs de uso libre
    - ✅ 🔑 `403` `auth_required` `GET` [`https://api.boostr.cl/vehicle/{patente}.json`](https://api.boostr.cl/vehicle/{patente}.json) — Información del vehículo: marca, modelo, año, motor, transmisión, tipo combustible
    - ✅ `200` `JSON` `GET` [`https://api.boostr.cl/holidays.json`](https://api.boostr.cl/holidays.json) — Todos los días feriados del año actual en Chile
    - ✅ `403` `auth_required` `GET` [`https://api.boostr.cl/sismos.json`](https://api.boostr.cl/sismos.json) — Información sísmológica reciente de Chile. Fuente: sismologia.cl
    - ✅ `403` `auth_required` `GET` [`https://api.boostr.cl/rut/{rut}.json`](https://api.boostr.cl/rut/{rut}.json) — Validación de RUT chileno con dígito verificador

- **Gael Cloud - API Pública Chile** ![Active](https://img.shields.io/badge/6_endpoints-active-brightgreen)
  - 🌐 [https://api.gael.cloud/](https://api.gael.cloud/)
  - 📝 API pública y gratuita con múltiples servicios: monedas (UF, USD, UTM), clima de estaciones meteorológicas, sismos recientes, e indicadores Previred e Impuesto Único. Rate limit: 9 req/10s
  - **Endpoints:**
    - ✅ `200` `JSON` `GET` [`https://api.gael.cloud/general/public/monedas`](https://api.gael.cloud/general/public/monedas) — Valores actuales de cambio nominal (CLP) de UF, USD, UTM y otras monedas. Datos del Banco Central, actualizados cada 30 min
    - ✅ `200` `JSON` `GET` [`https://api.gael.cloud/general/public/monedas/USD`](https://api.gael.cloud/general/public/monedas/USD) — Valor actual de una moneda específica por código (USD, EUR, UF, UTM, etc.)
    - ✅ `200` `JSON` `GET` [`https://api.gael.cloud/general/public/clima`](https://api.gael.cloud/general/public/clima) — Datos climáticos de estaciones meteorológicas a lo largo de Chile. Fuente: Dirección Meteorológica
    - ✅ `200` `JSON` `GET` [`https://api.gael.cloud/general/public/sismos`](https://api.gael.cloud/general/public/sismos) — Últimos sismos registrados en Chile. Fuente: CSN
    - ✅ `200` `JSON` `GET` [`https://api.gael.cloud/general/public/previred/082025`](https://api.gael.cloud/general/public/previred/082025) — Indicadores Previred para cálculo de remuneraciones. Parámetro: periodo en formato MMAAAA (ej: 082025)
    - ✅ `200` `JSON` `GET` [`https://api.gael.cloud/general/public/impunico/082025`](https://api.gael.cloud/general/public/impunico/082025) — Tablas de impuesto único 2da categoría. Parámetro: periodo en formato MMAAAA (ej: 082025)

  [⬆ Volver al índice](#top)

---

## 🤝 Contribuir

Ver [CONTRIBUTING.md](CONTRIBUTING.md) para instrucciones detalladas.

## 📜 Licencia

CC0-1.0 — Ver [LICENSE](LICENSE).
