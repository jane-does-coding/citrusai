"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
	LuChartLine,
	LuCircleFadingPlus,
	LuCitrus,
	LuLayoutDashboard,
	LuLogOut,
	LuMail,
	LuPin,
	LuUser,
} from "react-icons/lu";

const Sidebar = () => {
	const [pinned, setPinned] = useState(true);
	const [notificationsCount, setNotificationsCount] = useState<number>(0);
	const pathname = usePathname();

	const isActive = (path: string) => pathname === path;

	const activeIconClasses =
		"bg-orange-100 border-[1px] border-orange-400 text-orange-600";
	const inactiveIconClasses = "bg-slate-100 border-[1px] border-slate-300";

	useEffect(() => {
		const fetchNotifications = async () => {
			try {
				const res = await fetch("/api/notifications");
				if (!res.ok) return;
				const data = await res.json();
				setNotificationsCount(data?.length || 0);
				console.log(notificationsCount);
			} catch (error) {
				console.error("Failed to fetch notifications:", error);
			}
		};
		fetchNotifications();
	}, []);

	return (
		<div
			className={`flex flex-col justify-between ${
				pinned ? "w-[19vw]" : "w-[6vw] hover:w-[19vw]"
			} border-r-[1px] border-slate-300 transition-all h-screen overflow-hidden bg-white px-[1vw] py-[3vh] sticky`}
		>
			<button
				onClick={() => setPinned(!pinned)}
				className="absolute top-[1vh] left-[16.5vw] p-2 rounded-full text-slate-400 transition-colors cursor-pointer"
			>
				<LuPin
					className={`text-[2vh] ${
						pinned ? "text-slate-800" : "text-slate-400"
					}`}
				/>
			</button>

			<div className="flex flex-col gap-[2vh] items-start justify-start">
				<Link
					href={"/"}
					className={`w-[4vw] flex items-center justify-center relative aspect-[1] rounded-[2vh] ${activeIconClasses}`}
				>
					<LuCitrus className="text-[3.5vh] text-orange-600" />
					<div className="absolute text-orange-600 tracking-[1.5px] w-[15vw] text-[3vh] font-extrabold right-[-16.5vw] flex items-center justify-start top-[50%] translate-y-[-50%] steiner">
						Citrus.ai
					</div>
				</Link>

				<Link
					href={"/"}
					className={`w-[4vw] flex items-center justify-center relative aspect-[1] rounded-[2vh] ${
						isActive("/") ? activeIconClasses : inactiveIconClasses
					}`}
				>
					<LuLayoutDashboard
						className={`text-[3vh] ${
							isActive("/dashboard") ? "text-orange-600" : ""
						}`}
					/>
					<div className="absolute w-[15vw] text-[2.25vh] right-[-16.5vw] flex items-center justify-start top-[50%] font-medium hover:pl-[0.25vw] py-[1vh] transition-all translate-y-[-50%]">
						Dashboard
					</div>
				</Link>

				<Link
					href={"/analytics"}
					className={`w-[4vw] flex items-center justify-center relative aspect-[1] rounded-[2vh] ${
						isActive("/analytics") ? activeIconClasses : inactiveIconClasses
					}`}
				>
					<LuChartLine
						className={`text-[3vh] ${
							isActive("/analytics") ? "text-orange-600" : ""
						}`}
					/>
					<div className="absolute w-[15vw] text-[2.25vh] right-[-16.5vw] flex items-center justify-start top-[50%] font-medium hover:pl-[0.25vw] py-[1vh] transition-all translate-y-[-50%]">
						Analytics
					</div>
				</Link>

				<Link
					href={"/notifications"}
					className={`w-[4vw] flex items-center justify-center relative aspect-[1] rounded-[2vh] ${
						isActive("/notifications") ? activeIconClasses : inactiveIconClasses
					}`}
				>
					<LuMail
						className={`text-[3vh] ${
							isActive("/notifications") ? "text-orange-600" : ""
						}`}
					/>
					{notificationsCount > 0 && (
						<span className="absolute top-[0.5vh] right-[0.5vw] bg-orange-500 w-[2.25vh] h-[2.25vh] flex items-center justify-center text-white text-[1.4vh] px-[0.5vh] rounded-full">
							{notificationsCount}
						</span>
					)}
					<div className="absolute w-[15vw] text-[2.25vh] right-[-16.5vw] flex items-center justify-start top-[50%] font-medium hover:pl-[0.25vw] py-[1vh] transition-all translate-y-[-50%]">
						Notification
					</div>
				</Link>

				<Link
					href={"/send-interview"}
					className={`w-[4vw] flex items-center justify-center relative aspect-[1] rounded-[2vh] ${
						isActive("/send-interview")
							? activeIconClasses
							: inactiveIconClasses
					}`}
				>
					<LuCircleFadingPlus
						className={`text-[3vh] ${
							isActive("/send-interview") ? "text-orange-600" : ""
						}`}
					/>
					<div className="absolute w-[15vw] text-[2.25vh] right-[-16.5vw] flex items-center justify-start top-[50%] font-medium hover:pl-[0.25vw] py-[1vh] transition-all translate-y-[-50%]">
						Send Interview
					</div>
				</Link>

				<Link
					href={"/profile"}
					className={`w-[4vw] flex items-center justify-center relative aspect-[1] rounded-[2vh] ${
						isActive("/profile") ? activeIconClasses : inactiveIconClasses
					}`}
				>
					<LuUser
						className={`text-[3vh] ${
							isActive("/profile") ? "text-orange-600" : ""
						}`}
					/>
					<div className="absolute w-[15vw] text-[2.25vh] right-[-16.5vw] flex items-center justify-start top-[50%] font-medium hover:pl-[0.25vw] py-[1vh] transition-all translate-y-[-50%]">
						Profile
					</div>
				</Link>
			</div>

			<button
				onClick={() => signOut()}
				className={`w-[4vw] flex items-center justify-center relative aspect-[1] rounded-[2vh] ${
					isActive("/logout") ? activeIconClasses : inactiveIconClasses
				}`}
			>
				<LuLogOut
					className={`text-[3vh] ${
						isActive("/logout") ? "text-orange-600" : ""
					}`}
				/>
				<div className="absolute w-[15vw] text-[2.25vh] right-[-16.5vw] flex items-center justify-start top-[50%] font-medium hover:pl-[0.25vw] py-[1vh] transition-all translate-y-[-50%]">
					Logout
				</div>
			</button>
		</div>
	);
};

export default Sidebar;
