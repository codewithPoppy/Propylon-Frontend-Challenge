import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";
import { useDispatch } from "react-redux";
import { getDocuments } from "./utils/api";

jest.mock("./utils/api", () => ({
  getDocuments: jest.fn(),
}));

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("./components/ContentView", () => ({
  __esModule: true,
  default: (props: any) => <div {...props}></div>,
}));

jest.mock("./components/TOC", () => ({
  __esModule: true,
  default: (props: any) => <div {...props}></div>,
}));

describe("App", () => {
  it("renders learn react link", () => {
    jest.spyOn(React, "useEffect").mockImplementation((cb) => {
      cb();
    });
    (getDocuments as jest.Mock).mockReturnValue(
      new Promise((resolve) => resolve([]))
    );
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockImplementation(() => {
      return dispatchMock;
    });

    render(<App />);
    const linkElement = screen.getByText("Propylon Front-end Challenge");
    expect(linkElement).toBeInTheDocument();
  });
});
