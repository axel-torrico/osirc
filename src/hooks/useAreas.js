import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = 'area';

const useAreas = () => {
  const [areas, setAreas] = useState([]);
  const [loadingAreas, setLoadingAreas] = useState(true);

  useEffect(() => {
    const fetchAreas = async () => {
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
          .sort((a, b) => a.ID - b.ID);

        setAreas(formatted);
      } catch (err) {
        console.error('Error al cargar áreas:', err);
      } finally {
        setLoadingAreas(false);
      }
    };

    fetchAreas();
  }, []);

  return { areas, loadingAreas };
};

export default useAreas;
