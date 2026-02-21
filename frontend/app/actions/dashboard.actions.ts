/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// app/dashboard/product-management/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
export async function createFood(data: any) {
    const { finalPrice, _id, createdAt, updatedAt, __v, ...finalData } = data;

    const dataToSend = {
        ...finalData,
        image: finalData.image || "https://www.foodandwine.com/thmb/XE8ubzwObCIgMw7qJ9CsqUZocNM=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/MSG-Smash-Burger-FT-RECIPE0124-d9682401f3554ef683e24311abdf342b.jpg"
    };

    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/food`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(dataToSend),
            }
        );

        if (!response.ok) {
            const error = await response.json();
            return {
                success: false,
                message: error.message || "Failed to create food",
            };
        }

        const result = await response.json();
        return {
            success: true,
            data: result.data,
            message: result.message,
        };
    } catch (error: any) {
        return {
            success: false,
            message: error.message || "Error creating food",
        };
    }
}
// ...existing code...
export async function duplicateFood(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/dashboard/${id}/duplicate`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token?.value}`,
        },
    });

    revalidatePath("/dashboard/product-management");
}

export async function updateFood(id: string, data: any) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    const { _id,
        finalPrice,
        ordersCount,
        createdAt,
        updatedAt,
        __v,
        isWishlisted, ...finalData } = data;
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/food/${id}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token?.value}`,
                },
                body: JSON.stringify(finalData),
            }
        );

        if (!response.ok) {
            throw new Error("Failed to update food");
        }

        revalidatePath("/dashboard/product-management");

        return { success: true };
    } catch (error) {
        console.error("Update error:", error);
        return { success: false };
    }
}

export async function deleteFood(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");

    await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/food/${id}`, {
        method: "DELETE",
        headers: {
            Authorization: `Bearer ${token?.value}`,
        },
    });

    revalidatePath("/dashboard/product-management");
}