import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
	await prisma.notification.deleteMany();
	await prisma.field.deleteMany();
	await prisma.interview.deleteMany();
	await prisma.user.deleteMany();

	const hashedPassword = await bcrypt.hash("mypassword", 10);
	const hrUser = await prisma.user.create({
		data: {
			name: "Jane Doe",
			username: "jane.hr",
			email: "jane@company.com",
			hashedPassword,
		},
	});

	const interview1 = await prisma.interview.create({
		data: {
			createdById: hrUser.id,
			receiverName: "Alice Johnson",
			receiverEmail: "alice.johnson@example.com",
			comments: "Voluntary resignation, software engineer role.",
			fields: {
				create: [
					{
						type: "text",
						label: "What made you decide to leave?",
						placeholder: "Enter your reason...",
						receiverInput:
							"I found a new opportunity with better growth prospects.",
					},
					{
						type: "text",
						label: "What did you like most about working here?",
						placeholder: "Enter your response...",
						receiverInput: "Great team and flexible work culture.",
					},
					{
						type: "text",
						label: "What was the most challenging part of your job?",
						placeholder: "Enter your response...",
						receiverInput: "Sometimes workload deadlines were tight.",
					},
					{
						type: "number",
						label:
							"On a scale of 1-10, how would you rate your work-life balance?",
						placeholder: "Enter a number...",
						receiverInput: "8",
					},
					{
						type: "number",
						label: "How many years did you work with us?",
						placeholder: "Enter a number...",
						receiverInput: "2",
					},
				],
			},
			notifications: {
				create: [
					{
						userId: hrUser.id,
						message: "Alice Johnson completed her exit interview.",
						isSeen: false,
					},
				],
			},
		},
		include: { fields: true, notifications: true },
	});

	const interview2 = await prisma.interview.create({
		data: {
			createdById: hrUser.id,
			receiverName: "Bob Smith",
			receiverEmail: "bob.smith@example.com",
			comments: "Resigned after 3 years as a project manager.",
			fields: {
				create: [
					{
						type: "text",
						label: "What could we have done better?",
						placeholder: "Your suggestions...",
						receiverInput: null,
					},
					{
						type: "text",
						label: "Would you recommend this company to a friend?",
						placeholder: "Yes/No and why...",
						receiverInput: null,
					},
					{
						type: "number",
						label:
							"On a scale of 1-10, how supported did you feel by management?",
						placeholder: "Enter a number...",
						receiverInput: null,
					},
					{
						type: "text",
						label: "What benefits did you value the most?",
						placeholder: "List benefits...",
						receiverInput: null,
					},
					{
						type: "text",
						label: "Any final comments or feedback?",
						placeholder: "Enter your response...",
						receiverInput: null,
					},
				],
			},
		},
		include: { fields: true },
	});

	console.log("Database seeded successfully ✅");
	console.log({ hrUser, interview1, interview2 });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
