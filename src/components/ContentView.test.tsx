import { render, screen } from "@testing-library/react";
import ContentView from "./ContentView";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { Document } from "../utils/api";

jest.mock("react-infinite-scroll-hook", () => ({
  __esModule: true,
  default: () => {
    const sentryRef = { current: null };
    return [sentryRef];
  },
}));

jest.mock("../hooks/useLoadContents", () => ({
  __esModule: true,
  default: () => {
    return {
      items: [
        {
          id: "id",
          name: "Chapter 1.11.2",
          level: 3,
          parent_id: "id_2",
          content: "Mock Content",
        },
        {
          id: "id_3",
          name: "Mock Chapter 1.11.2",
          level: 3,
          parent_id: "id_2",
        },
      ],
      hasNextPage: true,
      loadMore: jest.fn(),
    };
  },
}));

const mockStore = configureStore([]);

describe("ContentView", () => {
  let store: any;
  let currentContent: Document;

  let store1: any;

  beforeEach(() => {
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

    store = mockStore({
      currentContent,
    });

    store1 = mockStore({
      documents: [
        {
          id: "id_5",
          name: "Mock Chapter",
          level: 3,
          parent_id: "id_4",
          content: "",
          childrens: [],
          parents: [],
        },
      ],
      currentContent: {
        id: "id_2",
        name: "Mock Chapter_2",
        level: 3,
        parent_id: "id_2",
        content: "",
        childrens: [],
        parents: [],
      },
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders content view with bread crumbs and loaded items", () => {
    // (useInfiniteScroll as any).mockReturnValue({ ref: { current: null } });
    render(
      <Provider store={store}>
        <ContentView />
      </Provider>
    );

    expect(screen.getByText("Chapter 1")).toBeInTheDocument();
    expect(screen.getByText("Chapter 1.11")).toBeInTheDocument();
    expect(screen.getByText("Chapter 1.11.2")).toBeInTheDocument();
    expect(screen.getByText("Mock Content")).toBeInTheDocument();
  });

  it("renders content view with bread crumbs and loaded items with name when content is null", () => {
    render(
      <Provider store={store1}>
        <ContentView />
      </Provider>
    );

    expect(screen.getByText("Mock Chapter_2")).toBeInTheDocument();
    expect(screen.getByText("Mock Chapter 1.11.2")).toBeInTheDocument();
  });

  it("renders no content when currentContent is not defined", () => {
    store = mockStore({
      currentContent: undefined,
    });
    render(
      <Provider store={store}>
        <ContentView />
      </Provider>
    );

    expect(screen.queryByText("Chapter 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Chapter 1.11")).not.toBeInTheDocument();
    expect(screen.queryByText("Chapter 1.11.2")).not.toBeInTheDocument();
    expect(screen.queryByText("Mock Content")).not.toBeInTheDocument();
  });

  it("renders loading indicator when there are more items to load", () => {
    render(
      <Provider store={store}>
        <ContentView />
      </Provider>
    );

    expect(screen.getByText("LOADING >>>")).toBeInTheDocument();
  });
});
