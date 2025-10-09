import './index.css'
import App from './App.tsx'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from './store/store.ts';
import { Toaster } from './components/ui/sonner.tsx';
import ErrorBoundary from './components/common/ErrorBoundary';

// Tanstack Query Configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
    mutations: {
      retry: 1,
      gcTime: 10 * 60 * 1000,
    }
  }
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <QueryClientProvider client={queryClient}>
            <Toaster /> 
            <App />
            <ReactQueryDevtools initialIsOpen={false}/>
          </QueryClientProvider>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)