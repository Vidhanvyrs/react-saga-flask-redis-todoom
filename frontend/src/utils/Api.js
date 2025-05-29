const BASE_URL = "http://127.0.0.1:5000";

const Api = {
  fetch: async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const headers = {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      'Content-Type': 'application/json',
    };
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
    if (!res.ok) throw new Error('API error');
    return res.json();
  }
};

export default Api;