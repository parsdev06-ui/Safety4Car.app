/**
 * API Client for Safety4Car.
 * 
 * Currently returns mock data only.
 * When the NestJS backend is ready, replace mock implementations
 * with actual HTTP calls using the route definitions from ./routes.ts
 * 
 * Architecture note:
 * - Each function signature matches the future API contract
 * - Return types match the expected backend response shapes
 * - Async/await pattern preserved for seamless migration
 */

import { ROUTES, API_BASE_URL } from './routes';

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

/**
 * Base HTTP client - currently a no-op placeholder.
 * Replace with fetch/axios when backend is ready.
 */
async function request<T>(
  _method: 'GET' | 'POST' | 'PUT' | 'DELETE',
  _path: string,
  _body?: unknown,
): Promise<ApiResponse<T>> {
  // TODO: Replace with actual HTTP implementation
  // const url = `${API_BASE_URL}${path}`;
  // const response = await fetch(url, { method, body: JSON.stringify(body), headers: {...} });
  // return response.json();
  throw new Error('API client not connected. Use mock-api.ts for development.');
}

export { request, API_BASE_URL, ROUTES };
export type { ApiResponse };
