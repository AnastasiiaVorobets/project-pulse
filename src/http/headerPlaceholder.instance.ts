// @ts-nocheck
import axios from "axios";
import { isPreProd } from "../utils/constants";

// Create a new AbortController instance
const abortController = new AbortController();

/**
 * Base URL for the API requests. Depending on the environment, it's set to the pre-production server
 * or the value defined in the VITE_API_BASE_URL environment variable.
 */
export const baseURL = isPreProd
  ? 'https://sipple-preprod-server-b41ee0fc0bfd.herokuapp.com/api/v1'
  : import.meta.env.VITE_API_BASE_URL as string;

/**
 * Create an Axios instance for making GET requests.
 */

export const apiGet = axios.create({ baseURL, signal: abortController.signal });

/**
 * Create an Axios instance for making POST requests.
 */
export const apiPost = axios.create({ baseURL, signal: abortController.signal });

/**
 * Create an Axios instance for making DELETE requests.
 */
export const apiDelete = axios.create({ baseURL, signal: abortController.signal });

/**
 * Create an Axios instance for making PUT requests.
 */
export const apiPut = axios.create({ baseURL, signal: abortController.signal });

// Interceptors for adding authorization headers with tokens from localStorage

/**
 * Interceptor for the apiGet instance to include the authorization header with a token.
 */

apiGet.interceptors.request.use((config) => {
  config.method = "get";
  const token = localStorage.getItem("accessToken");
  if (token)
    config.headers = {
      Authorization: "Bearer " + token,
    };
  return config;
});

/**
 * Interceptor for the apiPost instance to include the authorization header with a token.
 */

apiPost.interceptors.request.use((config) => {
  config.method = "post";
  const token = localStorage.getItem("accessToken");
  if (token)
    config.headers = {
      Authorization: "Bearer " + token,
    };
  return config;
});

/**
 * Interceptor for the apiDelete instance to include the authorization header with a token.
 */

apiDelete.interceptors.request.use((config) => {
  config.method = "delete";
  const token = localStorage.getItem("accessToken");
  if (token)
    config.headers = {
      Authorization: "Bearer " + token,
    };
  return config;
});

/**
 * Interceptor for the apiPut instance to include the authorization header with a token.
 */

apiPut.interceptors.request.use((config) => {
  config.method = "put";
  const token = localStorage.getItem("accessToken");
  if (token)
    config.headers = {
      Authorization: "Bearer " + token,
    };
  return config;
});
