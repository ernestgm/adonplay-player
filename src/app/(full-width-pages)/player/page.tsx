import { Metadata } from "next";
import Player from "@/components/app/player/Player";

export const metadata: Metadata = {
  title: `Player | ${process.env.NEXT_PUBLIC_PLAYER_NAME_PAGE}`,
  description: "This is Player Page",
};

export default function SignIn() {
  return <Player />;
}
