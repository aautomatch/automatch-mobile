export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4,5})[-. ]?([0-9]{4})$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, '');
  
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
    return false;
  }

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cpf.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  digit = 11 - (sum % 11);
  if (digit >= 10) digit = 0;
  if (digit !== parseInt(cpf.charAt(10))) return false;

  return true;
};

export const validateCNH = (cnh: string): boolean => {
  cnh = cnh.replace(/\D/g, '');
  return cnh.length === 11 && !/^(\d)\1+$/.test(cnh);
};

export const validateLicensePlate = (plate: string): boolean => {
  // Brazilian license plate format: ABC-1234 or ABC1D34 (Mercosul)
  const oldFormat = /^[A-Z]{3}-?\d{4}$/;
  const mercosulFormat = /^[A-Z]{3}\d[A-Z]\d{2}$/;
  const cleanPlate = plate.replace(/[^A-Z0-9]/g, '');
  return oldFormat.test(cleanPlate) || mercosulFormat.test(cleanPlate);
};

export const validatePassword = (password: string): {
  isValid: boolean;
  errors: string[];
} => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('A senha deve ter no mínimo 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra maiúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('A senha deve conter pelo menos uma letra minúscula');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('A senha deve conter pelo menos um número');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};
