import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Document, FlattenDocument } from "../utils/api";

const useLoadContents = (doc?: Document) => {
  const [items, setItems] = useState<FlattenDocument[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(true);
  const [lastIndex, setLastIndex] = useState<number>(0);

  const documents = useSelector<RootState, FlattenDocument[]>(
    (state) => state.flattenDocuments
  );
  /**
   * Load more items into the list by slicing the documents array and adding the new items to the items
   * array.
   */
  const loadMore = () => {
    const newLastIndex = Math.min(lastIndex + 3, documents.length);
    if (newLastIndex >= documents.length) setHasNextPage(false);
    setItems([...items, ...documents.slice(lastIndex, newLastIndex)]);
    setLastIndex(newLastIndex);
  };

  useEffect(() => {
    setItems([]);
    if (!doc || !documents) return;
    const itemIndex = documents.findIndex((d) => d.id === doc?.id);
    if (itemIndex >= 0) {
      setLastIndex(itemIndex + 1);
      setItems([documents[itemIndex]]);
      if (itemIndex < documents.length - 1) {
        setHasNextPage(true);
      } else {
        setHasNextPage(false);
      }
    }
  }, [doc, documents]);

  return {
    items,
    hasNextPage,
    loadMore,
  };
};

export default useLoadContents;
