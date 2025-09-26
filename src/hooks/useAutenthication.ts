import { type FormData } from "../../types/type";
import { ValidationService } from "../services/ValidationService";
import { useSignIn, useSignUp } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";

interface AuthResult {
  success: boolean;
  errors?: {
    email?: string;
    password?: string;
    name?: string;
    surname?: string;
  };
}

export default function useAuthentication() {
  const validationService = new ValidationService();
  const { signIn, isLoaded: signInLoaded, setActive } = useSignIn();
  const { signUp, isLoaded: signUpLoaded, setActive: setActiveSignUp } = useSignUp();
  const navigate = useNavigate();

  async function loginUser(formData: FormData): Promise<AuthResult> {
    const validation = validationService.validateFormData(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }
    if (!signInLoaded) return { success: false, errors: { email: "Caricamento..." } };
    try {
      const result = await signIn.create({
        identifier: formData.email as string,
        password: formData.password as string,
      });
      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        navigate("/");
        return { success: true };
      }
      return { success: false, errors: { email: "Si è verificato un errore" } };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      console.log("error catch login", error);
      return { success: false, errors: { email: "Credenziali non valide" } };
    }
  }

  async function registerUser(formData: FormData): Promise<AuthResult> {
    const validation = validationService.validateFormData(formData);
    if (!validation.isValid) {
      return { success: false, errors: validation.errors };
    }

    if (!signUpLoaded) return { success: false, errors: { email: "Caricamento..." } };

    try {
      const result = await signUp.create({
        emailAddress: formData.email as string,
        password: formData.password as string,
        unsafeMetadata: {
          firstName: formData.name as string,
          lastName: formData.surname as string,
        },
      });
      //console.log("result", result)
      if (result.status === "complete") {
        await setActiveSignUp({ session: result.createdSessionId });
        navigate("/");
        return { success: true };
      } else {
        return { success: false, errors: { email: "Registrazione fallita" } };
      }
    } catch {
      return { success: false, errors: { email: "Email già esistente o errore" } };
    }
  }

  return { loginUser, registerUser };
}
