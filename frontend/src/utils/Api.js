const BASE_URL = "http://api-example.com";

const Api = {
  fetch: async (endpoint, options = {}) => {
    const res = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!res.ok) throw new Error('API error');
    return res.json();
  }
};

export default Api;