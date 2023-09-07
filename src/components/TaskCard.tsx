import React, { useRef, useState } from "react";
import { useDrag, useDrop, DropTargetMonitor } from "react-dnd";
import RenderLatex from "./RenderLatex";

interface TaskCardProps {
  task: any;
  index: number;
  moveCard: (fromIndex: number, toIndex: number) => void;
}

interface DragItem {
  type: string;
  index: number;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, index, moveCard }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [, drop] = useDrop<DragItem, any, any>({
    accept: "CARD",
    hover(item: DragItem, monitor: DropTargetMonitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current!.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: "CARD",
    item: { index },
    collect: (monitor) => {
      setIsDragging(monitor.isDragging());
    },
  });

  drop(ref);
  drag(ref);

  let backgroundColor = isDragging ? "lightgreen" : "white";

  return (
    <div
      ref={ref}
      className="task-card"
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
        backgroundColor,
      }}
    >
      <p>
        <strong>
          {task.lärandemål} - {task.typ}
        </strong>
      </p>
      <RenderLatex text={task.fråga} />
    </div>
  );
};

export default TaskCard;
