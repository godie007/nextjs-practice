"use client"
import Login from '@/app/login/page';
import { useEffect } from 'react';
import { loadTokenFromLocalStorage } from '@/redux/features/session-slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';

export default function Page() {

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    console.log('useEffect');
    dispatch(loadTokenFromLocalStorage())
  }, []);


  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="md:col-span-1 col-span-2">
        <Login />
      </div>
    </div>
  );
}
