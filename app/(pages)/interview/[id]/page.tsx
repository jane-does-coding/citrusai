import React from "react";
import Sidebar from "@/app/components/Pages/Dashboard/Sidebar";
import getCurrentUser from "@/app/actions/getCurrentUser";
import InterviewHrView from "@/app/components/Interview/InterviewHrView";
import InterviewRecieverView from "@/app/components/Interview/InterviewRecieverView";
import getInterviewById from "@/app/actions/getInterviewById";

const Page = async ({ params }: { params: { id: string } }) => {
	const currentUser = await getCurrentUser();
	const interviewId = params.id;
	const interview = await getInterviewById(interviewId);

	if (!interview) return;

	return (
		<div className="flex">
			<div className="w-full">
				{!currentUser ? (
					<div className="">
						<div className="min-w-fit">
							<Sidebar />
						</div>
						<div className="w-fulll">
							<InterviewHrView />
						</div>
					</div>
				) : (
					<InterviewRecieverView interview={interview} />
				)}
			</div>
		</div>
	);
};

export default Page;
