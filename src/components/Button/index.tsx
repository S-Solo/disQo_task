import React from "react";

interface IButtonProps {
  onClick: () => void;
  type: "green" | "white" | "blue" | "red";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<IButtonProps> = ({
  onClick,
  type,
  disabled = false,
  children,
  className = "",
}) => {
  return (
    <button
      className={`py-2 md:py-3 px-4 md:px-8 rounded-md transform hover:scale-105 focus:ring-1 ${
        type !== "white"
          ? "text-white border-none"
          : "text-black border border-solid border-gray-border"
      } bg-${type} font-semibold text-button disabled:opacity-50 ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
