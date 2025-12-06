
import './App.css'
import { Grid } from '@mui/material';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
function App() {
    const dataFetcherOutput = useFetchData();

    return (
        <Grid>

            {/* Encabezado */}
            <Grid container spacing={5} justifyContent="center" alignItems="center">
            <HeaderUI />
            </Grid>
            {/* Alertas */}
            <Grid
                container
                justifyContent="right"
                alignItems="center"
            >
                <AlertUI
                    description="No se preveen lluvias"
                    variant="filled"
                    severity="info"
                />
            </Grid>
            {/* Selector */}
                {/* Selector */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <SelectorUI />
                </Grid>

                {/* Indicadores */}
                <Grid size={{ xs: 12, md: 3 }} >

                    {dataFetcherOutput.data && (
                        <IndicatorUI
                            title='Temperatura (2m)'
                            description={`${dataFetcherOutput.data.current.temperature_2m} ${dataFetcherOutput.data.current_units.temperature_2m}`}
                        />
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {/* IndicatorUI con la Temperatura aparente en °C' */}
                    {dataFetcherOutput.data && (
                        <IndicatorUI
                            title='Temperatura (°C)'
                            description={`${dataFetcherOutput.data.current.apparent_temperature} ${dataFetcherOutput.data.current_units.apparent_temperature}`}
                        />
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {/* IndicatorUI con la Velocidad del viento en km/h' */}
                    {dataFetcherOutput.data &&
                        (<IndicatorUI
                            title='Velocidad del viento en km/h'
                            description={`${dataFetcherOutput.data.current.wind_speed_10m} ${dataFetcherOutput.data.current_units.wind_speed_10m}`}
                        />
                        )}
                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>
                    {/* IndicatorUI con la Humedad relativa en %' */}
                    {dataFetcherOutput.data &&
                        (<IndicatorUI
                            title='Humedad relativa en %'
                            description={`${dataFetcherOutput.data.current.relative_humidity_2m} ${dataFetcherOutput.data.current_units.relative_humidity_2m}`}
                        />
                        )}
                </Grid>


                {/* Gráfico */}
                <Grid container spacing={5} justifyContent="center" alignItems="center">Elemento: Gráfico</Grid>

                {/* Tabla */}
                <Grid container spacing={5} justifyContent="center" alignItems="center">Elemento: Tabla</Grid>

                {/* Información adicional */}
                <Grid container spacing={5} justifyContent="center" alignItems="center">Elemento: Información adicional</Grid>

            </Grid >
            );
}

            export default App 
