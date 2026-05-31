import { useEffect, useState } from "react";
import type { Videogame } from "../types/Videogame";
import { createVideogame, getAllVideogames } from "../service/VideogameService";

const VideogamePage = () => {
    const [newVideogame, setNewVideogame] = useState<Videogame>({
        code: 0,
        name: '',
        description: '',
        developer: '',
        releaseDate: new Date,
        categoryId: 0,
    });

    const [videogameList, setVideogameList] = useState<Videogame[]>();

    useEffect(() => {
        const getVideogames = async () => {
            setVideogameList(await getAllVideogames());
        }

        getVideogames();
    }, [videogameList]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const updatedVideogame: Videogame = newVideogame!;
        switch (e.currentTarget.id) {
            case 'code':
                updatedVideogame.code = Number.parseInt(value);
                setNewVideogame(updatedVideogame);
                break;
            case 'name':
                updatedVideogame.name = value;
                setNewVideogame(updatedVideogame);
                break;
            case 'description':
                updatedVideogame.description = value;
                setNewVideogame(updatedVideogame);
                break;
            case 'developer':
                updatedVideogame.developer = value;
                setNewVideogame(updatedVideogame);
                break;
            case 'releaseDate':
                updatedVideogame.releaseDate = new Date(value);
                setNewVideogame(updatedVideogame);
                break;
            case 'category':
                updatedVideogame.categoryId = Number.parseInt(value);
                setNewVideogame(updatedVideogame);
                break;
        }
    };

    const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        createVideogame(newVideogame);
        setNewVideogame({
            code: 0,
            name: '',
            description: '',
            developer: '',
            releaseDate: new Date,
            categoryId: 0,
        });

    }
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

                        <form className="space-y-5" onSubmit={onSubmitHandler}>

                            <input
                                type="number"
                                placeholder="Codigo"
                                id="code"
                                onChange={onChangeHandler}
                                required={true}
                                value={newVideogame.code}
                                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                            />

                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Nombre"
                                    id="name"
                                    onChange={onChangeHandler}
                                    required={true}
                                    value={newVideogame.name}
                                    className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Descripcion"
                                    id="description"
                                    onChange={onChangeHandler}
                                    required={true}
                                    value={newVideogame.description}
                                    className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                                />
                            </div>

                            <input
                                type="text"
                                placeholder="Desarrollador"
                                id="developer"
                                onChange={onChangeHandler}
                                required={true}
                                value={newVideogame.developer}
                                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                            />

                            <input
                                type="date"
                                id="releaseDate"
                                onChange={onChangeHandler}
                                required={true}
                                value={Date()}
                                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Dirección de vivienda"
                                id="category"
                                onChange={onChangeHandler}
                                required={true}
                                value={newVideogame.categoryId}
                                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                            />

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-linear-to-r from-purple-700 to-purple-500 py-3 text-white font-semibold hover:scale-[1.02] transition"
                            >
                                Crear Cliente
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
                                    <th className="px-4 py-3 text-purple-100">
                                        Cédula
                                    </th>

                                    <th className="px-4 py-3 text-purple-100">
                                        Nombre
                                    </th>

                                    <th className="px-4 py-3 text-purple-100">
                                        Correo
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="bg-white ">
                                {/* {clientList?.map((c) => (
                                    <tr key={c.id} className="text-black">
                                        <td className="pl-3">{c.id}</td>
                                        <td className="pl-3.5">{c.name}</td>
                                        <td className="pl-3.5">{c.email}</td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div >
            </main >
        </div >
    );
}

export default VideogamePage