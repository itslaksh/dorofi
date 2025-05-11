import React from "react";
import Playlist from "../Components/Homepage/playlist";
import Timer from "../Components/Homepage/timer";
import Player from "../Components/Homepage/player";

const home = () => {
	return (
		<>
			<div className="flex justify-around my-10">
				<Playlist />
				<Timer />
			</div>
			<Player />
		</>
	);
};

export default home;
