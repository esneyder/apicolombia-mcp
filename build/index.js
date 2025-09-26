import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { tools } from "./tools/index.js";
import { SERVER_CONFIG } from "./shared/constants/index.js";
const server = new McpServer({
    name: SERVER_CONFIG.NAME,
    version: SERVER_CONFIG.VERSION,
    capabilities: {
        resources: {},
        tools: {},
    },
});
// Register all tools
tools.forEach(tool => {
    server.tool(tool.name, tool.description, tool.handler);
});
async function main() {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error("ApiColombia MCP Server running on stdio");
}
main().catch((error) => {
    console.error("Fatal error in main():", error);
    process.exit(1);
});
