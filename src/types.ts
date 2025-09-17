export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

export enum LayerType {
  Reactangle,
  Ellipse,
  Path,
  Text,
  Circle,
}

export type RectangleLayer = {
  type: LayerType.Reactangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  opacity: number;
  cornerRadius?: number;
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  opacity: number;
};
export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  opacity: number;
  points: number[][];
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  text: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
  fill: Color;
  Stroke: Color;
  opacity: number;
};

export type Layer = RectangleLayer | EllipseLayer | TextLayer | PathLayer;

export type Point = {
  x: number;
  y: number;
};

export enum CanvasMode {
  None,
  Inserting,
  Dragging,
}

export type CanvasState =
  | {
      mode: CanvasMode.None;
    }
  | {
      mode: CanvasMode.Inserting;
      type: LayerType.Reactangle | LayerType.Ellipse | LayerType.Text;
    }
  | { mode: CanvasMode.Dragging; origin: Point | null };
