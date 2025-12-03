
import './App.css'
import { Grid } from '@mui/material';
import IndicatorUI from './components/IndicatorUI';
function App() {
  
  return (
    <Grid>

         {/* Encabezado */}
          <Grid container spacing={5} justifyContent="center" alignItems="center">Elemento: Encabezado</Grid>

         {/* Alertas */}
          <Grid container spacing={5} justifyContent="center" alignItems="center">Elemento: Alertas</Grid>

         {/* Selector */}
          <Grid container spacing={5} justifyContent="center" alignItems="center">Elemento: Selector</Grid>

         {/* Indicadores */}
<Grid container size={{ xs: 12, md: 9 }} >

                 <Grid size={{ xs: 12, md: 3 }}>
                     <IndicatorUI title='Temperatura (2m)' description='XX°C' />
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {/* IndicatorUI con la Temperatura aparente en °C' */}
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {/* IndicatorUI con la Velocidad del viento en km/h' */}
                 </Grid>

                 <Grid size={{ xs: 12, md: 3 }}>
                     {/* IndicatorUI con la Humedad relativa en %' */}
                 </Grid>

             </Grid>
         {/* Gráfico */}
          <Grid container spacing={5} justifyContent="center" alignItems="center">Elemento: Gráfico</Grid>

         {/* Tabla */}
          <Grid container spacing={5} justifyContent="center" alignItems="center">Elemento: Tabla</Grid>

         {/* Información adicional */}
          <Grid container spacing={5} justifyContent="center" alignItems="center">Elemento: Información adicional</Grid>

      </Grid>
  );
}

export default App
