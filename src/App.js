import './App.css';
import { AuthProvider } from './context/AuthContext';
import Router from './route/router';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
    <AuthProvider>
       <Router />
       </AuthProvider>
       <Toaster />
    </>
  );
}

export default App;
