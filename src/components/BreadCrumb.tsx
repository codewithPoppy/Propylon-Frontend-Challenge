import { Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useCallback } from "react";

import { RootState } from "../redux/store";
import { setCurrentContent } from "../redux/reducers";
import { Document } from "../utils/api";

const BreadCrumb = () => {
  const dispatch = useDispatch();
  const currentContent = useSelector<RootState, Document | undefined>(
    (state) => state.currentContent
  );

  const handleClick = useCallback(
    (item: Document) => {
      dispatch(setCurrentContent(item));
    },
    [dispatch]
  );

  return (
    <div style={{ position: "sticky", top: "64px", backgroundColor: "white" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        {currentContent?.parents.map((item) => (
          <Fragment key={"breadcrumb" + item.id}>
            <Typography
              sx={{ cursor: "pointer", fontWeight: "bold" }}
              onClick={() => handleClick(item)}
            >
              {item.name}
            </Typography>
            <span>{"/"}</span>
          </Fragment>
        ))}
        <Typography sx={{ cursor: "pointer", fontWeight: "bold" }}>
          {currentContent?.name}
        </Typography>
      </div>
      <hr />
    </div>
  );
};

export default BreadCrumb;
