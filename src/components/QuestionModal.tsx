import React, { useState } from "react";
import GoalSelector from "./GoalSelector";
import TypeSelector from "./TypeSelector";

interface QuestionModalProps {
  data: any[];
  addSelectedTasks: (tasks: any[]) => void;
  clearAllTasks: () => void;
  alreadySelectedTasks: string[];
}

const randomSelect = (arr: any[], count: number) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const QuestionModal: React.FC<QuestionModalProps> = ({
  data,
  addSelectedTasks,
  clearAllTasks,
  alreadySelectedTasks, // Lägg till denna rad
}) => {
  // Lägg till addSelectedTasks här
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [typeCounts, setTypeCounts] = useState<Record<string, number>>({});

  const onSelectGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter((g) => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
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
    setTypeCounts({}); // Nollställ räknarna
  };

  const handleAdd = () => {
    const selectedTasks: any[] = [];

    console.log("Selected Goals:", selectedGoals);
    console.log("Type Counts:", typeCounts);
    console.log("Already Selected Tasks before adding:", alreadySelectedTasks); // NEW

    selectedGoals.forEach((goal) => {
      const tasksForGoal = data.filter((item) => item.lärandemål === goal);

      console.log(`Tasks for Goal "${goal}":`, tasksForGoal);

      Object.keys(typeCounts).forEach((type) => {
        let tasksForType = tasksForGoal.filter((item) => item.typ === type);

        console.log(`Tasks for Type "${type}":`, tasksForType);

        // Exclude already selected tasks
        tasksForType = tasksForType.filter(
          (task) => !alreadySelectedTasks.includes(task._id) // Ensure _id is used here
        );

        console.log(
          `Tasks for Type "${type}" after excluding selected:`,
          tasksForType
        ); // NEW

        const count = typeCounts[type] || 0;

        // Randomly select 'count' number of tasks
        const selectedForType = randomSelect(tasksForType, count);
        console.log(`Selected for Type "${type}":`, selectedForType);

        selectedTasks.push(...selectedForType);
      });
    });

    addSelectedTasks(selectedTasks);
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
