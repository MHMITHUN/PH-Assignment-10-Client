import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <App />
                    <Toaster
                        position="top-right"
                        reverseOrder={false}
                        gutter={8}
                        toastOptions={{
                            // Define default duration
                            duration: 2000,
                            style: {
                                background: '#363636',
                                color: '#fff',
                                padding: '16px',
                                borderRadius: '8px',
                                zIndex: 99999,
                            },
                            success: {
                                duration: 2000,
                                iconTheme: {
                                    primary: '#22c55e',
                                    secondary: '#fff',
                                },
                            },
                            error: {
                                duration: 3000,
                                iconTheme: {
                                    primary: '#ef4444',
                                    secondary: '#fff',
                                },
                            },
                        }}
                    />
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    </React.StrictMode>
);
