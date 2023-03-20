import flattenDocuments from "../utils/flattenDocuments";
import reducer, { setDocuments, setCurrentContent } from "./reducers";

describe("contentSlice", () => {
  const initialState = {
    currentContent: undefined,
    documents: [],
    flattenDocuments: [],
  };

  it("should handle setDocuments", () => {
    const documents = [{ id: 1, title: "Document 1" }];
    const expectedState = {
      currentContent: undefined,
      documents,
      flattenDocuments: [{ id: 1, title: "Document 1" }],
    };
    expect(reducer(initialState, setDocuments(documents))).toEqual(
      expectedState
    );
  });

  it("should handle setCurrentContent", () => {
    const documents = [
      {
        id: "1",
        name: "Document 1",
        content: "Document 1",
        parent_id: "3",
        parents: [],
        childrens: [],
        level: 1,
      },
      {
        id: "2",
        name: "Document 2",
        content: "Document 2",
        parent_id: "4",
        parents: [],
        childrens: [],
        level: 1,
      },
    ];
    const expectedState = {
      currentContent: undefined,
      documents,
      flattenDocuments: flattenDocuments(documents),
    };

    expect(reducer(initialState, setDocuments(documents))).toEqual(
      expectedState
    );
    expect(reducer(expectedState, setCurrentContent(documents[0]))).toEqual({
      ...expectedState,
      currentContent: {
        content: "Document 1",
        id: "1",
        level: 1,
        name: "Document 1",
        parent_id: "3",
        parents: [],
      },
    });
  });
});
