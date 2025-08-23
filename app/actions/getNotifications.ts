import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getSession() {
	return await getServerSession(authOptions);
}

export default async function getNotifications() {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return null;
	}

	try {
		const notifications = await prisma.notification.findMany({
			where: {
				userId: currentUser.id,
			},
			include: {
				interview: true,
				user: true,
			},
		});

		return notifications;
	} catch (err: any) {
		return null;
	}
}
