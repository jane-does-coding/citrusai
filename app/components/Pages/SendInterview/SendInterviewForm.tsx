"use client";
import React, { useState } from "react";
import {
	LuBinary,
	LuLetterText,
	LuPenLine,
	LuPlus,
	LuSlidersHorizontal,
	LuSquareCheck,
	LuSquareMousePointer,
	LuTrash2,
} from "react-icons/lu";

type FieldType =
	| "text"
	| "number"
	| "select"
	| "textarea"
	| "checkbox"
	| "range";

interface Field {
	id: number;
	type: FieldType;
	label: string;
	placeholder: string;
}

const SendInterviewForm = () => {
	const [fields, setFields] = useState<Field[]>([]);
	const [receiverName, setReceiverName] = useState("");
	const [receiverEmail, setReceiverEmail] = useState("");
	const [comments, setComments] = useState("");

	const handleAddField = (type: FieldType) => {
		setFields([
			...fields,
			{ id: Date.now(), type, label: type.toUpperCase(), placeholder: "" },
		]);
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const payload = {
			receiverName,
			receiverEmail,
			comments,
			fields,
		};

		try {
			const res = await fetch("/api/interviews", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload),
			});

			if (!res.ok) {
				throw new Error("Failed to create interview");
			}

			const data = await res.json();
			console.log("Interview created ✅", data);

			// optional: reset form
			setFields([]);
			setReceiverName("");
			setReceiverEmail("");
			setComments("");
		} catch (error) {
			console.error(error);
		}
	};

	const handleDeleteField = (id: number) => {
		setFields(fields.filter((field) => field.id !== id));
	};

	const handleLabelChange = (id: number, newLabel: string) => {
		setFields(fields.map((f) => (f.id === id ? { ...f, label: newLabel } : f)));
	};

	const handlePlaceholderChange = (id: number, newValue: string) => {
		setFields(
			fields.map((f) => (f.id === id ? { ...f, placeholder: newValue } : f))
		);
	};

	const renderField = (field: Field) => {
		return (
			<div
				key={field.id}
				className="mb-[2vh] relative bg-slate-50 gap-[1vw] border-slate-300/50 border-[1px] py-[1.25vh] px-[1vw] rounded-[1.5vh] flex"
			>
				<div className="w-full">
					{/* Editable label */}
					<div
						contentEditable
						suppressContentEditableWarning
						onBlur={(e) =>
							handleLabelChange(field.id, e.currentTarget.textContent || "")
						}
						className="block text-[2vh] mb-[0.5vh] cursor-text capitalize focus:outline-none focus:ring-none focus:border-none"
					>
						Field Label
					</div>

					{/* Inputs */}
					{field.type === "text" && (
						<input
							type="text"
							value={field.placeholder}
							placeholder={"Field Placeholder"}
							onChange={(e) =>
								handlePlaceholderChange(field.id, e.target.value)
							}
							className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none"
						/>
					)}
					{field.type === "number" && (
						<input
							type="number"
							placeholder={"1"}
							value={field.placeholder}
							onChange={(e) =>
								handlePlaceholderChange(field.id, e.target.value)
							}
							className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none"
						/>
					)}
					{field.type === "select" && (
						<select
							value={field.placeholder}
							onChange={(e) =>
								handlePlaceholderChange(field.id, e.target.value)
							}
							className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none"
						>
							<option value="">Option 1</option>
							<option value="Option 2">Option 2</option>
						</select>
					)}
					{field.type === "textarea" && (
						<textarea
							value={field.placeholder}
							onChange={(e) =>
								handlePlaceholderChange(field.id, e.target.value)
							}
							className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none"
						/>
					)}
					{field.type === "checkbox" && (
						<input
							type="checkbox"
							checked={field.placeholder === "checked"}
							onChange={(e) =>
								handlePlaceholderChange(
									field.id,
									e.target.checked ? "checked" : ""
								)
							}
						/>
					)}
					{field.type === "range" && (
						<input
							type="range"
							value={field.placeholder || "0"}
							onChange={(e) =>
								handlePlaceholderChange(field.id, e.target.value)
							}
						/>
					)}
				</div>

				{/* Delete button */}
				<button
					type="button"
					onClick={() => handleDeleteField(field.id)}
					className="flex items-center justify-center bg-slate-100 border-[1px] border-slate-300 px-[1vw] rounded-[1vh] text-red-500 hover:text-red-700 text-[2vh]"
				>
					<LuTrash2 className="text-[2.5vh]" />
				</button>
			</div>
		);
	};

	return (
		<div className="w-full py-[3vh] px-[2vw] ">
			<form
				onSubmit={handleSubmit}
				className="bg-green-100/0 py-[1vh] border-r-[1px] border-slate-300 pr-[1.5vw] pb-[3vh] w-full"
			>
				<h2 className="text-[3vh] font-light mb-[2vh] pt-[2vh] text-start">
					Interview Form
				</h2>
				<div className="mb-[2vh]">
					<label className="block text-[2vh] mb-[0.5vh]">Receiver Name</label>
					<input
						type="text"
						value={receiverName}
						onChange={(e) => setReceiverName(e.target.value)}
						placeholder="Receiver Name"
						className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none mb-[2vh]"
					/>
				</div>
				<div className="mb-[2vh]">
					<label className="block text-[2vh] mb-[0.5vh]">Receiver Email</label>
					<input
						type="text"
						value={receiverEmail}
						onChange={(e) => setReceiverEmail(e.target.value)}
						placeholder="Receiver Email"
						className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none mb-[2vh]"
					/>
				</div>
				<div className="mb-[2vh]">
					<label className="block text-[2vh] mb-[0.5vh]">
						Additional Comments
					</label>
					<textarea
						value={comments}
						onChange={(e) => setComments(e.target.value)}
						placeholder="Additional Comments"
						className="border-slate-300 border-[1px] rounded-[1.5vh] text-[2vh] px-[1vw] py-[1vh] w-full focus:outline-none"
					/>
				</div>

				{/* Render dynamic fields */}
				{fields.map((field) => renderField(field))}

				<h2 className="text-[2.5vh] font-light mb-[2vh] mt-[3vh] pt-[3vh] border-t-[1px] border-slate-300 text-start flex items-center justify-center gap-[1vw]">
					Add Input <LuPlus className="text-[2.5vh] inline" />
				</h2>
				<div className="grid grid-cols-3 gap-x-[0.5vw] gap-y-[1vh] pr-[0vw]">
					<button
						type="button"
						onClick={() => handleAddField("text")}
						className="bg-slate-100 border-slate-300 border-[1px] py-[1vh] px-[1vw] flex items-center justify-center rounded-[1.75vh] cursor-pointer"
					>
						<h2 className="text-[2vh] flex items-center justify-center gap-[0.75vw]">
							Text <LuPenLine className="text-[2.5vh]" />
						</h2>
					</button>
					<button
						type="button"
						onClick={() => handleAddField("number")}
						className="bg-slate-100 border-slate-300 border-[1px] py-[1vh] px-[1vw] flex items-center justify-center rounded-[1.75vh] cursor-pointer"
					>
						<h2 className="text-[2vh] flex items-center justify-center gap-[0.75vw]">
							Number <LuBinary className="text-[2.5vh]" />
						</h2>
					</button>
					<button
						type="button"
						onClick={() => handleAddField("select")}
						className="bg-slate-100 border-slate-300 border-[1px] py-[1vh] px-[1vw] flex items-center justify-center rounded-[1.75vh] cursor-pointer"
					>
						<h2 className="text-[2vh] flex items-center justify-center gap-[0.75vw]">
							Select <LuSquareMousePointer className="text-[2.5vh]" />
						</h2>
					</button>
					<button
						type="button"
						onClick={() => handleAddField("textarea")}
						className="bg-slate-100 border-slate-300 border-[1px] py-[1vh] px-[1vw] flex items-center justify-center rounded-[1.75vh] cursor-pointer"
					>
						<h2 className="text-[2vh] flex items-center justify-center gap-[0.75vw]">
							Textarea <LuLetterText className="text-[2.5vh]" />
						</h2>
					</button>
					<button
						type="button"
						onClick={() => handleAddField("checkbox")}
						className="bg-slate-100 border-slate-300 border-[1px] py-[1vh] px-[1vw] flex items-center justify-center rounded-[1.75vh] cursor-pointer"
					>
						<h2 className="text-[2vh] flex items-center justify-center gap-[0.75vw]">
							Checkbox <LuSquareCheck className="text-[2.5vh]" />
						</h2>
					</button>
					<button
						type="button"
						onClick={() => handleAddField("range")}
						className="bg-slate-100 border-slate-300 border-[1px] py-[1vh] px-[1vw] flex items-center justify-center rounded-[1.75vh] cursor-pointer"
					>
						<h2 className="text-[2vh] flex items-center justify-center gap-[0.75vw]">
							Range <LuSlidersHorizontal className="text-[2.5vh]" />
						</h2>
					</button>
				</div>
				<button
					type="submit"
					className="bg-orange-100 text-orange-600 border-[1px] border-orange-500 w-full cursor-pointer mt-[3vh] text-[2vh] font-semibold rounded-[2vh] py-[1.25vh]"
				>
					Complete
				</button>
			</form>
		</div>
	);
};

export default SendInterviewForm;
