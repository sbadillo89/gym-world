/* eslint-disable @typescript-eslint/no-unused-vars */
import { AxiosError } from "axios";
import { Form } from "@components/forms";
import { Input } from "@components/forms/controls";
import { Link } from "react-router-dom";
import { LogoApp } from "../../../assets/images";
import { isEmail } from "@utils/hooks/validations";
import { toast } from "react-hot-toast";
import { HiKey, HiMail } from "react-icons/hi";
import { login, useAuth } from "@context/auth-context";

type LoginFormData = {
  email: string;
  password: string;
};

const Login = (): React.ReactElement => {
  const { setData } = useAuth();

  const handleOnSubmit = ({ email, password }: LoginFormData): void => {
    const loginPromise = login(setData, {
      email,
      password,
    });

    void toast.promise(loginPromise, {
      loading: "Accediendo a tu cuenta...",
      success: `Bienvenido a GYMNASIUM!`,
      error: (error: AxiosError<{ message: string }>) => {
        if (error.response) {
          return error.response.data.message;
        }

        return "Lo sentimos, no hemos podido acceder a su cuenta";
      },
    });
  };

  return (
    <div className="bg-white font-family-karla h-screen">
      <div className="w-full flex flex-wrap">
        {/* <!-- Login Section --> */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-12 md:pl-12 md:-mb-24">
            {/* <Link to="#" className="bg-black text-white font-bold text-xl p-4">
              Logo
            </Link> */}
            <LogoApp height="64" width="64" />
          </div>

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Inicio de sesión</p>
            <Form<LoginFormData>
              className="flex flex-col pt-3 md:pt-8"
              onSubmit={handleOnSubmit}
            >
              <div className="flex flex-col pt-4">
                <Input
                  name="email"
                  label="Email"
                  placeholder="Ingrese un email"
                  rules={{
                    required: "El email es requerido",
                    validate: (value) => {
                      return (
                        isEmail(value) || "Por  favor, ingrese un email válido"
                      );
                    },
                  }}
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col pt-4">
                <Input
                  name="password"
                  type="password"
                  label="Contraseña"
                  placeholder="Ingrese contraseña"
                  rules={{
                    required: "La contraseña es requerida",
                  }}
                  autoComplete="current-password"
                />
              </div>

              <input
                type="submit"
                value="Inicie sesión"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </Form>
            <div className="text-center pt-12 pb-12">
              <p>
                {"No tienes una cuenta ? "}
                <Link to="/signup" className="underline font-semibold">
                  Registrese aquí.
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Image Section --> */}
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src={process.env.PUBLIC_URL + "/assests/login-image.jpg"}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export { Login };

//"https://source.unsplash.com/IXUM4cJynP0"
