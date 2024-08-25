import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";

// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../../utils/utils-test";

import Dashboard from "./index";

describe("Dashboard", () => {
  it("renders the Dashboard component", () => {
    renderWithProviders(<Dashboard />);

    expect(screen.getByText("TODO")).toBeInTheDocument();
  });
});
