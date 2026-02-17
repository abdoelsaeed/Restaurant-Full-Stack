/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cookies } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;
export async function getStatisticsPage(params: {
    from?: string;
    to?: string;
    groupBy?: string;
}) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token');
    const headers: Record<string, string> = {
        "Content-Type": "application/json",
    };
    if (token) {
        headers.Authorization = `Bearer ${token.value}`;
    }
    const query = new URLSearchParams();
    if (params.from) query.append("from", params.from);
    if (params.to) query.append("to", params.to);
    if (params.groupBy) query.append("groupBy", params.groupBy);
    const res = await fetch(`${BASE_URL}/dashboard/statistics-page?${query.toString()}`, {
        method: "GET",
        headers,
        cache: "no-store",
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to fetch orders");
    }
    return res.json();
}