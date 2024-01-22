"use client"
import React, { use } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Avatar,
} from '@nextui-org/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import Image from 'next/image';
import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const publicPaths = ['/', '/login', '/register', '/forgot-password', '/reset-password'];

const NavBarComponent: React.FC = () => {
  const router = useRouter();
  const currentPath = usePathname();
  const isPublicPath = publicPaths.includes(currentPath);
  const token = useSelector((state: RootState) => state.sessionSlice.token);
  
  useEffect(() => {
    // Si no hay token, redirigir a pagina de login y si es jwt format
    if (!token || !token.split('.')[1]) {
      router.push('/');
    }
    // si hay session redirecciona al home
    if (token) {
      router.push('/home');
    }
    // parar si hay token
    if (token) return;

  }, [token]);
  // si es poblco no muestra el navbar
  if (isPublicPath) return null;
  // si no hay token no renderiza el navbar
  if (!token) return null;
  return (
    <Navbar
      maxWidth="full"
      position="sticky"
      className="bg-white dark:bg-[#18181B] shadow-sm w-screen"
    >
      <NavbarBrand>
        <Image
          src="/assets/logo.webp"
          alt="logo"
          width={100}
          height={100}
          className='w-[100px] h-auto'
          priority
        />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <div className="flex gap-2">
            <ThemeSwitcher />
            <Avatar showFallback src="https://i.pravatar.cc/150?u=a042581f4e29026024d" />
          </div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default NavBarComponent;
