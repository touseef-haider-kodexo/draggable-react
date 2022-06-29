import React from "react";
import { useDrop } from "react-dnd";
import "./styles.css";
import DraggableItem from "./DraggableItem";
import { useSelector, useDispatch } from "react-redux";
import { addDroppedItem, removeItem } from "./redux/itemsReducer";

const DroppableList = () => {
  const { droppedItems } = useSelector((state) => state?.items);
  const dispatch = useDispatch();
  const handleDrop = (item) => {
    dispatch(addDroppedItem(item));
    dispatch(removeItem(item?.id));
  };
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      className="dropList"
      style={{
        position: "relative",
        opacity: isOver ? 0.5 : 1,
        backgroundColor: isOver && "grey",
        color: isOver && "white",
      }}
      ref={drop}
    >
      {isOver && (
        <p style={{ position: "absolute", left: "50%", top: "50%" }}>
          Drop Here ...
        </p>
      )}
      {Array.isArray(droppedItems) &&
        droppedItems.length > 0 &&
        droppedItems?.map(({ title, id }, index) => (
          <DraggableItem
            className="item"
            title={title}
            id={id}
            key={index + id}
          />
        ))}
    </div>
  );
};

export default DroppableList;
