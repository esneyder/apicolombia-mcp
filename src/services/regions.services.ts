import { ApiColombiaResponse } from "../shared/types/response.mcp.js";
import { ERROR_MESSAGES } from "../shared/constants/index.js";

interface RegionData {
    id: number;
    name: string;
    description: string;
    departments: string[] | null;
}

export async function getRegions(): Promise<ApiColombiaResponse> {
    try {
        const apiUrl = process.env.API_COLOMBIA_URL || 'https://api-colombia.com/api/';
        const response = await fetch(`${apiUrl}v1/Region`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const regionsData: RegionData[] = await response.json();
        
        // Format the regions data into a readable text format
        const regionsInfo = regionsData.map(region => `
🌎 REGIÓN: ${region.name}
📍 ID: ${region.id}
📝 Descripción: ${region.description}
${region.departments ? `🏛️ Departamentos: ${region.departments.join(', ')}` : '🏛️ Departamentos: No especificados'}
${'─'.repeat(80)}
        `).join('\n');
        
        const headerInfo = `
🇨🇴 REGIONES DE COLOMBIA
Total de regiones: ${regionsData.length}
${'═'.repeat(80)}
        `;
        
        return {
            content: [{
                type: 'text',
                text: (headerInfo + regionsInfo).trim()
            }]
        };
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
        return {
            content: [{
                type: 'text',
                text: `${ERROR_MESSAGES.FETCH_ERROR}: ${errorMessage}`
            }]
        };
    }
}


export async function getRegionById(regionId: string): Promise<ApiColombiaResponse> {
    try {
        const apiUrl = process.env.API_COLOMBIA_URL || 'https://api-colombia.com/api/';
        const response = await fetch(`${apiUrl}v1/Region/${regionId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                return {
                    content: [{
                        type: 'text',
                        text: `❌ No se encontró una región con el ID: ${regionId}`
                    }]
                };
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const regionData: RegionData = await response.json();
        
        // Format the region data into a readable text format
        const regionInfo = `
🇨🇴 DETALLE DE LA REGIÓN
${'═'.repeat(80)}

🌎 REGIÓN: ${regionData.name}
📍 ID: ${regionData.id}
📝 Descripción: ${regionData.description}
${regionData.departments ? `🏛️ Departamentos: ${regionData.departments.join(', ')}` : '🏛️ Departamentos: No especificados'}

${'═'.repeat(80)}
        `;
        
        return {
            content: [{
                type: 'text',
                text: regionInfo.trim()
            }]
        };
        
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : ERROR_MESSAGES.UNKNOWN_ERROR;
        return {
            content: [{
                type: 'text',
                text: `${ERROR_MESSAGES.FETCH_ERROR}: ${errorMessage}`
            }]
        };
    }
}