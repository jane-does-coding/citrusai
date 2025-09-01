import getCurrentUser from "@/app/actions/getCurrentUser";
import getInterviews from "@/app/actions/getInterviews";
import Sidebar from "@/app/components/Pages/Dashboard/Sidebar";
import ProfilePage from "@/app/components/Pages/Profile/ProfilePage";
import React from "react";

const Profile = async () => {
	const currentUser = await getCurrentUser();
	let interviews = await getInterviews();
	if (!interviews) interviews = [];
	if (!currentUser) return null;
	return (
		<div className="flex">
			<div className="min-w-fit">
				<Sidebar />
			</div>
			<div className="w-full h-screen overflow-y-scroll">
				<ProfilePage currentUser={currentUser} interviews={interviews} />
			</div>
		</div>
	);
};

export default Profile;
7;
