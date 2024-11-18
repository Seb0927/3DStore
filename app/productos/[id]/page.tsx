import Header from '@/components/Header'
import ProductPage from '@/components/ProductPage'
import { getProduct } from '@/models/product/product'

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id)
  console.log(product)
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductPage product={{ ...product, id: params.id }} />
    </div>
  )
}