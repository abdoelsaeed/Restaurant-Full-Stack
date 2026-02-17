/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL; // 👈 الأفضل مش NEXT_PUBLIC

        if (!backendUrl) {
            throw new Error("BACKEND_URL is not defined");
        }

        const backendResponse = await fetch(
            `${backendUrl}/auth/signup`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            }
        );

        const text = await backendResponse.text();

        const response = new NextResponse(text, {
            status: backendResponse.status,
            headers: {
                "Content-Type": "application/json",
            },
        });

        const setCookie = backendResponse.headers.get("set-cookie");
        if (setCookie) {
            response.headers.append("set-cookie", setCookie);
        }

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}