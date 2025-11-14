# Uni Proyect Convergencia

Servidor MCP (Model Context Protocol) que proporciona acceso a datos de criptomonedas a través de la API de CoinMarketCap.

## 📋 Descripción

Este proyecto implementa un servidor MCP que expone recursos y herramientas para obtener información sobre criptomonedas, incluyendo listados, cotizaciones y mapas de intercambios desde CoinMarketCap.

## 🚀 Características

- **Recursos MCP**:
  - Listados de criptomonedas más recientes
  - Cotizaciones de criptomonedas (por slug o símbolo)
  - Mapa de intercambios

- **Herramientas MCP**:
  - `get_currency_listings`: Obtiene los listados más recientes de criptomonedas
  - `get_quotes`: Obtiene cotizaciones de una criptomoneda específica
  - `get_exchange_map`: Obtiene el mapa de intercambios

## 📦 Requisitos Previos

- Node.js 22.12 o superior
- npm o yarn
- API Key de CoinMarketCap

## 🔧 Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd uni-proyect-convergencia
```

2. Instala las dependencias:
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto:
```env
API_KEY_COIN=tu_api_key_aqui
API_URL_COIN=https://pro-api.coinmarketcap.com
```

## ⚙️ Configuración

El proyecto requiere las siguientes variables de entorno:

- `API_KEY_COIN`: Tu API key de CoinMarketCap (obligatorio)
- `API_URL_COIN`: URL base de la API de CoinMarketCap (por defecto: `https://pro-api.coinmarketcap.com`)

## 🏃 Uso

### Desarrollo

Para ejecutar el servidor en modo desarrollo:

```bash
npm run dev
```

### Producción

1. Compila el proyecto:
```bash
npm run build
```

2. Ejecuta el servidor:
```bash
npm start
```

### Docker

El proyecto incluye un `Dockerfile` para ejecutarlo en un contenedor:

```bash
docker build -t uni-proyect-convergencia .
docker run -e API_KEY_COIN=tu_api_key_aqui uni-proyect-convergencia
```

## 📁 Estructura del Proyecto

```
uni-proyect-convergencia/
├── main.ts              # Archivo principal del servidor MCP
├── package.json         # Dependencias y scripts
├── tsconfig.json        # Configuración de TypeScript
├── Dockerfile           # Configuración de Docker
├── .gitignore          # Archivos ignorados por git
└── README.md           # Este archivo
```

## 🔌 Recursos y Herramientas

### Recursos

- `coinmarket://cryptocurrency/listings` - Listados de criptomonedas
- `coinmarket://cryptocurrency/quotes?slug={slug}&symbol={symbol}` - Cotizaciones dinámicas
- `coinmarket://cryptocurrency/exchange/assets` - Mapa de intercambios

### Herramientas

- `get_currency_listings()` - Obtiene los últimos 5 listados de criptomonedas
- `get_quotes(slug, symbol?)` - Obtiene cotizaciones de una criptomoneda
- `get_exchange_map()` - Obtiene el mapa de intercambios

## 🛠️ Tecnologías Utilizadas

- **TypeScript** - Lenguaje de programación
- **@modelcontextprotocol/sdk** - SDK para servidores MCP
- **Axios** - Cliente HTTP
- **Zod** - Validación de esquemas
- **dotenv** - Gestión de variables de entorno

## 📝 Scripts Disponibles

- `npm run dev` - Ejecuta el servidor en modo desarrollo
- `npm run build` - Compila TypeScript a JavaScript
- `npm start` - Ejecuta el servidor compilado
- `npm test` - Ejecuta las pruebas (pendiente de implementar)

## 🔒 Seguridad

- **Nunca** commitees tu archivo `.env` o tu API key al repositorio
- El archivo `.env` está incluido en `.gitignore` por defecto
- Asegúrate de mantener tu API key segura y no compartirla públicamente

## 📄 Licencia

ISC

## 👤 Autor

Jhoiner Martinez

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor, abre un issue o un pull request para cualquier mejora.

