import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from "react-router-dom";
import { Login, Dashboard, Verify, ResetPassword } from './pages/public';
import path from './ultils/path';


function App() {
  return (
    <div>
      <Routes>    
        <Route path={path.LOGIN} element={<Login />} />   
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path={path.VERIFY} element={<Verify />} />
        <Route path={path.RESETPASSWORD} element={<ResetPassword />} />
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;
