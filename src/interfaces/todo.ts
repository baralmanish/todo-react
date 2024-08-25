import { IUser } from "./auth";

export interface ITodo {
  id: number;
  title: string;
  isComplete: boolean;
  user: IUser;
}

export interface ITodoForm {
  title?: string;
  isComplete?: boolean;
}
