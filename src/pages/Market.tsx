import React, { useState, useEffect } from 'react'

interface Product {
  id: number
  name: string
  description: string
  price: number
  image: string
}

const Market: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    // TODO: Fetch products from API
    // For now, we'll use mock data
    setProducts([
      { id: 1, name: 'Camiseta FSAirlines', description: 'Camiseta oficial de FSAirlines', price: 500, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 2, name: 'Taza de piloto', description: 'Taza con diseño de cabina de avión', price: 300, image: 'https://images.unsplash.com/photo-1577937927133-66ef87ce9e0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
      { id: 3, name: 'Gorra FSAirlines', description: 'Gorra oficial de FSAirlines', price: 400, image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60' },
    ])
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Mercado de Productos</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map(product => (
          <div key={product.id} className="bg-white p-6 rounded-lg shadow-md">
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4 rounded" />
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold">{product.price} EXP</span>
              <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Canjear</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Market