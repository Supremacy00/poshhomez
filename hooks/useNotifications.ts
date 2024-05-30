import { useState, useEffect, useCallback } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { Notification } from '@/@types';


const fetcher = async (url: string, token: string): Promise<Notification[]> => {
  return axios.get<{data: { data: Notification[] }}>(url, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(res => res?.data?.data?.data,);
}


export function useNotifications() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const { data, error, mutate } = useSWR<Notification[]>(
    token ? [`${apiBaseUrl}/api/notification/all`, token] : null, 
    (urlAndToken) => fetcher(...urlAndToken as [string, string]),
    {
      onError: (error) => {
        console.error('Fetching notifications failed:', error);
      }
    }
  );

  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const count = data?.filter(notification => notification.is_read === "False").length ?? 0;
    setUnreadCount(count);
  }, [data]);  

  const markAsRead = useCallback(async (notificationId: string) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/api/notification/${notificationId}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data.status_code === 200) {
        mutate(data?.map(notification => notification.id === notificationId ? { ...notification, is_read: "True" } : notification), false);
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
    }
  }, [data, mutate, apiBaseUrl, token]);

  return {
    notifications: data,
    isLoading: !data && !error,
    isError: error,
    unreadCount,
    markAsRead,
  };
}
