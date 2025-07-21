import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";

type SortableItemProps = { id: number; title: string };

const SortableItem = ({ id, title }: SortableItemProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    padding: 10,
    margin: 5,
    border: "1px solid #ccc",
    background: "white",
    cursor: "grab",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <p>{title}</p>
    </div>
  );
};

export default SortableItem;
