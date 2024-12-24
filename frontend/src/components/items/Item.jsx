import React, { useEffect } from "react";
import { useDraggable } from "@dnd-kit/core";
import useDragging from "../../hooks/useDragging";

const Item = ({ id, image, name, weight, quantity, price }) => {
  const { setIsDragging } = useDragging();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  useEffect(() => {
    setIsDragging(transform !== null);
  }, [transform]);

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className="flex w-[337px] h-[180px] border border-[#dddddd] rounded-lg cursor-pointer bg-white"
      style={style}
    >
      <div className="relative z-0">
        <img
          src={image}
          className="size-[180px] object-cover border border-[#dddddd] rounded-lg"
        />
        <img src="src/assets/delete.svg" className="absolute left-2 bottom-2" />
        <img
          src="src/assets/change-image.svg"
          className="absolute right-2 bottom-2"
        />
      </div>
      <div className="flex flex-col justify-between p-4 w-[157px]">
        <span>{name}</span>
        <span>{weight}Kg</span>
        <span>{quantity}</span>
        <span>${price}</span>
      </div>
    </div>
  );
};

export default Item;
