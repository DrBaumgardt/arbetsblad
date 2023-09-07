import React from "react";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import { InlineMath, BlockMath } from "react-katex";

interface TaskCardProps {
  task: any;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  // Split the string based on $...$ and $$...$$
  const parts = task.fråga.split(/((?:\${1,2})[^\$]*(?:\${1,2}))/);

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
        {/* Loop through the parts and render either text or LaTeX */}
        {parts.map((part: string, index: number) => {
          if (part.startsWith("$$") && part.endsWith("$$")) {
            // This is a block LaTeX part
            const latex = part.substring(2, part.length - 2);
            return <BlockMath key={index} math={latex} />;
          } else if (part.startsWith("$") && part.endsWith("$")) {
            // This is an inline LaTeX part
            const latex = part.substring(1, part.length - 1);
            return <InlineMath key={index} math={latex} />;
          } else {
            // This is a text part
            return part;
          }
        })}
      </div>
    </div>
  );
};

export default TaskCard;
