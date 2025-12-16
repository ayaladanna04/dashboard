import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import type { OpenMeteoResponse } from '../types/DashboardTypes';

interface ChartUIProps {
   data?: OpenMeteoResponse;
   loading?: boolean;
   error?: string | null;
}

export default function ChartUI({ data, loading, error }: ChartUIProps) {
   // Mostrar indicador de carga
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

   // Mostrar error
   if (error) {
      return (
         <Card>
            <CardContent>
               <Box sx={{ height: 350, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Typography color="error">Error al cargar datos: {error}</Typography>
               </Box>
            </CardContent>
         </Card>
      );
   }

   // Datos de fallback
   const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
   const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
   const arrLabels = ['A','B','C','D','E','F','G'];

   let chartLabels = arrLabels;
   let chartValues1 = arrValues1;
   let chartValues2 = arrValues2;
   let title = 'Datos de Ejemplo';
   let description = 'Gráfico con datos de prueba';

   if (data && data.hourly) {
      // Extraer las primeras 24 horas de datos
      const hours = data.hourly.time.slice(0, 24);
      const temps = data.hourly.temperature_2m.slice(0, 24);
      const apparentTemps = data.hourly.apparent_temperature.slice(0, 24);

      // Crear labels con formato de hora
      chartLabels = hours.map(time => {
         const date = new Date(time);
         return date.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
      });

      chartValues1 = temps;
      chartValues2 = apparentTemps;
      title = 'Pronóstico de Temperatura';
      description = 'Comparación entre temperatura real y temperatura aparente para las próximas 24 horas';
   }

   return (
      <Card>
         <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
               {title}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
               {description}
            </Typography>
            <LineChart
               height={300}
               series={[
                  { data: chartValues1, label: 'Temp. Real (°C)' },
                  { data: chartValues2, label: 'Temp. Aparente (°C)' },
               ]}
               xAxis={[{ scaleType: 'point', data: chartLabels }]}
            />
         </CardContent>
      </Card>
   );
}