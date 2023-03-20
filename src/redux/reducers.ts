import { createSlice } from "@reduxjs/toolkit";
import type { Document, FlattenDocument } from "../utils/api";
import flattenDocuments from "../utils/flattenDocuments";

type ContentState = {
  currentContent: Document | undefined;
  documents: Document[];
  flattenDocuments: FlattenDocument[];
};

const initialState: ContentState = {
  currentContent: undefined,
  documents: [],
  flattenDocuments: [],
};

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setDocuments: (state, action) => {
      state.documents = action.payload;
      state.flattenDocuments = flattenDocuments(action.payload);
    },
    setCurrentContent: (state, action) => {
      state.currentContent = state.flattenDocuments.find(
        (doc) => doc.id === action.payload.id
      );
    },
  },
});

export const { setDocuments, setCurrentContent } = contentSlice.actions;

export default contentSlice.reducer;
