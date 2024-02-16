import "./input.css";
import { forwardRef } from "react";

interface InputProps {
  name?: string;
  type?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { name, type, value, onChange, placeholder = "", className = "" },
  ref,
) {
  return (
    <input
      ref={ref}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`input ${className}`}
    />
  );
});
