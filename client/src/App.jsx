import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; 
import AppRoutes from './AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
     
      <Toaster 
        position="top-center"
        reverseOrder={false}
        toastOptions={{
         
          success: {
            style: {
              background: '#0cb01c',
              color: '#fff',
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#0cb01c',
            },
          },
        }}
      />
      
      <AppRoutes />
    </BrowserRouter>
  );
}