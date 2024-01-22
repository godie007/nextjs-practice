"use client"
import { useState } from "react";
import { useRouter } from 'next/navigation'
import axios from "axios";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { addSession } from '@/redux/features/session-slice';

function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieString = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;

  document.cookie = cookieString;
}

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const response = await axios.post("https://iot.codytion.com/api/v1/user/login", {
      username: email,
      password,
    });
    // se almacene en una cookie el token de la sesion por 1 dia
    setCookie('token', response.data.token, 7);
    
    
    console.log("Sesion iniciada", response.data.token);

    if (response.status === 200 && response.data.token) {
      dispatch(addSession(response.data.token));
      router.push("/home");
    } else {
      alert("Usuario o contraseña incorrectos");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96">
        <div className="flex flex-col space-y-4">
          <Input
            label="Email"
            value={email}
            onValueChange={setEmail}
            variant="bordered"
          />
          <Input
            label="Password"
            value={password}
            onValueChange={setPassword}
            onKeyUp={(e) => { if (e.key === 'Enter') { handleSubmit(); } }}
            variant="bordered"
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button color="primary" variant="solid" onClick={() => handleSubmit()}
            onKeyUp={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}