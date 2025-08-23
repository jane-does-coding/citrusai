import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getSession() {
	return await getServerSession(authOptions);
}

export default async function getInterviews() {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return null;
	}

	try {
		const interviews = await prisma.interview.findMany({
			where: {
				createdById: currentUser.id,
			},
			include: {
				fields: true,
				notifications: true,
			},
		});

		return interviews;
	} catch (err: any) {
		return null;
	}
}
