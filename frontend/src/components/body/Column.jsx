import React from "react";
import { useDroppable } from "@dnd-kit/core";

const Column = ({ id, name }) => {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex items-center justify-center w-1/3 h-[300px] border border-[#dddddd] rounded-lg transition-all duration-300 ${
        isOver ? "bg-blue-100" : "bg-white"
      }`}
    >
      {name}
    </div>
  );
};

export default Column;
