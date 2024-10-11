import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { utils, writeFile } from 'xlsx'

interface FlightLogEntry {
  date: string
  callsign: string
  network: 'VATSIM' | 'IVAO'
  aircraft: string
  departure: string
  arrival: string
}

const FlightLog: React.FC = () => {
  const [flightLogs, setFlightLogs] = useState<FlightLogEntry[]>([])
  const { register, handleSubmit, reset } = useForm<FlightLogEntry>()

  const onSubmit = (data: FlightLogEntry) => {
    setFlightLogs([data, ...flightLogs])
    reset()
  }

  const downloadExcel = () => {
    const ws = utils.json_to_sheet(flightLogs)
    const wb = utils.book_new()
    utils.book_append_sheet(wb, ws, 'Flight Logs')
    writeFile(wb, 'flight_logs.xlsx')
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Registro de Vuelos</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="mb-8 space-y-4">
        <input {...register('date')} type="date" className="w-full p-2 border rounded" required />
        <input {...register('callsign')} placeholder="Callsign" className="w-full p-2 border rounded" required />
        <select {...register('network')} className="w-full p-2 border rounded" required>
          <option value="VATSIM">VATSIM</option>
          <option value="IVAO">IVAO</option>
        </select>
        <input {...register('aircraft')} placeholder="Aircraft" className="w-full p-2 border rounded" required />
        <input {...register('departure')} placeholder="Departure Airport" className="w-full p-2 border rounded" required />
        <input {...register('arrival')} placeholder="Arrival Airport" className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Registrar Vuelo</button>
      </form>

      <h2 className="text-2xl font-bold mb-4">Último Vuelo Registrado</h2>
      {flightLogs.length > 0 ? (
        <div className="bg-white p-4 rounded shadow mb-8">
          <p><strong>Fecha:</strong> {flightLogs[0].date}</p>
          <p><strong>Callsign:</strong> {flightLogs[0].callsign}</p>
          <p><strong>Red:</strong> {flightLogs[0].network}</p>
          <p><strong>Avión:</strong> {flightLogs[0].aircraft}</p>
          <p><strong>Ruta:</strong> {flightLogs[0].departure} - {flightLogs[0].arrival}</p>
        </div>
      ) : (
        <p>No hay vuelos registrados aún.</p>
      )}

      <button onClick={downloadExcel} className="p-2 bg-green-500 text-white rounded hover:bg-green-600">
        Descargar Registro de Vuelos (Excel)
      </button>
    </div>
  )
}

export default FlightLog