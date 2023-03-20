import { TreeItem } from "@mui/lab";
import React, { memo } from "react";
import { useDispatch } from "react-redux";

import { Document } from "../utils/api";
import { setCurrentContent } from "../redux/reducers";

const DocumentItem: React.FC<{ document: Document }> = ({ document }) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentContent(document));
  };

  return (
    <TreeItem
      nodeId={document.id ?? document.content}
      label={document.name}
      onClick={handleClick}
    >
      {!!document.childrens &&
        document.childrens.map((child, index: number) => (
          <DocumentItem document={child} key={child.id + index} />
        ))}
    </TreeItem>
  );
};

export default memo(DocumentItem);
