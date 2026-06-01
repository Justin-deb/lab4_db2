import { useEffect, useState } from "react";
import type { Videogame } from "../types/Videogame";
import { createVideogame, getAllVideogames } from "../service/VideogameService";
import type { Category } from "../types/Category";
import { createCategory, getCategories } from "../service/CategoryService";
import type { Office } from "../types/Office";
import type { Copy } from "../types/Copy";
import { getAllOffices } from "../service/OfficeService";
import { createCopy } from "../service/CopyService";

const VideogamePage = () => {
  const [newVideogame, setNewVideogame] = useState<Videogame>({
    code: 0,
    name: "",
    description: "",
    developer: "",
    releaseDate: new Date(),
    categoryId: 0,
  });
  const [newCopy, setNewCopy] = useState<Copy>({
    serialNumber: 0,
    videogameId: null,
    officeId: null,
    entryDate: new Date(),
    availability: "",
    condition: "",
  });
  const [officeList, setOfficeList] = useState<Office[]>([]);
  const [copyResult, setCopyResult] = useState<string>("");
  const [copyError, setCopyError] = useState<string>("");
  const [category, setCategory] = useState<Category>({
    id: 0,
    name: "",
    detail: "",
  });
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  const [videogameList, setVideogameList] = useState<Videogame[]>([]);

  useEffect(() => {
    const getVideogames = async () => {
      setVideogameList(await getAllVideogames());
    };
    const getAllCategories = async () => {
      setCategoryList(await getCategories());
    };
    const getOffices = async () => {
      setOfficeList(await getAllOffices());
    };

    getVideogames();
    getAllCategories();
    getOffices();
  }, [setCategory]);

  const onChangeHandlerVideogame = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { id, value } = e.target;

    setNewVideogame((prev) => {
      switch (id) {
        case "code":
          return { ...prev, code: Number(value) };
        case "name":
          return { ...prev, name: value };
        case "description":
          return { ...prev, description: value };
        case "developer":
          return { ...prev, developer: value };
        case "releaseDate":
          return { ...prev, releaseDate: new Date(value) };
        case "category":
          return { ...prev, categoryId: Number(value) };
        default:
          return prev;
      }
    });
  };

  const onChangeHandlerCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setCategory((prev) => {
      switch (id) {
        case "id":
          return { ...prev, id: Number(value) };
        case "name":
          return { ...prev, name: value };
        case "detail":
          return { ...prev, detail: value };
        default:
          return prev;
      }
    });
  };

  const onSubmitHandlerVideogame = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    await createVideogame(newVideogame);
    setNewVideogame({
      code: 0,
      name: "",
      description: "",
      developer: "",
      releaseDate: new Date(),
      categoryId: 0,
    });
    setVideogameList(await getAllVideogames());
  };
  const onSubmitHandlerCategory = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    await createCategory(category);
    setCategory({
      id: 0,
      name: "",
      detail: "",
    });
    alert("Categoria creada");
  };

  const onChangeHandlerCopy = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { id, value } = e.target;

    setNewCopy((prev) => {
      switch (id) {
        case "serialNumber":
          return { ...prev, serialNumber: Number(value) };
        case "videogame":
          return { ...prev, videogameId: Number(value) };
        case "office":
          return { ...prev, officeId: Number(value) };
        case "availability":
          return { ...prev, availability: value };
        case "condition":
          return { ...prev, condition: value };
        default:
          return prev;
      }
    });
  };

  const onSubmitHandlerCopy = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();
    try {
      const finalCopy = { ...newCopy, entryDate: new Date() };
      await createCopy(finalCopy);
      setCopyResult("✅ Copia ingresada correctamente.");
      setCopyError("");
      setNewCopy({
        serialNumber: 0,
        videogameId: null,
        officeId: null,
        entryDate: new Date(),
        availability: "Disponible",
        condition: "",
      });
      setTimeout(() => setCopyResult(""), 3000);
    } catch (error) {
      const errorMsg =
        (error as Error)?.message || "Error al ingresar la copia.";
      setCopyError(errorMsg);
      setCopyResult("");
      setTimeout(() => setCopyError(""), 4000);
    }
  };

  const formatDate = (date: Date) => date.toISOString().slice(0, 10);
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <main className="flex-1 px-6 py-8">
        {/* TITULO */}
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white">
            Módulo de Videojuegos
          </h2>

          <p className="text-purple-300 mt-2">
            Administra tus videojuegos aqui
          </p>
        </div>

        {/* CONTENIDO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FORM */}
          <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Ingresar Videojuego
            </h3>

            <form className="space-y-5" onSubmit={onSubmitHandlerVideogame}>
              <input
                type="text"
                placeholder="Codigo"
                id="code"
                onChange={onChangeHandlerVideogame}
                required={true}
                value={newVideogame.code || ""}
                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
              />

              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  id="name"
                  onChange={onChangeHandlerVideogame}
                  required={true}
                  value={newVideogame.name}
                  className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="Descripcion"
                  id="description"
                  onChange={onChangeHandlerVideogame}
                  required={true}
                  value={newVideogame.description}
                  className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                />
              </div>

              <input
                type="text"
                placeholder="Desarrollador"
                id="developer"
                onChange={onChangeHandlerVideogame}
                required={true}
                value={newVideogame.developer}
                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
              />

              <input
                type="date"
                id="releaseDate"
                onChange={onChangeHandlerVideogame}
                required
                value={formatDate(newVideogame.releaseDate)}
                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
              />

              <select
                id="category"
                onChange={onChangeHandlerVideogame}
                required
                value={newVideogame.categoryId}
                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
              >
                <option value={0} disabled>
                  Selecciona una categoría
                </option>
                {categoryList.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                className="w-full rounded-2xl bg-linear-to-r from-purple-700 to-purple-500 py-3 text-white font-semibold hover:scale-[1.02] transition"
              >
                Crear Videojuego
              </button>
            </form>
          </div>

          {/* TABLA */}
          <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-6">
              Lista de Videojuegos
            </h3>

            <table className="w-full text-left">
              <thead className="bg-purple-800/40">
                <tr>
                  <th className="px-4 py-3 text-purple-100">Código</th>
                  <th className="px-4 py-3 text-purple-100">Nombre</th>
                  <th className="px-4 py-3 text-purple-100">Descripción</th>
                  <th className="px-4 py-3 text-purple-100">Desarrollador</th>
                  <th className="px-4 py-3 text-purple-100">
                    Fecha de Lanzamiento
                  </th>
                  <th className="px-4 py-3 text-purple-100">Categoría</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {videogameList &&
                  videogameList.map((v) => (
                    <tr key={v.code} className="text-black">
                      <td className="pl-3">{v.code}</td>
                      <td className="pl-3.5">{v.name}</td>
                      <td className="pl-3.5">{v.description}</td>
                      <td className="pl-3.5">{v.developer}</td>
                      <td className="pl-3.5">
                        {new Date(v.releaseDate).toLocaleDateString()}
                      </td>
                      <td className="pl-3.5">
                        {categoryList.find((cat) => cat.id === v.categoryId)
                          ?.name || "N/A"}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl mt-10">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Ingresar copia
          </h3>

          <form className="space-y-5" onSubmit={onSubmitHandlerCopy}>
            <select
              id="videogame"
              onChange={onChangeHandlerCopy}
              required
              value={newCopy.videogameId ?? 0}
              className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
            >
              <option value={0} disabled>
                Selecciona un videojuego
              </option>
              {videogameList.map((v) => (
                <option key={v.code} value={v.code}>
                  {v.name} ({v.code})
                </option>
              ))}
            </select>

            <select
              id="office"
              onChange={onChangeHandlerCopy}
              required
              value={newCopy.officeId ?? 0}
              className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
            >
              <option value={0} disabled>
                Selecciona una sucursal
              </option>
              {officeList.map((o) => (
                <option key={o.number} value={o.number}>
                  {o.number} - {o.name}
                </option>
              ))}
            </select>

            <select
              id="availability"
              onChange={onChangeHandlerCopy}
              required
              value={newCopy.availability}
              className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
            >
              <option value="" disabled>
                Selecciona disponibilidad
              </option>
              <option value="Disponible">Disponible</option>
              <option value="No">No Disponible</option>
            </select>

            <textarea
              placeholder="Comentarios del estado de la copia (opcional)"
              id="condition"
              onChange={onChangeHandlerCopy}
              value={newCopy.condition}
              className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none resize-none"
              rows={4}
            />

            <button
              type="submit"
              className="w-full rounded-2xl bg-gradient-to-r from-purple-700 to-purple-500 py-3 text-white font-semibold hover:scale-[1.02] transition"
            >
              Ingresar copia
            </button>

            {copyResult && (
              <div className="rounded-2xl border border-green-500/50 bg-green-900/30 px-4 py-3 text-green-300 font-semibold animate-pulse">
                {copyResult}
              </div>
            )}
            {copyError && (
              <div className="rounded-2xl border border-red-500/50 bg-red-900/30 px-4 py-3 text-red-300 font-semibold animate-pulse">
                {copyError}
              </div>
            )}
          </form>
        </div>
        <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl mt-10">
          <h3 className="text-2xl font-semibold text-white mb-6">
            Crear categoria
          </h3>

          <form className="space-y-5" onSubmit={onSubmitHandlerCategory}>
            <input
              type="text"
              placeholder="Id"
              id="id"
              onChange={onChangeHandlerCategory}
              required={true}
              value={category.id || ""}
              className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
            />

            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="Nombre"
                id="name"
                onChange={onChangeHandlerCategory}
                required={true}
                value={category.name}
                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
              />
              <input
                type="text"
                placeholder="Descripcion"
                id="detail"
                onChange={onChangeHandlerCategory}
                required={true}
                value={category.detail}
                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-2xl bg-linear-to-r from-purple-700 to-purple-500 py-3 text-white font-semibold hover:scale-[1.02] transition"
            >
              Crear Categoria
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default VideogamePage;
