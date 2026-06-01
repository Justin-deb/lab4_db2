import React, { useState } from 'react'
import type { Rental } from '../types/Rental';
import { rentVideogame } from '../service/RentalService';

const RentalPage = () => {
    const [rental, setRental] = useState<Rental>({
        sequence: 0,
        clientId: '',
        copyId: 0,
        loanDate: new Date(),
        days: 0,
        returnDate: new Date(),
        returnDetails: '',
    });

    const onChangeHandlerRental = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;

        setRental(prev => {
            switch (id) {
                case 'code':
                    return { ...prev, code: Number(value) };
                case 'name':
                    return { ...prev, name: value };
                case 'description':
                    return { ...prev, description: value };
                case 'developer':
                    return { ...prev, developer: value };
                case 'releaseDate':
                    return { ...prev, releaseDate: new Date(value) };
                case 'category':
                    return { ...prev, categoryId: Number(value) };
                default:
                    return prev;
            }
        });
    };

    // const onChangeHandlerCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    //     const { id, value } = e.target;

    //     setCategory(prev => {
    //         switch (id) {
    //             case 'id':
    //                 return { ...prev, id: Number(value) };
    //             case 'name':
    //                 return { ...prev, name: value };
    //             case 'detail':
    //                 return { ...prev, detail: value };
    //             default:
    //                 return prev;
    //         }
    //     });
    // };

    const onSubmitHandlerRental = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await rentVideogame(rental);
        setRental({
            sequence: 0,
            clientId: '',
            copyId: 0,
            loanDate: new Date(),
            days: 0,
            returnDate: new Date(),
            returnDetails: '',
        });
    }
    // const onSubmitHandlerCategory = async (event: React.FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     await createCategory(category);
    //     setCategory({
    //         id: 0,
    //         name: '',
    //         detail: '',
    //     });
    //     alert('Categoria creada');
    // }
    const formatDate = (date: Date) => date.toISOString().slice(0, 10);
    return (
        <div className="min-h-screen bg-black flex flex-col">
            <main className="flex-1 px-6 py-8">

                {/* TITULO */}
                <div className="mb-8">

                    <h2 className="text-4xl font-bold text-white">
                        Módulo de Alquileres
                    </h2>

                    <p className="text-purple-300 mt-2">
                        Aqui puedes alquilar un videojuego, ver alquileres activos y todos los alquileres
                    </p>
                </div>

                {/* CONTENIDO */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* FORM */}
                    <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl">

                        <h3 className="text-2xl font-semibold text-white mb-6">
                            Alquilar videojuego
                        </h3>

                        <form className="space-y-5" onSubmit={onSubmitHandlerRental}>

                            <input
                                type="text"
                                placeholder="sequencia"
                                id="sequence"
                                onChange={onChangeHandlerRental}
                                required={true}
                                value={rental.sequence}
                                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                            />

                            <div className="flex space-x-4">
                                <input
                                    type="text"
                                    placeholder="Id cliente"
                                    id="clientId"
                                    onChange={onChangeHandlerRental}
                                    required={true}
                                    value={rental.clientId}
                                    className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Id copia"
                                    id="copyId"
                                    onChange={onChangeHandlerRental}
                                    required={true}
                                    className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                                />
                            </div>

                            <input
                                type="date"
                                id="loanDate"
                                onChange={onChangeHandlerRental}
                                required
                                value={formatDate(rental.loanDate)}
                                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Dias"
                                id="days"
                                onChange={onChangeHandlerRental}
                                required={true}
                                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                            />

                            <input
                                type="date"
                                id="returnDate"
                                onChange={onChangeHandlerRental}
                                required
                                value={formatDate(rental.returnDate)}
                                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                            />

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-linear-to-r from-purple-700 to-purple-500 py-3 text-white font-semibold hover:scale-[1.02] transition"
                            >
                                Alquilar Videojuego
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
                                    <th className="px-4 py-3 text-purple-100">Fecha de Lanzamiento</th>
                                    <th className="px-4 py-3 text-purple-100">Categoría</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {/* {videogameList && videogameList.map(v => (
                                    <tr key={v.code} className="text-black">
                                        <td className="pl-3">{v.code}</td>
                                        <td className="pl-3.5">{v.name}</td>
                                        <td className="pl-3.5">{v.description}</td>
                                        <td className="pl-3.5">{v.developer}</td>
                                        <td className="pl-3.5">{new Date(v.releaseDate).toLocaleDateString()}</td>
                                        <td className="pl-3.5">
                                            {categoryList.find(cat => cat.id === v.categoryId)?.name || 'N/A'}
                                        </td>
                                    </tr>
                                ))} */}
                            </tbody>
                        </table>
                    </div>
                </div >
                {/* <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl mt-10">

                    <h3 className="text-2xl font-semibold text-white mb-6">
                        Crear categoria
                    </h3>

                    <form className="space-y-5" onSubmit={onSubmitHandlerCategory}>

                        <input
                            type="text"
                            placeholder="Codigo"
                            id="id"
                            onChange={onChangeHandlerCategory}
                            required={true}
                            value={category.id}
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
                </div> */}
            </main >
        </div >
    );
}

export default RentalPage