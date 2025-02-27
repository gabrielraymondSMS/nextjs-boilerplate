import axios from 'axios'

const BASE_URLS = {
    POKEAPI: process.env.NEXT_PUBLIC_POKEAPI_BASE_URL || '',
    JSONPLACEHOLDER: process.env.NEXT_PUBLIC_JSON_PLACEHOLDER_BASE_URL || '',
};

// Function to create an Axios instance dynamically
export const createAxiosClient = (apiName: keyof typeof BASE_URLS) => {
    console.log('lol', process.env.NEXT_PUBLIC_JSON_PLACEHOLDER_BASE_URL)
    return axios.create({
        baseURL: BASE_URLS[apiName],
        headers: {
            'Content-Type': 'application/json',
        },
    });
};

// Create Instances
export const pokeApiClient = createAxiosClient('POKEAPI');
export const jsonPlaceholderApiClient = createAxiosClient('JSONPLACEHOLDER')
