import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
  'Manta': { latitude: -0.9537, longitude: -80.7286 },
  'Cuenca': { latitude: -2.9001, longitude: -79.0059 },
  'Quito': { latitude: -0.1807, longitude: -78.4678 }
};

interface UseFetchDataReturn {
  data: OpenMeteoResponse | undefined;
  loading: boolean;
  error: string | null;
}

export default function useFetchData(selectedOption: string | null): UseFetchDataReturn {
  const [data, setData] = useState<OpenMeteoResponse>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const cityConfig = (selectedOption && CITY_COORDS[selectedOption]) 
          ? CITY_COORDS[selectedOption] 
          : CITY_COORDS["Guayaquil"];
        
        const URL = `https://api.open-meteo.com/v1/forecast?latitude=${cityConfig.latitude}&longitude=${cityConfig.longitude}&hourly=temperature_2m,apparent_temperature&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago`;

        const response = await fetch(URL);

        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const obj = await response.json();
        setData(obj);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar datos';
        setError(errorMessage);
        console.error('Error fetching weather data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedOption]);

  return { data, loading, error };
}