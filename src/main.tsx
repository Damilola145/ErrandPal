import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AuthProvider } from "./context/AuthContext";
import { GoogleOAuthProvider } from '@react-oauth/google';


createRoot(document.getElementById("root")!).render( 
 <GoogleOAuthProvider clientId="573510366372-91a9d30hl67na7n3p9onbl9vjda51jdv.apps.googleusercontent.com">
      <AuthProvider>
      <App />
    </AuthProvider>
  </GoogleOAuthProvider>



);