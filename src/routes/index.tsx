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
        {/* <Private element={<Login />} /> */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/transacao" element={<Transacao />} />
        <Route path="/historico" element={<Historico />} />
      </Routes>
    </BrowserRouter>
  );
}
