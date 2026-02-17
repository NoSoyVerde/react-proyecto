"use client";

import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signUpDeafaultValues } from "@/lib/constants";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function CredentialsSignUpForm() {
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [communicationMethod, setCommunicationMethod] = React.useState<"mail" | "phone">("mail");

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setError("");

    const formData = new FormData(evt.currentTarget);
    const name = String(formData.get("name"));
    const email = String(formData.get("email"));
    const phone = String(formData.get("phone") || "");
    const password = String(formData.get("password"));
    const confirmPassword = String(formData.get("confirmPassword"));

    // Validaciones
    if (!name || !password || !email) {
      setError("Name, email and password are required");
      return;
    }

    if (!acceptTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    if (communicationMethod === "phone" && !phone) {
      setError("Phone is required when phone communication is selected");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    await authClient.signUp.email(
      {
        email,
        password,
        name,
      },
      {
        onRequest: () => {
          setIsLoading(true);
        },
        onSuccess: async () => {
          try {
            // send preferred communication method and optional phone to server
            await fetch('/api/users/set-comms', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email, comms: communicationMethod === 'phone' ? 'phone' : 'mail', phone }),
            });
          } catch (err) {
            // ignore - user created, preference not critical
            console.error('set-comms error', err);
          } finally {
            window.location.href = "/profile";
          }
        },
        onError: (ctx) => {
          setIsLoading(false);
          setError(ctx.error.message || "Error registering user");
        },
      }
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        {error && (
          <div className="rounded-md bg-red-50 p-3 text-sm text-red-600 dark:bg-red-900/50 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Name */}
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={signUpDeafaultValues.name}
            placeholder="Your name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={signUpDeafaultValues.email}
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Phone (optional) */}
        <div>
          <Label htmlFor="phone">
            Phone{" "}
            <span className="text-muted-foreground font-normal">
              {communicationMethod === "phone" ? "(required)" : "(optional)"}
            </span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="123456789"
            required={communicationMethod === "phone"}
          />
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={signUpDeafaultValues.password}
            placeholder="••••••••"
            required
          />
        </div>

        {/* Confirm Password */}
        <div>
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            defaultValue={signUpDeafaultValues.confirmPassword}
            placeholder="••••••••"
            required
          />
        </div>

        {/* Terms and Conditions */}
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="terms"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <Label htmlFor="terms" className="text-sm font-normal cursor-pointer">
            I agree to the{" "}
            <Link href="/terms" className="text-primary hover:underline">
              terms and conditions
            </Link>
          </Label>
        </div>

        {/* Communication Method */}
        <div className="space-y-2">
          <Label>How do you want to receive communications?</Label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="communication"
                value="mail"
                checked={communicationMethod === "mail"}
                onChange={() => setCommunicationMethod("mail")}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span className="text-sm">Mail</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="communication"
                value="phone"
                checked={communicationMethod === "phone"}
                onChange={() => setCommunicationMethod("phone")}
                className="h-4 w-4 text-primary focus:ring-primary"
              />
              <span className="text-sm">Phone</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign Up"}
        </Button>

        {/* Link to Sign In */}
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="/sign-in" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
}

export { CredentialsSignUpForm };
