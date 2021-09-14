import Note from "components/Note";
import InputField from "components/InputField";
import React, { useEffect, useRef, useState } from "react";
import { INote } from "./types";
import Button from "components/Button";
import service from "api/service";
import { FilesType } from "api/types";
import appStorage from "api/appStorage";
import { useHistory } from "react-router-dom";

const newNoteInitialState = {
  id: 0,
  noteTitle: "",
  noteContent: "",
};

const Notepad: React.FC = () => {
  const [gistId, setGistId] = useState(appStorage.load("gistId", "local"));
  const [notepadTitle, setNotepadTitle] = useState("");
  const [newNoteState, setNewNoteState] = useState<INote>({
    ...newNoteInitialState,
  });
  const [notes, setNotes] = useState<INote[]>(
    appStorage.load("notes", "local") || []
  );
  const [errors, setErrors] = useState({
    notepadTitleError: "",
    noteTitleError: "",
  });
  const saveToStorageTimer = useRef<any>();
  const history = useHistory();

  const notepadTitleChangeHandler = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNotepadTitle(e.target.value);
  };

  const handleNewNoteTitleChange = (val: string) => {
    if (errors.noteTitleError) {
      setErrors({ ...errors, noteTitleError: "" });
    }
    setNewNoteState({ ...newNoteState, noteTitle: val });
  };

  const addNoteHandler = () => {
    const { noteTitle, noteContent } = newNoteState;
    if (notes.find((el) => el.noteTitle === noteTitle)) {
      setErrors({
        ...errors,
        noteTitleError: "This title already exists, please choose another one.",
      });
      return;
    }
    setErrors({
      ...errors,
      noteTitleError: "",
    });
    const newNotes = [
      {
        id: 1,
        noteTitle: noteTitle.trim(),
        noteContent: noteContent.trim(),
      },
      ...notes.map((el, idx) => ({ ...el, id: idx + 2 })),
    ];
    clearTimeout(saveToStorageTimer.current);
    saveToStorageTimer.current = setTimeout(() => {
      appStorage.save("notes", newNotes, "local");
    }, 2000);
    setNotes(newNotes);
    setNewNoteState({ ...newNoteInitialState });
  };

  const deleteNoteHandler = (idx: number) => {
    const filteredNotes = notes.filter((_, index) => idx !== index);
    const newNotes = filteredNotes.map((el, idx) => ({ ...el, id: idx + 1 }));
    setNotes(newNotes);
    // TODO delete note file from server
  };

  const handleNoteChange = (
    idx: number,
    propName: keyof INote,
    newValue: string
  ) => {
    const newNotes = notes.map((el, index) => {
      if (idx !== index) {
        return el;
      }
      return {
        ...el,
        [propName]: newValue,
      };
    });
    clearTimeout(saveToStorageTimer.current);
    saveToStorageTimer.current = setTimeout(() => {
      appStorage.save("notes", newNotes, "local");
    }, 2000);
    setNotes(newNotes);
  };

  const saveNotepad = async () => {
    const files: FilesType = {};
    notes.forEach((el) => {
      files[el.noteTitle] = { content: el.noteContent };
    });
    const params = {
      description: notepadTitle,
      files,
    };
    if (gistId) {
      await service.updateGist({ gistId, ...params });
    } else {
      const res = await service.createGist(params);
      const { id } = res;
      appStorage.save("gistId", id, "local");
      setGistId(id);
    }
  };

  const deleteNotepadHandler = async () => {
    try {
      await service.deleteGist(gistId);
    } finally {
      resetNotepad();
    }
  };

  const resetNotepad = () => {
    setNotes([]);
    setNotepadTitle("");
    setErrors({ noteTitleError: "", notepadTitleError: "" });
    setGistId(undefined);
    setNewNoteState({ ...newNoteInitialState });
    appStorage.clear("local");
  };

  useEffect(() => {
    const currentGistId = appStorage.load("gistId", "local");
    if (currentGistId) {
      const setNotesInitial = async () => {
        const res = await service.getGist(currentGistId);
        const { files, description } = res;
        const newNotes: INote[] = Object.keys(files).map((key, idx) => {
          return {
            id: idx + 1,
            noteTitle: key,
            noteContent: files[key].content,
          };
        });
        setNotes(newNotes);
        setNotepadTitle(description);
      };
      setNotesInitial();
    }
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex flex-col md:flex-row justify-between">
        <div className="flex flex-col">
          <h2 className="text-note-header text-black mb-2">Notepad Title</h2>
          <InputField
            name="Notepad Title"
            value={notepadTitle}
            onChange={notepadTitleChangeHandler}
            placeholder="My notepad title"
            maxLength={255}
            containerClassName="mb-2 md:mb-8 w-52"
            errorText={errors.notepadTitleError}
          />
        </div>
        <div className="flex items-center mb-5 md:mb-0">
          <Button
            className="mr-2"
            type="white"
            onClick={() => {
              history.push("/stats");
            }}
          >
            View Stats
          </Button>
          <Button
            className="mr-2"
            type="blue"
            onClick={saveNotepad}
            disabled={notes.length === 0 || !notepadTitle.trim()}
          >
            Save
          </Button>
          <Button type="red" onClick={deleteNotepadHandler}>
            Delete
          </Button>
        </div>
      </div>
      <h2 className="text-notes-header text-black mb-2">My Notes</h2>
      <div className="mb-8">
        <Note
          noteTitle={newNoteState.noteTitle}
          noteTitleChange={handleNewNoteTitleChange}
          noteTitleError={errors.noteTitleError}
          noteContent={newNoteState.noteContent}
          noteContentChange={(val) =>
            setNewNoteState({ ...newNoteState, noteContent: val })
          }
          isNew
          onAdd={addNoteHandler}
        />
      </div>
      {notes.map((note, idx) => {
        return (
          <div className="mb-8" key={note.id}>
            <Note
              noteTitle={note.noteTitle}
              noteTitleChange={(val) => handleNoteChange(idx, "noteTitle", val)}
              noteContent={note.noteContent}
              noteContentChange={(val) =>
                handleNoteChange(idx, "noteContent", val)
              }
              isNew={false}
              onAdd={addNoteHandler}
              onDelete={() => deleteNoteHandler(idx)}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Notepad;
