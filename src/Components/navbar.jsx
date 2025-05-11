import React, { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./toggletheme";
import { Menu, X } from "lucide-react";

const Navbar = () => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	return (
		<div className="flex justify-between md:justify-around items-center p-4">
			<div className="text-xl font-bold">
				<Link to="/" className="hover:underline">
					Dorofi
				</Link>
			</div>

			<div className="hidden md:flex gap-10">
				<Link to="/rooms" className="hover:underline text-[1em] md:text-[1.3em] 2xl:text-[1.5em]">
					Rooms
				</Link>
				<Link to="/about" className="hover:underline text-[1em] md:text-[1.3em] 2xl:text-[1.5em]">
					About
				</Link>
			</div>

			<div className="flex items-center gap-4 text-[1em] md:text-[1.3em] 2xl:text-[1.5em]">
				<button className="hover:underline cursor-pointer 2xl:mr-[.5em] px-[1em] py-[0.5em] rounded-4xl dark:bg-white bg-black text-white dark:text-black">
					Share
				</button>
				<button className="hover:underline cursor-pointer px-[1em] py-[0.5em] rounded-4xl dark:bg-white bg-black text-white dark:text-black">
					Join
				</button>

				<div className="hidden md:block">
					<ThemeToggle />
				</div>

				<div className="md:hidden">
					<button onClick={() => setSidebarOpen(true)}>
						<Menu size={28} />
					</button>
				</div>
			</div>

			<div
				className={`fixed top-0 right-0 h-full w-[70%] bg-white dark:bg-black p-6 transform transition-transform duration-300 z-50 ${
					isSidebarOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="flex justify-between items-center mb-8">
					<h2 className="text-xl font-bold">Menu</h2>
					<button onClick={() => setSidebarOpen(false)}>
						<X size={28} />
					</button>
				</div>

				<div className="flex flex-col gap-6 text-lg">
					<Link to="/rooms" onClick={() => setSidebarOpen(false)} className="hover:underline">
						Rooms
					</Link>
					<Link to="/about" onClick={() => setSidebarOpen(false)} className="hover:underline">
						About
					</Link>
					<ThemeToggle />
				</div>
			</div>

			{isSidebarOpen && (
				<div
					className="fixed inset-0 bg-black opacity-50 z-40"
					onClick={() => setSidebarOpen(false)}
				></div>
			)}
		</div>
	);
};

export default Navbar;
