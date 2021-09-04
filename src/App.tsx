import service from "api/service";
import Layout from "components/Layout";
import Note from "components/Note";
import React, { useState } from "react";

function App() {
  const [state, setState] = useState({
    titleValue: "",
    noteValue: "",
  });

  const addNoteHandler = () => {
    service.createGist(state.titleValue, state.noteValue);
  };

  const deleteNoteHandler = () => {};

  return (
    <Layout>
      <Note
        titleValue={state.titleValue}
        titleValueChange={(val) => setState({ ...state, titleValue: val })}
        noteValue={state.noteValue}
        noteValueChange={(val) => setState({ ...state, noteValue: val })}
        isNew
        onAdd={addNoteHandler}
        onDelete={deleteNoteHandler}
      />
    </Layout>
  );
}

export default App;
