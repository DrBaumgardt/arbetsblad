import React, { useState } from "react";
import GoalSelector from "./GoalSelector";
import TypeSelector from "./TypeSelector";

interface QuestionModalProps {
  data: any[];
  addSelectedTasks: (tasks: any[]) => void;
  clearAllTasks: () => void; // Ny prop
}

const QuestionModal: React.FC<QuestionModalProps> = ({
  data,
  addSelectedTasks,
  clearAllTasks,
}) => {
  // Lägg till addSelectedTasks här
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});

  const onSelectGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const onSelectType = (type: string) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedGoals([]);
    setSelectedTypes([]);
    setTypeCounts({}); // Nollställ räknarna
  };

  const handleAdd = () => {
    // Här samlar vi alla valda uppgifter
    const selectedTasks: any[] = [];

    // Vi går igenom varje lärandemål och varje uppgiftstyp för att välja uppgifter
    selectedGoals.forEach((goal) => {
      const tasksForGoal = data.filter((item) => item.lärandemål === goal);

      selectedTypes.forEach((type) => {
        const tasksForType = tasksForGoal.filter((item) => item.typ === type);
        const count = typeCounts[type] || 0;

        // Här kan du implementera logiken för att välja `count` antal uppgifter av en viss typ och lärandemål
        // För enkelhetens skull tar vi bara de första `count` uppgifterna
        const selectedForType = tasksForType.slice(0, count);
        selectedTasks.push(...selectedForType);
      });
    });

    // Lägg till de valda uppgifterna
    addSelectedTasks(selectedTasks);

    // Stäng modalen och återställ steg och valda mål och typer
    handleClose();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div style={{ width: "100%" }}>
            <GoalSelector
              data={data}
              selectedGoals={selectedGoals}
              onSelectGoal={onSelectGoal}
            />
          </div>
        );
      case 2:
        return (
          <div style={{ width: "100%" }}>
            <TypeSelector
              data={data}
              selectedGoals={selectedGoals}
              onSelectType={onSelectType}
              typeCounts={typeCounts}
              setTypeCounts={setTypeCounts}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    if (currentStep === 1) {
      return (
        <>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleNext}
          >
            Next
          </button>
        </>
      );
    } else if (currentStep === 2) {
      return (
        <>
          <button
            type="button"
            className="btn btn-secondary"
            data-bs-dismiss="modal"
            onClick={handleClose}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setCurrentStep(1)}
          >
            Back
          </button>
          <button
            type="button"
            className="btn btn-success"
            data-bs-dismiss="modal"
            onClick={handleAdd}
          >
            Add
          </button>
        </>
      );
    }
  };

  const totalSelectedTasks = Object.values(typeCounts).reduce(
    (acc, cur) => acc + cur,
    0
  );

  return (
    <div>
      <button
        type="button"
        className="add-task-button"
        data-bs-toggle="modal"
        data-bs-target="#questionModal"
      >
        Lägg till uppgifter
      </button>
      <button
        type="button"
        className="add-task-button"
        onClick={clearAllTasks} // Kör clearAllTasks när knappen klickas
      >
        Rensa alla uppgifter
      </button>
      {/* The Modal */}
      <div
        className="modal fade"
        id="questionModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header d-flex justify-content-between">
              <h3 className="fs-3" id="exampleModalLabel">
                Välj lärandemål och uppgiftstyper
              </h3>
              <h3 className="fs-3">Antal uppgifter: {totalSelectedTasks}</h3>
            </div>
            <div className="modal-body">{renderStepContent()}</div>
            <div className="modal-footer">{renderButtons()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionModal;
