import { Metadata } from "next";
import Player from "@/components/app/player/Player";

export const metadata: Metadata = {
  title: "Player",
  description: "This is Player",
};

export default function SignIn() {
  return <Player />;
}
