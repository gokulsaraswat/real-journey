import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminNavigation, getAdminQuickActions } from "@/lib/data/admin";

export const metadata: Metadata = {
  title: "Admin",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminShell
      navigation={getAdminNavigation()}
      quickActions={getAdminQuickActions()}
    >
      {children}
    </AdminShell>
  );
}
