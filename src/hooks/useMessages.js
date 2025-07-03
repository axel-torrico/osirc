import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = 'messages';

const useMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        });

        const formatted = res.data.records.map((record) => ({
          id: record.id,
          ...record.fields,
        }))
        .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

        setMessages(formatted);
      } catch (err) {
        console.error('Error al cargar mensajes:', err);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, []);

  return { messages, loadingMessages };
};

export default useMessages;
