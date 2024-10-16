import Image from 'next/image'

const products = [
  { id: 1, name: 'Mug', description: 'Ceramic mug with custom 3D printed pattern', price: '$50.000', image: '/placeholder.svg?height=200&width=200' },
  { id: 2, name: 'Phone case', description: 'Phone case with custom 3D printed design', price: '$30.000', image: '/placeholder.svg?height=200&width=200' },
  { id: 3, name: 'Lamp', description: 'Table lamp with custom 3D printed base', price: '$30.000', image: '/placeholder.svg?height=200&width=200' },
  { id: 4, name: 'Miniature', description: 'Detailed miniature scene with 3D printed elements', price: '$70.000', image: '/placeholder.svg?height=200&width=200' },
  { id: 5, name: 'Statue', description: 'Statue with custom 3D printed design', price: '$30.000', image: '/placeholder.svg?height=200&width=200' },
  { id: 6, name: 'Planter', description: 'Planter with custom 3D printed pattern', price: '$30.000', image: '/placeholder.svg?height=200&width=200' },
]

export default function LandingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">!Hola mundo 3D!</h1>
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