import Image from 'next/image'

const products = [
  { id: 1, name: 'Taza', description: 'Taza de cerámica con patrón personalizado impreso en 3D', price: '$50.000', image: '/images/cup.png' },
  { id: 2, name: 'Funda de teléfono', description: 'Funda de teléfono con diseño personalizado impreso en 3D', price: '$30.000', image: '/images/phonecase.png' },
  { id: 3, name: 'Lámpara', description: 'Lámpara de mesa con base personalizada impresa en 3D', price: '$30.000', image: '/images/lamp.png' },
  { id: 4, name: 'Miniatura', description: 'Escena en miniatura detallada con elementos impresos en 3D', price: '$70.000', image: '/images/mini.png' },
  { id: 5, name: 'Estatua', description: 'Estatua con diseño personalizado impreso en 3D', price: '$30.000', image: '/images/statue.png' },
  { id: 6, name: 'Maceta', description: 'Maceta con patrón personalizado impreso en 3D', price: '$30.000', image: '/images/pot.png' },
]

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">¡Hola mundo 3D!</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <Image src={product.image} alt={product.name} width={400} height={400} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-600 mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
                  Añadir
                </button>
                <span className="text-lg font-bold">{product.price}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}