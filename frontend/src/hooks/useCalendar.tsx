import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_URL;

const useCalendar = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false);

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const getCalendar = async () => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {

            const response = await axios.get(`${apiUrl}/calendar`);

            return response.data;
        } catch (error: any) {
            setError(error.response?.data?.msg || error.message);
            console.log(`Error: ${error.response?.data?.msg || error.message}`);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => setCancelled(true);
    }, []);

    return { getCalendar, loading, error };
};

export default useCalendar;
