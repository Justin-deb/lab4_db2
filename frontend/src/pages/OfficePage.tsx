import { useEffect, useState } from "react";
import type { Office } from "../types/Office";
import { getAllOffices, createOffice } from "../service/OfficeService";

const OfficePage = () => {
    const [newOffice, setNewOffice] = useState<Office>({
        number: 0,
        name: '',
    });
    const [officeList, setOfficeList] = useState<Office[]>([]);
    const [result, setResult] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const getOffices = async () => {
            try {
                setOfficeList(await getAllOffices());
            } catch (err) {
                setError((err as Error)?.message || 'Error al cargar oficinas');
            }
        }
        getOffices();
    }, []);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;

        setNewOffice(prev => {
            switch (id) {
                case 'number':
                    return { ...prev, number: Number(value) };
                case 'name':
                    return { ...prev, name: value };
                default:
                    return prev;
            }
        });
    };

    const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createOffice(newOffice);
            setResult('✅ Sucursal creada correctamente.');
            setError('');
            setNewOffice({
                number: 0,
                name: '',
            });
            const updatedOffices = await getAllOffices();
            setOfficeList(updatedOffices);
            // Auto-limpiar mensaje después de 3 segundos
            setTimeout(() => setResult(''), 3000);
        } catch (err) {
            const errorMsg = (err as Error)?.message || 'Error al crear la sucursal.';
            setError('❌ ' + errorMsg);
            setResult('');
            // Auto-limpiar error después de 4 segundos
            setTimeout(() => setError(''), 4000);
        }
    }

    return (
        <div className="min-h-screen bg-black flex flex-col">
            <main className="flex-1 px-6 py-8">

                {/* TITULO */}
                <div className="mb-8">
                    <h2 className="text-4xl font-bold text-white">
                        Módulo de Sucursales
                    </h2>
                    <p className="text-purple-300 mt-2">
                        Administra tus sucursales aquí
                    </p>
                </div>

                {/* CONTENIDO */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                    {/* FORM */}
                    <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl">

                        <h3 className="text-2xl font-semibold text-white mb-6">
                            Ingresar Sucursal
                        </h3>

                        <form className="space-y-5" onSubmit={onSubmitHandler}>

                            <input
                                type="text"
                                placeholder="Número"
                                id="number"
                                onChange={onChangeHandler}
                                required={true}
                                value={newOffice.number || ''}
                                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                            />

                            <input
                                type="text"
                                placeholder="Nombre"
                                id="name"
                                onChange={onChangeHandler}
                                required={true}
                                value={newOffice.name}
                                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                            />

                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-gradient-to-r from-purple-700 to-purple-500 py-3 text-white font-semibold hover:scale-[1.02] transition"
                            >
                                Crear Sucursal
                            </button>

                            {result && (
                                <div className="rounded-2xl border border-green-500/50 bg-green-900/30 px-4 py-3 text-green-300 font-semibold animate-pulse">
                                    {result}
                                </div>
                            )}
                            {error && (
                                <div className="rounded-2xl border border-red-500/50 bg-red-900/30 px-4 py-3 text-red-300 font-semibold animate-pulse">
                                    {error}
                                </div>
                            )}
                        </form>
                    </div>

                    {/* TABLA */}
                    <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl">

                        <h3 className="text-2xl font-semibold text-white mb-6">
                            Lista de Sucursales
                        </h3>

                        <table className="w-full text-left">
                            <thead className="bg-purple-800/40">
                                <tr>
                                    <th className="px-4 py-3 text-purple-100">Número</th>
                                    <th className="px-4 py-3 text-purple-100">Nombre</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white">
                                {officeList && officeList.map(office => (
                                    <tr key={office.number} className="text-black">
                                        <td className="pl-3">{office.number}</td>
                                        <td className="pl-3.5">{office.name}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main >
        </div >
    );
}

export default OfficePage
