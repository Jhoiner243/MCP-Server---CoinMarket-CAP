import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { Variables } from "@modelcontextprotocol/sdk/shared/uriTemplate.js";
import axios from "axios";
import "dotenv/config";
import z from "zod";

const {
  API_KEY_COIN,
  API_URL_COIN,
} = process.env

if (!API_KEY_COIN) {
  throw new Error("Missing COINMARKET_API_KEY environment variable");
}

interface Types {
  type: {
    slug: string;
    symbol?: string;
  }
}

//  Obtener listado de criptomonedas
async function getCurrencyListings(): Promise<Record<string, any>> {
  const url = `${API_URL_COIN as string}/v1/cryptocurrency/listings/latest`;
  const params = { start: "1", limit: "5", convert: "USD" };
  const headers = { Accepts: "application/json", "X-CMC_PRO_API_KEY": API_KEY_COIN };

  const response = await axios.get(url, { headers, params });
  return response.data;
}

async function getExchageMap(): Promise<Record<string, any>> {
  const url = `${API_URL_COIN}/v1/exchange/assets` as string; 
  const params: any = { convert: "USD" };

  const headers = { Accepts: "application/json", "X-CMC_PRO_API_KEY": API_KEY_COIN };
  const response = await axios.get(url, { headers, params });
  return response.data;

}

async function getQuotes(slug: string, symbol?: string): Promise<Record<string, any>> {
  const url = `${API_URL_COIN}/v1/cryptocurrency/quotes/latest` as string; 
  const params: any = { convert: "USD" };
  if (slug) params.slug = slug;
  if (symbol) params.symbol = symbol;

  const headers = { Accepts: "application/json", "X-CMC_PRO_API_KEY": API_KEY_COIN };
  const response = await axios.get(url, { headers, params });
  return response.data;
}

const server = new McpServer({
  name: "coinmarket_service",
  version: "0.1.0",
});

server.registerResource("coinmarket_listings", "coinmarket://cryptocurrency/listings", {
  name: "Latest cryptocurrency listings",
  description: "Cryptocurrency listings",
  mimeType: "application/json",
}, 
async () => {
  const data = await getCurrencyListings();

  return {
    contents: [
      {
        uri: "coinmarket://cryptocurrency/listings",
        text: JSON.stringify(data, null, 2),
        mimeType: "application/json",
      },
    ],
  };
});

server.registerResource(
  "quotes",
  new ResourceTemplate(`coinmarket://cryptocurrency/quotes?slug={slug}&symbol={symbol}`, {list: undefined}),
  {
    name: "Cryptocurrency quotes",
    description: "Dynamic quotes resource",
    mimeType: "application/json",
  },
  async (uri: URL, variables: Variables) => {
    const { slug, symbol } = variables;
    const data = await getQuotes(slug as string, symbol as string);
    return {
      contents: [
        {
          uri: uri.toString(),
          text: JSON.stringify(data, null, 2),
          mimeType: "application/json",
        },
      ],
    };
  }
);

server.registerResource('exchange_map', 'coinmarket://cryptocurrency/exchange/assets', 
  {
    name: 'Exchange map',
    description: 'Exchange map',
    mimeType: 'application/json'
  },
  async () => {
    const data = await getExchageMap();
    return {
      contents: [
        {
          uri: 'coinmarket://cryptocurrency/exchange/assets',
          text: JSON.stringify(data, null, 2),
          mimeType: 'application/json',
        },
      ],
    };
  }
)

server.registerTool('get_exchange_map', {
  description: 'Get exchange map',
  title: 'Get exchange map',
  inputSchema: {

  }
},
 async () => {
  const data = await getExchageMap();
  return { content: [{ type: 'text', text: JSON.stringify(data, null, 2) }] };
 }
)

server.registerTool(
  "get_currency_listings",
  {
    description: "Get latest cryptocurrency listings",
    inputSchema: {},
    
  },
  async () => {
    const data = await getCurrencyListings();
    return { content: [{ type: "text", text: JSON.stringify(data, null, 2) }] };
  },
);

server.registerTool("get_quotes", {
  description: "Get cryptocurrency quotes",
  inputSchema: {
    type: z.object({
      slug: z.string(),
      symbol: z.string().optional(),
    }),
  },
},
async (params: Types) => {
  const slug = params.type.slug;
  const symbol = params.type.symbol;
  const data = await getQuotes(slug, symbol ? symbol : undefined);
  return {content: [{ type: "text", text: JSON.stringify(data, null, 2) }]};
},
);


  const transport = new StdioServerTransport();
  await server.connect(transport);


