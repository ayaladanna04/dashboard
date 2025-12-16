import { BarChart } from '@mui/x-charts/BarChart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useEffect, useState } from 'react';

const CITY_COORDS: Record<string, { latitude: number; longitude: number }> = {
  'Guayaquil': { latitude: -2.1962, longitude: -79.8862 },
  'Manta': { latitude: -0.9537, longitude: -80.7286 },
  'Cuenca': { latitude: -2.9001, longitude: -79.0059 },
  'Quito': { latitude: -0.1807, longitude: -78.4678 }
};

interface CityTemperature {
  city: string;
  temperature: number;
}

export default function BarChartUI() {
  const [temperatures, setTemperatures] = useState<CityTemperature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAllCities = async () => {
      try {
        setLoading(true);
        setError(null);

        const promises = Object.entries(CITY_COORDS).map(async ([city, coords]) => {
          const URL = `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m&timezone=America%2FChicago`;
          const response = await fetch(URL);
          
          if (!response.ok) {
            throw new Error(`Error fetching ${city}`);
          }
          
          const data = await response.json();
          return {
            city,
            temperature: data.current.temperature_2m
          };
        });

        const results = await Promise.all(promises);
        setTemperatures(results);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error al cargar comparación';
        setError(errorMessage);
        console.error('Error fetching comparison data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllCities();
  }, []);

  if (loading) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress />
          </Box>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardContent>
          <Box sx={{ height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Typography color="error">Error: {error}</Typography>
          </Box>
        </CardContent>
      </Card>
    );
  }

  const cities = temperatures.map(t => t.city);
  const temps = temperatures.map(t => t.temperature);

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Comparación de Temperaturas
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Temperatura actual en las principales ciudades de Ecuador
        </Typography>
        <BarChart
          xAxis={[{ scaleType: 'band', data: cities }]}
          series={[
            { 
              data: temps, 
              label: 'Temperatura (°C)',
              color: '#1976d2'
            }
          ]}
          height={300}
        />
      </CardContent>
    </Card>
  );
}