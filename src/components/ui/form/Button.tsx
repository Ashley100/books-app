import { HTMLAttributes } from "react";

import "./button.css";

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  onClick: () => void;
  children: React.ReactNode;
  className?: string;
}

export function Button({
  onClick,
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`button ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
