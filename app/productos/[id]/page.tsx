import Header from '@/components/Header'
import ProductPage from '@/components/ProductPage'

interface ProductPageProps {
  params: {
    id: string
  }
}

export default async function Page({params: { id }}: ProductPageProps) {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <ProductPage id={id} />
    </div>
  )
}
