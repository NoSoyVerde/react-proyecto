"use client";

import { CredentialsSignUpForm } from "@/components/auth";

export default function SignUpPage() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Crear Cuenta
        </h1>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Regístrate para empezar
        </p>
      </div>

      <CredentialsSignUpForm callbackURL="/" />
    </div>
  );
}
