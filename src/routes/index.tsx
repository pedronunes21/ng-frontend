import { Route, BrowserRouter, Routes } from "react-router-dom";
import Historico from "../pages/Historico";

import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Transacao from "../pages/Transacao";
import Private from "./private";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes*/}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Private Routes */}
        <Route
          path="/transacao"
          element={
            <Private>
              <Transacao />
            </Private>
          }
        />
        <Route
          path="/historico"
          element={
            <Private>
              <Historico />
            </Private>
          }
        />
        <Route
          path="*"
          element={
            <Private>
              <div></div>
            </Private>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
