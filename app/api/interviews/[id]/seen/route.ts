import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function PATCH(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const notification = await prisma.notification.update({
			where: { id: params.id },
			data: { isSeen: true },
		});

		return NextResponse.json(notification);
	} catch (error) {
		console.error("Error marking notification as seen:", error);
		return new NextResponse("Internal Error", { status: 500 });
	}
}
