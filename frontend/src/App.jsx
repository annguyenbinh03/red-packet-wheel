import { lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import { AuthProvider } from "./context/AuthContext.jsx";
import Missing from "./pages/Missing";
import Login from "./pages/Login.jsx";
import Admin from "./pages/Admin.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import { ToastContainer } from 'react-toastify';
import AdminPay from "./pages/AdminPay.jsx";

const Winners = lazy(() => import("./screens/Winners"));
const Game = lazy(() => import("./screens/Game"));
const Infomation = lazy(() => import("./screens/Infomation"));
const FireWork = lazy(() => import("./screens/FireWork"));

const ROLES = {
  USER: "ROLE_USER",
  MANAGER: "ROLE_MANAGER",
  ADMIN: "ROLE_ADMIN",
};

function App() {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route
            element={<RequireAuth allowedRoles={[ROLES.ADMIN, ROLES.USER]} />}
          >
            <Route path="/" element={<Navigation />}>
              <Route index element={<FireWork />} />
              <Route path="winner" element={<Winners />} />
              <Route path="game" element={<Game />} />
              <Route path="infomation" element={<Infomation />} />
            </Route>

            <Route element={<RequireAuth allowedRoles={[ROLES.ADMIN]} />}>
              <Route path="admin" element={<Admin />} />
              <Route path="admin-pay" element={<AdminPay />} />
            </Route>

            <Route path="*" element={<Missing />} />
          </Route>
        </Routes>
        <ToastContainer />
      </AuthProvider>
    </>
  );
}

export default App;
