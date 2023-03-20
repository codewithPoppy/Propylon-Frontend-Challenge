import { render, screen } from "@testing-library/react";
import Header from "./Header";

describe("Header", () => {
  it("should render with the correct text", () => {
    render(<Header />);
    expect(
      screen.getByText("Propylon Front-end Challenge")
    ).toBeInTheDocument();
  });

  it("should render with the correct background color", () => {
    render(<Header />);
    expect(screen.getByTestId("APPBAR")).toHaveStyle(
      "background: rgb(63, 61, 107);"
    );
  });
});
