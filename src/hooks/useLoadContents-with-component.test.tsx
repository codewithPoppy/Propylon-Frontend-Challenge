import { screen, render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import useLoadContents from "./useLoadContents";

const documents = [
  {
    id: "1",
    name: "Document 1",
    level: 1,
    parent_id: "",
    content: "Document 1",
    childrens: [],
    parents: [],
  },
  {
    id: "2",
    name: "Document 2",
    parent_id: "",
    level: 1,
    content: "Document 2",
    childrens: [],
    parents: [],
  },
  {
    id: "3",
    name: "Document 3",
    parent_id: "",
    level: 1,
    content: "Document 3",
    childrens: [],
    parents: [],
  },
];

const mockStore = configureStore([]);

describe("mock component using useLoadContents hook", () => {
  let store: any;

  beforeEach(() => {
    jest.clearAllMocks();
    store = mockStore({
      flattenDocuments: documents,
    });
  });

  it("should render items from useLoadContents", () => {
    const MyComponent = ({ currentContent }: { currentContent: any }) => {
      const { items } = useLoadContents(currentContent);

      return (
        <div className="">
          {items.map((item, index) => (
            <div key={index}>{item.content}</div>
          ))}
        </div>
      );
    };
    jest.clearAllMocks();
    render(
      <Provider store={store}>
        <MyComponent currentContent={documents[0]} />
      </Provider>
    );

    expect(screen.getByText("Document 1")).toBeInTheDocument();
  });
});
