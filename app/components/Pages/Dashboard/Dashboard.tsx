import React from "react";
import Sidebar from "./Sidebar";
import Interviews from "./Interviews";
import getInterviews from "@/app/actions/getInterviews";

const Dashboard = async () => {
	const interviews = await getInterviews();
	console.log(interviews);

	return (
		<div className="flex">
			<div className="min-w-fit">
				<Sidebar />
			</div>
			{interviews != null ? (
				<Interviews interviews={interviews} />
			) : (
				<div className="">no interviews</div>
			)}
		</div>
	);
};

export default Dashboard;
