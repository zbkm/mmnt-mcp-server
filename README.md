[![MseeP.ai Security Assessment Badge](https://mseep.net/pr/zbkm-mmnt-mcp-server-badge.png)](https://mseep.ai/app/zbkm-mmnt-mcp-server)

# mmnt-mcp-server
MCP server for the [Mamont](https://www.mmnt.ru/) search engine.

### Tools:
- mmnt_search
    * search query on search engine
    * inputs
        * query - query string
        * page - page number
- mmnt_cache
    * retrieve page from search page cache
    * inputs
        * id - unique cache id
        * onlyText - should the result be text only (no html)

### Install
```json
{
  "mcpServers": {
    "mmnt": {
      "command": "npx",
      "args": ["-y", "mmnt-mcp-server"]
    }
  }
}
```
