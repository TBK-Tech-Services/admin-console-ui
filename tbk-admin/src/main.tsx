import './index.css'
import App from './App.tsx'
import { StrictMode, lazy, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { store } from './store/store.ts';
import ErrorBoundary from './components/common/ErrorBoundary';

// Lazy load devtools — only in dev
const ReactQueryDevtools = lazy(() =>
  import('@tanstack/react-query-devtools').then(m => ({
    default: m.ReactQueryDevtools
  }))
)

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
        {/* <PersistGate loading={null} persistor={persistor}> */}
          <QueryClientProvider client={queryClient}>
            <App />
            {import.meta.env.DEV && (
              <Suspense fallback={null}>
                <ReactQueryDevtools initialIsOpen={false} />
              </Suspense>
            )}
          </QueryClientProvider>
        {/* </PersistGate> */}
      </Provider>
    </ErrorBoundary>
  </StrictMode>,
)