import { useState } from "react";
import {
  Menu,
  X,
  Users,
  Gamepad2,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

function App() {
  const [menu_abierto, set_menu_abierto] = useState(false);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* NAVBAR */}
      <nav className="relative bg-gradient-to-r from-purple-950 via-purple-900 to-purple-800 border-b border-purple-500/30 shadow-lg">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Nombre izquierda */}
          <h1 className="text-white text-2xl font-bold tracking-wide">
            VideoGames Store
          </h1>

          {/* Botón hamburguesa */}
          <button
            onClick={() => set_menu_abierto(!menu_abierto)}
            className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/15 active:scale-95"
          >
            {menu_abierto ? (
              <X className="text-white w-7 h-7" />
            ) : (
              <Menu className="text-white w-7 h-7" />
            )}
          </button>
        </div>

        {/* MENÚ */}
        {menu_abierto && (
          <div className="absolute right-4 top-20 w-80 rounded-3xl border border-purple-500/30 bg-purple-950 shadow-2xl overflow-hidden z-50">
            <div className="flex flex-col gap-4 p-5">
              {/* Clientes */}
              <a
                href="#"
                className="group flex items-center justify-between rounded-2xl border border-purple-400/30 bg-purple-900/40 px-5 py-4 transition-all duration-300 hover:border-purple-300 hover:bg-purple-800/60 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-white/10 p-3">
                    <Users className="text-white w-6 h-6" />
                  </div>

                  <span className="text-white font-semibold text-lg">
                    Módulo Clientes
                  </span>
                </div>

                <ChevronRight className="text-white w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Videojuegos */}
              <a
                href="#"
                className="group flex items-center justify-between rounded-2xl border border-purple-400/30 bg-purple-900/40 px-5 py-4 transition-all duration-300 hover:border-purple-300 hover:bg-purple-800/60 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-white/10 p-3">
                    <Gamepad2 className="text-white w-6 h-6" />
                  </div>

                  <span className="text-white font-semibold text-lg">
                    Módulo Videojuegos
                  </span>
                </div>

                <ChevronRight className="text-white w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>

              {/* Alquileres */}
              <a
                href="#"
                className="group flex items-center justify-between rounded-2xl border border-purple-400/30 bg-purple-900/40 px-5 py-4 transition-all duration-300 hover:border-purple-300 hover:bg-purple-800/60 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-white/10 p-3">
                    <CalendarDays className="text-white w-6 h-6" />
                  </div>

                  <span className="text-white font-semibold text-lg">
                    Módulo Alquileres
                  </span>
                </div>

                <ChevronRight className="text-white w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* CONTENIDO */}
      <main className="flex-1"></main>

      {/* FOOTER BONITO */}
      <footer className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 border-t border-purple-500/20 shadow-[0_-5px_25px_rgba(168,85,247,0.15)]">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Texto izquierda */}
            <div>
              <h2 className="text-white text-lg font-bold tracking-wide">
                VideoGames Store
              </h2>

              <p className="text-purple-200 text-sm mt-1">
                Designing for{" "}
                <span className="font-semibold text-white">
                  Mairon Barquero
                </span>
                ,{" "}
                <span className="font-semibold text-white">Justin Estrada</span>{" "}
                y{" "}
                <span className="font-semibold text-white">
                  Carlos Rodriguez
                </span>
              </p>
            </div>

            {/* Redes sociales */}
            <div className="flex items-center gap-4">
              {/* Instagram */}
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-pink-500/20 hover:border-pink-400 hover:scale-110">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                    alt="Instagram"
                    className="w-6 h-6"
                  />
                </div>
              </a>

              {/* Facebook */}
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-blue-500/20 hover:border-blue-400 hover:scale-110">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                    alt="Facebook"
                    className="w-6 h-6"
                  />
                </div>
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-red-500/20 hover:border-red-400 hover:scale-110">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                    alt="YouTube"
                    className="w-6 h-6"
                  />
                </div>
              </a>

              {/* X / Twitter */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:bg-gray-500/20 hover:border-gray-300 hover:scale-110">
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png"
                    alt="X"
                    className="w-6 h-6"
                  />
                </div>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
