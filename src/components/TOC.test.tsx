import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import TocComponent from "./TOC";
import { Document } from "../utils/api";

const mockStore = configureStore([]);

describe("TocComponent", () => {
  let store: any;
  let documents: Document[];

  beforeEach(() => {
    documents = [
      {
        id: "id_1",
        name: "Document 1",
        level: 3,
        parent_id: "id_2",
        content: "Mock Content",
        parents: [],
        childrens: [
          {
            id: "id_2",
            name: "Child 1",
            level: 3,
            parent_id: "id_1",
            content: "Mock Child Content",
            childrens: [],
            parents: [],
          },
        ],
      },
    ];
    store = mockStore({
      documents,
    });
  });

  test("renders document items", () => {
    render(
      <Provider store={store}>
        <TocComponent />
      </Provider>
    );

    expect(screen.getByLabelText("Front end challenge")).toBeInTheDocument();
    expect(screen.getByText("Document 1")).toBeInTheDocument();
  });
});
