import { Metadata } from "next";
import Player from "@/components/app/player/Player";
import Home from "@/components/app/home/Home";

export const metadata: Metadata = {
  title: `Home | ${process.env.NAME_PAGE}`,
  description: "This is Home Page",
};

export default function SignIn() {
  return <Home />;
}
