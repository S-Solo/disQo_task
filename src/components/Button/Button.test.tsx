import React from "react";
import { render, screen } from "@testing-library/react";
import Button from "./index";

describe("render button component", () => {
  it("should render green button", () => {
    render(
      <Button onClick={() => {}} type="green">
        text
      </Button>
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
    expect(screen.getByText(/text/i)).toBeTruthy();
  });

  it("should render white button", () => {
    render(
      <Button onClick={() => {}} type="white">
        text
      </Button>
    );
    const btn = screen.getByRole("button");
    expect(btn).toBeInTheDocument();
  });
});
