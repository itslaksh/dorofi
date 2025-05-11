import React from "react";
import Playlist from "../Components/Homepage/playlist";
import Timer from "../Components/Homepage/timer";
import Player from "../Components/Homepage/player";

const home = () => {
	return (
		<>
		<div className="flex justify-end ">

			<div className="border-2 p-2 rounded-full">i</div>
		</div>
			<div className="flex  justify-center my-10 md:flex-reverse m-5 p-10 rounded">
				<div className="w-[80%] 2xl:w-[1500px] flex flex-col-reverse gap-10 md:flex-row justify-around ">
				<Playlist />
				<Timer />
				</div>
			</div>
			<Player />
		</>
	);
};

export default home;
