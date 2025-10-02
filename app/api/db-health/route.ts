import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { connectToDatabase } from "@/database/mongoose";

export async function GET() {
  const startedAt = new Date().toISOString();
  try {
    const conn = await connectToDatabase();

    const state = mongoose.connection.readyState; // 0=disconnected,1=connected,2=connecting,3=disconnecting,4=unauthorized
    const states: Record<number, string> = {
      0: "disconnected",
      1: "connected",
      2: "connecting",
      3: "disconnecting",
      4: "unauthorized"
    };

    const db = mongoose.connection.db;

    return NextResponse.json({
      ok: state === 1,
      state,
      stateText: states[state] ?? "unknown",
      dbName: db?.databaseName ?? null,
      host: (conn as any)?.connection?.host ?? null,
      startedAt,
      nodeEnv: process.env.NODE_ENV,
    }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({
      ok: false,
      error: error?.message ?? "Unknown error",
      startedAt,
      nodeEnv: process.env.NODE_ENV,
    }, { status: 500 });
  }
}
