export const TOOL_NAMES = {
  GET_COUNTRY: 'getCountry',
  GET_REGIONS: 'getRegions',
  GET_REGION_BY_ID: 'getRegionById',
  GET_DEPARTMENTS_BY_REGION: 'getDepartmentsByRegion',
} as const;

export const TOOL_DESCRIPTIONS = {
  GET_COUNTRY: 'Get information about a country',
  GET_REGIONS: 'Get list of regions in Colombia',
  GET_REGION_BY_ID: 'Get detailed information about a specific region by ID',
  GET_DEPARTMENTS_BY_REGION: 'Get list of departments for a specific region by region ID',
} as const;

export const SERVER_CONFIG = {
  NAME: 'apicolombia',
  VERSION: '1.0.0',
} as const;

export const ERROR_MESSAGES = {
  FETCH_ERROR: 'Error fetching country data',
  UNKNOWN_ERROR: 'Unknown error occurred',
} as const;