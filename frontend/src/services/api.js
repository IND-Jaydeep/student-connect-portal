// Centralized API client using fetch
const BASE_URL = '/api';

export const api = {
  async get(endpoint) {
    return fetchWithAuth(endpoint, { method: 'GET' });
  },

  async post(endpoint, body) {
    return fetchWithAuth(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },

  async put(endpoint, body) {
    return fetchWithAuth(endpoint, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  },

  async delete(endpoint) {
    return fetchWithAuth(endpoint, { method: 'DELETE' });
  },
};

async function fetchWithAuth(endpoint, options = {}) {
  const token = localStorage.getItem('jwt_token');
  const headers = {
    ...options.headers,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    let errMsg = errorData.message;
    if (!errMsg && Object.keys(errorData).length > 0) {
      // Handle Spring Validation errors where keys are field names
      errMsg = Object.values(errorData).join(', ');
    }
    throw new Error(errMsg || `Request failed with status ${response.status}`);
  }

  // Not all responses have JSON bodies (e.g. 204 No Content)
  if (response.status === 204) return null;
  
  return response.json().catch(() => null);
}
