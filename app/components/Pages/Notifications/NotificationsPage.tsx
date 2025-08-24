"use client";
import { Notification, User } from "@prisma/client";
import Link from "next/link";
import {
	LuArrowRight,
	LuCircleCheck,
	LuCircleDashed,
	LuEye,
	LuListChecks,
	LuFilter,
} from "react-icons/lu";
import { useState } from "react";
import {
	AiOutlineSortAscending,
	AiOutlineSortDescending,
} from "react-icons/ai";

const NotificationsPage = ({
	currentUser,
	notifications,
}: {
	currentUser: User;
	notifications: Notification[] | undefined | null;
}) => {
	const [sortOption, setSortOption] = useState<"latest" | "oldest" | "unseen">(
		"latest"
	);

	const markAsSeen = async (id: string) => {
		try {
			await fetch(`/api/interviews/${id}/seen`, {
				method: "PATCH",
			});
			window.location.reload();
		} catch (err) {
			console.error("Failed to mark notification as seen:", err);
		}
	};

	const markAllAsSeen = async () => {
		try {
			await fetch(`/api/interviews/seen`, {
				method: "PATCH",
			});
			window.location.reload();
		} catch (err) {
			console.error("Failed to mark all as seen:", err);
		}
	};

	if (!notifications || notifications.length === 0) {
		return (
			<div className="flex flex-col min-h-screen w-full bg-slate-100 py-[2vh]">
				<div className="bg-white border border-slate-300 rounded-[3vh] w-[96%] mx-auto px-[2vw] py-[4vh]">
					<h2 className="text-[5vh] font-semibold mb-[2vh] text-center steiner">
						Notifications
					</h2>
					<p className="text-center text-[2.5vh] text-slate-500">
						No notifications yet.
					</p>
				</div>
			</div>
		);
	}

	let sortedNotifications = [...notifications];
	if (sortOption === "latest") {
		sortedNotifications.sort(
			(a, b) =>
				new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
		);
	} else if (sortOption === "oldest") {
		sortedNotifications.sort(
			(a, b) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
		);
	} else if (sortOption === "unseen") {
		sortedNotifications.sort((a, b) => {
			if (a.isSeen === b.isSeen) {
				return (
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
				);
			}
			return a.isSeen ? 1 : -1;
		});
	}

	return (
		<div className="flex flex-col min-h-screen w-full bg-slate-100 py-[2vh]">
			<div className="bg-white border border-slate-300 rounded-[3vh] w-[96%] mx-auto px-[2vw] py-[4vh]">
				<h2 className="text-[5vh] font-semibold mb-[2vh] text-center steiner">
					Notifications
				</h2>

				<div className="flex items-center justify-between mb-[2vh] px-[1vw]">
					<div className="flex gap-[1vw]">
						<button
							onClick={() => setSortOption("latest")}
							className={`flex items-center gap-[0.5vw] px-3 py-1 rounded-lg border ${
								sortOption === "latest"
									? "bg-orange-200 border-orange-400"
									: "bg-slate-100 border-slate-300"
							}`}
						>
							<AiOutlineSortDescending /> Latest
						</button>
						<button
							onClick={() => setSortOption("oldest")}
							className={`flex items-center gap-[0.5vw] px-3 py-1 rounded-lg border ${
								sortOption === "oldest"
									? "bg-orange-200 border-orange-400"
									: "bg-slate-100 border-slate-300"
							}`}
						>
							<AiOutlineSortAscending /> Oldest
						</button>
						<button
							onClick={() => setSortOption("unseen")}
							className={`flex items-center gap-[0.5vw] px-3 py-1 rounded-lg border ${
								sortOption === "unseen"
									? "bg-orange-200 border-orange-400"
									: "bg-slate-100 border-slate-300"
							}`}
						>
							<LuFilter /> Unseen
						</button>
					</div>
					<button
						onClick={markAllAsSeen}
						className="flex items-center gap-[0.5vw] px-3 py-1 rounded-lg bg-orange-300 hover:bg-orange-400 border border-orange-500"
					>
						<LuListChecks /> Mark all as seen
					</button>
				</div>

				<div className="flex flex-col rounded-[2vh] overflow-hidden">
					{sortedNotifications.map((notification, i) => (
						<div
							key={i}
							className={`w-full flex items-center justify-between bg-orange-50 border-b py-[0.75vh] border-orange-300 px-[1.5vw] transition-opacity ${
								notification.isSeen ? "opacity-40" : "opacity-100"
							}`}
						>
							<div className="flex py-[1vh] text-[2.25vh]">
								{notification.message}
							</div>
							<div className="flex items-center justify-center gap-[2vw]">
								<span className="text-[1.75vh] font-semibold items-center justify-center flex ">
									{new Date(notification.createdAt).toLocaleDateString("en-US")}
								</span>
								{notification.isSeen ? (
									<span className="text-[1.75vh] relative font-semibold items-center justify-center flex px-[2vw] py-[0.5vh] bg-orange-300 border border-orange-400 rounded-[2vh] gap-[0.5vw]">
										Seen <LuCircleCheck className="text-[2vh]" />
									</span>
								) : (
									<span className="text-[1.75vh] font-semibold items-center justify-center flex px-[2vw] py-[0.5vh] bg-orange-300 border border-orange-400 rounded-[2vh] gap-[0.5vw]">
										New <LuCircleDashed className="text-[2vh]" />
									</span>
								)}
								<button
									onClick={() => markAsSeen(notification.id)}
									className="p-[0.5vh] hover:bg-orange-200 rounded-full"
								>
									<LuEye className="text-[2.25vh] text-orange-700" />
								</button>
								<Link href={"/interview/" + notification.interviewId}>
									<LuArrowRight className="text-[2.5vh] text-orange-900" />
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default NotificationsPage;
