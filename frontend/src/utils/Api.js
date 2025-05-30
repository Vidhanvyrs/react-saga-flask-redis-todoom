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
    if (!res.ok){
      let errorMsg = 'API error';
      try {
        const data = await res.json();
        errorMsg = data.message || errorMsg;
      } catch (e) {
        console.error('Error parsing error response:', e);
      }
        throw new Error(errorMsg);        
    }
    return res.json();
  }
};

export default Api;