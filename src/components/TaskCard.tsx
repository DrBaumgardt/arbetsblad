import React from "react";

interface TaskCardProps {
  task: any;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  return (
    <div
      className="task-card"
      style={{
        border: "1px solid black",
        borderRadius: "10px",
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <p>
        <strong>
          {task.lärandemål} - {task.typ}
        </strong>
      </p>
      <div>
        {/* Din logik för att visa uppgiften, inklusive eventuella LaTeX-formler */}
        {task.fråga}
      </div>
    </div>
  );
};

export default TaskCard;
