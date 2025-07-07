import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = 'installer';

const useInstallers = () => {
  const [installers, setInstallers] = useState([]);
  const [loadingInstallers, setLoadingInstallers] = useState(true);

  useEffect(() => {
    const fetchInstallers = async () => {
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
        .sort((a, b) => b.ID - a.ID);

        setInstallers(formatted);
      } catch (err) {
        console.error('Error al cargar installers:', err);
      } finally {
        setLoadingInstallers(false);
      }
    };

    fetchInstallers();
  }, []);

  return { installers, loadingInstallers };
};

export default useInstallers;
