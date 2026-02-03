import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">
        Bienvenido al panel de administración
      </p>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Productos</CardTitle>
            <CardDescription>Gestiona el catálogo de productos</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/product"
              className="text-primary hover:underline"
            >
              Ver productos →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Usuarios</CardTitle>
            <CardDescription>Administra los usuarios registrados</CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              href="/admin/users"
              className="text-primary hover:underline"
            >
              Ver usuarios →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pedidos</CardTitle>
            <CardDescription>Revisa y gestiona los pedidos</CardDescription>
          </CardHeader>
          <CardContent>
            <span className="text-muted-foreground">Próximamente</span>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
