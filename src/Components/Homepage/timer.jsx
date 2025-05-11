import React, { useState, useEffect, useRef } from "react";

const Timer = () => {
  const [selectedTime, setSelectedTime] = useState(25 * 60);
  const [timeLeft, setTimeLeft] = useState(selectedTime);
  const [isRunning, setIsRunning] = useState(false);
  const [currentType, setCurrentType] = useState("work"); // "work" or "break"
  const [activePreset, setActivePreset] = useState("focus");

  const [presets, setPresets] = useState({
    focus: { work: 25, break: 5 },
    flow: { work: 50, break: 10 },
  });

  const timerRef = useRef(null);

  const formatTime = (secs) => {
    const m = String(Math.floor(secs / 60)).padStart(2, "0");
    const s = String(secs % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  useEffect(() => {
    const { work, break: rest } = presets[activePreset];
    const newTime = (currentType === "work" ? work : rest) * 60;
    setSelectedTime(newTime);
    setTimeLeft(newTime);
    setIsRunning(false);
  }, [activePreset, currentType]);

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

  const handlePresetClick = (preset) => {
    if (!isRunning) {
      setActivePreset(preset);
    }
  };

  const handleTypeChange = (type) => {
    if (!isRunning) {
      setCurrentType(type);
    }
  };

  const handleTimeChange = (type, event) => {
    const value = parseInt(event.target.value);
    if (value > 0) {
      setPresets((prev) => {
        const newPreset = { ...prev };

        if (type === "work") {
          if (value < 1.5 * newPreset[activePreset].break) {
            return prev; 
          }
        } else if (type === "break") {
          if (value > newPreset[activePreset].work / 1.5) {
            return prev; 
          }
        }

        newPreset[activePreset][type] = value;

        // Immediately update the timer based on the new preset values
        const newTime = (type === "work" ? value : newPreset[activePreset].work) * 60;
        setSelectedTime(newTime);
        setTimeLeft(newTime);  // Update the time left immediately

        return newPreset;
      });
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 text-center p-4 border-2 rounded-xl md:w-[45%] justify-center">
      <div>
        {!isRunning ? (
          <div>
            <div className="flex gap-6">
              <span
                onClick={() => handlePresetClick("focus")}
                className={`cursor-pointer font-semibold p-3 rounded-xl transition-all duration-300 ${
                  activePreset === "focus"
                    ? "text-white bg-black dark:invert  "
                    : "border"
                }`}
              >
                Focus Mode
              </span>
              <span
                onClick={() => handlePresetClick("flow")}
                className={`cursor-pointer font-semibold p-3 rounded-xl transition-all duration-300 ${
                  activePreset === "flow"
                    ? "text-white  bg-black dark:invert"
                    : "border"
                }`}
              >
                Deep Flow
              </span>
            </div>

            {/* Editable Time for Work and Break */}
            <div className="flex flex-col gap-4 mt-6 w-full max-w-xs">
              {["work", "break"].map((type) => {
                const isWork = type === "work";
                const label = isWork ? "Work" : "Break";
                const time = presets[activePreset][type];

                const boxClass =
                  currentType === type
                    ? isWork
                      ? "bg-red-400"
                      : "bg-green-400" 
                    : "bg-white dark:bg-black"; 

                return (
                  <div
                    key={type}
                    onClick={() => handleTypeChange(type)}
                    className={`flex justify-between items-center border rounded px-4 py-2 transition-all duration-300 ${boxClass}`}
                  >
                    <span
                      className={`cursor-pointer font-semibold`}
                    >
                      {label}
                    </span>
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        value={time}
                        onChange={(e) => handleTimeChange(type, e)}
                        min="1"
                        className="w-16 text-center border px-2 py-1 rounded"
                      />
                      <span>min</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          // Timer UI
          <div className="flex flex-col items-center">
            <div className="text-5xl font-bold px-[2em] py-[1em]">
              {formatTime(timeLeft)}
            </div>

            <div className="text-xl font-semibold mt-4 opacity-30">
              {currentType === "work" ? "#Working" : "#Chilling"}
            </div>
          </div>
        )}
      </div>

      {/* Control Buttons (Start/Pause, Reset) */}
      <div className="flex gap-5 mt-4">
        <button onClick={startPause} className="hover:scale-110 transition">
          <img
            src={isRunning ? "/assets/icons/pause.svg" : "/assets/icons/play.svg"}
            alt={isRunning ? "Pause" : "Play"}
            className="w-8 h-8"
          />
        </button>
        <button onClick={reset} className="hover:scale-110 transition">
          <img src="/assets/icons/reset.svg" alt="Reset" className="w-8 h-8" />
        </button>
      </div>
    </div>
  );
};

export default Timer;
