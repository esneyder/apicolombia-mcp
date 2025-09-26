import { ApiColombiaResponse } from "../shared/types/response.mcp.js";
import { ERROR_MESSAGES } from "../shared/constants/index.js";

interface CountryData {
    id: number;
    name: string;
    description: string;
    stateCapital: string;
    surface: number;
    population: number;
    languages: string[];
    timeZone: string;
    currency: string;
    currencyCode: string;
    currencySymbol: string;
    isoCode: string;
    internetDomain: string;
    phonePrefix: string;
    radioPrefix: string;
    aircraftPrefix: string;
    subRegion: string;
    region: string;
    borders: string[];
    flags: string[];
}

/**
 * Fetches and formats general information about Colombia from the API Colombia endpoint.
 * @returns {Promise<ApiColombiaResponse>} A formatted text response containing country details
 *                                       or an error message if the request fails.
 */
export async function getCountry(): Promise<ApiColombiaResponse> {
    try {
        const apiUrl = process.env.API_COLOMBIA_URL || 'https://api-colombia.com/api/';
        const response = await fetch(`${apiUrl}v1/Country/Colombia`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const countryData: CountryData = await response.json(); 
        
        const countryInfo = `
Country: ${countryData.name}
Capital: ${countryData.stateCapital}
Population: ${countryData.population.toLocaleString()}
Area: ${countryData.surface.toLocaleString()} km²
Region: ${countryData.region} - ${countryData.subRegion}
Languages: ${countryData.languages.join(', ')}
Currency: ${countryData.currency} (${countryData.currencyCode} ${countryData.currencySymbol})
Time Zone: ${countryData.timeZone}
ISO Code: ${countryData.isoCode}
Internet Domain: ${countryData.internetDomain}
Phone Prefix: ${countryData.phonePrefix}
Borders: ${countryData.borders.join(', ')}

Description:
${countryData.description}

Flag URLs:
${countryData.flags.join('\n')}
        `.trim();
        
        return {
            content: [{
                type: 'text',
                text: countryInfo
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
 




