export interface RegisterFields {
  display_name: string;
  email: string;
  password: string;
}

export interface RegisterErrors {
  display_name?: string;
  email?: string;
  password?: string;
}

export const validateRegister = (fields: RegisterFields): RegisterErrors => {
  const errors: RegisterErrors = {};

  if (!fields.display_name.trim()) {
    errors.display_name = "Full name is required.";
  } else if (fields.display_name.trim().length < 2) {
    errors.display_name = "Full name must be at least 2 characters.";
  }

  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.password) {
    errors.password = "Password is required.";
  } else if (fields.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
};

export const isRegisterValid = (errors: RegisterErrors): boolean => {
  return Object.keys(errors).length === 0;
};