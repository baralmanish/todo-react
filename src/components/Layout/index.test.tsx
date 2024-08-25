import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AppLayout from "./index";

describe("AppLayout", () => {
  it("renders the AppLayout component", () => {
    render(<AppLayout>Page Content</AppLayout>);
    // screen.debug(); // prints out the jsx in the App component unto the command line

    expect(screen.getByText("Page Content")).toBeInTheDocument();

    const appLogo = screen.getByRole("appLogo");
    expect(appLogo).toBeInTheDocument();
    expect(appLogo).toHaveTextContent("TODO APP");
  });
});
