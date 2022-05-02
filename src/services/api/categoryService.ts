import apiClient from 'services/api/apiService';

export const categoryService = {
  getList(params) {
    return apiClient.request({
      method: 'GET',
      url: 'public/category',
      params,
    });
  },

  getCategoryByID(id) {
    return apiClient.request({
      method: 'GET',
      url: `public/category/${id}`,
    });
  },

  addCategory(data) {
    return apiClient.request({
      method: 'POST',
      url: 'admin/category',
      data,
    });
  },

  updateCategory(id, data) {
    return apiClient.request({
      method: 'PUT',
      url: `admin/category/${id}`,
      data,
    });
  },

  deleteCategory(id) {
    return apiClient.request({
      method: 'DELETE',
      url: `admin/category/${id}`,
    });
  },
};
