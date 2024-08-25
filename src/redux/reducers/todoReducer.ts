import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ITodo, TodoState } from "../../interfaces/todo";
import { fetchTodo, addTodo, updateTodo, deleteTodo } from "../action/todoActions";

const initialState: TodoState = {
  todo: [],
  status: null,
  error: null
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Todo
      .addCase(fetchTodo.pending, (state) => {
        state.status = "fetching";
        state.error = null;
      })
      .addCase(fetchTodo.fulfilled, (state, action: PayloadAction<ITodo[]>) => {
        state.status = null;
        state.todo = action.payload;
      })
      .addCase(fetchTodo.rejected, (state, action) => {
        state.status = null;
        state.error = action.error.message || "Failed to fetch todo";
      })

      // Add Todo
      .addCase(addTodo.pending, (state) => {
        state.status = "adding";
        state.error = null;
      })
      .addCase(addTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
        state.status = null;
        state.todo.unshift(action.payload);
      })
      .addCase(addTodo.rejected, (state, action) => {
        state.status = null;
        state.error = action.error.message || "Failed to add todo";
      })

      // Update Todo
      .addCase(updateTodo.pending, (state) => {
        state.status = "updating";
        state.error = null;
      })
      .addCase(updateTodo.fulfilled, (state, action: PayloadAction<ITodo>) => {
        state.status = null;
        const index = state.todo.findIndex((t) => t.id === action.payload.id);
        if (index !== -1) {
          state.todo[index] = action.payload;
        }
      })
      .addCase(updateTodo.rejected, (state, action) => {
        state.status = null;
        state.error = action.error.message || "Failed to update todo";
      })

      // Delete Todo
      .addCase(deleteTodo.pending, (state) => {
        state.status = "deleting";
        state.error = null;
      })
      .addCase(deleteTodo.fulfilled, (state, action: PayloadAction<number>) => {
        state.status = null;
        state.todo = state.todo.filter((t) => t.id !== action.payload);
      })
      .addCase(deleteTodo.rejected, (state, action) => {
        state.status = null;
        state.error = action.error.message || "Failed to delete todo";
      });
  }
});

export default todoSlice.reducer;
