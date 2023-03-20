import { useSelector } from "react-redux";
import { renderHook, act } from "@testing-library/react";

import useLoadContents from "./useLoadContents";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
}));

jest.mock("../utils/api", () => ({
  Document: jest.fn(),
  FlattenDocument: jest.fn(),
}));

describe("useLoadContents", () => {
  const doc = {
    id: "1",
    name: "Document 1",
    parent_id: "",
    level: 1,
    content: "Document 1",
    childrens: [],
    parents: [],
  };
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
    {
      id: "4",
      name: "Document 4",
      parent_id: "",
      level: 1,
      content: "Document 4",
      childrens: [],
      parents: [],
    },
    {
      id: "5",
      name: "Document 5",
      parent_id: "",
      level: 1,
      content: "Document 5",
      childrens: [],
      parents: [],
    },
  ];
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return an object with items, hasNextPage and loadMore properties", () => {
    const { result } = renderHook(() => useLoadContents());
    expect(result.current).toHaveProperty("items", []);
    expect(result.current).toHaveProperty("hasNextPage", true);
    expect(result.current).toHaveProperty("loadMore");
    expect(typeof result.current.loadMore).toBe("function");
  });

  it("should return empty items when a document is provided but documents is undefined", () => {
    const { result } = renderHook(() => useLoadContents(doc));
    expect(result.current.items).toEqual([]);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("should return an item when a document is provided but documents is defined", () => {
    (useSelector as jest.Mock).mockImplementation(() => documents);
    const { result } = renderHook(() => useLoadContents(doc));
    expect(result.current.items).toEqual([doc]);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("should return an item when the document provided is the last document", () => {
    (useSelector as jest.Mock).mockImplementation(() => documents);
    const { result } = renderHook(() => useLoadContents(documents[4]));
    expect(result.current.items).toEqual([documents[4]]);
    expect(result.current.hasNextPage).toBe(false);
  });

  it("should return an empty array when the documents doesn't have the doc", () => {
    const docTemp = {
      id: "9",
      name: "Document 9",
      parent_id: "",
      level: 1,
      content: "Document 9",
      childrens: [],
      parents: [],
    };
    (useSelector as jest.Mock).mockImplementation(() => documents);
    const { result } = renderHook(() => useLoadContents(docTemp));
    expect(result.current.items).toEqual([]);
    expect(result.current.hasNextPage).toBe(true);
  });

  it("should return items when the context provider is defined", () => {
    (useSelector as jest.Mock).mockImplementation(() => documents);
    const { result } = renderHook(() => useLoadContents(documents[0]));
    expect(result.current.items).toEqual([documents[0]]);
    expect(result.current.hasNextPage).toBe(true);

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.hasNextPage).toBe(true);

    act(() => {
      result.current.loadMore();
    });

    expect(result.current.hasNextPage).toBe(false);
  });
});
