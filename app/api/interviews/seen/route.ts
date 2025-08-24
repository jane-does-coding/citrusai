import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PATCH() {
	try {
		await prisma.notification.updateMany({
			where: { isSeen: false },
			data: { isSeen: true },
		});

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Failed to mark all as seen:", error);
		return NextResponse.json(
			{ success: false, error: "Failed to mark all as seen" },
			{ status: 500 }
		);
	}
}
