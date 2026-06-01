import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Clients from "./pages/ClientPage";
import MainLayout from "./layout/MainLayout";
import VideogamePage from "./pages/VideogamePage";
import RentalPage from "./pages/RentalPage";
import TranserPage from "./pages/TransferPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<Home />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/videogames" element={<VideogamePage />} />
          <Route path="/rental" element={<RentalPage />} />
          <Route path="/transfer" element={<TranserPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;