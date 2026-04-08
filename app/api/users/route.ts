import { getDataSource } from "@/lib/data-source";
import { User } from "@/entities/User";
import { NextResponse } from "next/server";
import { randomBytes, pbkdf2Sync } from "crypto";

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = pbkdf2Sync(password, salt, 100000, 64, "sha512").toString("hex");
  return `${salt}:${hash}`;
}

export async function GET() {
  try {
    const ds = await getDataSource();
    const users = await ds.getRepository(User).find({
      select: { id: true, email: true, username: true, name: true, createdAt: true, updatedAt: true },
    });
    return NextResponse.json(users);
  } catch (e: any) {
    return NextResponse.json({ status: "error", message: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { email, username, name, password } = await request.json();

    if (!email || !username || !name || !password) {
      return NextResponse.json(
        { status: "error", message: "email, username, name, and password are required" },
        { status: 400 }
      );
    }

    const ds = await getDataSource();
    const repo = ds.getRepository(User);

    const user = repo.create({
      email,
      username,
      name,
      password: hashPassword(password),
    });

    await repo.save(user);

    const { password: _, ...result } = user;
    return NextResponse.json(result, { status: 201 });
  } catch (e: any) {
    if (e.code === "23505") {
      return NextResponse.json(
        { status: "error", message: "email or username already exists" },
        { status: 409 }
      );
    }
    return NextResponse.json({ status: "error", message: e.message }, { status: 500 });
  }
}