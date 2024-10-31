"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useUser } from '@/context/UserContext'
import { getUser, updateUser } from '../models/user/users'

export default function UserProfile() {
  const { user, setUser } = useUser();
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [photoURL, setPhotoURL] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        const userData = await getUser(user.uid);
        setAddress(userData?.address || '');
        setPhoneNumber(userData?.phoneNumber || '');
        setDisplayName(userData?.displayName || '');
        setPhotoURL(userData?.photoURL || '');
      }
    };

    fetchUserData();
  }, [user]);

  const handleSave = async () => {
    if (user) {
      const updatedUser = {
        ...user,
        address,
        phoneNumber,
      };
      await updateUser(updatedUser);
      setUser(updatedUser);
      console.log('Saving profile data:', { address, phoneNumber });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <Image
            src={photoURL || '/placeholder.svg'}
            alt="User Profile"
            width={120}
            height={120}
            className="rounded-full mb-4"
          />
          <h1 className="text-2xl font-bold">{displayName}</h1>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Dirección</Label>
            <Input
              id="address"
              placeholder="Ingrese su dirección"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Número telefónico</Label>
            <Input
              id="phoneNumber"
              placeholder="Ingrese su número telefónico"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
          <Button className="w-full" onClick={handleSave}>
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
}