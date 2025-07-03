import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = 'register_orders';

const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        }); 

        const formatted = res.data.records
          .map((record) => ({
          id: record.id,
          ...record.fields,
        }))
        .sort((a, b) => String(b.id_client).localeCompare(String(a.id_client)))

        setOrders(formatted);
      } catch (err) {
        console.error('Error al cargar pedidos:', err);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchOrders();
  }, []);

  return { orders, loadingOrders };
};

export default useOrders;
