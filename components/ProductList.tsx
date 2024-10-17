'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Product {
  id: number
  name: string
  description: string
  image: string
  price: string
}

const initialProducts: Product[] = [
  { id: 1, name: 'Model 1', description: 'This is a 3D model', image: '/placeholder.svg', price: '$100' },
  { id: 2, name: 'Model 2', description: 'This is a 3D model', image: '/placeholder.svg', price: '$200' },
  { id: 3, name: 'Model 3', description: 'This is a 3D model', image: '/placeholder.svg', price: '$300' },
  { id: 4, name: 'Model 4', description: 'This is a 3D model', image: '/placeholder.svg', price: '$400' },
  { id: 5, name: 'Model 5', description: 'This is a 3D model', image: '/placeholder.svg', price: '$500' },
]

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const handleEdit = (product: Product) => {
    setCurrentProduct(product)
    setIsEditDialogOpen(true)
  }

  const handleAdd = () => {
    setCurrentProduct({ id: Date.now(), name: '', description: '', image: '/placeholder.svg', price: '' })
    setIsAddDialogOpen(true)
  }

  const handleDelete = (product: Product) => {
    setCurrentProduct(product)
    setIsDeleteDialogOpen(true)
  }

  const handleSave = (product: Product) => {
    if (isEditDialogOpen) {
      setProducts(products.map(p => p.id === product.id ? product : p))
      setIsEditDialogOpen(false)
    } else if (isAddDialogOpen) {
      setProducts([...products, product])
      setIsAddDialogOpen(false)
    }
    setCurrentProduct(null)
  }

  const handleConfirmDelete = () => {
    if (currentProduct) {
      setProducts(products.filter(p => p.id !== currentProduct.id))
      setIsDeleteDialogOpen(false)
      setCurrentProduct(null)
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0])
    }
  }

  const handleUploadClick = () => {
    document.getElementById('fileInput')?.click()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Todos los productos</h1>
        <Button onClick={handleAdd}>Añadir producto</Button>
      </div>
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search 3D Models (Esta barra puede ser opcional)"
          className="w-full"
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
                  <Button variant="link" className="mr-2" onClick={() => handleEdit(product)}>Edit</Button>
                  <Button variant="link" onClick={() => handleDelete(product)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editando {currentProduct?.name}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nombre</Label>
              <Input id="name" value={currentProduct?.name} className="col-span-3" onChange={(e) => setCurrentProduct({ ...currentProduct!, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Descripción</Label>
              <Input id="description" value={currentProduct?.description} className="col-span-3" onChange={(e) => setCurrentProduct({ ...currentProduct!, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Imagen</Label>
              <Button id="image" className="col-span-3">Subir imagen</Button>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Precio</Label>
              <Input id="price" value={currentProduct?.price} className="col-span-3" onChange={(e) => setCurrentProduct({ ...currentProduct!, price: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => currentProduct && handleSave(currentProduct)}>Guardar cambios</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Añadir Producto</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nombre</Label>
              <Input id="name" value={currentProduct?.name} className="col-span-3" onChange={(e) => setCurrentProduct({ ...currentProduct!, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Descripción</Label>
              <Input id="description" value={currentProduct?.description} className="col-span-3" onChange={(e) => setCurrentProduct({ ...currentProduct!, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Imagen</Label>
              <div>
              <Button id="image" onClick={handleUploadClick} className="col-span-3">Subir imagen</Button>
                <input
                  id="fileInput"
                  type="file"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                {selectedFile && <p>Selected file: {selectedFile.name}</p>}
                {/* Rest of your component code */}
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Precio</Label>
              <Input id="price" value={currentProduct?.price} className="col-span-3" onChange={(e) => setCurrentProduct({ ...currentProduct!, price: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => currentProduct && handleSave(currentProduct)}>Añadir Producto</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Eliminación</DialogTitle>
          </DialogHeader>
          <p>¿Está seguro de que desea eliminar {currentProduct?.name}?</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Salir</Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>Borrar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}