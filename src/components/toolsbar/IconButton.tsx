import type { ReactNode } from "react";

export default function IconButton({
  onClick,
  children,
  isActive,
  disabled,
}: {
  onClick: () => void;
  children: ReactNode;
  isActive?: boolean;
  disabled?: boolean;
}) {
  return (
    <button
      className={`flex min-h-7 items-center justify-center rounded-md text-gray-500 hover:enabled:text-gray-700 focus:enabled:text-gray-900 active:enabled:text-gray-900 disabled:cursor-default disabled:opacity-60 ${isActive ? "bg-gray-100 text-gray-900 hover:enabled:text-blue-600 focus:enabled:text-blue-600" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
