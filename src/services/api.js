import axios from 'axios'
import AuthRefresh from 'axios-auth-refresh';
import Router from '@/router'

const apiClient = axios.create({
  baseURL: 'https://api.tinyarmy.org/v1',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

const refreshAuthLogic = failedRequest =>
  apiClient.post('/auth/refresh_token')
  .then(tokenRefreshResponse => {
    localStorage.setItem('token', tokenRefreshResponse.data.token);
    failedRequest.response.config.headers['Authorization'] = tokenRefreshResponse.data.token;
    return Promise.resolve();
  });

apiClient.interceptors.request.use(request => {
  request.headers['Authorization'] = `${localStorage.getItem('token')}`;
  return request;
});

apiClient.interceptors.response.use(function(response) {
  return response;
}, function(error) {
  if (error.response.config.url.includes('/auth/refresh_token')) {
    localStorage.removeItem('token');
    Router.go('/login');
  }
  return Promise.reject(error);
});

AuthRefresh(apiClient, refreshAuthLogic);

export default {
  // Auth
  login(api_key) {
    return apiClient.post('/auth/login', api_key)
  },
  refresh_token() {
    return apiClient.post('/auth/refresh_token')
  },

  // Guild
  guildStats() {
    return apiClient.get('/guild/stats')
  },
  getMembers(params, guild) {
    if (guild)
      return apiClient.get(`/guild/${guild}/members?${params}`)
    else
      return apiClient.get(`/guild/members?${params}`)
  },
  getLogs(params, guild) {
    if (guild)
      return apiClient.get(`/guild/${guild}/log?${params}`)
    else
      return apiClient.get(`/guild/logs?${params}`)
  },

  // Members
  findMember(account) {
    return apiClient.get(`members/search?account=${account}`)
  },
  getMember(account) {
    return apiClient.get(`members/${account}`)
  },
  getDiscord(account) {
    return apiClient.get(`members/${account}/discord`)
  },
  banList() {
    return apiClient.get('/members/banned')
  },
  updateMember(data) {
    return apiClient.post('/members/update', data)
  },
  getUserNotes(account) {
    return apiClient.get(`/members/${account}/notes`)
  },
  addUserNote(account, data) {
    return apiClient.post(`/members/${account}/notes`, data)
  }
}