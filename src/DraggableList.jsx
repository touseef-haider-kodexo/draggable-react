import React, { useState } from "react";
import "./styles.css";
import DraggableItem from "./DraggableItem";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeDroppedItem } from "./redux/itemsReducer";
import { useDrop } from "react-dnd";

const DraggableList = () => {
  const { items } = useSelector((state) => state?.items);
  const handleDrop = (item) => {
    dispatch(addItem(item));
    dispatch(removeDroppedItem(item?.id));
  };

  const [{ isOver }, drop] = useDrop(() => ({
    accept: "item",
    drop: (item) => handleDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const dispatch = useDispatch();
  const [item, setItem] = useState();

  const handleAdd = () => {
    if (item) {
      dispatch(addItem({ title: item, id: items?.length }));
      setItem("");
    }
  };

  return (
    <div>
      <div className="controls">
        <input
          className="inputControl"
          type="text"
          placeholder="Add Item"
          onChange={(e) => {
            setItem(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAdd();
            }
          }}
          value={item}
        />
        <button className="btn" onClick={handleAdd}>
          Add Item
        </button>
      </div>
      <div
        className="dragList"
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
        {Array.isArray(items) &&
          items.length > 0 &&
          items?.map(({ title, id }, index) => (
            <DraggableItem
              key={index + id}
              items={items}
              id={id}
              title={title}
            />
          ))}
      </div>
    </div>
  );
};

export default DraggableList;
