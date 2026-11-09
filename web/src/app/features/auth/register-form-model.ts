import { RegisterRequest } from './register-request';

export interface RegisterFormModel {
  email: string;
  password: string;
  confirmPassword: string;
}

export function toRegisterRequest(model: RegisterFormModel): RegisterRequest {
  return {
    email: model.email,
    password: model.password,
  };
}
