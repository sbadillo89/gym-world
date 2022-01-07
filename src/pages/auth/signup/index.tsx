import { AxiosError } from "axios";
import { Form } from "@components/forms";
import { Input } from "@components/forms/controls";
import { LogoApp } from "../../../assets/images";
import { UserAttr } from "@services/users";
import { isEmail } from "@utils/hooks/validations";
import { register } from "@utils/auth-provider";
import { toast } from "react-hot-toast";
import { Link, useHistory } from "react-router-dom";

type SignupFormData = Pick<
  UserAttr,
  "firstName" | "lastName" | "password" | "email"
>;

const Signup = (): React.ReactElement => {
  const history = useHistory();
  const handleOnSubmit = ({
    firstName,
    lastName,
    password,
    email,
  }: SignupFormData): void => {
    const signupPromise = register({ firstName, lastName, password, email });

    void toast.promise(signupPromise, {
      loading: "Creando usuario...",
      success: () => {
        history.push("/login");

        return "Tu usuario ha sido creado";
      },
      error: (error: AxiosError<{ message: string }>) => {
        if (error.response) {
          return error.response.data.message;
        }

        return "Lo sentimos, no hemos podido crear tu usuario";
      },
    });
  };

  return (
    <div className="bg-white h-screen">
      <div className="w-full flex flex-wrap">
        {/* <!-- Register Section --> */}
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="flex justify-center md:justify-start pt-8 md:pl-12 md:-mb-14">
            <LogoApp height="64" width="64" />
          </div>

          <div className="flex flex-col justify-center md:justify-start my-auto pt-8 md:pt-0 px-8 md:px-24 lg:px-32">
            <p className="text-center text-3xl">Únete a nosotros</p>
            <Form<SignupFormData>
              onSubmit={handleOnSubmit}
              className="flex flex-col pt-3 md:pt-8"
            >
              <div className="flex flex-col pt-4">
                <Input
                  name="firstName"
                  label="Nombre(s)"
                  type="text"
                  placeholder="Ingrese su nombre(s)"
                  rules={{
                    required: "Su nombre(s) es requerido",
                  }}
                />
              </div>
              <div className="flex flex-col pt-4">
                <Input
                  name="lastName"
                  label="Apellidos"
                  type="text"
                  placeholder="Ingrese su apellido(s)"
                  rules={{
                    required: "El apellido es requerido",
                  }}
                />
              </div>
              <div className="flex flex-col pt-4">
                <Input
                  name="email"
                  label="Email"
                  placeholder="Ingrese su email"
                  rules={{
                    required: "El email esrequerido",
                    validate: (value) => {
                      return isEmail(value) || "Por favor ingrese un email";
                    },
                  }}
                  autoComplete="email"
                />
              </div>
              <div className="flex flex-col pt-4">
                <Input
                  name="password"
                  label="Contraseña"
                  type="password"
                  placeholder="Ingrese una contraseña"
                  rules={{
                    required: "La contraseña es requerida",
                  }}
                />
              </div>
              <div className="flex flex-col pt-4">
                <Input
                  name="confirmPassword"
                  label="Confirmar Contraseña"
                  type="password"
                  placeholder="Confirme su contraseña"
                  rules={({ getValues }) => ({
                    validate: (value: string) =>
                      value === getValues("password") ||
                      "Lo sentimos, las contraseñas no coinciden",
                  })}
                />
              </div>

              <input
                type="submit"
                value="Registrar"
                className="bg-black text-white font-bold text-lg hover:bg-gray-700 p-2 mt-8"
              />
            </Form>
            <div className="text-center pt-12 pb-12">
              <p>
                Ya tienes una cuenta ?
                <Link to="/login" className="underline font-semibold">
                  Inicie sesión
                </Link>
              </p>
            </div>
          </div>
        </div>

        {/* <!-- Image Section --> */}
        <div className="w-1/2 shadow-2xl">
          <img
            className="object-cover w-full h-screen hidden md:block"
            src="https://source.unsplash.com/IXUM4cJynP0"
            alt="Background"
          />
        </div>
      </div>
    </div>
  );
};

export { Signup };
