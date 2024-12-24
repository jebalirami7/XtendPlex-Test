import { createContext, useState, useContext } from "react";

const DraggingContext = createContext(undefined);

export const DraggingProvider = ({ children }) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <DraggingContext.Provider value={{ isDragging, setIsDragging }}>
      {children}
    </DraggingContext.Provider>
  );
};

const useDragging = () => {
  const context = useContext(DraggingContext);

  if (context === undefined) {
    throw new Error("useDragging must be used within a DraggingProvider");
  }

  return context;
};

export default useDragging;
