import React from "react";
import { render } from "@testing-library/react";
import Layout from "./index";

it("Render loading component", () => {
  const comp = render(
    <Layout>
      <div>Main</div>
    </Layout>
  );
  expect(comp.getByRole("main")).toBeTruthy();
  expect(comp.getByText(/Main/i)).toBeTruthy();
});
