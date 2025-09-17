import type { Camera, Color, Point } from "./types";

export function rgbToHex(color: Color) {
  const newColor = `#${Object.values(color)
    .map((clr) => clr.toString(16).padStart(2, "0"))
    .join("")}`;

  return newColor;
}

export function pointerEventToCanvasPoint(
  e: React.PointerEvent,
  camera: Camera,
): Point {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
}
