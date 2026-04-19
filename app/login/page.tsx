import type { Metadata } from "next";
import { AccessPortal } from "@/components/auth/access-portal";

export const metadata: Metadata = {
  title: "Login",
  description: "Admin access portal for Real Journey.",
  robots: {
    index: false,
    follow: false
  }
};

export default function LoginPage() {
  return <AccessPortal />;
}
