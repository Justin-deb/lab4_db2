import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Clientes from "./pages/Clients_Module";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clientes" element={<Clientes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;