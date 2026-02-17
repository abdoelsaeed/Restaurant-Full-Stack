/* eslint-disable @typescript-eslint/no-unused-vars */
import {  NextResponse } from "next/server";

export async function POST() {
    try {
        const backendResponse = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/logout`,
            {
                method: "POST",
            }
        );

        const text = await backendResponse.text();

        const response = new NextResponse(text || "{}", {
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
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}