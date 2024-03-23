import axios from 'axios';

export interface Address {
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

export interface SearchAddressResults {
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

// Validate and sanitize input parameters
export async function getPlaceAutocomplete(key: string, address: string): Promise<SearchAddressResults[]> {
    if (!key || !address) {
        throw new Error('Invalid parameters provided.');
    }

    try {
        const autocomplete = await axios.get(`https://api.tomtom.com/search/2/search/${address}.json`, {
            params: {
                key,
                limit: 100,
                countrySet: "AU",
            }
        });
        return autocomplete.data.results.map((result: SearchAddressResults) => ({
            ...result
        }));
    } catch (error) {
        console.error('Error fetching place autocomplete:', error);
        throw new Error('Failed to fetch place autocomplete. Please try again later.');
    }
}