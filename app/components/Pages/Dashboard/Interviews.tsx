"use client";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import {
	LuArrowRight,
	LuCircleCheck,
	LuCircleDashed,
	LuSearch,
} from "react-icons/lu";
import { useState, useMemo } from "react";

type FullInterview = Prisma.InterviewGetPayload<{
	include: { fields: true; notifications: true };
}>;

const Interviews = ({ interviews }: { interviews: FullInterview[] }) => {
	const [search, setSearch] = useState("");
	const [sortBy, setSortBy] = useState<"date" | "questions">("date");
	const [order, setOrder] = useState<"asc" | "desc">("desc");

	// Filtering + sorting logic
	const filtered = useMemo(() => {
		let data = [...interviews];

		// Search filter
		if (search.trim() !== "") {
			data = data.filter((i) =>
				i.receiverName.toLowerCase().includes(search.toLowerCase())
			);
		}

		// Sorting
		data.sort((a, b) => {
			if (sortBy === "date") {
				const aDate = new Date(a.createdAt).getTime();
				const bDate = new Date(b.createdAt).getTime();
				return order === "asc" ? aDate - bDate : bDate - aDate;
			} else {
				const aQ = a.fields.length + 3;
				const bQ = b.fields.length + 3;
				return order === "asc" ? aQ - bQ : bQ - aQ;
			}
		});

		return data;
	}, [interviews, search, sortBy, order]);

	return (
		<div className="flex flex-col min-h-screen w-full bg-slate-100 py-[2vh]">
			<div className="bg-white border-[1px] border-slate-300 rounded-[3vh] w-[96%] mx-auto px-[2vw] py-[4vh]">
				<h2 className="text-[5vh] font-semibold mb-[2vh] text-center steiner">
					Interviews
				</h2>

				<div className="flex flex-col md:flex-row gap-3 items-center justify-between mb-4">
					<div className="flex items-center gap-2 w-full">
						<input
							type="text"
							value={search}
							onChange={(e) => setSearch(e.target.value)}
							placeholder="Search by name..."
							className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none"
						/>
					</div>

					<div className="flex items-center gap-2 w-full md:w-auto">
						<select
							value={sortBy}
							onChange={(e) => setSortBy(e.target.value as any)}
							className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] focus:outline-none"
						>
							<option value="date">Date</option>
							<option value="questions">Questions</option>
						</select>
						<select
							value={order}
							onChange={(e) => setOrder(e.target.value as any)}
							className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] focus:outline-none"
						>
							<option value="asc">Ascending</option>
							<option value="desc">Descending</option>
						</select>
					</div>
				</div>

				<div className="flex flex-col rounded-[2vh] overflow-hidden">
					{filtered.length === 0 ? (
						<p className="text-center py-6 text-slate-500">
							No interviews found.
						</p>
					) : (
						filtered.map((interview, i) => {
							const hasUnseen = interview.notifications.some((n) => !n.isSeen);

							return (
								<Link href={"interview/" + interview.id} key={i}>
									<div className="w-full flex items-center justify-between bg-orange-50 border-b-[1px] py-[0.75vh] border-orange-300 px-[1.5vw] hover:bg-orange-100 transition">
										<div className="flex items-center gap-2 py-[1vh] text-[2.5vh]">
											{interview.receiverName}
											{hasUnseen && (
												<span className="ml-2 px-2 py-0.5 text-[1.2vh] bg-red-500 text-white rounded-full">
													New
												</span>
											)}
										</div>
										<div className="flex items-center justify-center gap-[4vw]">
											<span className="text-[1.75vh] font-semibold flex">
												{interview.fields.length + 3} Questions
											</span>
											<span className="text-[1.75vh] font-semibold flex">
												{new Date(interview.createdAt).toLocaleDateString(
													"en-US"
												)}
											</span>
											{interview.isCompleted ? (
												<span className="text-[1.75vh] flex px-[2vw] py-[0.5vh] bg-orange-300 items-center justify-center border-[1px] border-orange-400 rounded-[2vh] gap-[0.5vw]">
													Completed{" "}
													<LuCircleCheck className="text-[2vh] ml-1" />
												</span>
											) : (
												<span className="text-[1.75vh] flex px-[2.5vw] py-[0.5vh] bg-orange-300 items-center justify-center border-[1px] border-orange-400 rounded-[2vh] gap-[0.5vw]">
													Pending <LuCircleDashed className="text-[2vh] ml-1" />
												</span>
											)}
											<button>
												<LuArrowRight className="text-[2.5vh] text-orange-900" />
											</button>
										</div>
									</div>
								</Link>
							);
						})
					)}
				</div>
			</div>
		</div>
	);
};

export default Interviews;
