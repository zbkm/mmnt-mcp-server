#!/usr/bin/env node

import {McpServer} from "@modelcontextprotocol/sdk/server/mcp.js";
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {searchMamont} from "./mmnt/search.ts";
import {extractCache} from "./mmnt/cache.ts";
import {CacheParams, SearchParams} from "./types.ts";

const server = new McpServer({
    name: "Mamont search engine",
    version: "1.0.0"
});


server.tool(
    "mmnt_search",
    "Search in Mamont search engine",
    SearchParams,
    async ({query, page}) => ({
        content: [{
            type: "text",
            text: JSON.stringify(await searchMamont(query, page))
        }]
    })
);

server.tool(
    "mmnt_cache",
    "Extract page from Mamont cache",
    CacheParams,
    async ({id, onlyText}) => ({
        content: [{
            type: "text",
            text: JSON.stringify(await extractCache(id, onlyText))
        }]
    })
);


const transport = new StdioServerTransport();
await server.connect(transport);