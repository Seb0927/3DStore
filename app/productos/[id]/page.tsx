import { getProducts } from '@/models/product/product'
import Header from '@/components/Header'
import ProductPage from '@/components/ProductPage'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function Page({ params }: ProductPageProps) {


  const { id } = params
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductPage id={id} />
    </div>
  )
}

export async function generateStaticParams() {
  const products = await getProducts()
  
  return products?.map((product) => ({
    id: product.id,
  })) || []
}
