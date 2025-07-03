import React from "react"; // ✅ Required for JSX to work
import { render, screen } from "@testing-library/react";
import HelloWorld from "./HelloWorld";

test("renders Hello World text", () => {
  render(<HelloWorld />);
  const heading = screen.getByRole("heading", { name: /hello world/i });
  expect(heading).toBeInTheDocument();
});
import { axe, toHaveNoViolations } from "jest-axe";

expect.extend(toHaveNoViolations);

test("has no accessibility violations", async () => {
  const { container } = render(<HelloWorld />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
