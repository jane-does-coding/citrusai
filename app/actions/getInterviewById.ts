import { getServerSession } from "next-auth/next";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "./getCurrentUser";

export async function getSession() {
	return await getServerSession(authOptions);
}

export default async function getInterviewById(id: string) {
	const currentUser = await getCurrentUser();
	if (!currentUser) {
		return null;
	}

	try {
		const interviews = await prisma.interview.findUnique({
			where: {
				createdById: currentUser.id,
				id: id,
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
