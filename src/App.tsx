import React from "react";
import Grid from "@mui/material/Grid";
import ContentView from "./components/ContentView";
import TocComponent from "./components/TOC";
import Header from "./components/Header";
import { useDispatch } from "react-redux";
import { setDocuments } from "./redux/reducers";
import { getDocuments, Document } from "./utils/api";

const App = () => {
  const dispatch = useDispatch();

  /* A hook that is called when the component is mounted. It is used to fetch the documents from the API
and store them in the Redux store. */
  React.useEffect(() => {
    getDocuments().then((documents: Document[]) => {
      dispatch(setDocuments(documents));
    });
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Grid container padding={2} sx={{ mt: "64px" }} spacing={2}>
        <Grid item xs={3}>
          <TocComponent />
        </Grid>
        <Grid item xs={9}>
          <ContentView />
        </Grid>
      </Grid>
    </div>
  );
};

export default App;
