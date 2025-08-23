import { Notification, User } from "@prisma/client";
import Link from "next/link";
import { LuArrowRight, LuCircleCheck, LuCircleDashed } from "react-icons/lu";

const NotificationsPage = ({
	currentUser,
	notifications,
}: {
	currentUser: User;
	notifications: Notification[] | undefined | null;
}) => {
	if (!notifications || notifications.length === 0) {
		return (
			<div className="flex flex-col min-h-screen w-full bg-slate-100 py-[2vh]">
				<div className="bg-white border-[1px] border-slate-300 rounded-[3vh] w-[96%] mx-auto px-[2vw] py-[4vh]">
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

	return (
		<div className="flex flex-col min-h-screen w-full bg-slate-100 py-[2vh]">
			<div className="bg-white border-[1px] border-slate-300 rounded-[3vh] w-[96%] mx-auto px-[2vw] py-[4vh]">
				<h2 className="text-[5vh] font-semibold mb-[2vh] text-center steiner">
					Notifications
				</h2>
				<div className="flex flex-col rounded-[2vh] overflow-hidden">
					{notifications.map((notification, i) => (
						<div
							key={i}
							className="w-full flex items-center justify-between bg-orange-50 border-b-[1px] py-[0.75vh] border-orange-300 px-[1.5vw]"
						>
							<div className="flex py-[1vh] text-[2.25vh]">
								{notification.message}
							</div>
							<div className="flex items-center justify-center gap-[4vw]">
								<span className="text-[1.75vh] font-semibold items-center justify-center flex ">
									{notification.createdAt.toLocaleDateString("en-US", {})}
								</span>
								{notification.isSeen ? (
									<span className="text-[1.75vh] relative font-semibold items-center justify-center flex px-[2vw] py-[0.5vh] bg-orange-300 border-[1px] border-orange-400 rounded-[2vh] gap-[0.5vw]">
										Seen <LuCircleCheck className="text-[2vh]" />
									</span>
								) : (
									<span className="text-[1.75vh] font-semibold items-center justify-center flex px-[2vw] py-[0.5vh] bg-orange-300 border-[1px] border-orange-400 rounded-[2vh] gap-[0.5vw]">
										New <LuCircleDashed className="text-[2vh]" />
									</span>
								)}
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
