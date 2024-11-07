import Header from '@/components/Header'
import ProductPage from '@/components/ProductPage'
import { getProduct } from '@/models/product/product'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function Page({params: { id }}: ProductPageProps) {
  const product = await getProduct(id)
  console.log(product)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductPage product={product} />
    </div>
  )
}
