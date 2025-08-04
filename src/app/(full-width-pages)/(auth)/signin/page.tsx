import SignInForm from "@/components/auth/SignInForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: `Sign In | ${process.env.NAME_PAGE}`,
  description: "This is Sign In Page",
};

export default function SignIn() {
  return <SignInForm />;
}
