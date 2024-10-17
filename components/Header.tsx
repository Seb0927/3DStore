"use client"

import Image from 'next/image'
import Link from 'next/link'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase/firebase'


export default function Header() {
  const authorization = auth;
  
  
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(authorization, provider);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center">
        <Image src="/placeholder.svg" alt="Fabricks3D Logo" width={40} height={40} className="mr-2" />
        <span className="text-xl font-bold">Fabricks3D</span>
      </div>
      <nav className="flex items-center space-x-6">
        <Link href="/productos" className="text-gray-600 hover:text-gray-900">Productos</Link>
        <Link href="/contacto" className="text-gray-600 hover:text-gray-900">Contacto</Link>
        <Link href="/administrar" className="text-gray-600 hover:text-gray-900">Administrar</Link>
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleSignIn} >Iniciar sesión</button>
        {/* <div className="w-8 h-8 bg-gray-200 rounded-full"></div> */}
      </nav>
    </header>
  )
}