'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { uploadModel, uploadImage, createProduct, getProducts, getProduct, updateProduct, deleteImage, deleteModel, deleteProduct } from "../models/product/product"

interface Product {
  id: string
  name: string
  description: string
  image: string
  price: string
  model: string
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  const [currentProduct, setCurrentProduct] = useState<{ id: string, name: string, description: string, price: string, image: File | null, model: File | null }>({ id: '', name: '', description: '', price: '', image: null, model:null })
  const [newProduct, setNewProduct] = useState<{ name: string, description: string, price: string, image: File | null, model: File | null }>({ name: '', description: '', price: '', image: null, model:null })

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const handleImageUpload = async (file: File) => {
    return uploadImage(file)
  }

  const handleModelUpload = async (file: File) => {
    return uploadModel(file)
  }

  const handleSave = async () => {
    let imageUrl = '';
    let modelUrl = '';
    if (newProduct.image) {
      imageUrl = (await handleImageUpload(newProduct.image)) || ''
    }
    if (newProduct.model) {
      modelUrl = await handleModelUpload(newProduct.model) || ''
    }    
      const productData = { ...newProduct, image: imageUrl, model: modelUrl }
      const docRef = await createProduct(productData);
      if (docRef) {
        setProducts([...products, { ...productData, id: docRef.id, image: productData.image || '', model: productData.model || '' }])
      } setIsAddDialogOpen(false)
    }

  useEffect(() => {
    console.log(currentProduct)
    console.log(newProduct)
  }, [currentProduct, newProduct])
  

  const handleUpdate = async () => {
    let imageUrl = '';
    let modelUrl = '';
    
    if (currentProduct.image) {
      await deleteImage(currentProduct.image)
      imageUrl = await handleImageUpload(currentProduct.image) || ''
    }

    if (currentProduct.model) {
      await deleteModel(currentProduct.model)
      modelUrl = await handleModelUpload(currentProduct.model) || ''
    }
    
    
    const data = {
        name: currentProduct.name,
        description: currentProduct.description,
        price: currentProduct.price,
        image: imageUrl,
        model: modelUrl, 
    }

    await updateProduct(currentProduct.id, data)

    const products = await getProducts();
    setProducts(products || []);
    setIsEditDialogOpen(false);
  }

  const handleEdit = (product: Product) => {
    setCurrentProduct({
      ...product,
      image: null, // Set image to null or handle conversion if needed
      model: null // Set model to null or handle conversion if needed
    })
    setIsEditDialogOpen(true)
  }

  const handleAdd = () => {
    setCurrentProduct({ id: '1', name: '', description: '', image: null, price: '', model: null })
    setIsAddDialogOpen(true)
  }

  const handleDelete = async (product: Product) => {
    setCurrentProduct({
      ...product,
      image: null, // Set image to null or handle conversion if needed
      model: null // Set model to null or handle conversion if needed
    })
    setIsDeleteDialogOpen(true)

  }

  const handleConfirmDelete = async () => {
    const id = currentProduct?.id
    deleteProduct(id)
    const products = await getProducts();
    setProducts(products || []);
    setIsDeleteDialogOpen(false)
  }

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts()
      setProducts(products || [])
    }
    fetchProducts()
  }, []);

  useEffect(() => {
    if (currentProduct) {
      const fetchProduct = async () => {
        await getProduct(currentProduct.id)

      }
      fetchProduct()
    }
  }, [currentProduct])

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
              <th className="px-4 py-2 text-left max-w-3xl">Descripción</th>
              <th className="px-4 py-2 text-left">Imagen</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-left">Acción</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b">
                <td className="px-4 py-2">{product.name}</td>
                <td className="px-4 py-2 max-w-3xl">{product.description}</td>
                <td className="px-4 py-2">
                  <Image src={product.image} alt={product.name} width={40} height={40} className="rounded-full" />
                </td>
                <td className="px-4 py-2">{product.price}</td>
                <td className="px-4 py-2">
                  <Button variant="link" className="mr-2" onClick={() => handleEdit(product)}>Editar</Button>
                  <Button variant="link" onClick={() => handleDelete(product)}>Borrar</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editando {currentProduct?.name} </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">Nombre</Label>
              <Input id="edit_name" className="col-span-3" value={currentProduct?.name} onChange={(e) => setCurrentProduct({ ...currentProduct!, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Descripción</Label>
              <Textarea id="edit_description" className="col-span-3" value={currentProduct?.description} onChange={(e) => setCurrentProduct({ ...currentProduct!, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Imagen</Label>
              <Input type="file" onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setCurrentProduct({ ...currentProduct, image: e.target.files[0] });
                }
              }} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="model" className="text-right">Modelo 3D</Label>
              <Input type="file" onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setCurrentProduct({ ...currentProduct, model: e.target.files[0] });
                }
              }} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Precio</Label>
              <Input id="edit_price" className="col-span-3" value={currentProduct?.price} onChange={(e) => setCurrentProduct({ ...currentProduct!, price: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={() => currentProduct && handleUpdate()}>Guardar cambios</Button>
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
              <Input id="name" className="col-span-3" onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">Descripción</Label>
              <Textarea id="description" className="col-span-3" onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="image" className="text-right">Imagen</Label>
              <Input type="file" onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setNewProduct({ ...newProduct, image: e.target.files[0] });
                }
              }} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="modelo" className="text-right">Modelo 3D</Label>
              <Input type="file" onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setNewProduct({ ...newProduct, model: e.target.files[0] });
                }
              }} />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">Precio</Label>
              <Input id="price" className="col-span-3" onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSave}>Añadir Producto</Button>
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