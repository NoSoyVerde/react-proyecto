import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prismaBase } from "@/db/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prismaBase, {
    provider: "postgresql", // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    enabled: true,
    maxPasswordLength: 72,
  },
  user: {
    additionalFields: {
      phone: {
        type: "string",
        required: false,
        input: true,
      },
    },
  },
  secret: process.env.BETTER_AUTH_SECRET!,
});
