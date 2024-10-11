import React, { useState, useEffect } from 'react'
import { Award } from 'lucide-react'

interface User {
  id: number
  name: string
  exp: number
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([])
  const [selectedUser, setSelectedUser] = useState<number | null>(null)
  const [medalName, setMedalName] = useState('')

  useEffect(() => {
    // TODO: Fetch users from FSAirlines API
    // For now, we'll use mock data
    setUsers([
      { id: 1, name: 'John Doe', exp: 1000 },
      { id: 2, name: 'Jane Smith', exp: 1500 },
      { id: 3, name: 'Bob Johnson', exp: 800 },
    ])
  }, [])

  const handleAssignMedal = () => {
    if (selectedUser && medalName) {
      // TODO: Implement API call to assign medal
      console.log(`Assigning medal "${medalName}" to user with ID ${selectedUser}`)
      setMedalName('')
      setSelectedUser(null)
    }
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Panel de Administración</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Asignar Medalla</h2>
        <div className="flex space-x-4 mb-4">
          <select
            className="border p-2 rounded"
            value={selectedUser || ''}
            onChange={(e) => setSelectedUser(Number(e.target.value))}
          >
            <option value="">Seleccionar usuario</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Nombre de la medalla"
            className="border p-2 rounded flex-grow"
            value={medalName}
            onChange={(e) => setMedalName(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
            onClick={handleAssignMedal}
          >
            <Award className="mr-2" size={20} />
            Asignar Medalla
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-4">Lista de Usuarios</h2>
        <ul>
          {users.map(user => (
            <li key={user.id} className="mb-2">
              {user.name} - {user.exp} EXP
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AdminPanel