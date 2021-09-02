import React from "react";

interface IButtonProps {
  onClick: () => void;
  type: "green" | "white" | "blue" | "red";
  disabled?: boolean;
}

const Button: React.FC<IButtonProps> = ({
  onClick,
  type,
  disabled = false,
  children,
}) => {
  return (
    <button
      className={`py-3 px-8 rounded-md transform hover:scale-105 focus:ring-1 ${
        type !== "white"
          ? "text-white border-none"
          : "text-black border border-solid border-gray-border"
      } bg-${type} font-semibold text-button`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;