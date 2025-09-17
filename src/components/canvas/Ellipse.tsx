import type { EllipseLayer } from "@/types";
import { rgbToHex } from "@/utils";

export default function Ellipse({
  id,
  layer,
}: {
  id: string;
  layer: EllipseLayer;
}) {
  const { fill, x, y, height, opacity, stroke, width } = layer;
  return (
    <g>
      <ellipse
        style={{ transform: `translate(${x}px, ${y}px)` }}
        fill={fill ? rgbToHex(fill) : "#CCC"}
        stroke={stroke ? rgbToHex(stroke) : "#CCC"}
        cx={width / 2}
        cy={height / 2}
        rx={width / 2}
        ry={height / 2}
        strokeWidth={1}
        opacity={(opacity ?? "100") + "%"}
      />
    </g>
  );
}
