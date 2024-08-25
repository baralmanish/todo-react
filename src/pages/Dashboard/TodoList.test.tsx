import { act } from "react";
import { describe, it, expect } from "vitest";
import { screen, waitFor } from "@testing-library/react";

import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";

// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../../utils/utils-test";

import TodoList from "./TodoList";

// We use msw to intercept the network request during the test
// when receiving a get request to the `/api/user` endpoint
export const handlers = [
  http.get("http://localhost:3001/api/todo", () => {
    return HttpResponse.json([
      { id: 1, title: "Test Todo 1", isComplete: false },
      { id: 2, title: "Test Todo 2", isComplete: true }
    ]);
  })
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

describe("TodoList", () => {
  it("renders the TodoList component", async () => {
    await act(async () => {
      renderWithProviders(<TodoList />);
    });

    // Wait for elements to appear and then make assertions
    await waitFor(() => {
      expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
      expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    });
  });
});
