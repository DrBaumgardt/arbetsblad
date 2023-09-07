import React from "react";
import "katex/dist/katex.min.css"; // Import KaTeX styles
import { InlineMath, BlockMath } from "react-katex";

interface RenderLatexProps {
  text: string;
}

const RenderLatex: React.FC<RenderLatexProps> = ({ text }) => {
  const parts = text.split(/((?:\${1,2})[^\$]*(?:\${1,2}))/);

  return (
    <div>
      {parts.map((part, i) => {
        if (part.startsWith("$$") && part.endsWith("$$")) {
          return <BlockMath key={i} math={part.slice(2, -2)} />;
        } else if (part.startsWith("$") && part.endsWith("$")) {
          return <InlineMath key={i} math={part.slice(1, -1)} />;
        } else {
          return <span key={i}>{part}</span>;
        }
      })}
    </div>
  );
};

export default RenderLatex;
