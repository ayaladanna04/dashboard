import './App.css'
import Grid from '@mui/material/Grid';
import IndicatorUI from './components/IndicatorUI';
import useFetchData from './functions/useFetchData';
import HeaderUI from './components/HeaderUI';
import AlertUI from './components/AlertUI';
import SelectorUI from './components/SelectorUI';
import TableUI from './components/TableUI';
import ChartUI from './components/ChartUI';
import { useState } from 'react';
import Fade from '@mui/material/Fade';
import BarChartUI from './components/BarChartUI';

function App() {
    // Estado con valor por defecto
    const [selectedOption, setSelectedOption] = useState<string | null>("Guayaquil");

    // Hook con el estado
    const { data, loading, error } = useFetchData(selectedOption);

    return (
        <Fade in={!loading}>
            <Grid container spacing={2} sx={{ p: 2 }}>
                {/* Encabezado */}
                <Grid size={12}>
                    <HeaderUI />
                </Grid>

                {/* Alerta */}
                <Grid size={{ xs: 12, md: 9 }} container justifyContent="flex-end" alignItems="center">
                    <AlertUI
                        description="No se preveen lluvias"
                        variant="filled"
                        severity="info"
                    />
                </Grid>

                {/* Selector */}
                <Grid size={{ xs: 12, md: 3 }} >
                    <SelectorUI onOptionSelect={setSelectedOption} />
                </Grid>

                {/* Manejo de carga y errores */}
                {loading && (
                    <Grid size={12}>
                        <div style={{ textAlign: 'center', padding: '20px' }}>
                            Cargando datos del clima...
                        </div>
                    </Grid>
                )}

                {error && (
                    <Grid size={12}>
                        <AlertUI
                            description={`Error: ${error}`}
                            variant="filled"
                            severity="error"
                        />
                    </Grid>
                )}

                {/* Indicadores - Solo se muestran si hay datos */}
                {data && (
                    <>
                        <Grid size={{ xs: 12, md: 3 }}>
                            <IndicatorUI
                                title='Temperatura (2m)'
                                description={`${data.current.temperature_2m} ${data.current_units.temperature_2m}`}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <IndicatorUI
                                title='Temperatura aparente'
                                description={`${data.current.apparent_temperature} ${data.current_units.apparent_temperature}`}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <IndicatorUI
                                title='Velocidad del viento'
                                description={`${data.current.wind_speed_10m} ${data.current_units.wind_speed_10m}`}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 3 }}>
                            <IndicatorUI
                                title='Humedad relativa'
                                description={`${data.current.relative_humidity_2m} ${data.current_units.relative_humidity_2m}`}
                            />
                        </Grid>
                    </>
                )}

                {/* Gráfico */}
                <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                    <ChartUI data={data} loading={loading} error={error} />
                </Grid>

                {/* Tabla */}
                <Grid size={{ xs: 6, md: 6 }} sx={{ display: { xs: "none", md: "block" } }}>
                    <TableUI data={data} loading={loading} error={error} />
                </Grid>

                {/* Información adicional */}
                <Grid size={12}>
                    <BarChartUI />
                </Grid>
            </Grid>
        </Fade>
    );
}

export default App