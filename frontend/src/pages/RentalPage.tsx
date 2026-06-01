import React, { useEffect, useState } from 'react'
import type { Rental } from '../types/Rental'
import type { Videogame } from '../types/Videogame'
import { getAllVideogames } from '../service/VideogameService'
import { getActiveRentals, getRentHistory, rentVideogame } from '../service/RentalService'

const RentalPage = () => {
  const [rental, setRental] = useState<Rental>({
    sequence: 0,
    clientId: '',
    copyId: 0,
    loanDate: new Date(),
    days: 0,
    returnDate: new Date(),
    returnDetails: '',
  })

  const [rentalList, setRentalList] = useState<Rental[]>([])
  const [clientId, setClientId] = useState<string>('')
  const [videogameList, setVideogameList] = useState<Videogame[]>([])

  useEffect(() => {
    const loadVideogames = async () => {
      setVideogameList(await getAllVideogames())
    }
    loadVideogames()
  }, [])

  const onChangeHandlerRental = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target

    setRental(prev => {
      switch (id) {
        case 'sequence':
          return { ...prev, sequence: Number(value) }
        case 'clientId':
          return { ...prev, clientId: value }
        case 'copyId':
          return { ...prev, copyId: Number(value) }
        case 'loanDate':
          return { ...prev, loanDate: new Date(value) }
        case 'days':
          return { ...prev, days: Number(value) }
        default:
          return prev
      }
    })
  }

  const onSubmitHandlerRental = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const loanDate = rental.loanDate ?? new Date()
    const days = rental.days ?? 0
    const finalRental: Rental = {
      ...rental,
      loanDate,
      returnDate: new Date(loanDate.getTime() + days * 24 * 60 * 60 * 1000),
    }

    await rentVideogame(finalRental)

    setRental({
      sequence: 0,
      clientId: '',
      copyId: 0,
      loanDate: new Date(),
      days: 0,
      returnDate: new Date(),
      returnDetails: '',
    })

    alert('Se alquilo el juego')
  }

  const onClickActiveRentals = async () => {
    if (!clientId) {
      alert('Ingrese una cedula')
      return
    }
    setRentalList(await getActiveRentals(clientId))
  }

  const onClickHistoricRentals = async () => {
    if (!clientId) {
      alert('Ingrese una cedula')
      return
    }
    setRentalList(await getRentHistory(clientId))
  }

  const formatDate = (date: Date) => date.toISOString().slice(0, 10)

  return (
    <div className="min-h-screen bg-black flex flex-col">
      <main className="flex-1 px-6 py-8">
        <div className="mb-8">
          <h2 className="text-4xl font-bold text-white">Módulo de Alquileres</h2>
          <p className="text-purple-300 mt-2">
            Aqui puedes alquilar un videojuego, ver alquileres activos y todos los alquileres
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-6">Alquilar videojuego</h3>

            <form className="space-y-5" onSubmit={onSubmitHandlerRental}>
              <input
                type="number"
                placeholder="sequencia"
                id="sequence"
                onChange={onChangeHandlerRental}
                value={rental.sequence}
                required
                className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
              />

              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Id cliente"
                  id="clientId"
                  onChange={onChangeHandlerRental}
                  value={rental.clientId}
                  required
                  className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                />

                <select
                  id="copyId"
                  onChange={onChangeHandlerRental}
                  value={rental.copyId!}
                  required
                  className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                >
                  <option value={0} disabled>
                    Selecciona un videojuego
                  </option>
                  {videogameList.map(v => (
                    <option key={v.code} value={v.code}>
                      {v.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <input
                  type="date"
                  id="loanDate"
                  onChange={onChangeHandlerRental}
                  value={formatDate(rental.loanDate)}
                  required
                  className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                />

                <input
                  type="number"
                  placeholder="Dias"
                  id="days"
                  onChange={onChangeHandlerRental}
                  value={rental.days!}
                  required
                  className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-2xl bg-linear-to-r from-purple-700 to-purple-500 py-3 text-white font-semibold hover:scale-[1.02] transition"
              >
                Alquilar Videojuego
              </button>
            </form>
          </div>

          <div className="rounded-3xl border border-purple-500/20 bg-purple-950/40 backdrop-blur-md p-6 shadow-2xl">
            <h3 className="text-2xl font-semibold text-white mb-6">Lista de Alquileres</h3>

            <div className="flex flex-col justify-between h-full">
              <table className="w-full text-left">
                <thead className="bg-purple-800/40">
                  <tr>
                    <th className="px-4 py-3 text-purple-100">Código</th>
                    <th className="px-4 py-3 text-purple-100">Id copia</th>
                    <th className="px-4 py-3 text-purple-100">Fecha de prestamo</th>
                    <th className="px-4 py-3 text-purple-100">Cantidad de dias</th>
                    <th className="px-4 py-3 text-purple-100">Fecha de retorno</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {rentalList.map((r, index) => (
                    <tr key={index} className="text-black">
                      <td className="pl-3">{r.sequence}</td>
                      <td className="pl-3.5">{r.copyId}</td>
                      <td className="pl-3.5">{new Date(r.loanDate).toLocaleDateString()}</td>
                      <td className="pl-3.5">{r.days}</td>
                      <td className="pl-3.5">{new Date(r.returnDate).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex space-x-3 mb-12">
                <input
                  type="text"
                  placeholder="Cedula"
                  value={clientId}
                  onChange={e => setClientId(e.target.value)}
                  className="w-full rounded-2xl border border-purple-400/20 bg-black/40 px-4 py-3 text-white outline-none"
                />
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="w-full rounded-2xl bg-linear-to-r from-purple-700 to-purple-500 py-3 text-white font-semibold hover:scale-[1.02] transition"
                    onClick={onClickActiveRentals}
                  >
                    Alquileres activos
                  </button>
                  <button
                    type="button"
                    className="w-full rounded-2xl bg-linear-to-r from-purple-700 to-purple-500 py-3 text-white font-semibold hover:scale-[1.02] transition"
                    onClick={onClickHistoricRentals}
                  >
                    Historico de alquileres
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default RentalPage