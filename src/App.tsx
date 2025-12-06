
import './App.css'
import { Grid } from '@mui/material';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
function App() {
    const dataFetcherOutput = useFetchData();

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
                    {dataFetcherOutput &&
                        (<IndicatorUI
                            title='Temperatura (2m)'
                            description={`${dataFetcherOutput.current.temperature_2m} ${dataFetcherOutput.current_units.temperature_2m}`} />)
                    }                 </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {/* IndicatorUI con la Temperatura aparente en °C' */}
                    {dataFetcherOutput &&
                        (<IndicatorUI
                            title='Temperatura (°C)'
                            description={`${dataFetcherOutput.current.apparent_temperature} ${dataFetcherOutput.current_units.apparent_temperature}`} />)
                    }    
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {/* IndicatorUI con la Velocidad del viento en km/h' */}
                    {dataFetcherOutput &&
                        (<IndicatorUI
                            title='Velocidad del viento en km/h'
                            description={`${dataFetcherOutput.current.wind_speed_10m} ${dataFetcherOutput.current_units.wind_speed_10m}`} />)
                    }  
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {/* IndicatorUI con la Humedad relativa en %' */}
                    {dataFetcherOutput &&
                        (<IndicatorUI
                            title='Humedad relativa en %'
                            description={`${dataFetcherOutput.current.relative_humidity_2m} ${dataFetcherOutput.current_units.relative_humidity_2m}`} />)
                    }  
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
