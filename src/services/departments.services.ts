import { ApiColombiaResponse } from "../shared/types/response.mcp.js";
import { ERROR_MESSAGES } from "../shared/constants/index.js";

interface DepartmentData {
    id: number;
    name: string;
    description: string;
    cityCapitalId: number;
    municipalities: number;
    surface: number;
    population: number;
    phonePrefix: string;
    countryId: number;
    cityCapital: any;
    country: any;
    cities: any;
    regionId: number;
    region: {
        id: number;
        name: string;
        description: string;
        departments: any;
    };
    naturalAreas: any;
    maps: any;
    indigenousReservations: any;
    airports: any;
}

export async function getDepartmentsByRegion(regionId: string): Promise<ApiColombiaResponse> {
    try {
        const apiUrl = process.env.API_COLOMBIA_URL || 'https://api-colombia.com/api/';
        const response = await fetch(`${apiUrl}v1/Region/${regionId}/departments`);
        
        if (!response.ok) {
            if (response.status === 404) {
                return {
                    content: [{
                        type: 'text',
                        text: `❌ No se encontraron departamentos para la región con ID: ${regionId}`
                    }]
                };
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const departmentsData: DepartmentData[] = await response.json();
        
        if (departmentsData.length === 0) {
            return {
                content: [{
                    type: 'text',
                    text: `📍 No hay departamentos registrados para la región con ID: ${regionId}`
                }]
            };
        }
        
        // Format the departments data into a readable text format
        const departmentsInfo = departmentsData.map(dept => `
🏛️ DEPARTAMENTO: ${dept.name}
📍 ID: ${dept.id}
📝 Descripción: ${dept.description}
🏙️ Capital: ID ${dept.cityCapitalId}
🏘️ Municipios: ${dept.municipalities}
📏 Superficie: ${dept.surface.toLocaleString()} km²
👥 Población: ${dept.population.toLocaleString()} habitantes
📞 Prefijo telefónico: ${dept.phonePrefix}
🌎 Región: ${dept.region.name} (ID: ${dept.regionId})
${'─'.repeat(80)}
        `).join('\n');
        
        const headerInfo = `
🇨🇴 DEPARTAMENTOS DE LA REGIÓN ${departmentsData[0]?.region?.name?.toUpperCase() || 'DESCONOCIDA'}
Total de departamentos: ${departmentsData.length}
${'═'.repeat(80)}
        `;
        
        return {
            content: [{
                type: 'text',
                text: (headerInfo + departmentsInfo).trim()
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

export async function getAllDepartments(): Promise<ApiColombiaResponse> {
    try {
        const apiUrl = process.env.API_COLOMBIA_URL || 'https://api-colombia.com/api/';
        const response = await fetch(`${apiUrl}v1/Department`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const departmentsData: DepartmentData[] = await response.json();
        
        // Format the departments data into a readable text format
        const departmentsInfo = departmentsData.map(dept => `
🏛️ DEPARTAMENTO: ${dept.name}
📍 ID: ${dept.id}
📝 Descripción: ${dept.description}
🏙️ Capital: ID ${dept.cityCapitalId}
🏘️ Municipios: ${dept.municipalities}
📏 Superficie: ${dept.surface.toLocaleString()} km²
👥 Población: ${dept.population.toLocaleString()} habitantes
📞 Prefijo telefónico: ${dept.phonePrefix}
🌎 Región: ${dept.region?.name || 'No especificada'} (ID: ${dept.regionId})
${'─'.repeat(80)}
        `).join('\n');
        
        const headerInfo = `
🇨🇴 TODOS LOS DEPARTAMENTOS DE COLOMBIA
Total de departamentos: ${departmentsData.length}
${'═'.repeat(80)}
        `;
        
        return {
            content: [{
                type: 'text',
                text: (headerInfo + departmentsInfo).trim()
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

export async function getDepartmentById(departmentId: string): Promise<ApiColombiaResponse> {
    try {
        const apiUrl = process.env.API_COLOMBIA_URL || 'https://api-colombia.com/api/';
        const response = await fetch(`${apiUrl}v1/Department/${departmentId}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                return {
                    content: [{
                        type: 'text',
                        text: `❌ No se encontró un departamento con el ID: ${departmentId}`
                    }]
                };
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const departmentData: DepartmentData = await response.json();
        
        // Format the department data into a readable text format
        const departmentInfo = `
🇨🇴 DETALLE DEL DEPARTAMENTO
${'═'.repeat(80)}

🏛️ DEPARTAMENTO: ${departmentData.name}
📍 ID: ${departmentData.id}
📝 Descripción: ${departmentData.description}
🏙️ Capital: ID ${departmentData.cityCapitalId}
🏘️ Municipios: ${departmentData.municipalities}
📏 Superficie: ${departmentData.surface.toLocaleString()} km²
👥 Población: ${departmentData.population.toLocaleString()} habitantes
📞 Prefijo telefónico: ${departmentData.phonePrefix}
🌎 Región: ${departmentData.region?.name || 'No especificada'} (ID: ${departmentData.regionId})

${'═'.repeat(80)}
        `;
        
        return {
            content: [{
                type: 'text',
                text: departmentInfo.trim()
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