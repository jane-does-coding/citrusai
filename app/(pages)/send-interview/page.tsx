import Sidebar from "@/app/components/Pages/Dashboard/Sidebar";
import SendInterviewForm from "@/app/components/Pages/SendInterview/SendInterviewForm";
import React from "react";

const SendInterview = () => {
	return (
		<div className="flex">
			<div className="min-w-fit">
				<Sidebar />
			</div>
			<div className="w-full h-screen overflow-y-scroll">
				<SendInterviewForm />
			</div>
		</div>
	);
};

export default SendInterview;
