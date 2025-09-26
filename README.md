# ApiColombiaMCP

A Model Context Protocol (MCP) server that provides information about Colombia through the API Colombia service.

## 🏗️ Architecture Overview

This project follows **Clean Architecture** principles with a modular, scalable structure designed for maintainability and extensibility.

### 📁 Project Structure

```
ApiColombiaMCP/
├── src/
│   ├── index.ts                 # Main server entry point
│   ├── services/                # Business logic layer
│   │   └── country.services.ts  # Country data operations
│   ├── tools/                   # Tool definitions layer
│   │   └── index.ts            # MCP tool configurations
│   └── shared/                  # Shared utilities layer
│       ├── constants/           # Centralized constants
│       │   └── index.ts       # Tool names, descriptions, config
│       ├── types/              # Type definitions
│       │   └── response.mcp.ts # MCP response types
│       └── index.ts           # Shared exports
├── .env                         # Environment variables
├── package.json                 # Dependencies and scripts
└── tsconfig.json               # TypeScript configuration
```

## 🎯 Architecture Layers

### 1. **Presentation Layer** (`index.ts`)
- **Responsibility**: Server initialization and tool registration
- **Key Features**:
  - Uses constants for configuration
  - Dynamic tool registration from centralized configuration
  - Clean separation from business logic

### 2. **Tools Layer** (`tools/`)
- **Responsibility**: MCP tool definitions and configurations
- **Key Features**:
  - Centralized tool configuration
  - Interface-based tool definitions
  - Easy extension for new tools
  - Type-safe tool registration

### 3. **Business Logic Layer** (`services/`)
- **Responsibility**: Core business operations
- **Key Features**:
  - External API integration
  - Data transformation and formatting
  - Error handling and validation
  - Environment-based configuration

### 4. **Shared Layer** (`shared/`)
- **Responsibility**: Cross-cutting concerns and utilities
- **Key Features**:
  - Centralized constants and configuration
  - Shared type definitions
  - Error message standardization
  - Reusable utilities

## 🔧 Key Components

### Constants (`shared/constants/index.ts`)
```typescript
export const TOOL_NAMES = {
  GET_COUNTRY: 'getCountry',
} as const;

export const TOOL_DESCRIPTIONS = {
  GET_COUNTRY: 'Get information about a country',
} as const;
```

### Tool Configuration (`tools/index.ts`)
```typescript
export interface ToolConfig {
  name: string;
  description: string;
  handler: () => Promise<ApiColombiaResponse>;
}

export const tools: ToolConfig[] = [
  {
    name: TOOL_NAMES.GET_COUNTRY,
    description: TOOL_DESCRIPTIONS.GET_COUNTRY,
    handler: getCountry,
  },
];
```

### Service Implementation (`services/country.services.ts`)
- Fetches data from API Colombia
- Formats response for MCP compatibility
- Handles errors gracefully
- Uses environment variables for configuration

## 🚀 Adding New Tools

To add a new tool, follow these steps:

1. **Add constants** in `shared/constants/index.ts`:
```typescript
export const TOOL_NAMES = {
  GET_COUNTRY: 'getCountry',
  NEW_TOOL: 'newTool', // Add your new tool name
} as const;
```

2. **Create service** in `services/` directory:
```typescript
// services/new-tool.service.ts
export async function newToolService(): Promise<ApiColombiaResponse> {
  // Your implementation
}
```

3. **Add tool configuration** in `tools/index.ts`:
```typescript
export const tools: ToolConfig[] = [
  {
    name: TOOL_NAMES.GET_COUNTRY,
    description: TOOL_DESCRIPTIONS.GET_COUNTRY,
    handler: getCountry,
  },
  {
    name: TOOL_NAMES.NEW_TOOL,
    description: TOOL_DESCRIPTIONS.NEW_TOOL,
    handler: newToolService,
  },
];
```

## 🔒 Environment Configuration

The project uses environment variables for configuration:

```bash
# .env
API_COLOMBIA_URL=https://api-colombia.com/api/
```

The service gracefully falls back to default URLs if environment variables are not set.

## 🧪 Development

### Prerequisites
- Node.js (v16.9+ or v14.19+)
- pnpm (package manager)

### Package Manager Setup

This project uses **pnpm** as the package manager. If you encounter package manager conflicts:

1. **Enable Corepack** (included with Node.js 16.9+):
```bash
corepack enable
```

2. **Install pnpm** (if not available):
```bash
npm install -g pnpm
```

3. **Verify pnpm version**:
```bash
pnpm --version
```

### Installation
```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Run the MCP server
node build/index.js
```

### Troubleshooting Package Manager Issues

If you see package manager errors:
- Ensure Corepack is enabled: `corepack enable`
- Clear npm cache: `npm cache clean --force`
- Use pnpm directly instead of npm/yarn
- Check that `.npmrc` file exists in the project root

## 📋 Features

- **Country Information**: Get comprehensive data about Colombia
- **Clean Architecture**: Modular, testable, and maintainable code
- **Type Safety**: Full TypeScript support
- **Error Handling**: Graceful error management
- **Environment Configuration**: Flexible configuration management
- **Scalable Design**: Easy to extend with new tools

## 🔧 Technologies Used

- **TypeScript**: Type-safe JavaScript
- **MCP SDK**: Model Context Protocol server development
- **Zod**: Schema validation
- **Node.js**: Runtime environment

## 🎯 Benefits of This Architecture

- **🔄 Scalability**: Easy to add new tools and features
- **📝 Maintainability**: Clear separation of concerns
- **🧪 Testability**: Each layer can be tested independently
- **📋 Type Safety**: Full TypeScript coverage
- **🚀 Consistency**: Centralized configuration and constants
- **🔧 Flexibility**: Environment-based configuration
- **📖 Readability**: Clean, well-organized code structure

This architecture ensures your MCP server is ready for production use and can grow with your needs!