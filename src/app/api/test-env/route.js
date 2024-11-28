// src/app/api/test-env/route.js
import {NextResponse} from "next/server";

export async function GET() {
    return NextResponse.json({
        hasHost: !!process.env.MYSQL_HOST,
        hasUser: !!process.env.MYSQL_USER,
        hasPassword: !!process.env.MYSQL_PASSWORD,
        hasDatabase: !!process.env.MYSQL_DATABASE,
        nodeEnv: process.env.NODE_ENV
    });
}