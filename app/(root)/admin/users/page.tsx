import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllUsers, UserData } from "@/lib/actions/user.actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminUsersPage() {
  const users = await getAllUsers();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Usuarios</h1>
      <p className="text-muted-foreground">
        Gestiona los usuarios registrados en la plataforma
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Lista de Usuarios</CardTitle>
          <CardDescription>
            Total: {users.length} usuarios registrados
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Comms</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Verificado</TableHead>
                <TableHead>Fecha de Registro</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user: UserData) => (
                <TableRow key={user.id}>
                  <TableCell className="font-mono text-xs">
                    {user.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.comms ?? "MAIL"}</TableCell>
                  <TableCell>{user.phone ?? "-"}</TableCell>
                  <TableCell>
                    {user.emailVerified ? (
                      <span className="text-green-600">✓ Verificado</span>
                    ) : (
                      <span className="text-yellow-600">Pendiente</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString("es-ES")}
                  </TableCell>
                  <TableCell>
                    <Link href={`/admin/users/${user.id}`} className="">
                      {/* Use asChild Button pattern in case styles/slots are important */}
                      <Button asChild size="sm" variant="outline">
                        <span>Ver</span>
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
