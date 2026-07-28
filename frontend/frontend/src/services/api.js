import axios from 'axios';
// 1. Create a configured Axios instance
const apiClient = axios.create({
    // Vite exposes env variables via import.meta.env
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
// 2. Export individual API functions
export const expenseAPI = {
    // GET /expenses/
    getAll: async () => {
        const response = await apiClient.get('/expenses/');
        return response.data;
    },

    // GET /expenses/{id}
    getOne: async (id) => {
        const response = await apiClient.get(`/expenses/${id}`);
        return response.data;
    },

    // POST /expenses/
    create: async (expenseData) => {
        const response = await apiClient.post('/expenses/', expenseData);
        return response.data;
    },

    // PUT /expenses/{id}
    update: async (id, expenseData) => {
        const response = await apiClient.put(`/expenses/${id}`, expenseData);
        return response.data;
    },

    // DELETE /expenses/{id}
    delete: async (id) => {
        const response = await apiClient.delete(`/expenses/${id}`);
        return response.data;
    }
};

export const userAPI = {
    // GET /user/
    getProfile: async () => {
        const response = await apiClient.get('/user/');
        return response.data;
    },
    
    // PUT /user/
    updateProfile: async (userData) => {
        const response = await apiClient.put('/user/', userData);
        return response.data;
    }
};

export default apiClient;