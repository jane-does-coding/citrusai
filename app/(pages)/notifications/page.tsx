import getCurrentUser from "@/app/actions/getCurrentUser";
import getNotifications from "@/app/actions/getNotifications";
import Sidebar from "@/app/components/Pages/Dashboard/Sidebar";
import NotificationsPage from "@/app/components/Pages/Notifications/NotificationsPage";
import React from "react";

const Notifications = async () => {
	const currentUser = await getCurrentUser();
	let notifications = await getNotifications();

	if (!notifications) notifications = [];

	if (!currentUser)
		return (
			<div className="flex justify-center items-center h-screen">
				Not Authorized
			</div>
		);

	return (
		<div className="flex">
			<div className="min-w-fit">
				<Sidebar />
			</div>
			<NotificationsPage
				notifications={notifications}
				currentUser={currentUser}
			/>
		</div>
	);
};

export default Notifications;
