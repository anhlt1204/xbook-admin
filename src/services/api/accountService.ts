import apiClient from 'services/api/apiService';

export const accountService = {
  getList(params) {
    return apiClient.request({
      method: 'GET',
      url: 'admin/user',
      params,
    });
  },

  getAccountByID(id) {
    return apiClient.request({
      method: 'GET',
      url: `public/user/${id}`,
    });
  },

  updateAccount(id, data) {
    return apiClient.request({
      method: 'PUT',
      url: `user/${id}`,
      data,
    });
  },

  deleteAccount(id) {
    return apiClient.request({
      method: 'DELETE',
      url: `user/${id}`,
    });
  },
};
