import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { CartProvider } from './context/ProductContext.tsx'


const queryclient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryclient}> 
    <CartProvider>
        <App />   
    </CartProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>,
)
