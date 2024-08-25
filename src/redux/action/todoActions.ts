import { createAsyncThunk } from "@reduxjs/toolkit";

import { ITodo, ITodoForm } from "../../interfaces/todo";
import TodoService from "../../services/todo.service";

// Define action types using createAsyncThunk

/**
 * Fetches all Todo items from the server.
 * Action type: `todo/fetchTodo`
 */
export const fetchTodo = createAsyncThunk<ITodo[]>("todo/fetchTodo", async () => {
  // Call the TodoService to get the list of todo
  const response = await TodoService.get();
  // If the response status is not 200, return an empty array
  if (response.status !== 200) {
    return [];
  }

  // Return the list of Todo items
  return response.data;
});

/**
 * Adds a new Todo item to the server.
 * Action type: `todo/addTodo`
 */
export const addTodo = createAsyncThunk<ITodo, string>("todo/addTodo", async (title: string) => {
  // Call the TodoService to add a new todo with the specified title
  const response = await TodoService.add(title);

  // Return the newly created Todo item
  return response.data;
});

/**
 * Updates an existing Todo item on the server.
 * Action type: `todo/updateTodo`
 */
export const updateTodo = createAsyncThunk<ITodo, { id: number; updates: ITodoForm }>(
  "todo/updateTodo",
  async ({ id, updates }) => {
    // Call the TodoService to update the Todo item with the given ID and updates
    const response = await TodoService.update(id, updates);

    // Return the updated Todo item
    return response.data;
  }
);

/**
 * Deletes a Todo item from the server.
 * Action type: `todo/deleteTodo`
 */
export const deleteTodo = createAsyncThunk<number, number>("todo/deleteTodo", async (id: number) => {
  // Call the TodoService to delete the Todo item with the given ID
  await TodoService.delete(id);

  // Return the ID of the deleted Todo item
  return id;
});
