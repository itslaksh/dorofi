import React from "react";
import Playlist from "../Components/Homepage/playlist";
import Timer from "../Components/Homepage/timer";
import Player from "../Components/Homepage/player";

const home = () => {
	return (
		<>
		<div className="flex ">

			<div className="border-2 p-2 rounded-full">i</div>
		</div>
			<div className="flex justify-around my-10 md:flex-reverse">
				<Playlist />
				<Timer />
			</div>
			<Player />
		</>
	);
};

export default home;
