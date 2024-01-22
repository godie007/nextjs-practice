"use client"
import { useRouter } from 'next/navigation'
import { Button } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import AddTodoForm from '@/components/AddTodoForm';
import TodoList from '@/components/TodoList';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieString = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;

  document.cookie = cookieString;
}
export default function Home() {
  const router = useRouter();
  const handleLogout = () => {
    // se limpia la cookie
    setCookie('token', '', 0);
    router.push("/");
  };
  // // const token = localStorage.getItem('token');
  // const token = useSelector((state: RootState) => state.sessionSlice.token);
  // // si no hay token no renderiza el navbar
  // if (!token) return null;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full">
        <div className="grid grid-cols-2 gap-2 p-5">
          <div className="md:col-span-1 col-span-2">
            <AddTodoForm />
          </div>

          <div className="md:col-span-1 col-span-2">
            <TodoList />
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <Button color="primary" variant="solid" onClick={() => handleLogout()}>
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
}