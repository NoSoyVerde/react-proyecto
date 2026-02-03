import { Metadata } from "next";
import Link from "next/link";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Admin Dashboard - ${APP_NAME}`,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r hidden md:block">
        <div className="p-6">
          <h2 className="text-lg font-semibold mb-6">Panel de Admin</h2>
          <nav className="space-y-2">
            <Link
              href="/admin"
              className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/product"
              className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              Productos
            </Link>
            <Link
              href="/admin/users"
              className="block px-4 py-2 rounded-lg hover:bg-muted transition-colors"
            >
              Usuarios
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
