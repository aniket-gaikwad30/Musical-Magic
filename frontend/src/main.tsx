// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './providers/AuthProvider.tsx'
// import { Divide } from 'lucide-react'


/// Import your Publishable KeyPUBLISHABLE_KEY
// const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

// if (!PUBLISHABLE_KEY) {
  // console.error("Missing Publishable Key")
  // throw new Error("Missing Publishable Key")
// }


createRoot(document.getElementById("root")!).render(

    <ClerkProvider
      publishableKey={"pk_test_aG9wZWZ1bC1raXdpLTY2LmNsZXJrLmFjY291bnRzLmRldiQ"}
      afterSignOutUrl="/"
    >
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  
);
