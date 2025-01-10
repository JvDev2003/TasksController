import { useState, useEffect } from "react";
import axios from "axios";
const apiUrl = import.meta.env.VITE_URL;
import { ITask } from "../interfaces/Task.interface";

const useTask = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [cancelled, setCancelled] = useState(false);

    function checkIfIsCancelled() {
        if (cancelled) {
            return;
        }
    }

    const createTask = async (task: ITask) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {

            const response = await axios.post(`${apiUrl}/task`, task);

            return response.data;
        } catch (error: any) {
            setError(error.response?.data?.msg || error.message);
            console.log(`Error: ${error.response?.data?.msg || error.message}`);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getTasks = async () => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {

            const response = await axios.get(`${apiUrl}/task`);

            return response.data;
        } catch (error: any) {
            setError(error.response?.data?.msg || error.message);
            console.log(`Error: ${error.response?.data?.msg || error.message}`);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const getTask = async (id: string) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {

            const response = await axios.get(`${apiUrl}/task/${id}`);

            return response.data;
        } catch (error: any) {
            setError(error.response?.data?.msg || error.message);
            console.log(`Error: ${error.response?.data?.msg || error.message}`);
            throw error;
        } finally {
            setLoading(false);
        }
    };


    const editTask = async (id: string, task: ITask) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {

            const response = await axios.put(`${apiUrl}/task/${id}`, task);

            return response.data;
        } catch (error: any) {
            setError(error.response?.data?.msg || error.message);
            console.log(`Error: ${error.response?.data?.msg || error.message}`);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (id: string) => {
        checkIfIsCancelled();
        setLoading(true);
        setError(null);

        try {

            const response = await axios.delete(`${apiUrl}/task/${id}`);

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

    return { createTask, getTasks, getTask, editTask, deleteTask, loading, error };
};

export default useTask;
