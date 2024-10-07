import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const {method} = request;
    return NextResponse.json({ method });
}