import React from "react";

interface IInputFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  multiline?: boolean;
}

const InputField: React.FC<IInputFieldProps> = ({
  name = "",
  value,
  onChange,
  disabled = false,
  placeholder = "",
  multiline = false,
  rows = 3,
}) => {
  const baseProps = {
    name,
    value,
    onChange,
    disabled,
    placeholder,
    className: `px-2 py-3 border border-solid border-gray-border rounded-md text-input-label w-full resize-none ${
      !value ? "text-placeholder" : "text-black"
    }`,
  };
  return !multiline ? (
    <input {...baseProps} />
  ) : (
    <textarea {...baseProps} rows={rows} />
  );
};

export default InputField;
