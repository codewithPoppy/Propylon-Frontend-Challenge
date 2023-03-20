import store, { RootState } from "./store";

describe("store", () => {
  it("should export a RootState type that matches the store state", () => {
    jest.unmock("@reduxjs/toolkit");
    const storeState: typeof store.getState = () => ({
      documents: [],
      currentContent: undefined,
      flattenDocuments: [],
    });
    const rootState: RootState = storeState();

    expect(rootState).toEqual({
      documents: [],
      currentContent: undefined,
      flattenDocuments: [],
    });
  });
});
