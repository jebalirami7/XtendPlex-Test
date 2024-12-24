import React from "react";
import Groceries from "../groceries/Groceries";
import Items from "../items/Items";
import Column from "./Column";
import useDragging from "../../hooks/useDragging";
import { DndContext } from "@dnd-kit/core";
import { changeType } from "../../services/product";

const Body = () => {
  const { isDragging } = useDragging();

  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [triggerLoad, setTriggerLoad] = React.useState(false);

  const columns = ["Fruits", "Vegetables", "Meats"];

  async function handleDragEnd(event) {
    const { active, over } = event;

    if (!over) return;

    const item = active.id;
    const column = over.id;

    let type = "fruit";
    if (column === 1) type = "vegetable";
    if (column === 2) type = "meat";

    await changeType(item, type).then((data) => {
      if (data) {
        setTriggerLoad(!triggerLoad);
      }
    });
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="flex flex-col gap-4 p-4 mt-4 mb-2.5 mx-auto bg-white min-h-[900px] w-[1680px]">
        <div className="flex gap-4">
          <Groceries
            triggerLoad={triggerLoad}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <Items
            triggerLoad={triggerLoad}
            selectedCategory={selectedCategory}
          />
        </div>
        {isDragging && (
          <>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-10"></div> */}
            <div className="flex gap-4 w-full">
              {columns.map((column, index) => (
                <Column key={index} id={index} name={column} />
              ))}
            </div>
          </>
        )}
      </div>
    </DndContext>
  );
};

export default Body;
