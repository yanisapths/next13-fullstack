import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Documentatation from "@/app/(docs)/documentation/page";
import DocumentationTabs from "@/components/DocumentationTabs";
describe("Documentation Page", () => {
  it("should render properly", () => {
    render(<Documentatation />);
  });

  it("should render tabs", () => {
    render(<DocumentationTabs />);
  });
});
