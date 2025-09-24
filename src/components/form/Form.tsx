import { useState } from "react";
import EyeIcon from "../icons/EyeIcon";
import EyeslashIcon from "../icons/EyeslashIcon";
import Button from "../button/Button";
import { type FormData } from "../../../types/type";
import useAuthentication from "../../hooks/useAutenthication";

interface FormProps {
  isLogin: boolean;
}

export default function Form({ isLogin }: FormProps) {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, SetShowConfirmPassword] = useState<boolean>(false);
  const { loginUser, registerUser } = useAuthentication();

  const [formData, setFormData] = useState<FormData>({
    email: null,
    password: null,
    name: null,
    surname: null,
  });

  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
    surname?: string;
  }>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});

    const result = isLogin
      ? await loginUser(formData)
      : await registerUser(formData);

    if (!result.success) {
      console.log("Risultato login/register:", result);
      if (result.errors) {
        setErrors(result.errors);
      }
    }
  }

  return (
    <div className="mt-6">
      <form onSubmit={handleSubmit} className="space-y-2">
        {!isLogin && (
          <>
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Nome
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="given-name"
                  required
                  value={formData.name || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className={`block w-full pl-2 bg-white rounded-md border py-1.5 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <div className="h-4 mt-1">
                  {errors.name && (
                    <p className="text-xs text-red-500">{errors.name}</p>
                  )}
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="surname" className="block text-sm font-medium leading-6 text-gray-900">
                Cognome
              </label>
              <div className="mt-2">
                <input
                  id="surname"
                  name="surname"
                  type="text"
                  autoComplete="family-name"
                  required
                  value={formData.surname || ""}
                  onChange={(e) => setFormData((prev) => ({ ...prev, surname: e.target.value }))}
                  className={`block w-full pl-2 bg-white rounded-md border py-1.5 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 ${
                    errors.surname ? "border-red-500" : "border-gray-300"
                  }`}
                />
                <div className="h-4 mt-1">
                  {errors.surname && (
                    <p className="text-xs text-red-500">{errors.surname}</p>
                  )}
                </div>
              </div>
            </div>
          </>
        )}

        <div>
          <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
            Indirizzo email
          </label>
          <div className="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={formData.email || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              className={`block w-full pl-2 bg-white rounded-md border py-1.5 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div className="h-4 mt-1">
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
            Password
          </label>

          <div className="mt-2 relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={formData.password || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
              className={`block w-full pr-10 pl-2 bg-white rounded-md border py-1.5 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
            />
            <div
              onClick={() => setShowPassword(!showPassword)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }
              }}
              tabIndex={0}
              className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
            >
              {showPassword ? <EyeIcon color="#374151" /> : <EyeslashIcon color="#374151" />}
            </div>
          </div>
          <div className="h-4 mt-1">
            {errors.password && (
              <p className="text-xs text-red-500">{errors.password}</p>
            )}
          </div>
        </div>

        {!isLogin && (
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Conferma password
            </label>

            <div className="mt-2 relative">
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => {
                  const value = e.target.value;
                  setConfirmPassword(value);

                  if (value !== formData.password && value !== "") {
                    setErrors(prev => ({ ...prev, confirmPassword: "Le password non corrispondono" }));
                  } else {
                    setErrors(prev => ({ ...prev, confirmPassword: undefined }));
                  }
                }}
                className={`block w-full pr-10 pl-2 bg-white rounded-md border py-1.5 shadow-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-600 sm:text-sm sm:leading-6 ${
                  errors.confirmPassword ? "border-red-500" : "border-gray-300"
                }`}
              />
              <div
                onClick={() => SetShowConfirmPassword(!showConfirmPassword)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    SetShowConfirmPassword(!showConfirmPassword);
                  }
                }}
                tabIndex={0}
                className="absolute inset-y-0 right-0 flex items-center pr-2 cursor-pointer"
              >
                {showConfirmPassword ? <EyeIcon color="#374151" /> : <EyeslashIcon color="#374151" />}
              </div>
            </div>
            <div className="h-4 mt-1">
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">{errors.confirmPassword}</p>
              )}
            </div>
          </div>
        )}

        {isLogin && (
          <div className="flex items-end">
            <div className="text-sm leading-6 text-right w-full">
              <a href="#" className="font-semibold text-primary-600 hover:text-primary-500">
                Forgot password?
              </a>
            </div>
          </div>
        )}

        <Button
          tabIndex={0}
          variant="submit"
          text={isLogin ? "Accedi" : "Registrati"}
        />
      </form>
    </div>
  );
}
