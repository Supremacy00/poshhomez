import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import { PropertyCardDetails } from '@/@types';

const useWishlist = (userId: string, token: string) => {
  const queryClient = useQueryClient();
  const API_URL: string = process.env.NEXT_PUBLIC_API_ENDPOINT || "";

  const { data: wishlist, isLoading, isError } = useQuery<PropertyCardDetails[]>('wishlist', async () => {
    const response = await axios.get(`${API_URL}/wishlist/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  });

  const addMutation = useMutation<void, unknown, number>(async (propertyId: number) => {
    await axios.put(`${API_URL}/wishlist/add/${userId}/${propertyId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('wishlist');
    },
  });

  const removeMutation = useMutation<void, unknown, number>(async (propertyId: number) => {
    await axios.put(`${API_URL}/wishlist/remove/${userId}/${propertyId}`, {}, {
      headers: { Authorization: `Bearer ${token}` },
    });    
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries('wishlist');
    },
  });

  return { wishlist, isLoading, isError, addMutation, removeMutation };
};

export default useWishlist;
