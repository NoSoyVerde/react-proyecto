"use client";

import { useEffect, useState } from "react";
import { authClient, signOut } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();
  const [dbUser, setDbUser] = useState<Record<string, any> | null>(null);
  const [merged, setMerged] = useState<any>(null);

  useEffect(() => {
    if (!session) return;
    const email = (session.user as any)?.email;
    if (!email) return;

    // fetch latest user from the server and merge into session for display
    fetch("/api/users/me", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    })
      .then((res) => res.json())
      .then((payload) => {
        if (payload?.user) {
          setDbUser(payload.user);
          setMerged({ ...session, user: { ...session.user, ...payload.user } });
        } else {
          setMerged(session);
        }
      })
      .catch(() => setMerged(session));
  }, [session]);

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!session) {
    redirect("/sign-in");
  }

  const user = session.user;

  // Obtener iniciales del nombre
  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="mb-6">
        <pre className="whitespace-pre-wrap bg-white border rounded p-6 text-sm font-mono text-zinc-900 overflow-x-auto">
{JSON.stringify({ session: merged ?? session }, null, 2)}
        </pre>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">User info</h2>
        <div className="grid grid-cols-2 gap-4 max-w-lg">
          <div className="text-sm text-muted-foreground">Role</div>
          <div className="font-mono">{(user as any)?.role ?? "-"}</div>

          <div className="text-sm text-muted-foreground">Phone</div>
          <div className="font-mono">{(user as any)?.phone ?? dbUser?.phone ?? "-"}</div>

          <div className="text-sm text-muted-foreground">Comms</div>
          <div className="font-mono">{(user as any)?.comms ?? dbUser?.comms ?? "-"}</div>
        </div>
      </div>

      <div>
        <Button
          variant="destructive"
          onClick={() =>
            signOut({
              fetchOptions: {
                onSuccess: () => {
                  window.location.href = "/";
                },
              },
            })
          }
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
