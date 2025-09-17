import { LayerType } from "@/types";
import { useStorage } from "@liveblocks/react";
import { memo } from "react";
import Rectangle from "./Rectangle";
import Ellipse from "./Ellipse";

const LayerComponent = memo(function Component({ id }: { id: string }) {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) return null;

  switch (layer.type) {
    case LayerType.Reactangle:
      return <Rectangle id={id} layer={layer} />;

    case LayerType.Ellipse:
      return <Ellipse id={id} layer={layer} />;

    default:
      return null;
  }

  //   return (
  //     <g>
  //       <rect x={0} y={0} width={200} height={200} fill="#FF0000" />
  //     </g>
  //   );
});

LayerComponent.displayName = "LayerComponent";

export default LayerComponent;
