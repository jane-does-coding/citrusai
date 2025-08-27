"use client";

import { Prisma } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import { LuCitrus } from "react-icons/lu";
import { motion, AnimatePresence } from "framer-motion";

type FullInterview = Prisma.InterviewGetPayload<{
	include: { fields: true; notifications: true };
}>;

const InterviewRecieverView = ({ interview }: { interview: FullInterview }) => {
	const [formData, setFormData] = useState<Record<string, string>>(
		interview.fields.reduce(
			(acc, field) => ({ ...acc, [field.id]: field.receiverInput || "" }),
			{ comments: interview.comments || "" }
		)
	);
	const [completed, setCompleted] = useState(interview.isCompleted);

	const handleChange = (id: string, value: string) => {
		setFormData((prev) => ({ ...prev, [id]: value }));
	};

	const handleSubmit = async () => {
		await fetch(`/api/interviews/${interview.id}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});
		setCompleted(true);
	};

	const renderField = (field: (typeof interview.fields)[number]) => {
		switch (field.type) {
			case "text":
			case "number":
			case "range":
				return (
					<input
						type={field.type}
						value={formData[field.id]}
						placeholder={field.placeholder}
						onChange={(e) => handleChange(field.id, e.target.value)}
						className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none"
					/>
				);

			case "textarea":
				return (
					<textarea
						value={formData[field.id]}
						placeholder={field.placeholder}
						onChange={(e) => handleChange(field.id, e.target.value)}
						className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none"
					/>
				);

			case "checkbox":
				return (
					<input
						type="checkbox"
						checked={formData[field.id] === "checked"}
						onChange={(e) =>
							handleChange(field.id, e.target.checked ? "checked" : "")
						}
					/>
				);

			case "select":
				return (
					<select
						value={formData[field.id]}
						onChange={(e) => handleChange(field.id, e.target.value)}
						className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none"
					>
						{field.options?.map((opt, i) => (
							<option key={i} value={opt}>
								{opt}
							</option>
						))}
					</select>
				);

			case "radio":
				return (
					<div className="flex flex-col gap-[0.5vh]">
						{field.options?.map((opt, i) => (
							<label key={i}>
								<input
									type="radio"
									name={`radio-${field.id}`}
									value={opt}
									checked={formData[field.id] === opt}
									onChange={(e) => handleChange(field.id, e.target.value)}
								/>
								{opt}
							</label>
						))}
					</div>
				);
		}
	};

	return (
		<div className="flex flex-col min-h-screen w-full bg-slate-100 py-[2vh]">
			<div className="bg-white border-[1px] border-slate-300 rounded-[3vh] w-[96%] mx-auto px-[2vw] py-[3vh]">
				<Link
					href={"/"}
					className={`w-full h-[10vh] gap-[1vw] mb-[1vh] flex items-center justify-center relative aspect-[1] rounded-[2vh] mx-auto`}
				>
					<LuCitrus className="text-[4vh] text-orange-600" />
					<div className=" text-orange-600 tracking-[1.5px] text-[3.5vh] font-extrabold flex items-center justify-center steiner">
						Citrus.ai
					</div>
				</Link>

				<h2 className="text-[6vh] font-semibold mb-[2vh] text-center steiner">
					Exit Interview
				</h2>

				<AnimatePresence>
					{completed ? (
						<motion.div
							key="completed"
							initial={{ opacity: 0, y: 50 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -50 }}
							transition={{ duration: 0.6, ease: "easeOut" }}
							className="flex flex-col items-center justify-center min-h-[30vh] text-center"
						>
							<motion.div
								initial={{ scale: 0 }}
								animate={{ scale: 1 }}
								transition={{ type: "spring", stiffness: 150, damping: 12 }}
								className="bg-orange-100 border border-orange-400 text-orange-700 px-8 py-6 rounded-[2vh] shadow-lg"
							>
								<h3 className="text-[3vh] font-bold mb-[1vh] steiner tracking-[2px]">
									Interview Completed!
								</h3>
								<p className="text-[2vh]">
									Thank you for completing your exit interview!
								</p>
							</motion.div>
						</motion.div>
					) : (
						<motion.div
							key="form"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<div className="mb-[2vh]">
								<h3 className="text-[2.5vh] font-semibold">Name:</h3>
								<p className="text-[2vh]">{interview.receiverName}</p>
							</div>
							<div className="mb-[2vh]">
								<h3 className="text-[2.5vh] font-semibold">Email:</h3>
								<p className="text-[2vh]">{interview.receiverEmail}</p>
							</div>

							{interview.fields.map((field) => (
								<div key={field.id} className="mb-[2vh]">
									<label className="block text-[2.5vh] font-semibold mb-[0.5vh]">
										{field.label}
									</label>
									{renderField(field)}
								</div>
							))}

							<div className="mb-[2vh]">
								<label className="block text-[2.5vh] font-semibold mb-[0.5vh]">
									Comments
								</label>
								<textarea
									value={formData.comments}
									placeholder="Add your comments"
									onChange={(e) => handleChange("comments", e.target.value)}
									className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none"
								/>
							</div>

							<button
								onClick={handleSubmit}
								className="w-full bg-orange-600 text-white font-semibold py-[1vh] rounded-[1.5vh] text-[2.5vh] mt-[2vh]"
							>
								Submit
							</button>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</div>
	);
};

export default InterviewRecieverView;
