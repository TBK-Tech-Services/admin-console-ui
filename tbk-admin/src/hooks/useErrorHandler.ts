import { ErrorHandlingService } from "@/services/errorHandling.service";
import { useQueryClient } from "@tanstack/react-query"

// Custom Hook for Handling Errors
export const useErrorHandler = () => {
    const queryClient = useQueryClient();

    const handleError = (error: any, customMessage?: string) => {
        ErrorHandlingService.showError(error, customMessage);

        if (error.response?.status === 401) {
            queryClient.clear();
        }
    };

    const handleMutationError = (error: any) => {
        handleError(error);
    };

    const handleQueryError = (error: any) => {
        handleError(error);
    };

    const handleSuccess = (message: string) => {
        ErrorHandlingService.showSuccess(message);
    };

    return {
        handleError,
        handleMutationError,
        handleQueryError,
        handleSuccess
    };
};