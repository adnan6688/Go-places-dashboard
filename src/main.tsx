import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router'
import './index.css'
import { router } from './routes/routes.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from './Context/AuthProvider.tsx'

const queryClient = new QueryClient();
import { Toaster } from 'sonner'


createRoot(document.getElementById('root')!).render(
  <StrictMode>


    <QueryClientProvider client={queryClient}>



      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>

      </AuthProvider>

      <Toaster position="top-right" />
    </QueryClientProvider>

  </StrictMode>,
)
