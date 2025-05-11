import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
	const [selectedTime, setSelectedTime] = useState(25 * 60);
	const [timeLeft, setTimeLeft] = useState(selectedTime);
	const [isRunning, setIsRunning] = useState(false);
	const [customTimes, setCustomTimes] = useState({
		work1: 25,
		work2: 50,
		break1: 5,
		break2: 10,
	});

	const timerRef = useRef(null);

	const formatTime = (secs) => {
		const m = String(Math.floor(secs / 60)).padStart(2, "0");
		const s = String(secs % 60).padStart(2, "0");
		return `${m}:${s}`;
	};

	useEffect(() => {
		if (isRunning) {
			timerRef.current = setInterval(() => {
				setTimeLeft((prev) => {
					if (prev <= 1) {
						clearInterval(timerRef.current);
						setIsRunning(false);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		} else {
			clearInterval(timerRef.current);
		}
		return () => clearInterval(timerRef.current);
	}, [isRunning]);

	const startPause = () => setIsRunning((prev) => !prev);

	const reset = () => {
		setIsRunning(false);
		setTimeLeft(selectedTime);
	};

	const handleChange = (key, value) => {
		const minutes = Math.max(1, parseInt(value) || 1);
		setCustomTimes((prev) => ({ ...prev, [key]: minutes }));
	};

	const applyTime = (mins) => {
		const seconds = mins * 60;
		setIsRunning(false);
		setSelectedTime(seconds);
		setTimeLeft(seconds);
	};

	return (
		<div className="flex flex-col items-center gap-6 text-center p-4 border-2 rounded-xl">
			<div className="flex flex-col items-center">
				<div className="text-5xl font-bold px-[2em] py-[1em] ">
					{formatTime(timeLeft)}
				</div>

				<div className="flex gap-6 text-2xl">
					<button onClick={startPause} className="hover:text-blue-600">
						{isRunning ? "⏸" : "▶"}
					</button>
					<button onClick={reset} className="hover:text-red-900">
						🔁
					</button>
				</div>
			</div>

			<div className="grid grid-cols-2 mt-6">
				{Object.entries(customTimes).map(([key, mins]) => (
					<div key={key} className="flex flex-col items-center bg-red-100 p-4">
						<input
							type="number"
							value={mins}
							onChange={(e) => handleChange(key, e.target.value)}
							className="w-16 text-center "
							min={1}
						/>
						<button
							onClick={() => applyTime(mins)}
							className="mt-1 text-sm text-blue-600 hover:underline"
						>
							Use {mins}m
						</button>
					</div>
				))}
			</div>
		</div>
	);
};

export default Timer;
