import React, { useState, useEffect } from 'react'
import { Medal } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { getProfile } from '../api'

interface ProfileData {
  name: string;
  exp: number;
  medals: string[];
  licenses: string[];
}

const Profile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfile()
        setProfile(response.data)
      } catch (error) {
        console.error('Error fetching profile:', error)
      }
    }

    if (user) {
      fetchProfile()
    }
  }, [user])

  if (!profile) return <div>Cargando perfil...</div>

  return (
    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">{profile.name}</h1>
      <p className="text-xl mb-4 dark:text-gray-300">Experiencia: {profile.exp} puntos</p>
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">Medallas</h2>
        <ul className="list-disc list-inside dark:text-gray-300">
          {profile.medals.map((medal: string, index: number) => (
            <li key={index} className="flex items-center mb-2">
              <Medal className="mr-2 text-yellow-500" size={20} />
              {medal}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2 className="text-2xl font-semibold mb-2 dark:text-white">Licencias</h2>
        <ul className="list-disc list-inside dark:text-gray-300">
          {profile.licenses.map((license: string, index: number) => (
            <li key={index}>{license}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Profile