import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function GET() {
	const currentUser = await getCurrentUser();
	if (!currentUser) return NextResponse.json([]);
	const notifications = await prisma.notification.findMany({
		where: {
			userId: currentUser.id,
			isSeen: false,
		},
	});

	return NextResponse.json(notifications);
}
