"use client";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SetStateAction, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Input } from "@nextui-org/react";
import { Button } from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addSession } from "@/redux/features/session-slice";

import ReCAPTCHA from "react-google-recaptcha";

// Environment variables import
import {
  API_URL,
  RECAPTCHA_SITE_KEY,
  RECAPCHA_VERIFICATION_URL,
} from "@/app/utils/environment";

function setCookie(name: string, value: string, days: number) {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + days);

  const cookieString = `${name}=${encodeURIComponent(
    value
  )}; expires=${expirationDate.toUTCString()}; path=/`;

  document.cookie = cookieString;
}

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaValue(token);
  };
  const handleSubmit = async () => {
    try {
      // Verify if the user has marked the reCAPTCHA
      if (!recaptchaValue) {
        toast.error("Marca la casilla y resuelve la prueba para loggearte", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      // Send reCAPTCHA token to Node-RED for verification
      const recaptchaVerificationResponse = await axios.post(
        `${RECAPCHA_VERIFICATION_URL}/verify-recaptcha`,
        { recaptchaValue }
      );

      if (recaptchaVerificationResponse.data.success) {
        toast.success("Datos verificados, espera por favor...", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        // If the user has marked the reCAPTCHA, proceed with the login request
        const response = await axios.post(`${API_URL}/login`, {
          username: email,
          password,
          recaptchaValue,
        });

        // Store the token in a cookie for 1 day
        setCookie("token", response.data.token, 7);

        console.log("Sesion iniciada", response.data.token);

        if (response.status === 200 && response.data.token) {
          dispatch(addSession(response.data.token));
          router.push("/home");
        } else {
          toast.error("¡Error, datos incorrectos!", {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      } else {
        // reCAPTCHA verification failed
        toast.error(
          "La verificación de reCAPTCHA falló, por favor intenta de nuevo",
          {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-96">
        <div className="flex flex-col space-y-4 items-center justify-center">
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
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                handleSubmit();
              }
            }}
            variant="bordered"
          />
          <ReCAPTCHA
            sitekey={RECAPTCHA_SITE_KEY}
            onChange={handleRecaptchaChange}
          />
        </div>

        <div className="flex justify-center mt-4">
          <Button
            color="primary"
            variant="solid"
            onClick={() => handleSubmit()}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
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
