const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

let accessToken: string | null = null;

export function setAccessToken(token: string) {
  accessToken = token;
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token);
  }
}

function getAccessToken(): string | null {
  if (accessToken) return accessToken;
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token');
  }
  return null;
}

async function fetchWithRetry(
  endpoint: string,
  options: RequestInit,
  retry = true
): Promise<any> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: 'include',
    headers: {
      ...(options.headers || {}),
      ...(getAccessToken() ? { Authorization: `Bearer ${getAccessToken()}` } : {}),
    },
  });

  if (response.status === 401 && retry) {
    const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    });

    if (refreshRes.ok) {
      const { access_token } = await refreshRes.json();
      setAccessToken(access_token);
      return fetchWithRetry(endpoint, options, false);
    } else {
      localStorage.removeItem('access_token');
      window.location.href = '/login';
      throw new Error('Session expired. Please log in again.');
    }
  }

  if (!response.ok) {
    let message = `HTTP error! status: ${response.status}`;
    try {
      const errorData = await response.json();
      message = errorData.message || message;
    } catch (_) {}
    throw new Error(message);
  }

  return response.json();
}


// async function fetchWithRetry(
//   endpoint: string,
//   options: RequestInit,
//   retry = true
// ): Promise<any> {
//   const response = await fetch(`${API_BASE_URL}${endpoint}`, {
//     ...options,
//     credentials: 'include',
//     headers: {
//       ...(options.headers || {}),
//       ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
//     },
//   });

//   if (response.status === 401 && retry) {
//     const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
//       method: 'POST',
//       credentials: 'include',
//     });

//     if (refreshRes.ok) {
//       const { access_token } = await refreshRes.json();
//       setAccessToken(access_token);

//       return fetchWithRetry(endpoint, options, false);
//     } else {
//       throw new Error('Unauthorized and refresh token failed');
//     }
//   }

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// }

export const apiClient = {
  get(endpoint: string, /*options?:RequestInit*/) {
    return fetchWithRetry(endpoint, { method: 'GET'/*, ...options*/ });
  },

  post(endpoint: string, data: any) {
    return fetchWithRetry(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  put(endpoint: string, data: any) {
    return fetchWithRetry(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  patch(endpoint: string, data: any) {
    return fetchWithRetry(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  delete(endpoint: string) {
    return fetchWithRetry(endpoint, { method: 'DELETE' });
  },
};

export default apiClient;
