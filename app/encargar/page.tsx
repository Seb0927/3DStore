import Header from '@/components/Header'
import Order from '@/components/Order'

function page(){
  return (
    <div className='min-h-screen bg-gray-50'>
      <Header />
      <main>
        <Order />
      </main>
    </div>
  )
}

export default page