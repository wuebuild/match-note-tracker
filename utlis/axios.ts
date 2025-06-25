import axios from 'axios';
import { isUserInfo } from '../types/userInfo';

export const client = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WEB_API_URL,
    // access: getMAC('en0'),
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: 10000,
});

// REQUEST interceptor: Set token before every request
client.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('mgm_access_token');
      if (session) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${session}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        let userInfoRaw = localStorage.getItem('mgm_user');
        let userInfo = userInfoRaw ? JSON.parse(userInfoRaw) : null;
        let token = isUserInfo(userInfo) ? userInfo.refresh_token : null;
        // let accessToken = isUserInfo(userInfo) ? userInfo.access_token : null;
        const response = await client.post('/auth/token/refresh', {
          refreshToken: token
        }); // Replace with your refresh token endpoint
        const { error } = response.data;
        if (error) {
          localStorage.clear()
          return Promise.reject();
        }
        const { accessToken, refreshToken } = response.data.data;
        userInfo.refresh_token = refreshToken
        localStorage.setItem('mgm_access_token', accessToken);
        localStorage.setItem('mgm_user', JSON.stringify(userInfo))
        client.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
        return client(originalRequest);
      } catch (refreshError) {
        // Handle refresh token error (e.g., redirect to login)
        localStorage.clear()
        // window.location.href = '/auth/login'; // Redirect to login page
        window.location.href = "/"
        return Promise.reject(refreshError);
      }
    }
    return error ? {data: {
      error: {
        ...error.response
      }
    }} : {data: {error: { ...error }}};
  }
);

export const errorValidation = (e : any) => {
    try {
        if (e.response.status === 401) {
            
        }
        if (e.response.status === 405) { 
            // deleteUserInfo()
            //   Action("", "Uh oh .. you are logged out because of multiple login. Please login again.", () => {
            //     window.location.href="/login"
            //   })
        }
        if (e.response.status === 403) { 
        // deleteUserInfo()
        }
        return { error: e.response.data.status };
    } catch (error) {
        // toastMessage("There is problem with server connection", {
        //   toastId: "error-api",
        //   type: "error"
        // });
        return { error: 'There is problem with server connection'}
    }
}