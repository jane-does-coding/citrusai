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
