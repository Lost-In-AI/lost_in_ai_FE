import { useState } from "react";
import EyeIcon from "../icons/EyeIcon";
import EyeslashIcon from "../icons/EyeslashIcon";
import Button from "../button/Button";
// import { type FormData } from "../../../types/type";

interface FormProps {
  isLogin: boolean;
}

export default function Form({ isLogin }: FormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, SetShowConfirmPassword] = useState<boolean>(false);

  // const [formData, setFormData ] = useState<FormData>({
  //   email: null,
  //   password: null,
  // });

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log("Funziono");
  }

  return (
    <div className="mt-10">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 ">
            Indirizzo email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="block w-full pl-2 bg-background-dark rounded-md border-1 border-gray-700 py-1.5 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
            Password
          </label>

          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              className="block w-full pr-10 pl-2 bg-background-dark rounded-md border border-gray-700 py-1.5 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
            >
              {showPassword ? <EyeIcon color="#FFFFFF" /> : <EyeslashIcon color="#FFFFFF" />}
            </div>
          </div>
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
              Conferma password
            </label>

            <div className="mt-2 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                className="block w-full pr-10 pl-2 bg-background-dark rounded-md border border-gray-700 py-1.5 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <div
                onClick={() => SetShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              >
                {showConfirmPassword ? <EyeIcon color="#FFFFFF" /> : <EyeslashIcon color="#FFFFFF" />}
              </div>
            </div>
          </div>
        )}

        {isLogin && (
          <div className="flex items-center justify-between">
            <div className="flex items-center ">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-600 accent-indigo-600 bg-background-dark"
              />
              <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-400">
                Remember me
              </label>
            </div>

            <div className="text-sm leading-6">
              <a href="#" className="font-semibold text-indigo-500 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>
          </div>
        )}

        <Button
          tabIndex={0}
          variant="submit"
          text={isLogin ? "Accedi" : "Registrati"}
          onClick={isLogin ? () => console.log("accedi") : () => console.log("registrati")}
        />
      </form>
    </div>
  );
}
