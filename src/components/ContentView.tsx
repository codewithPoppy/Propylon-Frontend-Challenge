import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { memo } from "react";

import useLoadContents from "../hooks/useLoadContents";
import { RootState } from "../redux/store";
import { Document } from "../utils/api";
import BreadCrumb from "./BreadCrumb";

const ContentView = () => {
  const currentContent = useSelector<RootState, Document | undefined>(
    (state) => state.currentContent
  );

  const { items, loadMore, hasNextPage } = useLoadContents(currentContent);

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: false,
    rootMargin: "0px 0px 100px 0px",
  });

  if (!currentContent) return <></>;
  return (
    <>
      <BreadCrumb />
      {items.map((item) => (
        <Typography
          key={item.id}
          variant={`h${item.level + 3}` as any}
          sx={{ py: 3 }}
        >
          {item.content || item.name}
        </Typography>
      ))}
      {hasNextPage && (
        <div ref={sentryRef}>
          <h3 style={{ textDecoration: "underline" }}>{`LOADING >>>`}</h3>
        </div>
      )}
    </>
  );
};
export default memo(ContentView);
