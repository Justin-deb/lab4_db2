import { useEffect, useState } from "react";
import type { Client } from "../types/Client";
import { createClient, getAllClients } from "../service/ClientService";

function Clients() {
  const [newClient, setNewClient] = useState<Client>({
    id: '',
    name: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    address: '',
    dateRegistered: new Date()
  });

  const [clientList, setClientList] = useState<Client[]>();

  useEffect(() => {
    const getClients = async () => {
      setClientList(await getAllClients());
    }

    getClients();
  }, [clientList]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const updatedClient: Client = newClient!;
    switch (e.currentTarget.id) {
      case 'id':
        updatedClient.id = value;
        setNewClient(updatedClient);
        break;
      case 'name':
        updatedClient.name = value;
        setNewClient(updatedClient);
        break;
      case 'lastName':
        updatedClient.lastName = value;
        setNewClient(updatedClient);
        break;
      case 'phoneNumber':
        updatedClient.phoneNumber = value;
        setNewClient(updatedClient);
        break;
      case 'email':
        updatedClient.email = value;
        setNewClient(updatedClient);
        break;
      case 'address':
        updatedClient.address = value;
        setNewClient(updatedClient);
        break;
    }
  };

  const onSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalClient: Client = newClient!;
    finalClient.dateRegistered = new Date();
    createClient(finalClient);
    setNewClient({
      id: '',
      name: '',
      lastName: '',
      phoneNumber: '',
      email: '',
      address: '',
      dateRegistered: new Date()
    });

  }
  return (
    <div className="min-h-screen bg-black flex flex-col">
      <main className="flex-1 px-6 py-8">

        {/* TITULO */}
        <div className="mb-8">

          <h2 className="text-4xl font-bold text-white">
            Módulo de Clientes
          </h2>

          <p className="text-purple-300 mt-2">
            Gestión y administración de clientes
          </p>
        </div>

        {/* CONTENIDO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* FORM */}
          <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl">

            <h3 className="text-2xl font-semibold text-white mb-6">
              Ingresar Cliente
            </h3>

            <form className="space-y-5" onSubmit={onSubmitHandler}>

              <input
                type="text"
                placeholder="Cédula"
                id="id"
                onChange={onChangeHandler}
                required={true}
                value={newClient.id}
                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
              />

              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  id="name"
                  onChange={onChangeHandler}
                  required={true}
                  value={newClient.name}
                  className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                />
                <input
                  type="text"
                  placeholder="Apellidos"
                  id="lastName"
                  onChange={onChangeHandler}
                  required={true}
                  value={newClient.lastName}
                  className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                />
              </div>

              <input
                type="tel"
                placeholder="Número telefonico ej: 12345678"
                pattern="[0-9]{8}"
                id="phoneNumber"
                onChange={onChangeHandler}
                required={true}
                value={newClient.phoneNumber}
                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
              />

              <input
                type="email"
                placeholder="Correo Electrónico"
                id="email"
                onChange={onChangeHandler}
                required={true}
                value={newClient.email}
                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
              />

              <input
                type="text"
                placeholder="Dirección de vivienda"
                id="address"
                onChange={onChangeHandler}
                required={true}
                value={newClient.address}
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
              Lista de Clientes
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
                {clientList?.map((c) => (
                  <tr key={c.id} className="text-black">
                    <td className="pl-3">{c.id}</td>
                    <td className="pl-3.5">{c.name}</td>
                    <td className="pl-3.5">{c.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div >
      </main >
    </div >
  );
}

export default Clients;