import apiClient from 'services/api/apiService';

export const productService = {
  getList(params) {
    return apiClient.request({
      method: 'GET',
      url: 'public/product',
      params,
    });
  },

  getProductByID(id) {
    return apiClient.request({
      method: 'GET',
      url: `public/product/${id}`,
    });
  },

  addProduct(data) {
    return apiClient.request({
      method: 'POST',
      url: 'admin/product',
      data,
    });
  },

  updateProduct(id, data) {
    return apiClient.request({
      method: 'PUT',
      url: `admin/product/${id}`,
      data,
    });
  },

  deleteProduct(id) {
    return apiClient.request({
      method: 'DELETE',
      url: `admin/product/${id}`,
    });
  },

  upLoadImage(data) {
    return apiClient.request({
      headers: {
        'Content-Type': 'multipart/form-data',
        type: 'formData',
      },
      method: 'POST',
      url: `admin/productImage/upload`,
      data,
    });
  },
};
