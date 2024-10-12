import Header from '@/components/Header'
import ProductList from '@/components/ProductList'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <ProductList />
      </main>
    </div>
  )
}