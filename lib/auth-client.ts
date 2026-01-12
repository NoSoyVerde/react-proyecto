"use client";

import { createAuthClient } from "better-auth/react";

// Crear el cliente de autenticación para el lado del cliente
export const authClient = createAuthClient({
  baseURL:
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined" ? window.location.origin : ""),
});

// Exportar funciones y hooks de autenticación
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
} = authClient;

// Tipos útiles para la autenticación
export type Session = typeof authClient.$Infer.Session;
export type User = Session["user"];

// ============================================
// FUNCIONES AUXILIARES DE AUTENTICACIÓN
// ============================================

/**
 * Verifica si el usuario está autenticado
 */
export const isAuthenticated = async (): Promise<boolean> => {
  const session = await getSession();
  return !!session?.data?.user;
};

/**
 * Obtiene el usuario actual o null si no está autenticado
 */
export const getCurrentUser = async (): Promise<User | null> => {
  const session = await getSession();
  return session?.data?.user ?? null;
};

/**
 * Inicia sesión con email y contraseña
 */
export const loginWithCredentials = async (
  email: string,
  password: string,
  options?: { callbackURL?: string }
) => {
  return signIn.email({
    email,
    password,
    callbackURL: options?.callbackURL ?? "/",
  });
};

/**
 * Registra un nuevo usuario con email y contraseña
 */
export const registerWithCredentials = async (
  email: string,
  password: string,
  name: string,
  options?: { callbackURL?: string }
) => {
  return signUp.email({
    email,
    password,
    name,
    callbackURL: options?.callbackURL ?? "/",
  });
};

/**
 * Cierra la sesión del usuario actual
 */
export const logout = async (options?: { callbackURL?: string }) => {
  return signOut({
    fetchOptions: {
      onSuccess: () => {
        if (typeof window !== "undefined") {
          window.location.href = options?.callbackURL ?? "/";
        }
      },
    },
  });
};

// ============================================
// HOOK PERSONALIZADO PARA AUTENTICACIÓN
// ============================================

/**
 * Hook personalizado que proporciona información del usuario y estado de autenticación
 */
export const useAuth = () => {
  const { data: session, isPending, error } = useSession();

  return {
    user: session?.user ?? null,
    session: session,
    isLoading: isPending,
    isAuthenticated: !!session?.user,
    error: error,
  };
};
