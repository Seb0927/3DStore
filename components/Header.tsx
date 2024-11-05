"use client"

import Image from 'next/image'
import Link from 'next/link'
import { User, ShoppingCart } from 'lucide-react'
import { GoogleAuthProvider, signInWithPopup, getAuth, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/firebase/firebase'
import { useUser } from '@/context/UserContext'
import { useState, useEffect } from 'react'
import { createUser, getUser } from '../models/user/users'

export default function Header() {
  const authorization = auth;
  const { user, setUser } = useUser();
  const [isLogged, setLogged] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (userInfo) => {
      if (userInfo) {
        const userData = await getUser(userInfo.uid);
        const isAdmin = userData?.isAdmin ? true : false;

        const loggedUser = {
          uid: userInfo.uid,
          email: userInfo.email,
          address: userData?.address,
          phoneNumber: userData?.phoneNumber,
          displayName: userInfo.displayName,
          photoURL: userInfo.photoURL,
          isAdmin: isAdmin,
          shoppingCart: userData?.shoppingCart
        };

        setLogged(true);
        setUser(loggedUser);
      }
      setLoading(false);
    });
  }, [setUser]);

  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    if (!isLogged) {
      try {
        const result = await signInWithPopup(authorization, provider);
        const userInfo = result.user;
        const loggedUser = {
          uid: userInfo.uid,
          email: userInfo.email,
          displayName: userInfo.displayName,
          photoURL: userInfo.photoURL
        };

        await createUser(loggedUser);
        const userData = await getUser(loggedUser.uid);
        const isAdmin = userData?.isAdmin;

        const userContext = {
          uid: loggedUser.uid,
          address: '',
          phoneNumber: '',
          email: loggedUser.email,
          displayName: loggedUser.displayName,
          photoURL: loggedUser.photoURL,
          isAdmin: isAdmin,
          shoppingCart: []
        };

        setLogged(true);
        setUser(userContext);
      } catch (error) {
        console.log(error);
      }

    } else {
      try {
        await authorization.signOut();
        setLogged(false);
        setUser(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
      <div className="flex items-center">
        <Image src="/images/placeholder.png" alt="Fabricks3D Logo" width={40} height={40} className="mr-2" />
        <span className="text-xl font-bold">Fabricks3D</span>
      </div>
      <nav className="flex items-center space-x-6">
        <Link href="/productos" className="text-gray-600 hover:text-gray-900">Productos</Link>
        <Link href="/contacto" className="text-gray-600 hover:text-gray-900">Contacto</Link>
        {user?.isAdmin ?
          <Link href="/administrar" className="text-gray-600 hover:text-gray-900">Administrar</Link>
          :
          null
        }
        <button className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
          onClick={() => (isLoading ? null : handleSignIn())}
          disabled={isLoading}>
          {isLoading ? "..." : (isLogged ? "Cerrar sesión" : "Iniciar sesión")}
        </button>
        {user && !user.isAdmin ?
          <Link href="/encargar">
            <div className='relative'>
              <ShoppingCart className='w-7 h-7' />
            </div>
          </Link> : null
        }
        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
          {!user || !user.photoURL ? (
            <User size={20} className="text-gray-600" />
          ) : (
            <button onClick={() => window.location.href = '/perfil'}>
              <Image width={40} height={40} src={user.photoURL} alt="User profile" className="w-full h-full rounded-full" />
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}