import React from "react";

interface IInputFieldProps {
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  rows?: number;
  multiline?: boolean;
  containerClassName?: string;
  maxLength?: number;
  errorText?: string;
}

const InputField: React.FC<IInputFieldProps> = ({
  name = "",
  value,
  onChange,
  disabled = false,
  placeholder = "",
  multiline = false,
  rows = 4,
  containerClassName = "",
  maxLength = 255,
  errorText = "",
}) => {
  const baseProps = {
    name,
    value,
    onChange,
    disabled,
    placeholder,
    className: `px-2 py-3 border border-solid border-gray-border rounded-md text-input-label w-full resize-none outline-none focus:border-blue ${
      !value ? "text-placeholder" : "text-black"
    }`,
  };
  return (
    <div className={`flex flex-col relative ${containerClassName}`}>
      {!multiline ? (
        <input {...baseProps} maxLength={maxLength} />
      ) : (
        <>
          <textarea {...baseProps} rows={rows} maxLength={maxLength} />
          <div className="absolute right-2 -bottom-5 text-input-label text-placeholder">{`${value.length}/${maxLength}`}</div>
        </>
      )}
      {errorText && (
        <p className="text-red text-input-label mt-1">{errorText}</p>
      )}
    </div>
  );
};

export default InputField;
