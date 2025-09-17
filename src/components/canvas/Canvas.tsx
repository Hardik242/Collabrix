"use client";

import { pointerEventToCanvasPoint, rgbToHex } from "@/utils";
import { nanoid } from "nanoid";
import { useMutation, useStorage } from "@liveblocks/react";
import LayerComponent from "./LayerComponent";
import {
  LayerType,
  type RectangleLayer,
  type Layer,
  type Point,
  type Camera,
  type EllipseLayer,
  type CanvasState,
  CanvasMode,
} from "@/types";
import { LiveObject } from "@liveblocks/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Toolsbar from "../toolsbar/Toolsbar";

const MAX_LAYERS = 100;

export default function Canvas() {
  const roomColor = useStorage((root) => root.roomColor);
  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({ x: 0, y: 0, zoom: 1 });

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: LayerType.Ellipse | LayerType.Reactangle | LayerType.Text,
      position: Point,
    ) => {
      const liveLayers = storage.get("layers");

      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();

      let layer: LiveObject<Layer> | null = null;

      switch (layerType) {
        case LayerType.Reactangle: {
          layer = new LiveObject<RectangleLayer>({
            type: LayerType.Reactangle,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: { r: 217, g: 217, b: 217 },
            stroke: { r: 217, g: 217, b: 217 },
            opacity: 100,
          });
        }
        case LayerType.Ellipse: {
          layer = new LiveObject<EllipseLayer>({
            type: LayerType.Ellipse,
            x: position.x,
            y: position.y,
            height: 100,
            width: 100,
            fill: { r: 217, g: 217, b: 217 },
            stroke: { r: 217, g: 217, b: 217 },
            opacity: 100,
          });
        }
      }

      if (layer) {
        liveLayerIds.push(layerId);
        liveLayers.set(layerId, layer);

        setMyPresence({ selection: [layerId] }, { addToHistory: true });
      }
    },
    [],
  );

  const onPointerUp = useMutation(({}, e: React.PointerEvent) => {
    const point = pointerEventToCanvasPoint(e, camera);

    insertLayer(LayerType.Ellipse, point);
  }, []);

  if (!roomColor)
    return (
      <div className="flex h-screen flex-col items-center justify-center gap-2">
        <Image
          src="/logo-64.png"
          height={50}
          width={50}
          className="animate-bounce"
          alt="Collabrix logo"
        />
        <h1 className="font-normal">Loading</h1>
      </div>
    );

  return (
    <div className="flex h-screen w-full">
      <main className="fixed right-0 left-0 h-screen overflow-y-auto">
        <div
          style={{
            backgroundColor: roomColor ? rgbToHex(roomColor) : "#1e1e1e",
          }}
          className="h-full w-full touch-none"
        >
          <svg className="h-full w-full" onPointerUp={onPointerUp}>
            <g>
              {layerIds?.map((layerId) => (
                <LayerComponent key={layerId} id={layerId} />
              ))}
            </g>
          </svg>
        </div>
      </main>

      <Toolsbar
        canvasState={canvasState}
        setCanvasState={(newState) => setCanvasState(newState)}
      />
    </div>
  );
}
