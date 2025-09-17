import { CanvasMode, type CanvasState } from "@/types";
import SelectionButton from "./SelectionButton";

export default function Toolsbar({
  canvasState,
  setCanvasState,
}: {
  canvasState: CanvasState;
  setCanvasState: (newState: CanvasState) => void;
}) {
  return (
    <div className="fixed bottom-4 left-1/2 z-10 flex -translate-1/2 items-center justify-center rounded-md bg-white p-1 shadow-md shadow-black/5">
      <div className="flex items-center justify-center gap-3">
        <SelectionButton
          isActive={
            canvasState.mode === CanvasMode.None ||
            canvasState.mode === CanvasMode.Dragging
          }
          canvasMode={canvasState.mode}
          onClick={(canvasMode) =>
            setCanvasState(
              canvasMode === CanvasMode.Dragging
                ? { mode: canvasMode, origin: null }
                : { mode: canvasMode },
            )
          }
        />
      </div>
    </div>
  );
}
