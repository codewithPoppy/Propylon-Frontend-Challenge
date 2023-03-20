import TreeView from "@mui/lab/TreeView";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";

import { Document } from "../utils/api";
import { RootState } from "../redux/store";
import DocumentItem from "./DocumentItem";

export default function TocComponent() {
  const documents = useSelector<RootState, Document[]>(
    (state) => state.documents
  );

  return (
    <TreeView
      aria-label="Front end challenge"
      defaultCollapseIcon={<ExpandMoreIcon />}
      defaultExpandIcon={<ChevronRightIcon />}
      sx={{ maxHeight: "100vh", flexGrow: 1 }}
    >
      {documents.map((doc: Document) => (
        <DocumentItem key={"documentItem" + doc.id} document={doc} />
      ))}
    </TreeView>
  );
}
