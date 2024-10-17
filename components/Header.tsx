"use client"

import Image from 'next/image'
import Link from 'next/link'
import { User } from 'lucide-react'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useUser } from '@/context/UserContext'
import { useState } from 'react'
import { createUser, getUser } from '../models/user/users'
import { create } from 'domain'


export default function Header() {
  const authorization = auth;
  const { user, setUser } = useUser();
  const [ isLogged, setLogged ] = useState("Iniciar Sesion");
  
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(authorization, provider);
      const userLogged = result.user;
      const loggedUser = {
        uid: userLogged.uid,
        email: userLogged.email,
        displayName: userLogged.displayName,
        photoURL: userLogged.photoURL,
      }
      setLogged("Cerrar Sesion");
      createUser(loggedUser);

      const isAdmin = await getUser(loggedUser.uid);
      const userContext = {
        uid: loggedUser.uid,
        email: loggedUser.email,
        displayName: loggedUser.displayName,
        photoURL: loggedUser.photoURL,
        isAdmin: isAdmin
      }

      setUser(userContext);

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
        {user?.isAdmin && <Link href="/administrar" className="text-gray-600 hover:text-gray-900">Administrar</Link>}
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600" onClick={handleSignIn} >{isLogged}</button>
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
        {!user || !user.photoURL ? (
            <User size={20} className="text-gray-600" />
          ) : (
            <img src={user.photoURL} alt="User profile" className="w-full h-full rounded-full" />
          )}
        </div>
      </nav>
    </header>
  )
}