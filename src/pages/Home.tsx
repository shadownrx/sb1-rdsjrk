import React, { useEffect, useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getRecentFlights } from '../api';

interface Flight {
  _id: string;
  date: string;
  callsign: string;
  departure: string;
  arrival: string;
  aircraft: string;
}

const Home: React.FC = () => {
  const { darkMode } = useTheme();
  const [recentFlights, setRecentFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const fetchRecentFlights = async () => {
      try {
        const response = await getRecentFlights();
        setRecentFlights(response.data);
      } catch (error) {
        console.error('Error fetching recent flights:', error);
      }
    };

    fetchRecentFlights();
  }, []);

  return (
    <div
      className={`min-h-screen ${
        darkMode ? 'bg-black text-white' : 'bg-white text-black'
      }`}
    >
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Bienvenido a Oceanic Reward</h1>
        <p className="text-xl mb-8">
          Gana medallas, obtén licencias y canjea tus puntos por productos
          exclusivos.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Medallas</h2>
            <p>Gana medallas por tus logros en FSAirlines.</p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Licencias</h2>
            <p>
              Obtén licencias especiales para mejorar tu experiencia de vuelo.
            </p>
          </div>
          <div
            className={`p-6 rounded-lg shadow-md ${
              darkMode ? 'bg-gray-800' : 'bg-gray-100'
            }`}
          >
            <h2 className="text-2xl font-semibold mb-4">Mercado</h2>
            <p>Canjea tus puntos de experiencia por productos exclusivos.</p>
          </div>
        </div>
        <div
          className={`p-6 rounded-lg shadow-md ${
            darkMode ? 'bg-gray-800' : 'bg-gray-100'
          }`}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Últimos Vuelos Reportados
          </h2>
          {recentFlights.length > 0 ? (
            <ul>
              {recentFlights.map((flight) => (
                <li key={flight._id} className="mb-2">
                  <span className="font-semibold">
                    {new Date(flight.date).toLocaleDateString()}
                  </span>{' '}
                  -{flight.callsign} ({flight.departure} → {flight.arrival}) -{' '}
                  {flight.aircraft}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay vuelos recientes para mostrar.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
