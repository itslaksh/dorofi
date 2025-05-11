import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from "react-router-dom";
import Home from "./Pages/home.jsx";
import Rooms from "./Pages/rooms.jsx";
import About from "./Pages/about.jsx";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Notfound from "./components/notfound.jsx";

const Layout = ({ children }) => (
	<div className="min-h-screen flex flex-col">
		<Navbar />
		<div className="flex-grow min-h-full">{children}</div>
		<Footer />
	</div>
);

const router = createBrowserRouter([
	{
		path: "/",
		element: (
			<Layout>
				<Home />
			</Layout>
		),
	},
	{
		path: "/rooms",
		element: (
			<Layout>
				<Rooms />
			</Layout>
		),
	},
	{
		path: "/about",
		element: (
			<Layout>
				<About />
			</Layout>
		),
	},
	{
		path: "*",
		element: (
			<Layout>
				<Notfound />
			</Layout>
		),
	},
]);

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<RouterProvider router={router} />
	</StrictMode>
);
