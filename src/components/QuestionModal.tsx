import React, { useState } from 'react';
import AreaSelector from './AreaSelector';
import GoalSelector from './GoalSelector';

interface QuestionModalProps {
  areas: string[];
  goals: string[];
  types: string[];
  data: any[];
}

const QuestionModal: React.FC<QuestionModalProps> = ({ areas, goals, types, data }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  

  const onSelectArea = (area: string) => {
    if (selectedAreas.includes(area)) {
      setSelectedAreas(selectedAreas.filter(a => a !== area));
    } else {
      setSelectedAreas([...selectedAreas, area]);
    }
  };

  const onSelectGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);  // Nollställer currentStep
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <AreaSelector areas={areas} selectedAreas={selectedAreas} onSelectArea={onSelectArea} />;
      case 2:
        return <GoalSelector data={data} selectedGoals={selectedGoals} onSelectGoal={onSelectGoal} selectedAreas={selectedAreas} />;
      case 3:
        // Implement logic for Step 3
        return null;
      default:
        return null;
    }
  };

  return (
    <div>
      <h2>QuestionModal</h2>
      {/* Button to Open the Modal */}
      <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#questionModal">
        Open Modal
      </button>

      {/* The Modal */}
      <div className="modal fade" id="questionModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Question Selection</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {renderStepContent()}
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={handleClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleNext}>Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
