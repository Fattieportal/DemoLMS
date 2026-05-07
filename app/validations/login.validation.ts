export interface LoginFields {
  email: string;
  password: string;
}

export interface LoginErrors {
  email?: string;
  password?: string;
}

export const validateLogin = (fields: LoginFields): LoginErrors => {
  const errors: LoginErrors = {};

  if (!fields.email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!fields.password) {
    errors.password = "Password is required.";
  } else if (fields.password.length < 3) {
    errors.password = "Password must be at least 3 characters.";
  }

  return errors;
};

export const isLoginValid = (errors: LoginErrors): boolean => {
  return Object.keys(errors).length === 0;
};