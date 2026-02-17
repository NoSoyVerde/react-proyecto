import { NextResponse } from "next/server";
import { getUserByEmail } from "@/lib/actions/user.actions";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = body?.email;
    if (!email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const user = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json({ error: "user not found" }, { status: 404 });
    }

    return NextResponse.json({ user });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 });
  }
}
