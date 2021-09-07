import Note from "components/Note";
import InputField from "components/InputField";
import React, { useState } from "react";
import { INote } from "./types";
import Button from "components/Button";

const newNoteInitialState = {
  noteTitle: "",
  noteContent: "",
};

const Notepad: React.FC = () => {
  const [notepadTitle, setNotepadTitle] = useState("");
  const [newNoteState, setNewNoteState] = useState<INote>({
    ...newNoteInitialState,
  });
  const [notes, setNotes] = useState<INote[]>([]);
  const [errors, setErrors] = useState({
    notepadTitleError: "",
    noteTitleError: "",
  });

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
    setNotes([
      { noteTitle: noteTitle.trim(), noteContent: noteContent.trim() },
      ...notes,
    ]);
    setNewNoteState({ ...newNoteInitialState });
  };

  const deleteNoteHandler = (idx: number) => {
    setNotes(notes.filter((_, index) => idx !== index));
  };

  const handleNoteChange = (
    idx: number,
    propName: keyof INote,
    newValue: string
  ) => {
    setNotes(
      notes.map((el, index) => {
        if (idx !== index) {
          return el;
        }
        return {
          ...el,
          [propName]: newValue,
        };
      })
    );
  };

  return (
    <div className="flex flex-col shadow-md bg-white rounded-md p-6">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h2 className="text-note-header text-black mb-2">Notepad Title</h2>
          <InputField
            name="Notepad Title"
            value={notepadTitle}
            onChange={notepadTitleChangeHandler}
            placeholder="My notepad title"
            maxLength={255}
            containerClassName="mb-8 w-52"
            errorText={errors.notepadTitleError}
          />
        </div>
        <div className="flex items-center">
          <Button className="mr-2" type="white" onClick={() => {}}>
            View Stats
          </Button>
          <Button
            className="mr-2"
            type="blue"
            onClick={() => {}}
            disabled={notes.length === 0}
          >
            Save
          </Button>
          <Button type="red" onClick={() => {}}>
            Delete
          </Button>
        </div>
      </div>
      <h2 className="text-main-title text-black mb-2">My Notes</h2>
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
          <div className="mb-8" key={note.noteTitle}>
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
