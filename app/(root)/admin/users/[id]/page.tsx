import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getUserById } from "@/lib/actions/user.actions";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default async function AdminUserPage({ params }: Props) {
  const user = await getUserById(params.id);
  if (!user) return notFound();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Usuario</h1>
      <p className="text-muted-foreground">Detalle del usuario seleccionado</p>

      <Card>
        <CardHeader>
          <CardTitle>{user.name ?? "Sin nombre"}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
              <p className="font-mono text-xs">{user.id}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Verificado</h3>
              <p>{user.emailVerified ? "Sí" : "No"}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Creado</h3>
              <p>{new Date(user.createdAt).toLocaleString("es-ES")}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Última actualización</h3>
              <p>{new Date(user.updatedAt).toLocaleString("es-ES")}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
