/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL!;
//عملناها عشان نقدر نحل مشكله الاورجين كورس لان البراوزر مش بسمح لينا نعمل ريكويست من دومين لتاني غير مسموح بيه فعملنا بروكسي في نكست عشان نقدر نعمل ريكويست من نفس الدومين الي هو نكست والبروكسي هيحول الريكويست للدومين التاني الي هو الباكند
//خلي بالك عشان ماتستخدمهاش في السيرفر كومبونت لانه في السيرفر كومبونت عادي تنادي السيرفر اصلا
async function handler(req: NextRequest, context: any) {
    try {
        const params = await context.params;
        const path = params.path.join("/");
        const url = `${BACKEND_URL}/${path}${req.nextUrl.search}`;
        const body =
            req.method !== "GET" && req.method !== "HEAD"
                ? await req.text()
                : undefined;

        const headers: Record<string, string> = {
            "Content-Type": "application/json",
        };

        const cookieHeader = req.headers.get("cookie");
        if (cookieHeader) headers["Cookie"] = cookieHeader;

        const authHeader = req.headers.get("authorization");
        if (authHeader) headers["Authorization"] = authHeader;

        const backendResponse = await fetch(url, {
            method: req.method,
            headers,
            body,
        });

        const text = await backendResponse.text();

        const response = new NextResponse(text, {
            status: backendResponse.status,
        });

        const setCookie = backendResponse.headers.get("set-cookie");
        if (setCookie) {
            response.headers.append("set-cookie", setCookie);
        }

        return response;
    } catch (error) {
        return NextResponse.json(
            { error: "Proxy Error" },
            { status: 500 }
        );
    }
}

export { handler as GET, handler as POST, handler as PATCH, handler as DELETE };