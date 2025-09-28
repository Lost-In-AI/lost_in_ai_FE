import { type FormData } from "../../types/type";

interface ValidationResult {
  isValid: boolean;
  errors: {
    email?: string;
    password?: string;
  };
}

export class ValidationService {
  private validateEmail(email: string | null): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private validatePasswordSecurity(password: string | null): boolean {
    if (!password) return false;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    return hasNumber && hasUppercase;
  }

  private validatePasswordLength(password: string | null): boolean {
    if (!password) return false;
    const isNotShort = password.length >= 8;
    return isNotShort;
  }

  public validateFormData(formData: FormData): ValidationResult {
    const errors: ValidationResult["errors"] = {};
    let isValid = true;

    if (!this.validateEmail(formData.email)) {
      errors.email = "Email non valida";
      isValid = false;
    }

    if (!this.validatePasswordLength(formData.password)) {
      isValid = false;
      errors.password = "La password deve essere lunga almeno 8 caratteri";
    }

    if (this.validatePasswordLength(formData.password) && !this.validatePasswordSecurity(formData.password)) {
      isValid = false;
      errors.password = "La password deve contenere almeno 1 numero e 1 lettera maiuscola";
    }

    return { isValid, errors };
  }

  public isEmailValid(email: string | null): boolean {
    return this.validateEmail(email);
  }

  public isPasswordValid(password: string | null): boolean {
    return this.validatePassword(password);
  }
}
