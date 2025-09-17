"use client";

import type { Layer } from "@/types";
import { LiveList, LiveMap, type LiveObject } from "@liveblocks/client";
import {
  ClientSideSuspense,
  LiveblocksProvider,
  RoomProvider,
} from "@liveblocks/react";
import Image from "next/image";
import type { ReactNode } from "react";

export default function Room({
  children,
  roomId,
}: {
  children: ReactNode;
  roomId: string;
}) {
  return (
    <LiveblocksProvider authEndpoint="/api/liveblocks-auth">
      <RoomProvider
        id={roomId}
        initialPresence={{
          cursor: null,
          selection: [],
          penColor: null,
          pencilDraft: null,
        }}
        initialStorage={{
          roomColor: { r: 30, g: 30, b: 30 },
          layers: new LiveMap<string, LiveObject<Layer>>(),
          layerIds: new LiveList([]),
        }}
      >
        <ClientSideSuspense
          fallback={
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
          }
        >
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
