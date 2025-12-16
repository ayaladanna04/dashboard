import Box from '@mui/material/Box';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import type { OpenMeteoResponse } from '../types/DashboardTypes';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
    return arrLabels.map((label, index) => ({
        id: index,
        label: label,
        value1: arrValues1[index],
        value2: arrValues2[index]
    }));
}

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'label',
        headerName: 'Hora',
        width: 125,
    },
    {
        field: 'value1',
        headerName: 'Temp Real (°C)',
        width: 150,
    },
    {
        field: 'value2',
        headerName: 'Temp Aparente (°C)',
        width: 180,
    },
    {
        field: 'resumen',
        headerName: 'Resumen',
        description: 'No es posible ordenar u ocultar esta columna.',
        sortable: false,
        hideable: false,
        width: 200,
        valueGetter: (_, row) => `${row.label || ''} ${row.value1 || ''}°C / ${row.value2 || ''}°C`,
    },
];

interface TableUIProps {
    data?: OpenMeteoResponse;
    loading?: boolean;
    error?: string | null;
}

export default function TableUI({ data, loading, error }: TableUIProps) {
    // Mostrar indicador de carga
    if (loading) {
        return (
            <Box sx={{ height: 350, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Mostrar error
    if (error) {
        return (
            <Box sx={{ height: 350, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Typography color="error">Error al cargar datos: {error}</Typography>
            </Box>
        );
    }

    let rows;

    if (data && data.hourly) {
        // Extraer las primeras 24 horas de datos
        const hours = data.hourly.time.slice(0, 24);
        const temps = data.hourly.temperature_2m.slice(0, 24);
        const apparentTemps = data.hourly.apparent_temperature.slice(0, 24);

        // Crear labels con formato de hora
        const labels = hours.map(time => {
            const date = new Date(time);
            return date.toLocaleTimeString('es-EC', { hour: '2-digit', minute: '2-digit' });
        });

        rows = combineArrays(labels, temps, apparentTemps);
    } else {
        // Datos de fallback
        const arrValues1 = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
        const arrValues2 = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
        const arrLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
        rows = combineArrays(arrLabels, arrValues1, arrValues2);
    }

    return (
        <Card>
            <CardContent>
                <Box sx={{ height: 350, width: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        initialState={{
                            pagination: {
                                paginationModel: {
                                    pageSize: 5,
                                },
                            },
                        }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                    />
                </Box>
            </CardContent>
        </Card>
    );
}