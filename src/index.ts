import { getPlaceAutocomplete, Address } from './maps-api'

export async function getAutoCompleteDetails(address: string): Promise<Address[]> {
    if (!address || typeof address !== 'string') {
        throw new Error('Invalid address. Please provide a valid string address.');
    }

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
        console.error('Error fetching autocomplete details:', error);
        throw new Error('Failed to fetch autocomplete details. Please try again later.');
    }
}