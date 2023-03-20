import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useSelector, useDispatch } from "react-redux";
import BreadCrumb from "./BreadCrumb";
import { Document } from "../utils/api";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

describe("BreadCrumb component", () => {
  let currentContent: Document;

  currentContent = {
    id: "id",
    name: "Chapter 1.11.2",
    level: 3,
    parent_id: "id_2",
    content: "Mock Content",
    parents: [
      {
        id: "id_1",
        name: "Chapter 1",
        level: 1,
        parent_id: "",
        content: "Chapter 1",
        parents: [],
      },
      {
        id: "id_2",
        name: "Chapter 1.11",
        level: 2,
        parent_id: "id_1",
        content: "Chapter 1.11",
        parents: [],
      },
    ],
  };

  beforeEach(() => {
    (useSelector as jest.Mock).mockImplementation(() => currentContent);
  });

  it("should render the current content name", () => {
    render(<BreadCrumb />);

    const currentContentName = screen.getByText(currentContent.name);

    expect(currentContentName).toBeInTheDocument();
  });

  it("should render the parents' names separated by /", () => {
    render(<BreadCrumb />);

    const parentsNamesElement = screen.getAllByText("/");

    expect(parentsNamesElement).toHaveLength(currentContent.parents.length);
  });

  it("should dispatch setCurrentContent when a parent is clicked", () => {
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockImplementation(() => {
      return dispatchMock;
    });

    render(<BreadCrumb />);

    const parentToClick = currentContent.parents[0];
    const parentNameElement = screen.getByText(parentToClick.name);
    fireEvent.click(parentNameElement);

    expect(dispatchMock).toHaveBeenCalledTimes(1);
    expect(dispatchMock).toHaveBeenCalledWith({
      payload: currentContent.parents[0],
      type: "content/setCurrentContent",
    });
  });
});
