import { User, Interview, Notification, Field } from "@prisma/client";
import React from "react";
import { formatDistanceToNow } from "date-fns";

const ProfilePage = ({
	currentUser,
	interviews,
}: {
	currentUser: User;
	interviews: Interview[];
}) => {
	return (
		<div className="max-w-5xl mx-auto p-6 space-y-8">
			{/* USER INFO */}
			<div className="bg-white shadow-lg rounded-2xl p-6">
				<h2 className="text-xl font-bold mb-4">Profile Information</h2>
				<div className="space-y-2">
					<p>
						<span className="font-semibold">Name:</span> {currentUser.name}
					</p>
					<p>
						<span className="font-semibold">Username:</span>{" "}
						{currentUser.username}
					</p>
					<p>
						<span className="font-semibold">Email:</span> {currentUser.email}
					</p>
					<p>
						<span className="font-semibold">Joined:</span>{" "}
						{new Date(currentUser.createdAt).toLocaleDateString()}
					</p>
					<p>
						<span className="font-semibold">Last Updated:</span>{" "}
						{new Date(currentUser.updatedAt).toLocaleDateString()}
					</p>
				</div>
			</div>

			{/* INTERVIEWS */}
			<div className="bg-white shadow-lg rounded-2xl p-6">
				<h2 className="text-xl font-bold mb-4">Created Interviews</h2>
				{interviews.length === 0 ? (
					<p className="text-gray-500">No interviews created yet.</p>
				) : (
					<div className="space-y-4">
						{interviews.map((interview) => (
							<div
								key={interview.id}
								className="p-4 border rounded-xl shadow-sm space-y-2"
							>
								<div className="flex justify-between items-center">
									<p>
										<span className="font-semibold">Receiver:</span>{" "}
										{interview.receiverName} ({interview.receiverEmail})
									</p>
									<span
										className={`px-3 py-1 text-sm rounded-full ${
											interview.isCompleted
												? "bg-green-100 text-green-700"
												: "bg-yellow-100 text-yellow-700"
										}`}
									>
										{interview.isCompleted ? "Completed" : "Pending"}
									</span>
								</div>
								<p>
									<span className="font-semibold">Created:</span>{" "}
									{new Date(interview.createdAt).toLocaleDateString()}
								</p>
								{interview.comments && (
									<p>
										<span className="font-semibold">Comments:</span>{" "}
										{interview.comments}
									</p>
								)}

								{/* Fields */}
								{/* <div className="mt-2">
									<p className="font-semibold">Questions:</p>
									<ul className="list-disc pl-5">
										{interview.fields.map((field) => (
											<li key={field.id}>
												<span className="font-medium">{field.label}:</span>{" "}
												{field.receiverInput ? (
													field.receiverInput
												) : (
													<span className="italic text-gray-500">
														(No response yet)
													</span>
												)}
											</li>
										))}
									</ul>
								</div> */}
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default ProfilePage;
