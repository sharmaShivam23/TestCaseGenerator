import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import rootReducer from './reducer/index.js'
import toast, { Toaster } from 'react-hot-toast';

const store = configureStore({
  reducer: rootReducer ,
})
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <App />
    {/* <Toaster /> */}
     <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "rgba(17, 17, 17, 0.7)",
            backdropFilter: "blur(8px)",
            color: "#fff",
            border: "1px solid rgba(139, 92, 246, 0.6)",
            boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
            padding: "12px 16px",
            borderRadius: "12px",
            fontFamily: "'Orbitron', sans-serif",
          },
          success: {
            icon: "🤖",
          },
          error: {
            icon: "⚡",
          },
        }}
      />
  </Provider>
  </StrictMode>,
)