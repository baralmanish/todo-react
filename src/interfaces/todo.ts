import { IUser } from "./auth";

export interface ITodo {
  id: number;
  title: string;
  isComplete: boolean;
  user: IUser;
}

export interface TodoState {
  todo: ITodo[];
  status: "fetching" | "adding" | "updating" | "deleting" | null;
  error: string | null;
}

export interface ITodoForm {
  title?: string;
  isComplete?: boolean;
}
