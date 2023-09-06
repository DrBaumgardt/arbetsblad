import React, { useState } from 'react';
import AreaSelector from './AreaSelector';
import GoalSelector from './GoalSelector';
import TypeSelector from './TypeSelector';

interface QuestionModalProps {
  data: any[];
}

const QuestionModal: React.FC<QuestionModalProps> = ({ data }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedAreas, setSelectedAreas] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

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

  const onSelectType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);  // Nollställer currentStep
    setSelectedAreas([]); // Nollställer selectedAreas
    setSelectedGoals([]); // Nollställer selectedGoals
    setSelectedTypes([]); // Nollställer selectedTypes
  };
  

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div style={{ width: '100%' }}><AreaSelector data={data} selectedAreas={selectedAreas} onSelectArea={onSelectArea} /></div>;
      case 2:
        return <div style={{ width: '100%' }}><GoalSelector data={data} selectedGoals={selectedGoals} onSelectGoal={onSelectGoal} selectedAreas={selectedAreas} /></div>;
      case 3:
        return <div style={{ width: '100%' }}><TypeSelector data={data} selectedGoals={selectedGoals} onSelectType={onSelectType} /></div>;
      default:
        return null;
    }
  };

  return (
    <div>
      <button type="button" className="add-task-button" data-bs-toggle="modal" data-bs-target="#questionModal">
        Lägg till uppgifter
      </button>

      {/* The Modal */}
      <div className="modal fade" id="questionModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Question Selection</h5>
            </div>
            <div className="modal-body">
              {renderStepContent()} {/* Removed the grid-container wrapper */}
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
