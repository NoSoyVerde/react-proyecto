"use client";

import { CredentialsSignInForm } from "@/components/auth";

export default function SignInPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Iniciar Sesión
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Ingresa tus credenciales para acceder
        </p>
      </div>

      <CredentialsSignInForm callbackURL="/" />
    </div>
  );
}
