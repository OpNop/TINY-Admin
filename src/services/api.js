import axios from 'axios'
import {
  VueEasyJwt
} from "vue-easy-jwt"
const jwt = new VueEasyJwt()

const apiClient = axios.create({
  baseURL: 'https://api.tinyarmy.org/v1',
  withCredentials: true,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

apiClient.interceptors.request.use(async function (request) {
  // Anything to /auth does not need auth
  if (request.url.includes('auth/')) {
    return request
  }

  // Fetch JWT token and check its expiration 
  let token = localStorage.getItem('token');

  if (jwt.isExpired(token)) {
    // Try and refresh token
    const refresh = await apiClient.post('/auth/refresh_token')
    console.log(`🛑 Token expited! Refreshing`)
    if (refresh.status == 200) {
      token = refresh.data.token
      localStorage.setItem('token', token);
      request.headers.common["Authorization"] = token;
      console.log(`Sending request to ${request.url}`)
      console.log(`With token: ...${token.substr(token.length - 7)}`)
      return request
    } else {
      localStorage.removeItem('token')
      window.Location = "/login"
      return Promise.reject(request)
    }
  } else {
    //Token is valid, send away
    request.headers.common["Authorization"] = token;
    console.log(`Sending request to ${request.url}`)
    console.log(`With token: ...${token.substr(token.length - 7)}`)
    return request
  }
})


export default {
  // Auth
  login(api_key) {
    return apiClient.post('/auth/login', api_key)
  },
  refresh_token() {
    return apiClient.get('/auth/refresh_token')
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
  banList() {
    return apiClient.get('/members/banned')
  }
}


/*
import Vue from 'vue'
import axios from 'axios'
import store from '../store'
import {
  VueEasyJwt
} from "vue-easy-jwt";
const jwt = new VueEasyJwt();


export default () => {
  // Setup options
  const options = {
    baseURL: 'https://api.tinyarmy.org/v1/',
    headers: {
      Authorization: this.$store.state.token
    },
    withCredentials: true
  };

  // Create Instance
  const instance = axios.create(options);

  // Check JWT before each request
  instance.interceptors.request.use(request => {

    if (!request.url.includes('/auth')) {
      const token = this.$store.state.token;

      if (jwt.isExpired(token)) {
        //try and refresh token
        axios.post('auth/refresh_token')
          .then((resp) => {
            localStorage.setItem('token', resp.data.token);
            instance.headers.common['Authorization'] = resp.data.token
            return request;
          })
          .catch(() => {
            localStorage.removeItem('token')
            this.$router.push('/login')
          })
      }
    }
    return request;
  }, error => {
    return Promise.reject(error);
  });

  return instance;
};
*/
