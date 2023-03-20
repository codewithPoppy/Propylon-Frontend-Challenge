import flattenDocuments from "./flattenDocuments";

describe("flattenDocuments", () => {
  it("should flatten the documents", () => {
    const documents = [
      {
        id: "1",
        name: "Document 1",
        level: 1,
        content: "Document 1 Content",
        parent_id: "",
        parents: [],
        childrens: [
          {
            id: "2",
            name: "Document 2",
            level: 2,
            parent_id: "1",
            content: "Document 2 Content",
            parents: [],
            childrens: [
              {
                id: "3",
                name: "Document 3",
                level: 3,
                parent_id: "2",
                content: "Document 3 Content",
                childrens: [],
                parents: [],
              },
            ],
          },
        ],
      },
    ];

    const flatDocuments = flattenDocuments(documents);

    expect(flatDocuments).toEqual([
      {
        id: "1",
        name: "Document 1",
        level: 1,
        content: "Document 1 Content",
        parent_id: "",
        parents: [],
      },
      {
        id: "2",
        name: "Document 2",
        level: 2,
        parent_id: "1",
        content: "Document 2 Content",
        parents: [],
      },
      {
        id: "3",
        name: "Document 3",
        level: 3,
        parent_id: "2",
        content: "Document 3 Content",
        parents: [],
      },
    ]);
  });

  it("should return an empty array if no documents are provided", () => {
    const flatDocuments = flattenDocuments([]);

    expect(flatDocuments).toEqual([]);
  });
});
