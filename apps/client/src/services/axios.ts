import axios, { AxiosError } from 'axios';

import { useAuthStore } from '@/stores/auth-store';
import { useNotificationsStore } from '@/stores/notifications-store';

axios.defaults.baseURL = import.meta.env.VITE_API_HOST;

axios.interceptors.request.use((config) => {
  const auth = useAuthStore.getState();

  config.headers.setAccept('application/json');

  if (auth.accessToken) {
    config.headers.set('Authorization', `Bearer ${auth.accessToken}`);
  }

  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const notifications = useNotificationsStore.getState();
    const message = error instanceof Error ? error.message : 'An unknown error occurred';
    notifications.add({
      type: 'error',
      message
    });

    if (error instanceof AxiosError) {
      console.error(error.response);
    }

    return Promise.reject(error);
  }
);

export default axios;
