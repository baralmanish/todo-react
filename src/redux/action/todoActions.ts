import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITodo, ITodoForm } from "../../interfaces/todo";
import TodoService from "../../services/todo.service";

// Define action types
export const fetchTodo = createAsyncThunk<ITodo[]>("todo/fetchTodo", async () => {
  const response = await TodoService.get();
  if (response.status !== 200) {
    return [];
  }

  return response.data;
});

export const addTodo = createAsyncThunk<ITodo, string>("todo/addTodo", async (title: string) => {
  const response = await TodoService.add(title);
  return response.data;
});

export const updateTodo = createAsyncThunk<ITodo, { id: number; updates: ITodoForm }>(
  "todo/updateTodo",
  async ({ id, updates }) => {
    const response = await TodoService.update(id, updates);
    return response.data;
  }
);

export const deleteTodo = createAsyncThunk<number, number>("todo/deleteTodo", async (id: number) => {
  await TodoService.delete(id);
  return id;
});
