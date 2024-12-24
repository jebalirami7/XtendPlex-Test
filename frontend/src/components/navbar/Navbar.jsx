import React from "react";

const Navbar = () => {
  return (
    <nav>
      <div className="w-full">
        <div className="flex items-center justify-end gap-4 h-[78px] pr-8 bg-[#1CA329]">
          <span className="text-xl text-white">Lorem Ipsum</span>
          <div className="p-1.5 rounded-full border-3 border-[#D9D9D9] cursor-pointer">
            <img src="src/assets/profile.svg" alt="Profile" />
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center px-8 border-b border-[#959595] bg-white">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="flex items-center gap-2.5 px-4 py-2.5 cursor-pointer"
          >
            <img src="src/assets/info.svg" alt="Info" />
            <span className="text-sm text-[#666666]">Nav {index + 1}</span>
            <img src="src/assets/arrow-down.svg" alt="Arrow Down" />
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
