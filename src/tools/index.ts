import { getCountry } from "../services/country.services.js";
import { getRegions, getRegionById } from "../services/regions.services.js";
import { getDepartmentsByRegion } from "../services/departments.services.js";
import { TOOL_NAMES, TOOL_DESCRIPTIONS } from "../shared/constants/index.js";
import { ApiColombiaResponse } from "../shared/types/response.mcp.js";

export interface ToolConfig {
  name: string;
  description: string;
  handler: (...args: any[]) => Promise<ApiColombiaResponse>;
}

export const tools: ToolConfig[] = [
  {
    name: TOOL_NAMES.GET_COUNTRY,
    description: TOOL_DESCRIPTIONS.GET_COUNTRY,
    handler: getCountry,
  },
  {
    name: TOOL_NAMES.GET_REGIONS,
    description: TOOL_DESCRIPTIONS.GET_REGIONS,
    handler: getRegions,
  },
  {
    name: TOOL_NAMES.GET_REGION_BY_ID,
    description: TOOL_DESCRIPTIONS.GET_REGION_BY_ID,
    handler: getRegionById,
  },
  {
    name: TOOL_NAMES.GET_DEPARTMENTS_BY_REGION,
    description: TOOL_DESCRIPTIONS.GET_DEPARTMENTS_BY_REGION,
    handler: getDepartmentsByRegion,
  },
];