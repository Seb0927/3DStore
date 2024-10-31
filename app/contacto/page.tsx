import Header from '@/components/Header'
import Presentation  from '@/components/Presentation'

function page() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Presentation />
      </main>
    </div>
  )
}

export default page