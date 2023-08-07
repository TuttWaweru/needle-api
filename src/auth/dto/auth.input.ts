export class AuthInput {
  phone: string;
  password: string;

}

export class LoginInput {
  credential: string;
  value: string;
  password: string;

}

export class RegisterInput {
  phone: string;
  email: string;
  password: string;

}

export class PasswordInput {
  password: string;
  passwordConfirm: string;
}

export class VerifyInput {
  phone: string;
  password: string;

}

export enum LoginCredential {
    EMAIL = 'email',
    PHONE = 'phone',
    USERNAME = 'username',
}