import Image from 'next/image'

const products = [
  { id: 1, name: 'Model 1', description: 'This is a 3D model', image: '/placeholder.svg', price: '$100' },
  { id: 2, name: 'Model 2', description: 'This is a 3D model', image: '/placeholder.svg', price: '$200' },
  { id: 3, name: 'Model 3', description: 'This is a 3D model', image: '/placeholder.svg', price: '$300' },
  { id: 4, name: 'Model 4', description: 'This is a 3D model', image: '/placeholder.svg', price: '$400' },
  { id: 5, name: 'Model 5', description: 'This is a 3D model', image: '/placeholder.svg', price: '$500' },
]

export default function ProductList() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Todos los productos</h1>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600">
          Añadir producto
        </button>
      </div>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search 3D Models (Esta barra puede ser opcional)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Descripción</th>
              <th className="px-4 py-2 text-left">Imagen</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2">{product.description}</td>
                <td className="px-4 py-2">
                  <Image src={product.image} alt={product.name} width={40} height={40} className="rounded-full" />
                </td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">
                  <a href="#" className="text-blue-500 hover:underline mr-2">Edit</a>
                  <a href="#" className="text-blue-500 hover:underline">Delete</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}