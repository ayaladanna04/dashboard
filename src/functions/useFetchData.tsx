import { useEffect, useState } from 'react';
import { type OpenMeteoResponse } from '../types/DashboardTypes';

export default function useFetchData() {
    const URL = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m&timezone=America%2FChicago';
    //Declaración de Tipos e Interfaces
    //Manejo de Estados Asíncrono 
    const [data, setData] = useState<OpenMeteoResponse>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Función async para mejor manejo de errores
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                const response = await fetch(URL);
                
                // Validar que la respuesta sea exitosa
                if (!response.ok) {
                    throw new Error(`Error: ${response.status} ${response.statusText}`);
                }

                const obj = await response.json();
                setData(obj);
            } catch (err) {
                // Manejo robusto de errores
                const errorMessage = err instanceof Error ? err.message : 'Error desconocido al cargar datos';
                setError(errorMessage);
                console.error('Error fetching weather data:', err);
            } finally {
                // Siempre actualiza loading al final
                setLoading(false);
            }
        };

        fetchData();
    }, []); // Array vacío: se ejecuta solo una vez

    return { data, loading, error };
}