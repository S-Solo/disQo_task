import Button from "components/Button";
import InputField from "components/InputField";
import React from "react";

interface INoteProps {
  noteTitle: string;
  noteTitleChange: (newVal: string) => void;
  noteTitleError?: string;
  noteContent: string;
  noteContentChange: (newVal: string) => void;
  noteContentError?: string;
  isNew: boolean;
  onAdd?: () => void;
  onDelete?: () => void;
}

const Note: React.FC<INoteProps> = ({
  noteTitle,
  noteTitleChange,
  noteTitleError = "",
  noteContent,
  noteContentChange,
  noteContentError = "",
  isNew,
  onAdd = () => {},
  onDelete = () => {},
}) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex mb-2">
        <InputField
          name="Note Title"
          value={noteTitle}
          onChange={(e) => {
            noteTitleChange(e.target.value);
          }}
          placeholder="Enter note title..."
          errorText={noteTitleError}
          containerClassName="w-96"
        />
        {!isNew && (
          <Button type="red" onClick={onDelete} className="ml-2">
            Delete
          </Button>
        )}
      </div>
      <InputField
        name="Note Title"
        value={noteContent}
        onChange={(e) => {
          noteContentChange(e.target.value);
        }}
        placeholder="Enter note..."
        multiline
        errorText={noteContentError}
        containerClassName="mb-2 w-96"
      />
      {isNew && (
        <Button
          type="green"
          onClick={onAdd}
          disabled={!noteTitle.trim() || !noteContent.trim()}
        >
          Add
        </Button>
      )}
    </div>
  );
};

export default Note;
