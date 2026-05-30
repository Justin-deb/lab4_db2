function Footer() {
  return (
    <footer className="bg-gradient-to-r from-purple-950 via-purple-900 to-purple-950 border-t border-purple-500/20 shadow-[0_-5px_25px_rgba(168,85,247,0.15)]">

      <div className="max-w-7xl mx-auto px-6 py-5">

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* TEXTO */}
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
              <span className="font-semibold text-white">
                Justin Estrada
              </span>
              {" "}y{" "}
              <span className="font-semibold text-white">
                Carlos Rodriguez
              </span>
            </p>
          </div>

          {/* REDES */}
          <div className="flex items-center gap-4">

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png"
                alt="Instagram"
                className="w-10 h-10 hover:scale-110 transition"
              />
            </a>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/733/733547.png"
                alt="Facebook"
                className="w-10 h-10 hover:scale-110 transition"
              />
            </a>

            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png"
                alt="YouTube"
                className="w-10 h-10 hover:scale-110 transition"
              />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/5969/5969020.png"
                alt="X"
                className="w-10 h-10 hover:scale-110 transition"
              />
            </a>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;