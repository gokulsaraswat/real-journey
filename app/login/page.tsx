import { PlaceholderPage } from "@/components/shared/placeholder-page";

export default function LoginPage() {
  return (
    <PlaceholderPage
      eyebrow="Login"
      title="Auth route reserved for admin and future user flows"
      description="Patch 1 keeps the login path stable so the auth branch can add admin access first and user-level features later without changing navigation."
      highlights={[
        "Admin login comes first",
        "Future users can submit feedback or contribute through Git-based flows",
        "Auth details stay outside the main branch until needed",
      ]}
      actions={[
        { label: "Back home", href: "/", style: "secondary" },
        { label: "Admin area", href: "/admin", style: "primary" },
      ]}
    />
  );
}
