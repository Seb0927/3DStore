import Image from 'next/image'
import { Phone, Instagram } from "lucide-react"

export default function Component() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/70 backdrop-blur">
        <div className="p-6 space-y-8">
          <div className="text-center space-y-4">
            <div className="relative w-24 h-24 mx-auto">
              <div className="absolute inset-0 bg-blue-100 rounded-xl rotate-6"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                <Image
                  src="/images/placeholder.png" 
                  alt="Fabricks3D Logo"
                  className="w-full h-full object-contain p-2"
                  width={50}
                  height={50}
                />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-blue-600">
              Fabricks3D
            </h1>
            <p className="text-gray-500">Impresión 3D</p>
          </div>

          <div className="space-y-4">
            <a 
              href="tel:3113037374"
              className="flex items-center justify-center gap-3 p-4 rounded-xl bg-gradient-to-r from-blue-500 to-green-500 text-white hover:opacity-90 transition-opacity"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg font-medium">311 303 7374</span>
            </a>

            <a 
              href="https://www.instagram.com/fabricks3d/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 p-4 rounded-xl border-2 border-transparent bg-white hover:border-blue-500/20 transition-colors"
            >
              <Instagram className="w-5 h-5 text-blue-500" />
              <span className="text-lg font-medium text-gray-800">@fabricks3d</span>
            </a>
          </div>
        </div>
      </div>
    </main>
  )
}