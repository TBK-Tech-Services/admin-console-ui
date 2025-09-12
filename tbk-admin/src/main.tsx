import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './store/store.ts';
import { toast } from 'sonner';
import { Toaster } from './components/ui/sonner.tsx';
import { AxiosError } from 'axios';
import { ApiResponse } from './types/global/apiResponse.ts';
import { ApiErrorResponse } from './types/global/apiErrorResponse.ts';

// Configuring Tanstack Query
const queryClient = new QueryClient({
  defaultOptions: {
    mutations: {
      onSuccess: (data: ApiResponse) => {
        if (data?.message) {
          toast.success(data.message);
        }
      },
      onError: (error: unknown) => {
        const err = error as AxiosError<ApiErrorResponse>;
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Something went wrong.";
        toast.error(errorMessage);
      }
    },
    queries: {
      onError: (error: unknown) => {
        const err = error as AxiosError<ApiErrorResponse>;
        const errorMessage =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch data.";
        toast.error(errorMessage);
      }
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Toaster /> 
            <App />
            <ReactQueryDevtools initialIsOpen={false}/>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
  </StrictMode>,
)
