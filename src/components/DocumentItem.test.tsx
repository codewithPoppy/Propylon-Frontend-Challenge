import { render, screen, fireEvent } from "@testing-library/react";
import { useDispatch } from "react-redux";
import { Document } from "../utils/api";
import DocumentItem from "./DocumentItem";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
}));

jest.mock("@mui/lab", () => ({
  TreeItem: (props: any) => {
    const { nodeId, ...rest } = props;
    return (
      <div key={nodeId} {...rest}>
        {props.label}
      </div>
    );
  },
}));

describe("DocumentItem", () => {
  const document: Document = {
    id: "id",
    name: "Chapter 1.11.2",
    level: 3,
    parent_id: "id_2",
    content: "Mock Content",
    parents: [],
  };

  it("should call dispatch with the setCurrentContent action when clicked", () => {
    const dispatchMock = jest.fn();
    (useDispatch as jest.Mock).mockImplementation(() => {
      return dispatchMock;
    });

    render(<DocumentItem document={document} />);

    const treeItem = screen.getByText(document.name);
    expect(treeItem).toBeInTheDocument();

    fireEvent.click(treeItem);

    expect(dispatchMock).toHaveBeenCalledWith({
      payload: document,
      type: "content/setCurrentContent",
    });
  });
});
