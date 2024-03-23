import { getAutoCompleteDetails } from './maps/maps-api';
import { Logger } from './services/logger';
import dotenv from 'dotenv';

dotenv.config();

const logger = new Logger();

async function main() {
    try {
        const addressDetails = await getAutoCompleteDetails('Some address');
        logger.log(`Address details: ${JSON.stringify(addressDetails)}`);
    } catch (error) {
        logger.error('Error fetching address details', error);
    }
}

main();