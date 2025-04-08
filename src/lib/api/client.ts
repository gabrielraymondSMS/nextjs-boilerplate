import axios from "axios";
import Cookies from "js-cookie";


// Define base URLs from environment variables
// These can be configured in your `.env` file
const BASE_URLS = {
  JSONPLACEHOLDER: process.env.NEXT_PUBLIC_JSON_PLACEHOLDER_BASE_URL || '',
  SONERGY: process.env.NEXT_PUBLIC_SONERGY_BASE_URL || '',
}

// Function to create an Axios instance dynamically based on the selected API name
export const createAxiosClient = (apiName: keyof typeof BASE_URLS) => {
  // Create an Axios instance with a base URL and default headers
  const instance = axios.create({
    baseURL: BASE_URLS[apiName], // Use the selected base URL
    headers: {
      'Content-Type': 'application/json', // Set default content type
    },
  })

  // Add a request interceptor to attach the token to every request
  instance.interceptors.request.use((config) => {
    const token = Cookies.get('token') // Read token from browser cookies
    if (token) {
      // Set the Authorization header with Bearer token
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  return instance // Return the configured instance
}

// Pre-configured API client for JSONPlaceholder API
export const jsonPlaceholderApiClient = createAxiosClient('JSONPLACEHOLDER')

// Pre-configured API client for Sonergy API
export const sonergyApiClient = createAxiosClient('SONERGY')
