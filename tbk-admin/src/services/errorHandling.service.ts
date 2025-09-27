import { ApiError } from '@/types/general/apiError';
import { toast } from 'sonner';

// Custom Class for Error Handling Service
export class ErrorHandlingService {
    static showError(error: any , defaultMessage: string = "Something Went Wrong") {
        let errorMessage = defaultMessage;

        try {
            if(error.response?.data){
                const apiError: ApiError = error.response.data;
                errorMessage = apiError.message || defaultMessage;
            }
            else if(error.message === 'Network Error'){
                errorMessage = 'Network error. Please check your connection.';
            }
            else if(error.code === 'ECONNABORTED'){
                errorMessage = 'Request timeout. Please try again.';
            }
            else if(error.message){
                errorMessage = error.message;
            }
        }
        catch (e) {
            console.error('Error parsing error response:', e);
        }

        toast.error(errorMessage);

        if(process.env.NODE_ENV === 'development') {
            console.error('API Error:', error); 
        }
    };

    static showSuccess(message: string) {
        toast.success(message);
    };

    static showInfo(message: string) {
        toast.info(message);
    };

    static showWarning(message: string) {
        toast.warning(message);
    }
};