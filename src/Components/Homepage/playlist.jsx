import React from "react";
import { Play, Shuffle } from "lucide-react";

const exampleSongs = [
  "Lofi study",
  "Empty mind",
  "Asthetics",
  "Sleepy cat",
  "Chill beat",
  "Waves",
  "Dreamscape",
  "Late night",
  "Focus flow",
  "Breeze",
  "Midnight notes",
];

const Playlist = () => {
  return (
    <div className="bg-white dark:bg-black p-4 rounded-xl w-full md:w-1/2 h-full flex flex-col">
      <div className="flex justify-center mb-4">
        <button className="bg-black text-white dark:bg-white dark:text-black px-5 py-2 rounded-full font-semibold hover:scale-105 transition">
          <div className="flex items-center gap-2">
            <Shuffle size={18} />
            Shuffle
          </div>
        </button>
      </div>

      <div className="overflow-y-auto scrollbar-thin scrollbar-thumb-[#888] scrollbar-track-transparent pr-2 max-h-[400px]">
        {exampleSongs.map((song, index) => (
          <div
            key={index}
            className="bg-[#f0f0f0] dark:bg-[#1a1a1a] flex justify-between items-center px-4 py-3 mb-3 rounded-xl hover:bg-[#e0e0e0] dark:hover:bg-[#2a2a2a] transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-400 dark:bg-gray-600 flex-shrink-0" />
              <span className="text-black dark:text-white font-medium">{song}</span>
            </div>
            <button className="text-black dark:text-white hover:opacity-80 transition">
              <Play size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
