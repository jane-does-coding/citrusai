"use client";
import { Prisma } from "@prisma/client";

type FullInterview = Prisma.InterviewGetPayload<{
	include: { fields: true; notifications: true };
}>;

const InterviewHrView = ({ interview }: { interview: FullInterview }) => {
	const formattedDate = new Date(interview.createdAt).toLocaleString("en-US", {
		dateStyle: "long",
		timeStyle: "short",
	});

	return (
		<div className="flex flex-col min-h-screen w-full bg-slate-100 py-[3vh]">
			<div className="bg-white border border-slate-300 rounded-[2vh] w-[95%] mx-auto px-[3vw] py-[4vh] shadow-md">
				<h2 className="text-[4vh] font-semibold mb-[3vh] text-center steiner tracking-[1px]">
					Interview Submission
				</h2>

				<div className="mb-[5.5vh]">
					<h3 className="text-[3vh] font-extrabold steiner tracking-[2px] mb-[1vh]">
						Receiver
					</h3>
					<p className="text-[2vh]">
						<span className="font-semibold">Name:</span>{" "}
						{interview.receiverName || "Unknown"}
					</p>
					<p className="text-[2vh]">
						<span className="font-semibold">Email:</span>{" "}
						{interview.receiverEmail || "Unknown"}
					</p>
				</div>

				<div className="mb-[5.5vh] flex flex-col gap-[1vh]">
					<h3 className="text-[3vh] font-extrabold steiner tracking-[2px] mb-[1vh]">
						Submission
					</h3>
					<p className="text-[2vh]">
						<span className="font-semibold">Submitted on:</span> {formattedDate}
					</p>
					<p className="text-[2vh]">
						<span className="font-semibold">Status:</span>{" "}
						{interview.isCompleted ? (
							<span className="text-orange-700 font-semibold px-[1.5vw] text-[1.75vh] rounded-full bg-orange-100 border-orange-300 border-[1px] py-[0.5vh]">
								Completed
							</span>
						) : (
							<span className="text-orange-700 font-semibold px-[1.5vw] text-[1.75vh] rounded-full bg-orange-100 border-orange-300 border-[1px] py-[0.5vh]">
								Not completed yet
							</span>
						)}
					</p>
				</div>

				{/* Fields */}
				<div className="mb-[5.5vh]">
					<h3 className="text-[3vh] font-extrabold steiner tracking-[2px] mb-[1vh]">
						Responses
					</h3>
					<div className="flex flex-col gap-[2vh]">
						{interview.fields.map((field) => (
							<div
								key={field.id}
								className="border border-orange-300 rounded-[1.5vh] px-[1.5vw] py-[1.5vh] bg-orange-50/75"
							>
								<p className="text-[2vh] font-semibold mb-[0.5vh]">
									{field.label}
								</p>
								<p className="text-[2vh] text-slate-700">
									{field.receiverInput || (
										<span className="italic text-slate-400">No answer</span>
									)}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
};

export default InterviewHrView;
