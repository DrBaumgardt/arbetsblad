// QuestionCard.tsx
import React from 'react';

interface Props {
  question: string;
  answer: string;
  image: string;
}

const QuestionCard: React.FC<Props> = ({ question, answer, image }) => {
  return (
    <div>
      <p>{question}</p>
      {/* Add answer and image rendering here */}
    </div>
  );
};

export default QuestionCard;