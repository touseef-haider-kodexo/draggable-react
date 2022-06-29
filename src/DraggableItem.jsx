import React from "react";
import "./styles.css";
import { useDrag } from "react-dnd";

const DraggableItem = ({ title, id }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "item",
    item: {
      title,
      id,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <>
      <p
        style={{
          backgroundColor: isDragging && "white",
          color: isDragging && "rgb(43, 131, 226)",
        }}
        className="item"
        ref={drag}
      >
        {title}
      </p>
    </>
  );
};

export default DraggableItem;
