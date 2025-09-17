"use client";
import { CanvasMode } from "@/types";
import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import { MousePointer, Hand, ChevronUp, Check } from "lucide-react";

export default function SelectionButton({
  isActive,
  canvasMode,
  onClick,
}: {
  isActive: boolean;
  canvasMode: CanvasMode;
  onClick: (canvasMode: CanvasMode.None | CanvasMode.Dragging) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleClick(canvasMode: CanvasMode.None | CanvasMode.Dragging) {
    onClick(canvasMode);
    setIsOpen(false);
  }

  return (
    <div className="relative flex" ref={menuRef}>
      <IconButton isActive={isActive} onClick={() => onClick(CanvasMode.None)}>
        {canvasMode !== CanvasMode.None &&
          canvasMode !== CanvasMode.Dragging && (
            <MousePointer className="size-5" />
          )}
        {canvasMode === CanvasMode.None && <MousePointer className="size-5" />}
        {canvasMode === CanvasMode.Dragging && <Hand className="size-5" />}
      </IconButton>

      <button onClick={() => setIsOpen((prev) => !prev)} className="ml-1">
        <ChevronUp className="size-[10px]" />
      </button>

      {isOpen && (
        <div className="absolute -top-20 mt-1 flex min-w-36 flex-col gap-1 rounded-xl bg-white p-2 shadow-lg">
          <button
            className={`flex w-full items-center rounded-md p-1 text-black hover:bg-blue-300 ${canvasMode == CanvasMode.None ? "bg-blue-300" : ""}`}
            onClick={() => handleClick(CanvasMode.None)}
          >
            <span className="w-5 text-sm">
              {canvasMode === CanvasMode.None && <Check className="size-2" />}
            </span>
            <MousePointer className="size-4" />
            <span className="text-xs">&nbsp;Move</span>
          </button>

          <button
            className={`flex w-full items-center rounded-md p-1 text-black hover:bg-blue-300 ${canvasMode == CanvasMode.Dragging ? "bg-blue-300" : ""}`}
            onClick={() => handleClick(CanvasMode.Dragging)}
          >
            <span className="w-5 text-sm">
              {canvasMode === CanvasMode.Dragging && (
                <Check className="size-2" />
              )}
            </span>
            <Hand className="size-4" />
            <span className="text-xs">&nbsp;Hand Tool</span>
          </button>
        </div>
      )}
    </div>
  );
}
