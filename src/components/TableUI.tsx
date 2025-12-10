
import Box from '@mui/material/Box';
import { DataGrid, type GridColDef, type GridRowsProp } from '@mui/x-data-grid';
import useFetchData from '../functions/useFetchData';
// --- Tu función auxiliar original ---
function combineArrays(arrLabels: Array<string>, arrValues1: Array<number>, arrValues2: Array<number>) {
   return arrLabels.map((label, index) => ({
      id: index,
      label: label,
      value1: arrValues1[index],
      value2: arrValues2[index]
   }));
}

// --- Tus columnas originales ---
const columns: GridColDef[] = [
   { field: 'id', headerName: 'ID', width: 90 },
   {
      field: 'label',
      headerName: 'Hora',
      width: 150,
   },
   {
      field: 'value1',
      headerName: 'Temp (°C)',
      width: 150,
   },
   {
      field: 'value2',
      headerName: 'Viento (km/h)',
      width: 150,
   },
   {
      field: 'resumen',
      headerName: 'Resumen',
      description: 'No es posible ordenar u ocultar esta columna.',
      sortable: false,
      hideable: false,
      width: 250,
      valueGetter: (_, row) => `${row.label} | ${row.value1}°C | ${row.value2}km/h`,
   },
];

export default function TableUI() {
    const { data, loading, error } = useFetchData();
    if (!data || loading) {
        return <p>Cargando...</p>;
    }
    const arrValues1 = data.hourly.temperature_2m;
    const arrValues2 = data.hourly.wind_speed_10m;
    const arrLabels = data.hourly.time;
    if (error)
        return <p>Error: {error}</p>;
    const rows = combineArrays(arrLabels, arrValues1, arrValues2);
    return (
        <Box sx={{ height: 350, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: {
                            pageSize: 10,
                        },
                    },
                }}
                pageSizeOptions={[10]}
                disableRowSelectionOnClick
            />
        </Box>
    );
}