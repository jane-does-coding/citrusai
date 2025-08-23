import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(
	req: Request,
	{ params }: { params: { id: string } }
) {
	try {
		const body = await req.json();
		const { id } = params;

		const updatedInterview = await prisma.interview.update({
			where: { id },
			data: {
				comments: body.comments || null,
				isCompleted: true,
				fields: {
					updateMany: Object.entries(body)
						.filter(([key]) => key !== "comments")
						.map(([fieldId, receiverInput]) => ({
							where: { id: fieldId },
							data: { receiverInput: receiverInput as string },
						})),
				},
				notifications: {
					create: {
						userId: (await prisma.interview.findUnique({
							where: { id },
							select: { createdById: true },
						}))!.createdById,
						message: "Exit interview has been completed.",
					},
				},
			},
			include: { fields: true, notifications: true },
		});

		return NextResponse.json(updatedInterview);
	} catch (error) {
		console.error(error);
		return new NextResponse("Error updating interview", { status: 500 });
	}
}
