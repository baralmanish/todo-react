import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITodo, TodoState } from "../../interfaces/todo";
import { fetchTodo, addTodo, updateTodo, deleteTodo } from "../action/todoActions";

// Define the initial state for the todo slice
const initialState: TodoState = {
  todo: [], // List of todo
  status: null, // Status of the current request (fetching, adding, etc.)
  error: null // Error message if any request fails
};

// Create a slice of the Redux state for todo
const todoSlice = createSlice({
  name: "todo", // Name of the slice
  initialState, // Initial state for this slice
  reducers: {}, // No synchronous reducers are defined for this slice
  extraReducers: (builder) => {
    builder
      // Handle fetchTodo actions
      .addCase(fetchTodo.pending, (state) => {
        state.status = "fetching"; // Set status to "fetching" when the request starts
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchTodo.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
        state.status = null; // Clear status on successful request
        state.todo = action.payload; // Update todo list with fetched todo
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = null; // Clear status on failure
        state.error = action.error.message || "Failed to fetch todo"; // Set error message
      })

      // Handle addTodo actions
      .addCase(addTodo.pending, (state) => {
        state.status = "adding"; // Set status to "adding" when the request starts
        state.error = null; // Clear any previous errors
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
        state.status = null; // Clear status on successful request
        state.todo.unshift(action.payload); // Add new todo to the beginning of the list
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = null; // Clear status on failure
        state.error = action.error.message || "Failed to add todo"; // Set error message
      })

      // Update Todo
      .addCase(updateTodo.pending, (state) => {
        state.status = "updating"; // Set status to "updating" when the request starts
        state.error = null; // Clear any previous errors
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
        state.status = null; // Clear status on successful request
        const index = state.todo.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.todo[index] = action.payload; // Update the specific todo item
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = null; // Clear status on failure
        state.error = action.error.message || "Failed to update todo"; // Set error message
      })

      // Handle updateTodo actions
      .addCase(deleteTodo.pending, (state) => {
        state.status = "deleting"; // Set status to "deleting" when the request starts
        state.error = null; // Clear any previous errors
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = null; // Clear status on successful request
        state.todo = state.todo.filter((t) => t.id !== action.payload); // Remove the deleted todo from the list
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = null; // Clear status on failure
        state.error = action.error.message || "Failed to delete todo"; // Set error message
      });
  }
});

export default todoSlice.reducer;
