import apiClient from 'services/api/apiService';

export const cartService = {
  getList(params) {
    return apiClient.request({
      method: 'GET',
      url: 'admin/saleOrder',
      params,
    });
  },

  updateCart(id) {
    return apiClient.request({
      method: 'PATCH',
      url: `admin/saleOrder/submit/${id}`,
    });
  },
};
