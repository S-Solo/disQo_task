import React from "react";
import { render, screen } from "@testing-library/react";
import InputField from "./index";

describe("render input-field component", () => {
  it("should render input", () => {
    render(<InputField value="s" onChange={jest.fn()} name="input" />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("s");
  });

  it("should render textarea", () => {
    render(
      <InputField
        value=""
        onChange={jest.fn()}
        name="input"
        multiline={true}
        placeholder="textarea"
      />
    );
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
    expect(input.placeholder).toBe("textarea");
  });
});
