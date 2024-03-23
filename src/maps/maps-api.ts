import { HttpClient } from '../services/http-client'
import { Logger } from '../services/logger';

const logger = new Logger();
const httpClient = new HttpClient();

interface Address {
    streetNumber?: string,
    country: string,
    countryCode: string,
    countryCodeISO3: string,
    countrySecondarySubdivision: string,
    countrySubdivision: string,
    countrySubdivisionCode: string,
    countrySubdivisionName: string,
    freeformAddress: string,
    localName: string,
    municipality: string,
    postalCode: string,
    streetName: string,
    id: string,
}

interface SearchAddressResults {
    address: Address,
    entryPoints: object[],
    id: string,
    info: string,
    poi: object,
    position: object,
    score: string,
    type: string,
    viewport: object,
}

export async function getPlaceAutocomplete(key: string, address: string): Promise<SearchAddressResults[]> {
    if (!key || !address) {
        throw new Error('Invalid parameters provided.');
    }

    try {
        const autocomplete = await httpClient.get(`https://api.tomtom.com/search/2/search/${address}.json`, {
            key,
            limit: 100,
            countrySet: "AU",
        });
        return autocomplete.data.results.map((result: SearchAddressResults) => ({
            ...result
        }));
    } catch (error) {
        logger.error('Error fetching place autocomplete:', error);
        throw new Error('Failed to fetch place autocomplete. Please try again later.');
    }
}

export async function getAutoCompleteDetails(address: string): Promise<Address[]> {
    try {
        const apiKey = process.env.TOMTOM_API_KEY ?? '';
        const autocompleteResults = await getPlaceAutocomplete(apiKey, address);
        const detailedAddresses: Address[] = await Promise.all(autocompleteResults.map(async (result) => {
            return {
                ...result.address,
                id: result.id
            };
        }));
        return detailedAddresses;
    } catch (error) {
        logger.error('Error fetching autocomplete details:', error);
        throw new Error('Failed to fetch autocomplete details. Please try again later.');
    }
}