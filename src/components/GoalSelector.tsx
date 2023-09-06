import React from 'react';

interface GoalSelectorProps {
  data: any[];
  selectedGoals: string[];
  onSelectGoal: (goal: string) => void;
  selectedAreas: string[];
}

const GoalSelector: React.FC<GoalSelectorProps> = ({ data, selectedGoals, onSelectGoal, selectedAreas }) => {
  const filteredGoals = data.filter(item => selectedAreas.includes(item.område));
  
  const groupedGoals: Record<string, string[]> = {};

  filteredGoals.forEach(item => {
    const area = item.område;
    const goal = item.lärandemål;
    if (!groupedGoals[area]) {
      groupedGoals[area] = [];
    }
    if (!groupedGoals[area].includes(goal)) {
      groupedGoals[area].push(goal);
    }
  });

  return (
    <div className="worksheetMenu">
      {Object.keys(groupedGoals).map((area, index) => (
        <div key={index} className="area">
          <h3>{area}</h3>
          <ul>
            {groupedGoals[area].map((goal, index) => (
              <li key={index} className="checkbox-container">
                <input
                  type="checkbox"
                  checked={selectedGoals.includes(goal)}
                  onChange={() => onSelectGoal(goal)}
                />
                {goal}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );  
};

export default GoalSelector;
