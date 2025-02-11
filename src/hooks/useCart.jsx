import { useQuery } from '@tanstack/react-query'
import { useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthProvider';

const useCart = () => {
    const { user } = useContext(AuthContext);
    const token = localStorage.getItem('access-token')

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async () => {
            const res = await axios.get(`https://onext-server1.onrender.com/carts?email=${user?.email}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            return res.data;
        },
    })

    return [cart, refetch]

}
export default useCart;