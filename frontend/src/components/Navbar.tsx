import { useState } from "react";
import {
  Menu,
  X,
  Users,
  Gamepad2,
  CalendarDays,
  ChevronRight,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menu_abierto, set_menu_abierto] = useState(false);

  const navigate = useNavigate();

  return (
    <nav className="relative bg-linear-to-r from-purple-950 via-purple-900 to-purple-800 border-b border-purple-500/30 shadow-lg">
      <div className="flex items-center justify-between h-16 px-6">
        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-white text-2xl font-bold tracking-wide cursor-pointer"
        >
          VideoGames Store
        </h1>

        {/* BOTON */}
        <button
          onClick={() => set_menu_abierto(!menu_abierto)}
          className="group flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:bg-white/15"
        >
          {menu_abierto ? (
            <X className="text-white w-7 h-7" />
          ) : (
            <Menu className="text-white w-7 h-7" />
          )}
        </button>
      </div>

      {/* MENU */}
      {menu_abierto && (
        <div className="absolute right-4 top-20 z-50 w-80 rounded-3xl border border-purple-500/30 bg-purple-950 shadow-2xl overflow-hidden">
          <div className="flex flex-col gap-4 p-5">
            {/* HOME */}
            <button
              onClick={() => {
                navigate("/");
                set_menu_abierto(false);
              }}
              className="group flex items-center justify-between rounded-2xl border border-purple-400/30 bg-purple-900/40 px-5 py-4 transition-all duration-300 hover:border-purple-300 hover:bg-purple-800/60 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 10.75L12 3l9 7.75V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.25z"
                    />
                  </svg>
                </div>

                <span className="text-white font-semibold text-lg">Home</span>
              </div>
              <ChevronRight className="text-white w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>

            {/* CLIENTES */}
            <button
              onClick={() => {
                navigate("/clients");
                set_menu_abierto(false);
              }}
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

              <ChevronRight className="text-white w-5 h-5" />
            </button>

            {/* VIDEOJUEGOS */}
            <button className="group flex items-center justify-between rounded-2xl border border-purple-400/30 bg-purple-900/40 px-5 py-4 transition-all duration-300 hover:border-purple-300 hover:bg-purple-800/60 hover:scale-[1.02]"
            onClick={() =>navigate('/videogames')}>
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <Gamepad2 className="text-white w-6 h-6" />
                </div>

                <span className="text-white font-semibold text-lg">
                  Módulo Videojuegos
                </span>
              </div>

              <ChevronRight className="text-white w-5 h-5" />
            </button>

            {/* ALQUILERES */}
            <button className="group flex items-center justify-between rounded-2xl border border-purple-400/30 bg-purple-900/40 px-5 py-4 transition-all duration-300 hover:border-purple-300 hover:bg-purple-800/60 hover:scale-[1.02]">
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-white/10 p-3">
                  <CalendarDays className="text-white w-6 h-6" />
                </div>

                <span className="text-white font-semibold text-lg">
                  Módulo Alquileres
                </span>
              </div>

              <ChevronRight className="text-white w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
