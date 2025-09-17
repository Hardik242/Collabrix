import type { RectangleLayer } from "@/types";
import { rgbToHex } from "@/utils";

export default function Rectangle({
  id,
  layer,
}: {
  id: string;
  layer: RectangleLayer;
}) {
  const { fill, x, y, height, opacity, stroke, width, cornerRadius } = layer;
  return (
    <g>
      <rect
        style={{ transform: `translate(${x}px, ${y}px)` }}
        height={height}
        width={width}
        fill={fill ? rgbToHex(fill) : "#CCC"}
        strokeWidth={1}
        stroke={stroke ? rgbToHex(stroke) : "#CCC"}
        opacity={(opacity ?? "100") + "%"}
        rx={cornerRadius ?? 0}
        ry={cornerRadius ?? 0}
      />
    </g>
  );
}
