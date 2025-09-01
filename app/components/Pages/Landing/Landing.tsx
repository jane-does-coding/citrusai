"use client";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import React from "react";
import { LuCitrus } from "react-icons/lu";

const Landing = () => {
	const registerModal = useRegisterModal();
	return (
		<div className="flex flex-col">
			<h1 className="steiner text-orange-600 font-extrabold text-[10vh] tracking-[5px] text-center flex items-center justify-center gap-[2vw] mt-[13vh]">
				<LuCitrus className="inline text-[10vh] mb-2" />
				Citrus.ai
			</h1>
			<p className="steiner text-[3vh] tracking-[2px] text-center mt-[2vh]">
				Not every goodbye has to be a bad one
			</p>
			<div className="flex w-[80vw] mx-auto mt-[5vh] gap-[0.25vw]">
				<div className="w-full py-[2.5vh] px-[1.25vw] bg-orange-200 rounded-[2vh]">
					<h2 className="font-extrabold text-center steiner text-[3.5vh] tracking-[2px]">
						Streamlined
					</h2>
					<p className="text-[2.5vh] mt-[1vh] font-light text-center">
						because it makes the exit interview process smooth and efficient.
					</p>
				</div>
				<div className="w-full py-[2.5vh] px-[1.25vw] bg-orange-200 rounded-[2vh]">
					<h2 className="font-extrabold text-center steiner text-[3.5vh] tracking-[2px]">
						Insightful
					</h2>
					<p className="text-[2.5vh] mt-[1vh] font-light text-center">
						since it helps HR gather valuable feedback from employees.
					</p>
				</div>
				<div className="w-full py-[2.5vh] px-[1.25vw] bg-orange-200 rounded-[2vh]">
					<h2 className="font-extrabold text-center steiner text-[3.5vh] tracking-[2px]">
						Collaborative
					</h2>
					<p className="text-[2.5vh] mt-[1vh] font-light text-center">
						because it connects HR/admins and employees in a structured way.
					</p>
				</div>
			</div>
			<button
				onClick={() => registerModal.onOpen()}
				className="text-[2vh] px-[2vw] py-[1.25vh] bg-orange-600 text-white mx-auto relative rounded-[2vh] mt-[3vh]"
			>
				Get Started
			</button>
		</div>
	);
};

export default Landing;
