import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Clients from "./pages/ClientPage";
import MainLayout from "./layout/MainLayout";
import VideogamePage from "./pages/VideogamePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/videogames" element={<VideogamePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;