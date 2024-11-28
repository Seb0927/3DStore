import Header from '@/components/Header'
import OrderList from '@/components/OrderList'

function page() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <main>
        <OrderList />
      </main>
    </div>
  )
}

export default page