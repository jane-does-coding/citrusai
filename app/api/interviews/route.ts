import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const body = await req.json();
		const { receiverName, receiverEmail, comments, fields } = body;

		const interview = await prisma.interview.create({
			data: {
				receiverName,
				receiverEmail,
				comments,
				createdById: currentUser.id,
				fields: {
					create: fields.map((f: any) => ({
						type: f.type,
						label: f.label,
						placeholder: f.placeholder || "",
						options: f.options ? { set: f.options } : undefined,
					})),
				},
			},
			include: { fields: true },
		});

		return NextResponse.json(interview);
	} catch (err: any) {
		console.error("Interview creation failed:", err);
		return NextResponse.json(
			{ error: "Failed to create interview" },
			{ status: 500 }
		);
	}
}

export async function DELETE(req: Request) {
	try {
		const currentUser = await getCurrentUser();
		if (!currentUser) {
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		const { searchParams } = new URL(req.url);
		const interviewId = searchParams.get("id");
		if (!interviewId) {
			return NextResponse.json(
				{ error: "Interview ID required" },
				{ status: 400 }
			);
		}

		// Optional: authorize ownership
		const interview = await prisma.interview.findUnique({
			where: { id: interviewId },
		});
		if (!interview)
			return NextResponse.json({ error: "Not found" }, { status: 404 });
		if (interview.createdById !== currentUser.id) {
			return NextResponse.json({ error: "Forbidden" }, { status: 403 });
		}

		// Manually cascade
		await prisma.$transaction([
			prisma.field.deleteMany({ where: { interviewId } }),
			prisma.notification.deleteMany({ where: { interviewId } }),
			prisma.interview.delete({ where: { id: interviewId } }),
		]);

		return NextResponse.json({ success: true });
	} catch (err) {
		console.error("Interview deletion failed:", err);
		return NextResponse.json(
			{ error: "Failed to delete interview" },
			{ status: 500 }
		);
	}
}
