import { Interview, Prisma } from "@prisma/client";
import Link from "next/link";
import { LuArrowRight, LuCircleCheck, LuCircleDashed } from "react-icons/lu";

type FullInterview = Prisma.InterviewGetPayload<{
	include: { fields: true; notifications: true };
}>;

const Interviews = ({ interviews }: { interviews: FullInterview[] }) => {
	return (
		<div className="flex flex-col min-h-screen w-full bg-slate-100 py-[2vh]">
			<div className="bg-white border-[1px] border-slate-300 rounded-[3vh] w-[96%] mx-auto px-[2vw] py-[4vh]">
				<h2 className="text-[5vh] font-semibold mb-[2vh] text-center steiner">
					Interviews
				</h2>
				<div className="flex flex-col rounded-[2vh] overflow-hidden">
					{interviews.map((interview, i) => (
						<Link href={"interview/" + interview.id} key={i}>
							<div className="w-full flex items-center justify-between bg-orange-50 border-b-[1px] py-[0.75vh] border-orange-300 px-[1.5vw]">
								<div className="flex py-[1vh] text-[2.5vh]">
									{interview.receiverName}
								</div>
								<div className="flex items-center justify-center gap-[4vw]">
									<span className="text-[1.75vh] font-semibold items-center justify-center flex ">
										{interview.fields.length + 3} Questions
									</span>
									<span className="text-[1.75vh] font-semibold items-center justify-center flex ">
										{interview.createdAt.toLocaleDateString("en-US", {})}
									</span>
									{interview.isCompleted ? (
										<span className="text-[1.75vh] relative font-semibold items-center justify-center flex px-[2vw] py-[0.5vh] bg-orange-300 border-[1px] border-orange-400 rounded-[2vh] gap-[0.5vw]">
											Completed <LuCircleCheck className="text-[2vh]" />
										</span>
									) : (
										<span className="text-[1.75vh] font-semibold items-center justify-center flex px-[2vw] py-[0.5vh] bg-orange-300 border-[1px] border-orange-400 rounded-[2vh] gap-[0.5vw]">
											Pending <LuCircleDashed className="text-[2vh]" />
										</span>
									)}
									<button>
										<LuArrowRight className="text-[2.5vh] text-orange-900" />
									</button>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
};

export default Interviews;
