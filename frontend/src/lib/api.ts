const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const API_ENDPOINTS = {
    login: `${API_BASE_URL}/users/login/`,
    register: `${API_BASE_URL}/users/register/`,
    me: `${API_BASE_URL}/users/me/`,
    changePassword: `${API_BASE_URL}/users/change-password/`,
    passwordReset: `${API_BASE_URL}/users/password-reset/`,
    product: `${API_BASE_URL}/products/`,
    productDetail: (slug: string) => `${API_BASE_URL}/products/${slug}/`,
    category: `${API_BASE_URL}/products/categories/`,
};

export default API_BASE_URL;