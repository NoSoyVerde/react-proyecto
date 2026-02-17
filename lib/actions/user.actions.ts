"use server";

import { prismaBase } from "@/db/prisma";
import { convertToPlainObject } from "../utils";

export type UserData = {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  comms?: "MAIL" | "PHONE";
  phone?: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export async function getAllUsers(): Promise<UserData[]> {
  const users = await prismaBase.user.findMany({
    orderBy: { createdAt: "desc" },
  });
  return convertToPlainObject(users);
}

export async function getUserById(id: string): Promise<UserData | null> {
  const user = await prismaBase.user.findUnique({
    where: { id },
  });
  if (!user) return null;
  return convertToPlainObject(user);
}

export async function getUserByEmail(email: string): Promise<UserData | null> {
  const user = await prismaBase.user.findUnique({
    where: { email },
  });
  if (!user) return null;
  return convertToPlainObject(user);
}
