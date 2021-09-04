import Button from "components/Button";
import InputField from "components/InputField";
import React from "react";

interface INoteProps {
  titleValue: string;
  titleValueChange: (newVal: string) => void;
  noteValue: string;
  noteValueChange: (newVal: string) => void;
  isNew: boolean;
  onAdd: () => void;
  onDelete: () => void;
}

const Note: React.FC<INoteProps> = ({
  titleValue,
  titleValueChange,
  noteValue,
  noteValueChange,
  isNew,
  onAdd,
  onDelete,
}) => {
  return (
    <div className="flex flex-col items-start">
      <div className="flex mb-2 w-full">
        <InputField
          name="Note Title"
          value={titleValue}
          onChange={(e) => {
            titleValueChange(e.target.value);
          }}
          placeholder="Enter note title..."
          className="max-w-xl"
        />
        {!isNew && (
          <Button type="red" onClick={onDelete} className="ml-2">
            Delete
          </Button>
        )}
      </div>
      <InputField
        name="Note Title"
        value={noteValue}
        onChange={(e) => {
          noteValueChange(e.target.value);
        }}
        placeholder="Enter note..."
        multiline
        className="mb-2 max-w-xl"
      />
      {isNew && (
        <Button type="green" onClick={onAdd}>
          Add
        </Button>
      )}
    </div>
  );
};

export default Note;
