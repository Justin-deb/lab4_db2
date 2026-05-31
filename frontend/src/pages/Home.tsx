function Home() {
  return (
    <div className="min-h-screen bg-black flex flex-col">

      <main className="flex-1 px-6 py-10">

        {/* CATALOGO */}
        <section className="mb-16">

          <div className="flex items-center justify-between mb-8">

            <div>

              <h2 className="text-4xl font-bold text-white">
                Catálogo Popular
              </h2>

              <p className="text-purple-300 mt-2">
                Videojuegos disponibles para renta mensual
              </p>

            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {/* CARD 1 */}
            <div className="group rounded-3xl overflow-hidden border border-purple-500/20 bg-purple-950/30 shadow-2xl transition duration-300 hover:scale-[1.03]">

              <div className="overflow-hidden">
                <img
                  src="https://img.asmedia.epimg.net/resizer/v2/L66H3KB2CZARPASKVWD57UUSGE.jpg?auth=7b384eb1339f01929104644efd6f2326be3ff9c2e249906e7dbca932ac68c12f&width=1200&height=1200&smart=true"
                  alt="Spider-Man"
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">

                <h3 className="text-white text-2xl font-bold">
                  Spider-Man 2
                </h3>

                <p className="text-purple-300 mt-2">
                  PS5 Edition
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-purple-200">
                      Renta mensual
                    </p>

                    <p className="text-3xl font-bold text-white">
                      ₡6.990
                    </p>
                  </div>

                  <button className="rounded-2xl bg-purple-600 px-4 py-2 text-white font-semibold transition hover:bg-purple-500">
                    Rentar
                  </button>

                </div>
              </div>
            </div>

            {/* CARD 2 */}
            <div className="group rounded-3xl overflow-hidden border border-purple-500/20 bg-purple-950/30 shadow-2xl transition duration-300 hover:scale-[1.03]">

              <div className="overflow-hidden">
                <img
                  src="https://fotografias-neox.atresmedia.com/clipping/cmsimages01/2021/09/10/51D02B1B-5B1C-4FF4-9C27-065F54346401/104.jpg?crop=1080,1080,x417,y0&width=1200&height=1200&optimize=low&format=webply"
                  alt="God of War"
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">

                <h3 className="text-white text-2xl font-bold">
                  God of War
                </h3>

                <p className="text-purple-300 mt-2">
                  Ragnarok
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-purple-200">
                      Renta mensual
                    </p>

                    <p className="text-3xl font-bold text-white">
                      ₡7.990
                    </p>
                  </div>

                  <button className="rounded-2xl bg-purple-600 px-4 py-2 text-white font-semibold transition hover:bg-purple-500">
                    Rentar
                  </button>

                </div>
              </div>
            </div>

            {/* CARD 3 */}
            <div className="group rounded-3xl overflow-hidden border border-purple-500/20 bg-purple-950/30 shadow-2xl transition duration-300 hover:scale-[1.03]">

              <div className="overflow-hidden">
                <img
                  src="https://cdn.cloudflare.steamstatic.com/steam/apps/1091500/header.jpg"
                  alt="Cyberpunk"
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">

                <h3 className="text-white text-2xl font-bold">
                  Cyberpunk 2077
                </h3>

                <p className="text-purple-300 mt-2">
                  Ultimate Edition
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-purple-200">
                      Renta mensual
                    </p>

                    <p className="text-3xl font-bold text-white">
                      ₡5.990
                    </p>
                  </div>

                  <button className="rounded-2xl bg-purple-600 px-4 py-2 text-white font-semibold transition hover:bg-purple-500">
                    Rentar
                  </button>

                </div>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="group rounded-3xl overflow-hidden border border-purple-500/20 bg-purple-950/30 shadow-2xl transition duration-300 hover:scale-[1.03]">

              <div className="overflow-hidden">
                <img
                  src="https://i.ytimg.com/vi/QrID0EA3hhI/maxresdefault.jpg"
                  alt="FIFA"
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-5">

                <h3 className="text-white text-2xl font-bold">
                  EA Sports FC 25
                </h3>

                <p className="text-purple-300 mt-2">
                  Ultimate Edition
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <div>
                    <p className="text-sm text-purple-200">
                      Renta mensual
                    </p>

                    <p className="text-3xl font-bold text-white">
                      ₡8.990
                    </p>
                  </div>

                  <button className="rounded-2xl bg-purple-600 px-4 py-2 text-white font-semibold transition hover:bg-purple-500">
                    Rentar
                  </button>

                </div>
              </div>
            </div>

          </div>
        </section>

      </main>
    </div>
  );
}

export default Home;