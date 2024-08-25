export interface IUser {
  id?: number;
  firstName: string;
  lastName: string;
  username: string;
}

export interface IUserStore {
  username: string;
  token: string;
}

export interface ILoginForm {
  username: string;
  password: string;
}

export interface IRegisterForm {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}
