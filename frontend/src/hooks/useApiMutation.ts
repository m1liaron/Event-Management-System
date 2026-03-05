import { useState } from "react"

const useApiMutation = (apiCall: (...args: any[]) => Promise<any>) => {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const execute = async (...args: any[]) => {
        setIsSubmitting(true);
        const result = await apiCall(...args);
        setIsSubmitting(false);
        return result;
    };

    return { execute, isSubmitting };
}

export { useApiMutation }