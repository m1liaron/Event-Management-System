import { useEffect, useState } from "react";
import { api } from "../services/axios";
import { toast } from "react-toastify";

const useFetchData = <T,>(url: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await api.get<T>(url);
                setData(response);
            } catch (error) {
                if(error instanceof Error) {
                    toast(error.message)
                }
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [url]);

    return {
        data,
        setData,
        isLoading
    };
};

export { useFetchData };