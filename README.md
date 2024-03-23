Scenario:
=========

A developer on our team was working on integrating the TomTom API. They did a great job laying the groundwork, but they've recently been promoted to a new project that requires their full attention.

We are pretty confident the developer managed to complete the majority of the initial part of the integration, however there might be a bug or two to be discovered.

Your task is to finish off this implementation, ensuring the requirements are met with passing tests.


Task:
=====
To take a partial address input and return full address suggestions along with the address broken into its individual components using the TomTom API.


Resources:
==========

Place Search Documentation: https://developer.tomtom.com/search-api/documentation/search-service/search-service
API Key: Oyb0npJAVdRwDauqpFez7zKCy2euUYql

Install:
========
1. yarn install

Test:
=====
1. yarn install
2. yarn test


Requirements:
=============

1. All tests should pass and ensure good coverage for new work
2. We only allow Australian addresses to be returned
3. Code should be maintainable and consistent
4. The result elements should contain important information about the place (country, municipality, etc)
5. The returned result should be typed and easily consumable via users of the library
6. No front-end requirements are necessary, this is purely a backend NodeJS library

Changes:
========
1. **Environment Variable Handling**:
   - Introduced `dotenv` package to load environment variables from a `.env` file.
   - Used `dotenv` to load the TomTom API key from the environment.

2. **HTTP Client Implementation**:
   - Created a custom `HttpClient` class for making HTTP requests.
   - Modified the `HttpClient` class to properly handle query parameters in the URL.

3. **Modularisation**:
   - Organised code into separate files and folders based on functionality (`services/` AND `maps/` folder).
   - Created separate files for `address-details`, `http-client`, `logger`, and `maps-api` modules.
   - Aggregated and re-exported all services from the `services/index.ts` and `maps/index.ts` file.

4. **Error Handling**:
   - Enhanced error handling by properly catching and logging errors.
   - Added error handling for failed API requests.

5. **Code Structure**:
   - Refactored code structure to improve readability and maintainability.
   - Used TypeScript interfaces (`AddressDetails`) to define data structures.

6. **Dependency Injection**:
   - Utilized dependency injection to inject the `HttpClient` instance into the `getPlaceAutocomplete` function.

7. **Logging**:
   - Incorporated a `Logger` class for logging error and info messages.

8. **API Request Modification**:
   - Adjusted API request construction to properly handle query parameters.

9. **Parameter Validation**:
   - Added validation and sanitization to ensure the parameters being passed to the getPlaceAutocomplete() function are correct.
   - Implemented parameter validation to check the type and presence of the address parameter.
   - Ensured that the address parameter is a non-empty string before making the API request.

Improvements:
=============
- Introduce a config mechanism to store base URLs for different APIs. For example, a configuration file (`config.ts`) containing attributes for each API such as mapsBaseUrl, weatherBaseUrl, etc.

- Could introduce caching mechanisms to cache API responses and reduce the number of requests made to external APIs. Can improve performance, reduce latency.

- Include documentation for the project. 